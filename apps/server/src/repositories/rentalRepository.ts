import { Repository } from "@/interfaces/repository.ts"
import { prisma } from "@/libs/prisma.ts"
import { RentalModel } from "@/models/rental.ts"
import { UUID } from "@/utils/id.ts"

class RentalRepository implements Repository<RentalModel> {
    async create(data: RentalModel): Promise<void> {
        return await prisma.rental.create({
            data: {
                id: data.id,
                costumer: data.costumer,
                vehicle: data.vehicle,
                startDate: data.startDate,
                endDate: data.endDate,
            },
        })
    }
    async findAll(): Promise<RentalModel[]> {
        const rentals = await prisma.rental.findMany()

        return rentals as RentalModel[]
    }

    async findById(id: UUID): Promise<RentalModel | null> {
        const rental = await prisma.rental.findUnique({
            where: {
                id: id.toString(),
            },
        })

        if (rental != null) return rental as RentalModel
        else return null
    }

    async findOne(filters: Partial<RentalModel>): Promise<RentalModel | null> {
        const rental = await prisma.rental.findFirst({
            where: filters,
        })

        if (rental) return rental as RentalModel
        else return null
    }

    async update(id: UUID, data: Partial<RentalModel>): Promise<void> {
        await prisma.rental.update({
            where: {
                id: id.toString(),
            },
            data,
        })
    }

    async updateMany(filters: Partial<RentalModel>, data: Partial<RentalModel>): Promise<number> {
        const rentals = await prisma.rental
            .updateMany({
                where: filters,
                data,
            })
            .count()

        return rentals
    }

    async delete(id: UUID): Promise<boolean> {
        await prisma.rental.delete({
            where: {
                id,
            },
        })
        return true
    }

    async deleteMany(filters: Partial<RentalModel>): Promise<number> {
        const rentals = await prisma.rental
            .deleteMany({
                where: filters,
            })
            .count()

        return rentals
    }

    async count(filters: Partial<RentalModel>): Promise<number> {
        const rentals = await prisma.rental.count({
            where: filters,
        })

        return rentals
    }
}

const rentalRepository = new RentalRepository()

export { rentalRepository }
