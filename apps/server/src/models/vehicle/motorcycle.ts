import { BaseVehicleProps, VehicleModel, VehicleTypeEnum } from "@/models/vehicle/vehicle.ts"

export interface BaseMotorcycleProps extends Omit<BaseVehicleProps, "vehicleType"> {}

export class Motorcycle extends VehicleModel {
    constructor(props: BaseMotorcycleProps) {
        super({
            available: true,
            type: VehicleTypeEnum.MOTORCYCLE,
            brand: props.brand,
            color: props.color,
            hourlyRentalRate: props.hourlyRentalRate,
            manufacturingYear: props.manufacturingYear,
            model: props.model,
            plate: props.plate,
        })
    }
}
