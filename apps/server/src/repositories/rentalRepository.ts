import { prisma } from "@/libs/prisma.ts"

import { ModelProps } from "@/interfaces/model.ts"
import { Repository, RepositoryQuery } from "@/interfaces/repository.ts"
import { RentalModel, RentalProps } from "@/models/rental/rental.ts"

export interface RentalRepositoryInput extends Omit<RentalProps, keyof ModelProps> {}
export interface RentalRepositoryOutput extends RentalModel {}

export interface RentalRepositoryInterface<Output extends RentalRepositoryOutput, Input extends RentalRepositoryInput = Output>
    extends Repository<Output> {
    findRentalsByCustomerId(customerId: Output["customer"]["id"]): Promise<Output[]>
    findLastRentalsByCustomerId(customerId: Output["customer"]["id"]): Promise<Output | null>
    findActiveRentalsByCustomerId(customerId: Output["customer"]["id"]): Promise<Output[]>
}

class RentalRepository<Output extends RentalRepositoryOutput = RentalRepositoryOutput, Input extends RentalRepositoryInput = RentalRepositoryInput>
    implements RentalRepositoryInterface<Output, Input>
{
    public async create(data: Required<Output>): Promise<void> {
        await prisma.rental.create({
            data: {
                id: data.id,
                startDate: data.startDate,
                endDate: data.endDate,
                customerId: data.customer.id,
                vehicleId: data.vehicle.id,
                state: data.state,
                amount: data.calculateTotalAmount(),
            },
        })
    }
    public async findAll(): Promise<Output[]> {
        const rentals = await prisma.rental.findMany()

        // TODO:
        // change lines like below to use a private method
        // that converts database return format data to `Output` format explicitly
        return rentals as Output[]
    }

    public async findById(id: Output["id"]): Promise<Output | null> {
        const rental = await prisma.rental.findUnique({
            where: {
                id: id.toString(),
            },
        })

        if (rental != null) return rental as Output
        else return null
    }

    public async findOne(filters: RepositoryQuery<Output>["filters"]): Promise<Output | null> {
        const rental = await prisma.rental.findFirst({
            where: filters,
        })

        if (rental) return rental as Output
        else return null
    }

    public async update(id: Output["id"], data: Partial<Output>): Promise<void> {
        await prisma.rental.update({
            where: {
                id: id.toString(),
            },
            data,
        })
    }

    public async updateMany(filters: RepositoryQuery<Output>["filters"], data: Partial<Output>): Promise<number> {
        const updatedRentals = await prisma.rental.updateMany({
            where: filters,
            data,
        })

        return updatedRentals.count
    }

    public async remove(id: Output["id"]): Promise<boolean> {
        await prisma.rental.delete({
            where: {
                id,
            },
        })

        return true
    }

    public async removeMany(filters: RepositoryQuery<Output>["filters"]): Promise<number> {
        const removedRentals = await prisma.rental.deleteMany({
            where: filters,
        })

        return removedRentals.count
    }

    public async count(filters: RepositoryQuery<Output>["filters"]): Promise<number> {
        const rentals = await prisma.rental.count({
            where: filters,
        })

        return rentals
    }

    //// ADDITIONAL METHODS ////

    public async findRentalsByCustomerId(customerId: Output["customer"]["id"]): Promise<Output[]> {
        const customerRentals = await prisma.rental.findMany({
            where: {
                customerId,
            },
        })

        return customerRentals as Output[]
    }

    public async findLastRentalsByCustomerId(customerId: Output["customer"]["id"]): Promise<Output | null> {
        const lastCustomerRental = await prisma.rental.findFirst({
            where: {
                customerId: customerId,
            },
            take: 1,
            orderBy: {
                endDate: "desc",
            },
        })

        if (lastCustomerRental) return lastCustomerRental as Output
        else return null
    }

    public async findActiveRentalsByCustomerId(customerId: Output["customer"]["id"]): Promise<Output[]> {
        const customerActiveRentals = await prisma.rental.findMany({
            where: {
                customerId,
                state: "active",
            },
        })

        return customerActiveRentals as Output[]
    }
}

const rentalRepository = new RentalRepository()

export { rentalRepository }
