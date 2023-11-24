import { Car } from "@/domain/car.ts"
import { CustomerModel } from "@/models/customer.ts"
import { InvoiceModel } from "@/models/invoice.ts"
import { RentalModel } from "@/models/rental.ts"
import { CustomerRepositoryInterface, customerRepository } from "@/repositories/customerRepository.ts"
import { InvoiceRepositoryInterface, invoiceRepository } from "@/repositories/invoiceRepository.ts"
import { RentalRepositoryInterface, rentalRepository } from "@/repositories/rentalRepository.ts"
import { VehicleRepositoryInterface, vehicleRepository } from "@/repositories/vehicleRepository.ts"

class System {
    private static instance: System

    private constructor(
        private readonly customerRepo: CustomerRepositoryInterface<CustomerModel>,
        private readonly vehicleRepo: VehicleRepositoryInterface<Car>,
        private readonly rentalRepo: RentalRepositoryInterface<RentalModel>,
        private readonly invoiceRepo: InvoiceRepositoryInterface<InvoiceModel>
    ) {}

    static getInstance(): System {
        if (!(System.instance instanceof System))
            System.instance = new System(customerRepository, vehicleRepository, rentalRepository, invoiceRepository)

        return System.instance
    }
}

const system = System.getInstance()

export { system }
