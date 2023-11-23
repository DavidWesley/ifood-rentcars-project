import { Repository } from "@/interfaces/repository.ts"
import { prisma } from "@/libs/prisma.ts"
import { CustomerModel } from "@/models/customer.ts"
import { UUID } from "@/utils/id.ts"

class CustomerRepository implements Repository<CustomerModel> {
    async create(data: CustomerModel): Promise<void> {
        return await prisma.customer.create({
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
    async findAll(): Promise<CustomerModel[]> {
        const customers = await prisma.customer.findMany()

        return customers as CustomerModel[]
    }

    async findById(id: UUID): Promise<CustomerModel | null> {
        const customer = await prisma.customer.findUnique({
            where: {
                id: id.toString(),
            },
        })

        if (customer != null) return customer as CustomerModel
        else return null
    }

    async findOne(filters: Partial<CustomerModel>): Promise<CustomerModel | null> {
        const customer = await prisma.customer.findFirst({
            where: filters,
        })

        if (customer) return customer as CustomerModel
        else return null
    }

    async update(id: UUID, data: Partial<CustomerModel>): Promise<void> {
        await prisma.customer.update({
            where: {
                id: id.toString(),
            },
            data,
        })
    }

    async updateMany(filters: Partial<CustomerModel>, data: Partial<CustomerModel>): Promise<number> {
        const customers = await prisma.customer
            .updateMany({
                where: filters,
                data,
            })
            .count()

        return customers
    }

    async delete(id: UUID): Promise<boolean> {
        await prisma.customer.delete({
            where: {
                id,
            },
        })
        return true
    }

    async deleteMany(filters: Partial<CustomerModel>): Promise<number> {
        const customers = await prisma.customer
            .deleteMany({
                where: filters,
            })
            .count()

        return customers
    }

    async count(filters: Partial<CustomerModel>): Promise<number> {
        const customers = await prisma.customer.count({
            where: filters,
        })

        return customers
    }
}

const customerRepository = new CustomerRepository()

export { customerRepository }
