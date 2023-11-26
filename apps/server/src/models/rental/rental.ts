import { ModelProps } from "@/interfaces/model.ts"
import { UUID, createUUID, validateUUID } from "@/utils/id.ts"

import { CustomerModel } from "@/models/customer/customer.ts"
import { VehicleModel } from "@/models/vehicle/vehicle.ts"
import { TimeUnits } from "@/utils/timeUnits.ts"

export type RentalStatus = "active" | "finished" | "cancelled"

export interface BaseRentalProps {
    customer: CustomerModel
    vehicle: VehicleModel
    startDate: Date
    endDate: Date
    state: RentalStatus
    tax: number
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

    public readonly tax: number
    public state: RentalStatus

    constructor(customer: CustomerModel, vehicle: VehicleModel, tax: number, startDate: Date, endDate: Date, state: RentalStatus = "active") {
        this.customer = customer
        this.vehicle = vehicle

        this.startDate = startDate
        this.endDate = endDate

        this.tax = tax
        this.state = state

        this.id = createUUID()
        this.createdAt = new Date()
        this.updatedAt = this.createdAt
    }

    public calculateTotalAmount(): number {
        const duration = this.endDate.getTime() - this.startDate.getTime()
        const resolvedDurationInHours = TimeUnits.convertTimeDurationToParts(duration, "millisecond", "hour").hour!

        if (resolvedDurationInHours <= 24) return 24 * this.vehicle.hourlyRentalRate * (1 + this.tax)
        else return resolvedDurationInHours * this.vehicle.hourlyRentalRate * (1 + this.tax)
    }

    static validateRentalId(id: string): id is RentalModel["id"] {
        return validateUUID(id)
    }
}
