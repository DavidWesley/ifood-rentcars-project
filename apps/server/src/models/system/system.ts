import { ModelProps } from "@/interfaces/model.ts"
import { CustomerModel } from "@/models/customer/customer.ts"
import { InvoiceModel } from "@/models/invoice/invoice.ts"
import { RentalModel } from "@/models/rental/rental.ts"
import { BaseVehicleProps, VehicleModel, VehicleProps, VehicleTypeEnum } from "@/models/vehicle/vehicle.ts"
import { CustomerRepositoryInterface, customerRepository } from "@/repositories/customerRepository.ts"
import { InvoiceRepositoryInterface, invoiceRepository } from "@/repositories/invoiceRepository.ts"
import { RentalRepositoryInterface, rentalRepository } from "@/repositories/rentalRepository.ts"
import { VehicleRepositoryInterface, vehicleRepository } from "@/repositories/vehicleRepository.ts"

export interface SystemModelProps extends ModelProps {
    id: number
}

export interface SystemModelMethods {
    addVehicle<V extends BaseVehicleProps>(vehicleProps: V): Promise<void>
    addCustomer(customerProps: CustomerModel): Promise<void>
    rentalVehicle(plate: VehicleProps["plate"], cpf: CustomerModel["cpf"], startDate: Date, endDate: Date): Promise<boolean>
    returnVehicle(cpf: CustomerModel["cpf"], plate: VehicleModel["plate"], returnDate?: Date): Promise<void>
    listAvailableVehicles(): Promise<VehicleModel[]>
    listRentedVehicles(): Promise<VehicleModel[]>
    showCustomerInvoices(customerId: CustomerModel["id"]): Promise<InvoiceModel[]>
}

export class System implements SystemModelProps, SystemModelMethods {
    private static lastGeneratedId = 0

    protected static instance: System

    public readonly id: number
    public readonly createdAt: Date
    public readonly updatedAt: Date

    protected constructor(
        protected readonly customerRepo: CustomerRepositoryInterface<CustomerModel>,
        protected readonly vehicleRepo: VehicleRepositoryInterface<VehicleModel>,
        protected readonly rentalRepo: RentalRepositoryInterface<RentalModel>,
        protected readonly invoiceRepo: InvoiceRepositoryInterface<InvoiceModel>
    ) {
        if (System.lastGeneratedId > 1) {
            console.warn("To many instances of system. Last id: " + System.lastGeneratedId)
        }

        this.id = ++System.lastGeneratedId
        this.createdAt = new Date()
        this.updatedAt = this.createdAt
    }

    public static getInstance(): System {
        if (!(System.instance instanceof System))
            System.instance = new System(customerRepository, vehicleRepository, rentalRepository, invoiceRepository)

        return System.instance
    }

    public async addVehicle<V extends BaseVehicleProps>(vehicleProps: V): Promise<void> {
        if ((await this.vehicleRepo.findByPlate(vehicleProps.plate)) !== null) {
            throw new Error(`Already exists car with this plate: ${vehicleProps.plate}`)
        }
        const vehicle = new VehicleModel(vehicleProps)
        await this.vehicleRepo.create(vehicle)
    }

    public async addCustomer(customerProps: CustomerModel): Promise<void> {
        if ((await this.customerRepo.findByCPF(customerProps.cpf)) !== null) {
            throw new Error(`Already exists customer with this cpf: ${customerProps.cpf}`)
        }

        const customer = new CustomerModel(customerProps)
        await this.customerRepo.create(customer)
    }

