import { System } from "@/models/system/system.ts"
import { FastifyReply, FastifyRequest } from "fastify"
import { StatusCodes } from "http-status-codes"

// TODO: Implementar as funcionalidades devidamente para essa controller
export class VehicleController {
    public static async getVehicles(request: FastifyRequest, response: FastifyReply) {
        const data = await System.getInstance().listAllVehicles()
        return response.status(StatusCodes.OK).send(data)
    }

    public static async getAvailableVehicles(request: FastifyRequest, response: FastifyReply) {
        const data = await System.getInstance().listAvailableVehicles()
        return response.status(StatusCodes.OK).send(data)
    }

    public static async getRentedVehicles(request: FastifyRequest, response: FastifyReply) {
        const data = await System.getInstance().listRentedVehicles()
        return response.status(StatusCodes.OK).send(data)
    }

    public static async createVehicle(request: FastifyRequest, response: FastifyReply) {
        await System.getInstance().addVehicle(request.body)
        return response.status(StatusCodes.CREATED)
    }
}
