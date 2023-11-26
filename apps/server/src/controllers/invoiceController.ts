import { FastifyReply, FastifyRequest } from "fastify"
import { StatusCodes } from "http-status-codes"

import { System } from "@/models/system/system.ts"

export class InvoiceController {
    public static async showCustomerInvoices(request: FastifyRequest, response: FastifyReply) {
        const { customer } = request.injected
        const data = await System.getInstance().showCustomerInvoices(customer.cpf)

        return response.status(StatusCodes.OK).send(data)
    }
}
