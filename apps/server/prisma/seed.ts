import { PrismaClient } from "@prisma/client"

import { seedCustomers } from "./seeds/customer.seed"
import { seedLicensesTypes } from "./seeds/licenseTypes.seed"
import { seedVehiclesTypes } from "./seeds/vehicleTypes.seed"
import { seedVehicles } from "./seeds/vehicles.seed"

const prisma = new PrismaClient()
const seeds = [seedLicensesTypes, seedVehiclesTypes, seedCustomers, seedVehicles]

await Promise.allSettled(seeds.map((seed) => seed(prisma)))
