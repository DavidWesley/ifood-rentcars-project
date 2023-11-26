import { FastifyInstance } from "fastify"

import { RentalController } from "@/controllers/rentalController.ts"

export const rentalRoutes = async (app: FastifyInstance) => {
    app.get("/", RentalController.getAll)
    app.get("/:id", RentalController.getById)

    // Não sei se passar o CPF como parâmetro da rota é adequado
    // Talvez fizesse mais sentido passar um token
    // contendo alguma informação sobre o id do usuário e validar isso
    app.get("/customer/:cpf", RentalController.getByCustomer)

    app.post("/rent", RentalController.create)
    app.post("/return", RentalController.return)
    app.post("/cancel/:id", RentalController.cancel)

    app.put("/:id", RentalController.update)
}
