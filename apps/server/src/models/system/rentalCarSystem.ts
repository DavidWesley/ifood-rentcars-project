// import { CustomerModel } from "@/models/customer/customer.ts"
// import { InvoiceModel } from "@/models/invoice/invoice.ts"
// import { RentalModel } from "@/models/rental/rental.ts"
// import { System } from "@/models/system/system.ts"
// import { BaseCarProps, Car } from "@/models/vehicle/car.ts"
// import { CustomerRepositoryInterface } from "@/repositories/customerRepository.ts"
// import { InvoiceRepositoryInterface } from "@/repositories/invoiceRepository.ts"
// import { RentalRepositoryInterface } from "@/repositories/rentalRepository.ts"
// import { VehicleRepositoryInterface } from "@/repositories/vehicleRepository.ts"

// export class RentalCarsSystem extends System {
//     private constructor(
//         customerRepo: CustomerRepositoryInterface<CustomerModel>,
//         carRepo: VehicleRepositoryInterface<Car>,
//         rentalRepo: RentalRepositoryInterface<RentalModel>,
//         invoiceRepo: InvoiceRepositoryInterface<InvoiceModel>
//     ) {
//         super(customerRepo, carRepo, rentalRepo, invoiceRepo)
//     }

//     async addCar(props: BaseCarProps): Promise<void> {
//         if ((await this.vehicleRepo.findByPlate(props.plate)) !== null) {
//             throw new Error(`Already exists car with this plate: ${props.plate}`)
//         }

//         const car = new Car(props)

//         this.vehicleRepo.create(car)
//     }

//     async rentCar(customerId: string, vehicleId: string, startDate: Date, endDate: Date): Promise<boolean> {
//         const customer = await this.customerRepo.findById(customerId)
//         if (customer === null) throw new Error(`Invalid Customer`)

//         this.rentalRepo.findOne({ customerId: customer.id, state: "active" })

//         const car = await this.vehicleRepo.findById(vehicleId)
//         if (car === null) throw new Error(`Invalid Car`)

//         if (customer.license.includes("B") === false) throw new Error("Cliente não pode alugar o carro porque não tem habilitação necessária")
//         if (startDate >= endDate) throw new Error("Invalid Dates")
//         if (car.isAvailable() === false) return false

//         // Lógica do aluguel de carros
//         this.vehicleRepo.update(vehicleId, { available: false, popularity: car.popularity + 1 })
//         this.customerRepo.update()
//     }

//     returnCar(rentalId: string): void {}

//     listAvailableCars(): Car[] {}

//     listRentedCars(): Car[] {}

//     generateInvoice(customerId: string): void {}

//     exitSystem(): void {}
// }
