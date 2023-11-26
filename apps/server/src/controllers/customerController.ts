import { FastifyReply, FastifyRequest } from "fastify"
import { StatusCodes } from "http-status-codes"

import { CustomerModel } from "@/models/customer/customer.ts"
import { System } from "@/models/system/system.ts"
import { customerRepository } from "@/repositories/customerRepository.ts"
import { validateCpf } from "@/utils/validators.ts"

export class CustomerController {
    public static async getCustomers(request: FastifyRequest, response: FastifyReply) {
        const customers = await customerRepository.findAll()
        return response.status(StatusCodes.OK).send(customers)
    }

    public static async createCustomer(request: FastifyRequest, response: FastifyReply) {
        const customerProps = request.body.customer

        if ((await customerRepository.findByCPF(customerProps.cpf)) !== null) {
            return response.status(StatusCodes.CONFLICT).send({ message: "Customer already exists" })
        }

        try {
            const customerModel = new CustomerModel(customerProps)
            await System.getInstance().addCustomer(customerModel)
        } catch (err) {
            if (err instanceof Error) return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: err.message })
        }

        return response.status(StatusCodes.CREATED).send()
    }

    public static async getCustomerByCpf(request: FastifyRequest, response: FastifyReply) {
        const { customer } = request.injected
        return response.status(StatusCodes.OK).send(customer)
    }

    public static async updateCustomer(request: FastifyRequest, response: FastifyReply) {
        const { customer } = request.injected
        const updateCustomerProps = request.body.customer

        await customerRepository.update(customer.id, updateCustomerProps)
        return response.status(StatusCodes.NO_CONTENT).send()
    }

    public static async removeCustomer(request: FastifyRequest, response: FastifyReply) {
        const { customer } = request.injected

        try {
            await System.getInstance().removeCustomer(customer.cpf)
        } catch (err) {
            // TODO:
            // Melhorar isso daqui para entender quais erros estão acontecendo,
            // se foram do código ou de validação
            if (err instanceof Error) {
                return response.status(StatusCodes.CONFLICT).send({ message: `Remoção não permitida: ${err.message}` })
            }
        }

        return response.status(StatusCodes.NO_CONTENT).send()
    }

    // Middleware
    // Talvez fosse interessante separar esses recursos em outros arquivos
    public static async checkCpfExists(request: FastifyRequest, response: FastifyReply) {
        const { cpf } = request.params

        if (validateCpf(cpf) === false) {
            return response.status(StatusCodes.BAD_REQUEST).send()
        }

        const customer = await customerRepository.findByCPF(cpf)
        if (customer === null) return response.status(StatusCodes.NOT_FOUND).send()

        request.injected = {
            customer,
        }
    }
}
