import { BaseVehicleProps, VehicleModel, VehicleTypeEnum } from "@/models/vehicle.ts"

export class Car extends VehicleModel {
    constructor(props: Omit<BaseVehicleProps, "vehicleType">) {
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
