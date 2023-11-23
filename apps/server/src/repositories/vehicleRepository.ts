import { Repository } from "@/interfaces/repository.ts"
import { prisma } from "@/libs/prisma.ts"
import { VehicleModel } from "@/models/vehicle.ts"
import { UUID } from "@/utils/id.ts"

class VehicleRepository implements Repository<VehicleModel> {
    async create(data: VehicleModel): Promise<void> {
        return await prisma.vehicle.create({
            data: {
                id: data.id,
                plate: data.plate,
                vehicleType: data.vehicleType,
                brand: data.brand,
                model: data.model,
                manufacturingYear: data.manufacturingYear,
                color: data.color,
                available: data.available,
                hourlyRentalRate: data.hourlyRentalRate,
            },
        })
    }
    async findAll(): Promise<VehicleModel[]> {
        const vehicles = await prisma.vehicle.findMany()

        return vehicles as VehicleModel[]
    }

    async findById(id: UUID): Promise<VehicleModel | null> {
        const vehicle = await prisma.vehicle.findUnique({
            where: {
                id: id.toString(),
            },
        })

        if (vehicle != null) return vehicle as VehicleModel
        else return null
    }

    async findOne(filters: Partial<VehicleModel>): Promise<VehicleModel | null> {
        const vehicle = await prisma.vehicle.findFirst({
            where: filters,
        })

        if (vehicle) return vehicle as VehicleModel
        else return null
    }

    async update(id: UUID, data: Partial<VehicleModel>): Promise<void> {
        await prisma.vehicle.update({
            where: {
                id: id.toString(),
            },
            data,
        })
    }

    async updateMany(filters: Partial<VehicleModel>, data: Partial<VehicleModel>): Promise<number> {
        const vehicles = await prisma.vehicle
            .updateMany({
                where: filters,
                data,
            })
            .count()

        return vehicles
    }

    async delete(id: UUID): Promise<boolean> {
        await prisma.vehicle.delete({
            where: {
                id,
            },
        })
        return true
    }

    async deleteMany(filters: Partial<VehicleModel>): Promise<number> {
        const vehicles = await prisma.vehicle
            .deleteMany({
                where: filters,
            })
            .count()

        return vehicles
    }

    async count(filters: Partial<VehicleModel>): Promise<number> {
        const vehicles = await prisma.vehicle.count({
            where: filters,
        })

        return vehicles
    }
}

const vehicleRepository = new VehicleRepository()

export { vehicleRepository }
