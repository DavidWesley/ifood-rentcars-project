import { System } from "@/models/system/system.ts"
import { FastifyReply, FastifyRequest } from "fastify"
import { StatusCodes } from "http-status-codes"

export class RentalController {
    public static async getAll(request: FastifyRequest, response: FastifyReply) {
        return response.status(StatusCodes.OK).send({ message: "Get all rentals" })
    }

    public static async create(request: FastifyRequest, response: FastifyReply) {
        const { customerId, vehicleId, startDate, endDate } = request.body
        try {
            await System.getInstance().rentalVehicle(vehicleId, customerId, startDate, endDate)
        } catch (e) {
            if (e instanceof Error) return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: e.message })
        }

        return response.status(StatusCodes.OK).send({ message: "Create rental" })
    }

    public static async update(request: FastifyRequest, response: FastifyReply) {
        return response.status(StatusCodes.OK).send({ message: "Update rental" })
    }

    public static async getById(request: FastifyRequest, response: FastifyReply) {
        const { id } = request.params
        return response.status(StatusCodes.OK).send({ message: `Get rental by id: ${id}` })
    }

    public static async getByCustomer(request: FastifyRequest, response: FastifyReply) {
        const { cpf } = request.params
        const { startDate, endDate } = request.query

        if (startDate && endDate) {
            // Caso de busca por intervalo de datas definidas
        } else if (startDate) {
            // Caso de busca quando somente a data de inicio for definida
        } else if (endDate) {
            // Caso de busca quando somente a data de fim for definida
        } else {
            // Retornar somente os alugueis ativos do cliente
            // No caso dessa empresa, será apenas um aluguel
            // TODO: Implementar a busca de alugueis ativos
            // const activeCustomerRentals = await System.getInstance().getActiveCustomerRentals(cpf)
            // return response.status(StatusCodes.OK).send(activeCustomerRentals)
        }

        return response.status(StatusCodes.OK).send({ message: `Get rentals by customer with cpf: ${cpf}` })
    }

    public static async return(request: FastifyRequest, response: FastifyReply) {
        const { cpf, plate } = request.params
        const today = new Date()
        await System.getInstance().returnVehicle(cpf, plate, today)
        return response.status(StatusCodes.OK).send()
    }

    public static async cancel(request: FastifyRequest, response: FastifyReply) {
        const { id } = request.params
        // await System.getInstance().cancelRental()
        return response.status(StatusCodes.OK).send({ message: `Cancel rental with id: ${id}` })
    }
}
