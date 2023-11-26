import { FastifyInstance } from "fastify"

import { CustomerController } from "@/controllers/customerController.ts"
import { InvoiceController } from "@/controllers/invoiceController.ts"

export const invoiceRoutes = async (app: FastifyInstance) => {
    app.get(
        "/:cpf",
        {
            preHandler: [CustomerController.checkCpfExists],
        },
        InvoiceController.showCustomerInvoices
    )
}
