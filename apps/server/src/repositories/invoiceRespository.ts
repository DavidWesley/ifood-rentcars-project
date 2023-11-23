import { Repository } from "@/interfaces/repository.ts"
import { prisma } from "@/libs/prisma.ts"
import { InvoiceModel } from "@/models/invoice.ts"
import { UUID } from "@/utils/id.ts"

class InvoiceRepository implements Repository<InvoiceModel> {
    async create(data: InvoiceModel): Promise<void> {
        return await prisma.invoice.create({
            data: {
                id: data.id,
                customer: data.customer,
                rentals: data.rentals,
                state: data.state,
                expiresAt: data.expiresAt,
            },
        })
    }
    async findAll(): Promise<InvoiceModel[]> {
        const invoices = await prisma.invoice.findMany()

        return invoices as InvoiceModel[]
    }

    async findById(id: UUID): Promise<InvoiceModel | null> {
        const invoice = await prisma.invoice.findUnique({
            where: {
                id: id.toString(),
            },
        })

        if (invoice != null) return invoice as InvoiceModel
        else return null
    }

    async findOne(filters: Partial<InvoiceModel>): Promise<InvoiceModel | null> {
        const invoice = await prisma.invoice.findFirst({
            where: filters,
        })

        if (invoice) return invoice as InvoiceModel
        else return null
    }

    async update(id: UUID, data: Partial<InvoiceModel>): Promise<void> {
        await prisma.invoice.update({
            where: {
                id: id.toString(),
            },
            data,
        })
    }

    async updateMany(filters: Partial<InvoiceModel>, data: Partial<InvoiceModel>): Promise<number> {
        const invoices = await prisma.invoice
            .updateMany({
                where: filters,
                data,
            })
            .count()

        return invoices
    }

    async delete(id: UUID): Promise<boolean> {
        await prisma.invoice.delete({
            where: {
                id,
            },
        })
        return true
    }

    async deleteMany(filters: Partial<InvoiceModel>): Promise<number> {
        const invoices = await prisma.invoice
            .deleteMany({
                where: filters,
            })
            .count()

        return invoices
    }

    async count(filters: Partial<InvoiceModel>): Promise<number> {
        const invoices = await prisma.invoice.count({
            where: filters,
        })

        return invoices
    }
}

const invoiceRepository = new InvoiceRepository()

export { invoiceRepository }
