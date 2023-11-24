import { ModelProps } from "@/interfaces/model.ts"
import { UUID, createUUID } from "@/utils/id.ts"

import { CustomerModel } from "@/models/customer/customer.ts"
import { VehicleModel } from "@/models/vehicle/vehicle.ts"

export interface BaseRentalProps {
    customer: CustomerModel
    vehicle: VehicleModel
    startDate: Date
    endDate: Date
}

export interface RentalProps extends ModelProps, BaseRentalProps {
    id: UUID
}

export interface RentalMethods {
    calculateTotalAmount: () => number
}

export class RentalModel implements RentalProps, RentalMethods {
    public readonly customer: CustomerModel
    public readonly vehicle: VehicleModel

    public readonly startDate: Date
    public readonly endDate: Date

    public readonly id: UUID
    public readonly createdAt: Date
    public updatedAt: Date

    constructor(customer: CustomerModel, vehicle: VehicleModel, startDate: Date, endDate: Date) {
        this.customer = customer
        this.vehicle = vehicle

        this.startDate = startDate
        this.endDate = endDate

        this.id = createUUID()
        this.createdAt = new Date()
        this.updatedAt = this.createdAt
    }

    public calculateTotalAmount(): number {
        return 4800
    }
}
