import { faker } from "@faker-js/faker/locale/pt_BR"
import { PrismaClient, Vehicle } from "@prisma/client"

import { VEHICLES_TYPES_DATA } from "./vehicleTypes.seed"

const randomVehicleType = () => {
    return faker.helpers.arrayElement(VEHICLES_TYPES_DATA)
}

export const randomVehicleData = (): Vehicle => {
    const data: Vehicle = {
        id: faker.string.uuid(),
        plate: faker.vehicle.vrm(),
        type: randomVehicleType().type,
        brand: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        manufacturingYear: faker.date.past({ years: 6 }).getUTCFullYear(),
        color: faker.vehicle.color(),
        mass: faker.number.int({ min: 1_000, max: 2_000 }),
        available: true,
        popularity: 0,
        hourlyRentalRate: faker.number.float({ min: 50, max: 600, precision: 0.01 }),
    }

    return data
}

export async function seedVehicles(prisma: PrismaClient, quantity: number = 10) {
    console.info("[SEED] Start seeding `vehicles` records")
    await prisma.vehicle.deleteMany()
    console.info("[SEED] Deleted all previous `vehicles` records")

    const randomVehicles = Array.from({ length: quantity }, () => randomVehicleData())

    Promise.allSettled(
        randomVehicles.map((vehicle) =>
            prisma.vehicle.create({
                data: vehicle,
            })
        )
    )

        .then(() => console.info("[SEED] Successfully create `vehicles` records"))
        .catch((e) => console.error("[SEED] Failed to create `vehicles` records", e))
}
