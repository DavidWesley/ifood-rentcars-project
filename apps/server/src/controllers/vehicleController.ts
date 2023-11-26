import { FastifyReply, FastifyRequest } from "fastify"
import { StatusCodes } from "http-status-codes"

import { System } from "@/models/system/system.ts"
import { VehicleTypeEnum } from "@/models/vehicle/vehicle.ts"
import { vehicleRepository } from "@/repositories/vehicleRepository.ts"

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

    public static async getAvailableCars(request: FastifyRequest, response: FastifyReply) {
        // const data = await CarsRentalSystem.getInstance().listAvailableCars()
        const data = await vehicleRepository.findAvailableVehiclesByType(VehicleTypeEnum.CAR)
        return response.status(StatusCodes.OK).send(data)
    }

    public static async getAvailableMotorcycles(request: FastifyRequest, response: FastifyReply) {
        // const data = await MotorcyclesRentalSystem.getInstance().listAvailableMotorcycles()
        const data = await vehicleRepository.findAvailableVehiclesByType(VehicleTypeEnum.MOTORCYCLE)
        return response.status(StatusCodes.OK).send(data)
    }

    public static async getAvailableBuses(request: FastifyRequest, response: FastifyReply) {
        // const data = await BusesRentalSystem.getInstance().listAvailableBuses()
        const data = await vehicleRepository.findAvailableVehiclesByType(VehicleTypeEnum.BUS)
        return response.status(StatusCodes.OK).send(data)
    }

    public static async getRentedVehicles(request: FastifyRequest, response: FastifyReply) {
        const data = await System.getInstance().listRentedVehicles()
        return response.status(StatusCodes.OK).send(data)
    }

    public static async createVehicle(request: FastifyRequest, response: FastifyReply) {
        const vehicleData = request.body.vehicle

        try {
            await System.getInstance().addVehicle(vehicleData)
        } catch (err) {
            if (err instanceof Error) return response.status(StatusCodes.CONFLICT).send({ message: err.message })
        }

        return response.status(StatusCodes.CREATED).send()
    }

    public static async excludeVehicle(request: FastifyRequest, response: FastifyReply) {
        const { plate } = request.params

        try {
            await System.getInstance().removeVehicle(plate)
        } catch (err) {
            // TODO:
            // Melhorar quais instâncias de erros podem ocorrer
            if (err instanceof Error) return response.status(StatusCodes.CONFLICT).send({ message: err.message })
        }

        return response.status(StatusCodes.NO_CONTENT).send()
    }
}
