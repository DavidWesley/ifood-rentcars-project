import { faker } from "@faker-js/faker/locale/pt_BR"
import { Customer, PrismaClient } from "@prisma/client"

import { LICENSES_TYPES_DATA } from "./licenseTypes.seed"

const randomCustomerLicenseType = () => {
    return faker.helpers.arrayElement(LICENSES_TYPES_DATA)
}

const randomConsistentCustomerPersonalData = () => {
    const person = faker.person

    const firstName = person.firstName()
    const lastName = person.lastName()

    faker.internet.email({ firstName, lastName })
}

export const randomCustomerData = (): Customer => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    const data: Customer = {
        id: faker.string.uuid(),
        birthDate: faker.date.birthdate({ min: 18, max: 65, mode: "age" }),
        name: faker.person.fullName({ firstName, lastName }),
        email: faker.internet.email({ firstName, lastName }).toLowerCase(),
        license: randomCustomerLicenseType().type,
        cpf: faker.string.numeric(11).toString().padStart(11, "0"),
        gender: faker.helpers.arrayElement(["male", "female", "other"]),
        points: faker.number.int({ min: 10, max: 50 }),
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    return data
}

export async function seedCustomers(prisma: PrismaClient, quantity: number = 10) {
    console.info("[SEED] Start seeding `customer` records")
    await prisma.customer.deleteMany()
    console.info("[SEED] Deleted all previous `customer` records")

    const randomCustomers = Array.from({ length: quantity }, () => randomCustomerData())

    Promise.allSettled(
        randomCustomers.map((customer) =>
            prisma.customer.create({
                data: customer,
            })
        )
    )

        .then(() => console.info("[SEED] Successfully create `customer` records"))
        .catch((e) => console.error("[SEED] Failed to create `customer` records", e))
}
