import { ModelProps } from "@/interfaces/model.ts"
import { CustomerModel } from "@/models/customer/customer.ts"
import { InvoiceModel } from "@/models/invoice/invoice.ts"
import { RentalModel } from "@/models/rental/rental.ts"
import { BaseVehicleProps, VehicleModel, VehicleModelProps } from "@/models/vehicle/vehicle.ts"
import { CustomerRepositoryInterface, customerRepository } from "@/repositories/customerRepository.ts"
import { InvoiceRepositoryInterface, invoiceRepository } from "@/repositories/invoiceRepository.ts"
import { RentalRepositoryInterface, rentalRepository } from "@/repositories/rentalRepository.ts"
import { VehicleRepositoryInterface, vehicleRepository } from "@/repositories/vehicleRepository.ts"

export interface SystemModelProps extends ModelProps {
    id: number
}

export interface SystemModelMethods {}

export class System implements SystemModelProps, SystemModelMethods {
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
        this.id = 1
        this.createdAt = new Date()
        this.updatedAt = this.createdAt
    }

    static getInstance(): System {
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

    public async rentalVehicle(
        vehicleId: VehicleModelProps["id"],
        customerId: CustomerModel["id"],
        startDate: Date,
        endDate: Date
    ): Promise<boolean> {
        if (CustomerModel.validaCustomerId(customerId) === false) throw new Error("Invalid Customer")
        if (VehicleModel.validateVehicleId(vehicleId) === false) throw new Error("Invalid Vehicle")

        const vehicle = await this.vehicleRepo.findById(vehicleId)
        if (vehicle === null) throw new Error("Vehicle not found")

        const customer = await this.customerRepo.findById(customerId)
        if (customer === null) throw new Error("Customer not found")

        if (customer.licenseType.includes("B") === false) throw new Error("Cliente não pode alugar o veículo porque não tem habilitação necessária")
        if (startDate >= endDate) throw new Error("Invalid Dates")

        if (vehicle.isAvailable() === false) return false

        if ((await this.rentalRepo.findLastVehicleRentalsByCustomerId(customerId)) !== null) throw new Error("Customer already has a rental")

        // Lógica do aluguel de veículos
        await this.vehicleRepo.update(vehicleId, { available: false, popularity: vehicle.popularity + 1 })

        // Lógica do aluguel de veículos
        const rental = new RentalModel(customer, vehicle, startDate, endDate)

        await this.rentalRepo.create(rental)

        // Lógica da criação de faturas com os dados iniciais do aluguel

        return true
    }

    public async returnVehicle(rentalId: RentalModel["id"], returnDate?: Date): Promise<void> {
        if (RentalModel.validateRentalId(rentalId) === false) throw new Error("Invalid Rental")

        const rental = await this.rentalRepo.findById(rentalId)
        if (rental === null) throw new Error("Rental not found")

        if (rental.state !== "active") throw new Error("Rental is not active")

        const vehicle = await this.vehicleRepo.findById(rental.vehicle.id)
        if (vehicle === null) throw new Error("Vehicle not found")

        returnDate = returnDate ?? new Date()

        if (rental.endDate < returnDate) throw new Error("Invalid return date")
        else if (rental.endDate > returnDate) {
            // Lógica para criar tarifas extras por horas de atraso na entrega
        }

        rental.state = "finished"

        await this.rentalRepo.update(rental.id, rental)
        // Lógica para atualizar o cálculo do custo total do aluguel do veículo incluindo as tarifas extras caso existam

        // Lógica de devolução de veículos
        await this.vehicleRepo.update(vehicle.id, { available: true })
    }
}
