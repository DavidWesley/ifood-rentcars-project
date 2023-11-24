import { Repository } from "@/interfaces/repository.ts"
import { prisma } from "@/libs/prisma.ts"
import { VehicleModel } from "@/models/vehicle.ts"
import { UUID } from "@/utils/id.ts"

export interface VehicleRepositoryInterface<Model extends VehicleModel> extends Repository<Model> {}

class VehicleRepository implements VehicleRepositoryInterface<VehicleModel> {
    async create(data: VehicleModel): Promise<void> {
        await prisma.vehicle.create({
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
                popularity: data.popularity,
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
        const updatedVehiclesInfo = await prisma.vehicle.updateMany({
            where: filters,
            data,
        })

        return updatedVehiclesInfo.count
    }

    async remove(id: UUID): Promise<boolean> {
        const removedVehicle = await prisma.vehicle.delete({
            where: {
                id,
            },
        })

        if (removedVehicle) return true
        else return false
    }

    async removeMany(filters: Partial<VehicleModel>): Promise<number> {
        const removedVehiclesInfo = await prisma.vehicle.deleteMany({
            where: filters,
        })

        return removedVehiclesInfo.count
    }

    async count(filters: Partial<VehicleModel>): Promise<number> {
        const counter = await prisma.vehicle.count({
            where: filters,
        })

        return counter
    }
}

const vehicleRepository = new VehicleRepository()

export { vehicleRepository }
