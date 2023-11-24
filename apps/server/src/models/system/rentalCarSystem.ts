import { CustomerModel } from "@/models/customer/customer.ts"
import { InvoiceModel } from "@/models/invoice/invoice.ts"
import { RentalModel } from "@/models/rental/rental.ts"
import { System } from "@/models/system/system.ts"
import { BaseCarProps, Car } from "@/models/vehicle/car.ts"
import { CustomerRepositoryInterface } from "@/repositories/customerRepository.ts"
import { InvoiceRepositoryInterface } from "@/repositories/invoiceRepository.ts"
import { RentalRepositoryInterface } from "@/repositories/rentalRepository.ts"
import { VehicleRepositoryInterface } from "@/repositories/vehicleRepository.ts"

export class RentalCarsSystem extends System {
    private constructor(
        customerRepo: CustomerRepositoryInterface<CustomerModel>,
        carRepo: VehicleRepositoryInterface<Car>,
        rentalRepo: RentalRepositoryInterface<RentalModel>,
        invoiceRepo: InvoiceRepositoryInterface<InvoiceModel>
    ) {
        super(customerRepo, carRepo, rentalRepo, invoiceRepo)
    }

    addCar(carDetails: BaseCarProps): void {}

    rentCar(customerId: string, vehicleId: string, startDate: Date, endDate: Date): void {}

    returnCar(rentalId: string): void {}

    listAvailableCars(): Car[] {}

    listRentedCars(): Car[] {}

    generateInvoice(customerId: string): void {}

    exitSystem(): void {}
}
