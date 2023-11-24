import { ModelProps } from "@/interfaces/model.ts"
import { CustomerModel } from "@/models/customer/customer.ts"
import { InvoiceModel } from "@/models/invoice/invoice.ts"
import { RentalModel } from "@/models/rental/rental.ts"
import { VehicleModel } from "@/models/vehicle/vehicle.ts"
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
}
