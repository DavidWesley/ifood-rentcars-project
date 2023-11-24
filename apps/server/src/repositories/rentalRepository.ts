import { Repository } from "@/interfaces/repository.ts"
import { prisma } from "@/libs/prisma.ts"
import { CustomerModel } from "@/models/customer/customer.ts"
import { RentalModel } from "@/models/rental/rental.ts"
import { VehicleModel } from "@/models/vehicle/vehicle.ts"
import { UUID } from "@/utils/id.ts"

export interface RentalRepositoryInterface<Model extends RentalModel> extends Repository<Model> {
    findVehiclesRentalsById(vehicleId: UUID): Promise<RentalModel[]>
    findVehiclesRentalsByCustomerId(customerId: CustomerModel["id"]): Promise<RentalModel[]>
    findLastVehicleRentalsByCustomerId(customerId: CustomerModel["id"]): Promise<RentalModel | null>
}

class RentalRepository implements RentalRepositoryInterface<RentalModel> {
    async create(data: RentalModel): Promise<void> {
        await prisma.rental.create({
            data: {
                id: data.id,
                customerId: data.costumer.id,
                vehicleId: data.vehicle.id,
                startDate: data.startDate,
                endDate: data.endDate,
                totalAmount: data.calculateTotalAmount(),
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
        const updatedRentals = await prisma.rental.updateMany({
            where: filters,
            data,
        })

        return updatedRentals.count
    }

    async remove(id: UUID): Promise<boolean> {
        await prisma.rental.delete({
            where: {
                id,
            },
        })

        return true
    }

    async removeMany(filters: Partial<RentalModel>): Promise<number> {
        const removedRentals = await prisma.rental.deleteMany({
            where: filters,
        })

        return removedRentals.count
    }

    async count(filters: Partial<RentalModel>): Promise<number> {
        const rentals = await prisma.rental.count({
            where: filters,
        })

        return rentals
    }

    //// ADDITIONAL METHODS ////

    async findVehiclesRentalsById(vehicleId: VehicleModel["id"]): Promise<RentalModel[]> {
        const vehicleRentals = await prisma.rental.findMany({
            where: {
                vehicleId,
            },
            orderBy: {
                endDate: "desc",
            },
        })

        if (vehicleRentals) return vehicleRentals as RentalModel[]
        else return []
    }

    async findVehiclesRentalsByCustomerId(customerId: CustomerModel["id"]): Promise<RentalModel[]> {
        const customerRentals = await prisma.rental.findMany({
            where: {
                customerId,
            },
        })

        return customerRentals as RentalModel[]
    }

    async findLastVehicleRentalsByCustomerId(customerId: CustomerModel["id"]): Promise<RentalModel | null> {
        const lastCustomerRental = await prisma.rental.findFirst({
            where: {
                customerId: customerId,
            },
            take: 1,
            orderBy: {
                endDate: "desc",
            },
        })

        if (lastCustomerRental) return lastCustomerRental as RentalModel
        else return null
    }
}

const rentalRepository = new RentalRepository()

export { rentalRepository }
