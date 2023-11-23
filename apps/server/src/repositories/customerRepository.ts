import { Repository } from "@/interfaces/repository.ts"
import { prisma } from "@/libs/prisma.ts"
import { CustomerModel } from "@/models/customer.ts"
import { UUID } from "@/utils/id.ts"

class CustomerRepository implements Repository<CustomerModel> {
    async create(data: CustomerModel): Promise<UUID | undefined> {
        await prisma.customer.create({
            data: {
                id: data.id,
                name: data.name,
                email: data.email,
                cpf: data.cpf,
                licenseType: data.licenseType,
                birthDate: data.birthDate,
                gender: data.gender,
                points: data.points,
            },
        })
    }
    findAll(): Promise<CustomerModel[]> {
        throw new Error("Method not implemented.")
    }
    findById(id: UUID): Promise<CustomerModel | null> {
        throw new Error("Method not implemented.")
    }
    findOne(filters: Partial<CustomerModel>): Promise<CustomerModel | null> {
        throw new Error("Method not implemented.")
    }
    update(id: UUID, data: Partial<CustomerModel>): Promise<void> {
        throw new Error("Method not implemented.")
    }
    updateMany(filters: Partial<CustomerModel>, data: Partial<CustomerModel>): Promise<number> {
        throw new Error("Method not implemented.")
    }
    delete(id: UUID): Promise<boolean> {
        throw new Error("Method not implemented.")
    }
    deleteMany(filters: Partial<CustomerModel>): Promise<number> {
        throw new Error("Method not implemented.")
    }
    count(filters: Partial<CustomerModel>): Promise<number> {
        throw new Error("Method not implemented.")
    }
}

const customerRepository = new CustomerRepository()

export { customerRepository }
