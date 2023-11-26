import { prisma } from "@/libs/prisma.ts"

import { ModelProps } from "@/interfaces/model.ts"
import { Repository, RepositoryQuery } from "@/interfaces/repository.ts"
import { VehicleModel, VehicleProps } from "@/models/vehicle/vehicle.ts"

export interface VehicleRepositoryInput extends Omit<VehicleProps, keyof ModelProps> {}
export interface VehicleRepositoryOutput extends VehicleModel {}

export interface VehicleRepositoryInterface<Output extends VehicleRepositoryOutput, Input extends VehicleRepositoryInput = Output>
    extends Repository<Output> {
    findByPlate(plate: Input["plate"]): Promise<Output | null>
    findVehiclesByType(type: Input["type"]): Promise<Output[]>
    findAvailableVehiclesByType(type: Input["type"]): Promise<Output[]>
    findAvailableVehiclesByBrand(brand: Input["brand"]): Promise<Output[]>
    findAvailableVehiclesByFilters(filters: RepositoryQuery<Output>["filters"]): Promise<Output[]>
    findRentedVehiclesByFilters(filters: RepositoryQuery<Output>["filters"]): Promise<Output[]>
}

class VehicleRepository<
    Output extends VehicleRepositoryOutput = VehicleRepositoryOutput,
    Input extends VehicleRepositoryInput = VehicleRepositoryInput,
> implements VehicleRepositoryInterface<Output, Input>
{
    public async create(data: Required<Output>): Promise<void> {
        await prisma.vehicle.create({
            data: {
                id: data.id,
                plate: data.plate,
                type: data.type,
                brand: data.brand,
                model: data.model,
                manufacturingYear: data.manufacturingYear,
                color: data.color,
                available: data.available === true,
                hourlyRentalRate: data.hourlyRentalRate,
                popularity: data.popularity || 0,
            },
        })
    }

    public async findAll(): Promise<Output[]> {
        const vehicles = await prisma.vehicle.findMany()

        // TODO:
        // change lines like below to use a private method
        // that converts database return format data to `Output` format explicitly
        return vehicles as Output[]
    }

    public async findById(id: Output["id"]): Promise<Output | null> {
        const vehicle = await prisma.vehicle.findUnique({
            where: {
                id: id.toString(),
            },
        })

        if (vehicle != null) return vehicle as Output
        else return null
    }

    public async findOne(filters: Partial<Output>): Promise<Output | null> {
        const vehicle = await prisma.vehicle.findFirst({
            where: filters,
        })

        if (vehicle) return vehicle as Output
        else return null
    }

    public async update(id: Output["id"], data: Partial<Output>): Promise<void> {
        await prisma.vehicle.update({
            where: {
                id: id.toString(),
            },
            data,
        })
    }

    public async updateMany(filters: RepositoryQuery<Output>["filters"], data: Partial<Output>): Promise<number> {
        const updatedVehiclesInfo = await prisma.vehicle.updateMany({
            where: filters,
            data,
        })

        return updatedVehiclesInfo.count
    }

    public async remove(id: Output["id"]): Promise<boolean> {
        const removedVehicle = await prisma.vehicle.delete({
            where: {
                id,
            },
        })

        if (removedVehicle) return true
        else return false
    }

    public async removeMany(filters: RepositoryQuery<Output>["filters"]): Promise<number> {
        const removedVehiclesInfo = await prisma.vehicle.deleteMany({
            where: filters,
        })

        return removedVehiclesInfo.count
    }

    public async count(filters: RepositoryQuery<Output>["filters"]): Promise<number> {
        const counter = await prisma.vehicle.count({
            where: filters,
        })

        return counter
    }

    public async findByPlate(plate: string): Promise<Output | null> {
        const vehicle = await prisma.vehicle.findUnique({
            where: {
                plate,
            },
        })

        if (vehicle) return vehicle as unknown as Output
        else return null
    }

    public async findVehiclesByType(type: Input["type"]): Promise<Output[]> {
        const availableVehiclesByType = await prisma.vehicle.findMany({
            where: {
                type: type,
                available: true,
            },
            orderBy: {
                popularity: "desc",
            },
        })

        return availableVehiclesByType as Output[]
    }

    async findAvailableVehiclesByType(type: Output["type"]): Promise<Output[]> {
        const availableVehiclesByType = await prisma.vehicle.findMany({
            where: {
                type: type,
                available: true,
            },
            orderBy: {
                popularity: "desc",
            },
        })

        return availableVehiclesByType as Output[]
    }
    public async findAvailableVehiclesByBrand(brand: Output["brand"]): Promise<Output[]> {
        const availableVehiclesByBrand = await prisma.vehicle.findMany({
            where: {
                brand,
                available: true,
            },
            orderBy: {
                popularity: "desc",
            },
        })

        return availableVehiclesByBrand as Output[]
    }

    public async findAvailableVehiclesByFilters(filters: RepositoryQuery<Output>["filters"]): Promise<Output[]> {
        const filterOptions = {
            ...filters,
            available: true,
        }

        const availableVehiclesByFilters = await prisma.vehicle.findMany({
            where: filterOptions,
            orderBy: {
                popularity: "desc",
            },
        })

        return availableVehiclesByFilters as Output[]
    }

    public async findRentedVehiclesByFilters(filters: RepositoryQuery<Output>["filters"]): Promise<Output[]> {
        const filterOptions = {
            ...filters,
            available: false,
        }

        const rentedVehiclesByFilters = await prisma.vehicle.findMany({
            where: filterOptions,
            orderBy: {
                popularity: "desc",
            },
        })

        return rentedVehiclesByFilters as Output[]
    }
}

const vehicleRepository = new VehicleRepository()

export { vehicleRepository }
