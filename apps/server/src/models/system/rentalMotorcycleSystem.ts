// import { CustomerModel } from "@/models/customer/customer.ts"
// import { InvoiceModel } from "@/models/invoice/invoice.ts"
// import { RentalModel } from "@/models/rental/rental.ts"
// import { System } from "@/models/system/system.ts"
// import { BaseMotorcycleProps, Motorcycle } from "@/models/vehicle/motorcycle.ts"
// import { CustomerRepositoryInterface } from "@/repositories/customerRepository.ts"
// import { InvoiceRepositoryInterface } from "@/repositories/invoiceRepository.ts"
// import { RentalRepositoryInterface } from "@/repositories/rentalRepository.ts"
// import { VehicleRepositoryInterface } from "@/repositories/vehicleRepository.ts"

// export class RentalMotorcyclesSystem extends System {
//     private constructor(
//         customerRepo: CustomerRepositoryInterface<CustomerModel>,
//         motorcycleRepo: VehicleRepositoryInterface<Motorcycle>,
//         rentalRepo: RentalRepositoryInterface<RentalModel>,
//         invoiceRepo: InvoiceRepositoryInterface<InvoiceModel>
//     ) {
//         super(customerRepo, motorcycleRepo, rentalRepo, invoiceRepo)
//     }

//     addMotorcycle(motorcycleDetails: BaseMotorcycleProps): void {}

//     rentMotorcycle(customerId: string, vehicleId: string, startDate: Date, endDate: Date): void {}

//     returnMotorcycle(rentalId: string): void {}

//     listAvailableMotorcycles(): Motorcycle[] {}

//     listRentedMotorcycles(): Motorcycle[] {}

//     generateInvoice(customerId: string): void {}

//     exitSystem(): void {}
// }
