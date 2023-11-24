import { BaseVehicleProps, VehicleModel, VehicleTypeEnum } from "@/models/vehicle/vehicle.ts"

export interface BaseCarProps extends Omit<BaseVehicleProps, "vehicleType"> {}

export class Car extends VehicleModel {
    constructor(props: BaseCarProps) {
        super({
            available: true,
            vehicleType: VehicleTypeEnum.CAR,
            brand: props.brand,
            color: props.color,
            hourlyRentalRate: props.hourlyRentalRate,
            manufacturingYear: props.manufacturingYear,
            model: props.model,
            plate: props.plate,
        })
    }
}
