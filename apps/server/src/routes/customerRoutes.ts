import { FastifyInstance } from "fastify"

import { CustomerController } from "@/controllers/customerController.ts"
import { RentalController } from "@/controllers/rentalController.ts"

export const customerRoutes = async (app: FastifyInstance) => {
    app.get("/", CustomerController.getCustomers)

    app.post("/", CustomerController.createCustomer)

    // LIFECYCLE
    // https://fastify.dev/docs/latest/Reference/Lifecycle/
    app.get(
        "/:cpf",
        {
            preHandler: [CustomerController.checkCpfExists],
        },
        CustomerController.getCustomerByCpf
    )

    app.put(
        "/:cpf",
        {
            preHandler: [CustomerController.checkCpfExists],
        },
        CustomerController.updateCustomer
    )

    app.delete(
        "/:cpf",
        {
            preHandler: [CustomerController.checkCpfExists],
        },
        CustomerController.removeCustomer
    )

    // Especiais
    app.get(
        "/:cpf/rentals",
        {
            preHandler: [CustomerController.checkCpfExists],
        },
        RentalController.getByCustomer
    )
}