    public async rentalVehicle(plate: VehicleProps["plate"], cpf: CustomerModel["cpf"], startDate: Date, endDate: Date): Promise<boolean> {
        // TODO: Lógica de validação
        // Separar todos os If a seguir em métodos de validação ou use cases

        // Validações baratas
        if (startDate >= endDate) throw new Error("Invalid Dates")

        const customer = await this.customerRepo.findByCPF(cpf)
        if (customer === null) throw new Error("Customer not found")

        if ((await this.rentalRepo.findLastRentalsByCustomerId(customer.id)) !== null) throw new Error("Customer already has a rental")

        const vehicle = await this.vehicleRepo.findByPlate(plate)
        if (vehicle === null) throw new Error("Vehicle not found")
        if (vehicle.isAvailable() === false) return false

        // TODO:
        // separar lógicas a seguir
        // e criar uma classe para cada categoria de licença
        // porque a legislação pode mudar a cada ano
        // LÓGICA:
        // checar a partir da categoria de licença do usuário se ele pode alugar o veículo em questão pelo tipo de veículo
        const vehiclesPermissionByLicense = Object.freeze({
            get A() {
                return [VehicleTypeEnum.MOTORCYCLE]
            },
            get B() {
                // TODO: Pedente calcular a massa do veículo alugado para validação
                return [VehicleTypeEnum.CAR, VehicleTypeEnum.MOTORHOME, VehicleTypeEnum.TRAILER]
            },
            get AB() {
                return [...this.A, ...this.B]
            },
            get C() {
                // TODO: Pedente calcular a idade maior que 21 anos do cliente e a massa do veículo alugado para validação
                return [VehicleTypeEnum.TRUCK, ...this.B]
            },
            get D() {
                return [VehicleTypeEnum.BUS, ...this.C, ...this.B]
            },
            get E() {
                return [...this.B, ...this.C, ...this.D]
            },
        })

        if (vehiclesPermissionByLicense[customer.license].includes(vehicle.type) === false)
            throw new Error(`Customer's license on category ${customer.license} cannot rent this vehicle type: ${vehicle.type}`)

        // Lógica do aluguel de veículos
        await this.vehicleRepo.update(vehicle.id, { available: false, popularity: vehicle.popularity + 1 })
        const tax = await this.vehicleRepo.calculateTax(vehicle.type)
        const rental = new RentalModel(customer, vehicle, tax, startDate, endDate)
        await this.rentalRepo.create(rental)

        // Lógica da criação de faturas com os dados iniciais do aluguel
        let lastOpenedInvoice = await this.invoiceRepo.findLastOpenedInvoicesByCustomerId(customer.id)
        if (lastOpenedInvoice === null) {
            const expiresAtDate = new Date(rental.createdAt)
            expiresAtDate.setUTCMonth(expiresAtDate.getUTCMonth() + 1)
            const invoice = new InvoiceModel(customer, [rental], expiresAtDate)
            await this.invoiceRepo.create(invoice)
        } else {
            lastOpenedInvoice.rentals.push(rental)
            await this.invoiceRepo.update(lastOpenedInvoice.id, { rentals: lastOpenedInvoice.rentals })
        }

        return true
    }

    public async returnVehicle(cpf: CustomerModel["cpf"], plate: VehicleModel["plate"], returnDate?: Date): Promise<void> {
        const customer = await this.customerRepo.findByCPF(cpf)
        if (customer === null) throw new Error("Customer not found")

        const vehicle = await this.vehicleRepo.findByPlate(plate)
        if (vehicle === null) throw new Error("Vehicle not found")

        const rental = await this.rentalRepo.findLastRentalsByCustomerId(customer.id)
        if (rental === null) throw new Error("Rental not found")

        if (rental.state !== "active") throw new Error("Rental is not active")
        if (rental.vehicle.id !== vehicle.id) throw new Error("Rental is not for this vehicle")

        returnDate = returnDate ?? new Date()

        if (rental.endDate < returnDate) throw new Error("Invalid return date")
        else if (rental.endDate > returnDate) {
            // Lógica para criar tarifas extras por horas de atraso na entrega
        }

        rental.state = "finished"

        await this.rentalRepo.update(rental.id, rental)
        // Lógica para atualizar o cálculo do custo total do aluguel do veículo incluindo as tarifas extras caso existam

        // Lógica de devolução de veículos
        await this.vehicleRepo.update(rental.vehicle.id, { available: true })
    }

    public async listAvailableVehicles(): Promise<VehicleModel[]> {
        const availableVehicles = await this.vehicleRepo.findAvailableVehiclesByFilters({})
        return availableVehicles
    }

    public async listRentedVehicles(): Promise<VehicleModel[]> {
        const rentedVehicles = await this.vehicleRepo.findRentedVehiclesByFilters({})
        return rentedVehicles
    }

    public async showCustomerInvoices(customerId: CustomerModel["id"]): Promise<InvoiceModel[]> {
        if (CustomerModel.validateCustomerId(customerId) === false) throw new Error("Invalid Customer")

        const invoices = await this.invoiceRepo.findInvoicesByCustomerId(customerId)
        return invoices
    }

    // private async generateInvoiceToCustomer(customerId: CustomerModel["id"], fromDate: Date): Promise<InvoiceModel | null> {
    //     if (CustomerModel.validateCustomerId(customerId) === false) throw new Error("Invalid Customer")

    //     const customer = await this.customerRepo.findById(customerId)
    //     if (customer === null) throw new Error("Customer not found")

    //     const customerActiveRentals = await this.rentalRepo.findActiveRentalsByCustomerId(customerId)
    //     if (customerActiveRentals.length === 0) return null

    //     // TODO:
    //     // Mudar a forma de calcular a data de expiração do faturamento
    //     // Recomendado usar alguma biblioteca como date-fns, dayjs, luxon ou utilizar Temporal
    //     const nextMonth = new Date(fromDate)
    //     nextMonth.setMonth(nextMonth.getMonth() + 1)

    //     const invoice = new InvoiceModel(customer, customerActiveRentals, nextMonth)
    //     await this.invoiceRepo.create(invoice)
    //     return invoice
    // }
}
