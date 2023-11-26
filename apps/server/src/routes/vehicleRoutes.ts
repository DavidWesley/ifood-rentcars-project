import { FastifyInstance } from "fastify"

import { VehicleController } from "@/controllers/vehicleController.ts"

export const vehicleRoutes = async (app: FastifyInstance) => {
    app.get("/", VehicleController.getVehicles)
    app.post("/", VehicleController.createVehicle)
    app.get("/available", VehicleController.getAvailableVehicles)
    app.get("/rented", VehicleController.getRentedVehicles)
    app.delete("/:plate", VehicleController.excludeVehicle)
}
