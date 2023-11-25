import { LicenseType, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const LICENSES_TYPES_DATA: ReadonlyArray<LicenseType> = [
    {
        type: "A",
        description:
            "permite a condução de veículos de duas ou três rodas, como motos, motonetas, triciclos e ciclomotores. É necessário ter 18 anos ou mais, saber ler e escrever, possuir documento de identidade e CPF, e ser aprovado nos exames médico, psicotécnico, teórico e prático.",
    },
    {
        type: "B",
        description:
            "permite a condução de veículos de quatro rodas, como carros de passeio, utilitários, pickups e SUVs, desde que o peso bruto total não exceda 3.500 kg e a lotação não exceda oito lugares, excluído o do motorista. É necessário ter 18 anos ou mais, saber ler e escrever, possuir documento de identidade e CPF, e ser aprovado nos exames médico, psicotécnico, teórico e prático.",
    },
    {
        type: "AB",
        description:
            "permite a condução de veículos das categorias A e B. É necessário ter 18 anos ou mais, saber ler e escrever, possuir documento de identidade e CPF, e ser aprovado nos exames médico, psicotécnico, teórico e prático de ambas as categorias.",
    },
    {
        type: "C",
        description:
            "permite a condução de veículos das categorias B e de veículos de carga acima de 3.500 kg, como caminhões, caminhonetes e vans de carga. É necessário ter 21 anos ou mais, estar habilitado há pelo menos um ano na categoria B, não ter cometido infração grave ou gravíssima ou ser reincidente em infrações médias nos últimos 12 meses, e ser aprovado nos exames médico, psicotécnico, teórico e prático.",
    },
    {
        type: "D",
        description:
            "permite a condução de veículos das categorias B e C e de veículos de transporte de passageiros acima de oito lugares, como ônibus, micro-ônibus e vans de passageiros. É necessário ter 21 anos ou mais, estar habilitado há pelo menos dois anos na categoria B ou um ano na categoria C, não ter cometido infração grave ou gravíssima ou ser reincidente em infrações médias nos últimos 12 meses, e ser aprovado nos exames médico, psicotécnico, teórico e prático.",
    },
    {
        type: "E",
        description:
            "permite a condução de veículos das categorias B, C e D e de veículos com unidade acoplada acima de 6.000 kg, como trailers, semirreboques, articulados e bi-trens. É necessário ter 21 anos ou mais, estar habilitado há pelo menos um ano na categoria C ou D, não ter cometido infração grave ou gravíssima ou ser reincidente em infrações médias nos últimos 12 meses, e ser aprovado nos exames médico, psicotécnico, teórico e prático.",
    },
]

async function seedLicensesTypes() {
    console.info("[SEED] Start seeding `licenseTypes` records")
    await prisma.licenseType.deleteMany()
    console.info("[SEED] Deleted all previous `licenseTypes` records")

    Promise.all(
        LICENSES_TYPES_DATA.map((license) =>
            prisma.licenseType.create({
                data: {
                    type: license.type,
                    description: license.description,
                },
            })
        )
    )
        .then(() => console.info("[SEED] Successfully create `licenseTypes` records"))
        .catch((e) => console.error("[SEED] Failed to create `licenseTypes` records", e))
}

seedLicensesTypes()
