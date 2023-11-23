import { Repository } from "@/interfaces/repository.ts"
import { prisma } from "@/libs/prisma.ts"
import { CustomerModel } from "@/models/customer.ts"
import { UUID } from "@/utils/id.ts"

export interface CustomerRepositoryInterface<Model extends CustomerModel> extends Repository<Model> {}

class CustomerRepository implements CustomerRepositoryInterface<CustomerModel> {
    async create(data: CustomerModel): Promise<void> {
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

        if (customer !== null) return customer as CustomerModel
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
        const { count } = await prisma.customer.updateMany({
            where: filters,
            data,
        })

        return count
    }

    async remove(id: UUID): Promise<boolean> {
        const deletedCustomer = await prisma.customer.delete({
            where: {
                id,
            },
        })

        if (deletedCustomer) return true
        else return false
    }

    async removeMany(filters: Partial<CustomerModel>): Promise<number> {
        const { count } = await prisma.customer.deleteMany({
            where: filters,
        })

        return count
    }

    async count(filters: Partial<CustomerModel>): Promise<number> {
        const counter = await prisma.customer.count({
            where: filters,
        })

        return counter
    }
}

const customerRepository = new CustomerRepository()

export { customerRepository }
