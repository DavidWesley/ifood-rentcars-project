import { prisma } from "@/libs/prisma.ts"

import { ModelProps } from "@/interfaces/model.ts"
import { Repository, RepositoryQuery } from "@/interfaces/repository.ts"
import { CustomerModel, CustomerProps } from "@/models/customer/customer.ts"

export interface CustomerRepositoryInput extends Omit<CustomerProps, keyof ModelProps> {}
export interface CustomerRepositoryOutput extends CustomerModel {}

export interface CustomerRepositoryInterface<Output extends CustomerRepositoryOutput, Input extends CustomerRepositoryInput = Output>
    extends Repository<Output> {
    findByCPF(cpf: Output["cpf"]): Promise<Output | null>
}

class CustomerRepository<
    Output extends CustomerRepositoryOutput = CustomerRepositoryOutput,
    Input extends CustomerRepositoryInput = CustomerRepositoryInput,
> implements CustomerRepositoryInterface<Output, Input>
{
    public async create(data: Required<Output>): Promise<void> {
        await prisma.customer.create({
            data: {
                id: data.id,
                name: data.name,
                email: data.email,
                cpf: data.cpf,
                license: data.license,
                birthDate: data.birthDate,
                gender: data.gender,
                points: data.points,
            },
        })
    }

    public async findAll(): Promise<Output[]> {
        const customers = await prisma.customer.findMany()

        // TODO:
        // change lines like below to use a private method
        // that converts database return format data to `Output` format explicitly
        return customers as Output[]
    }

    public async findById(id: Output["id"]): Promise<Output | null> {
        const customer = await prisma.customer.findUnique({
            where: {
                id: id.toString(),
            },
        })

        if (customer !== null) return customer as Output
        else return null
    }

    public async findOne(filters: RepositoryQuery<Output>["filters"]): Promise<Output | null> {
        const customer = await prisma.customer.findFirst({
            where: filters,
        })

        if (customer) return customer as Output
        else return null
    }

    public async update(id: Output["id"], data: Partial<Output>): Promise<void> {
        await prisma.customer.update({
            where: {
                id: id.toString(),
            },
            data,
        })
    }

    public async updateMany(filters: RepositoryQuery<Output>["filters"], data: Partial<Output>): Promise<number> {
        const { count } = await prisma.customer.updateMany({
            where: filters,
            data,
        })

        return count
    }

    public async remove(id: Output["id"]): Promise<boolean> {
        const deletedCustomer = await prisma.customer.delete({
            where: {
                id,
            },
        })

        if (deletedCustomer) return true
        else return false
    }

    public async removeMany(filters: RepositoryQuery<Output>["filters"]): Promise<number> {
        const { count } = await prisma.customer.deleteMany({
            where: filters,
        })

        return count
    }

    public async count(filters: RepositoryQuery<Output>["filters"]): Promise<number> {
        const counter = await prisma.customer.count({
            where: filters,
        })

        return counter
    }

    //// ADDITIONAL METHODS ////

    public async findByCPF(cpf: Output["cpf"]): Promise<Output | null> {
        const customer = await prisma.customer.findFirst({
            where: {
                cpf: cpf,
            },
        })

        if (customer !== null) return customer as Output
        else return null
    }
}

const customerRepository = new CustomerRepository()

export { customerRepository }
