import { ModelProps } from "@/interfaces/model.ts"
import { UUID, createUUID, validateUUID } from "@/utils/id.ts"

export enum VehicleTypeEnum {
    CAR = "car",
    MOTORCYCLE = "motorcycle",
    TRUCK = "truck",
    BUS = "bus",
    TRAILER = "trailer",
    MOTORHOME = "motorhome",
}

export interface BaseVehicleProps extends Partial<ModelProps> {
    plate: string
    type: VehicleTypeEnum
    brand: string
    model: string
    manufacturingYear: number
    color: string

    hourlyRentalRate: number
    available?: boolean
    popularity?: number
}

export interface VehicleProps extends BaseVehicleProps {
    id: UUID
}

export interface VehicleModelMethods {
    // updateHourlyRentalRate(hourlyRentalRate: number): void
    // updateAvailable(available: boolean): void
    // updatePopularity(popularity: number): void
}

export class VehicleModel implements VehicleProps, VehicleModelMethods {
    public readonly id: UUID
    public readonly createdAt: Date
    public updatedAt: Date

    public readonly plate: string
    public readonly type: VehicleTypeEnum
    public readonly brand: string
    public readonly model: string
    public readonly manufacturingYear: number
    public readonly color: string

    public readonly available: boolean
    public readonly popularity: number
    public readonly hourlyRentalRate: number

    constructor(props: BaseVehicleProps) {
        if (typeof props.id !== "string") this.id = createUUID()
        else if (VehicleModel.validateVehicleId(props.id)) this.id = props.id
        else throw new Error("Invalid Vehicle Id")

        this.plate = props.plate
        this.type = props.type
        this.brand = props.brand
        this.model = props.model
        this.manufacturingYear = props.manufacturingYear
        this.color = props.color

        this.available = props.available ?? true
        this.popularity = props.popularity ?? 0
        this.hourlyRentalRate = props.hourlyRentalRate

        this.createdAt = props.createdAt ?? new Date()
        this.updatedAt = props.updatedAt ?? this.createdAt
    }

    isAvailable(): boolean {
        return this.available === true
    }

    static validateVehicleId(id: string): id is VehicleModel["id"] {
        return validateUUID(id)
    }
}
