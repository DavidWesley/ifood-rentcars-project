import { BaseVehicleProps, VehicleModel, VehicleTypeEnum } from "@/models/vehicle.ts"

export class MotorCycle extends VehicleModel {
    constructor(props: Omit<BaseVehicleProps, "vehicleType">) {
        super({
            available: true,
            vehicleType: VehicleTypeEnum.MOTORCYCLE,
            brand: props.brand,
            color: props.color,
            hourlyRentalRate: props.hourlyRentalRate,
            manufacturingYear: props.manufacturingYear,
            model: props.model,
            plate: props.plate,
        })
    }
}
