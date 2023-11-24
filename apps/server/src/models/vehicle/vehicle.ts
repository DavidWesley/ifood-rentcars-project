import { ModelProps } from "@/interfaces/model.ts"
import { UUID, createUUID, validateUUID } from "@/utils/id.ts"

export enum VehicleTypeEnum {
    CAR = "car",
    MOTORCYCLE = "motorcycle",
}

export interface BaseVehicleProps {
    plate: string
    vehicleType: VehicleTypeEnum
    brand: string
    model: string
    manufacturingYear: number
    color: string
    available: boolean
    hourlyRentalRate: number
}

export interface VehicleModelProps extends BaseVehicleProps, ModelProps {
    id: UUID
    popularity: number
}

export interface VehicleModelMethods {
    // updateHourlyRentalRate(hourlyRentalRate: number): void
    // updateAvailable(available: boolean): void
    // updatePopularity(popularity: number): void
}

export class VehicleModel implements VehicleModelProps, VehicleModelMethods {
    public readonly id: UUID
    public readonly createdAt: Date
    public updatedAt: Date

    public readonly plate: string
    public readonly vehicleType: VehicleTypeEnum
    public readonly brand: string
    public readonly model: string
    public readonly manufacturingYear: number
    public readonly color: string

    public readonly available: boolean
    public readonly popularity: number
    public readonly hourlyRentalRate: number

    constructor(props: BaseVehicleProps) {
        this.plate = props.plate
        this.vehicleType = props.vehicleType
        this.brand = props.brand
        this.model = props.model
        this.manufacturingYear = props.manufacturingYear
        this.color = props.color

        this.available = true
        this.popularity = 0
        this.hourlyRentalRate = props.hourlyRentalRate

        this.id = createUUID()
        this.createdAt = new Date()
        this.updatedAt = this.createdAt
    }

    static validateVehicleId(id: string): id is VehicleModel["id"] {
        return validateUUID(id)
    }
}
