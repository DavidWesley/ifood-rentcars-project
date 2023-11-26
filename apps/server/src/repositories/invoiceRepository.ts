import { prisma } from "@/libs/prisma.ts"

import { ModelProps } from "@/interfaces/model.ts"
import { Repository, RepositoryQuery } from "@/interfaces/repository.ts"
import { InvoiceModel, InvoiceProps } from "@/models/invoice/invoice.ts"

export interface InvoiceRepositoryInput extends Omit<InvoiceProps, keyof ModelProps> {}
export interface InvoiceRepositoryOutput extends InvoiceModel {}
export interface InvoiceRepositoryInterface<Output extends InvoiceRepositoryOutput, Input extends InvoiceRepositoryInput = Output>
    extends Repository<Output> {
    findInvoicesByCustomerId(customerId: Output["customer"]["id"]): Promise<Output[]>
    findLastOpenedInvoicesByCustomerId(customerId: Output["customer"]["id"]): Promise<Output | null>
}

class InvoiceRepository<
    Output extends InvoiceRepositoryOutput = InvoiceRepositoryOutput,
    Input extends InvoiceRepositoryInput = InvoiceRepositoryInput,
> implements InvoiceRepositoryInterface<Output, Input>
{
    public async create(data: Required<Output>): Promise<void> {
        await prisma.invoice.create({
            data: {
                id: data.id,
                state: data.state,
                expiresAt: data.expiresAt,
                customerId: data.customer.id,
                rentals: {
                    connect: data.rentals.map((rental) => ({
                        id: rental.id,
                    })),
                },
            },
        })
    }

    public async findAll(): Promise<Output[]> {
        const invoices = await prisma.invoice.findMany()

        // TODO:
        // change lines like below to use a private method
        // that converts database return format data to `Output` format explicitly
        return invoices as Output[]
    }

    public async findById(id: Output["id"]): Promise<Output | null> {
        const invoice = await prisma.invoice.findUnique({
            where: {
                id: id,
            },
        })

        if (invoice !== null) return invoice as Output
        else return null
    }

    public async findOne(filters: RepositoryQuery<Output>["filters"]): Promise<Output | null> {
        const invoice = await prisma.invoice.findFirst({
            where: filters,
        })

        if (invoice) return invoice as Output
        else return null
    }

    public async update(id: Output["id"], data: Partial<Output>): Promise<void> {
        await prisma.invoice.update({
            where: {
                id: id,
            },
            data,
        })
    }

    public async updateMany(filters: RepositoryQuery<Output>["filters"], data: Partial<Output>): Promise<number> {
        const invoices = await prisma.invoice.updateMany({
            where: filters,
            data,
        })

        return invoices.count
    }

    public async remove(id: Output["id"]): Promise<boolean> {
        await prisma.invoice.delete({
            where: {
                id,
            },
        })
        return true
    }

    public async removeMany(filters: RepositoryQuery<Output>["filters"]): Promise<number> {
        const invoices = await prisma.invoice.deleteMany({
            where: filters,
        })

        return invoices.count
    }

    public async count(filters: RepositoryQuery<Output>["filters"]): Promise<number> {
        const counter = await prisma.invoice.count({
            where: filters,
        })

        return counter
    }

    //// ADDITIONAL METHODS ////
    public async findInvoicesByCustomerId(customerId: Output["customer"]["id"]): Promise<Output[]> {
        const customerInvoices = await prisma.invoice.findMany({
            where: {
                customerId: customerId,
            },
            orderBy: {
                createdAt: "desc",
            },
        })

        return customerInvoices as Output[]
    }

    public async findLastOpenedInvoicesByCustomerId(customerId: Output["customer"]["id"]): Promise<Output | null> {
        const invoice = await prisma.invoice.findMany({
            where: {
                customerId: customerId,
                state: "opened",
            },
            orderBy: {
                createdAt: "desc",
            },
        })

        if (invoice) return invoice as InvoiceModel
        else return null
    }
}

const invoiceRepository = new InvoiceRepository()

export { invoiceRepository }
