import { PrismaClient, VehicleType } from "@prisma/client"

export const VEHICLES_TYPES_DATA: ReadonlyArray<VehicleType> = [
    {
        type: "motorcycle",
        description:
            "é um veículo de duas rodas, com motor a gasolina, diesel, elétrico ou híbrido, que pode transportar até duas pessoas. É classificada como veículo de passageiros e de carga, dependendo do uso. É necessário ter habilitação na categoria A para conduzir uma motocicleta.",
        tax: 0.05,
    },
    {
        type: "car",
        description:
            "é um veículo de quatro rodas, com motor a gasolina, diesel, elétrico ou híbrido, que pode transportar até oito pessoas, excluído o motorista. É classificado como veículo de passageiros, misto ou de competição, dependendo do modelo. É necessário ter habilitação na categoria B para conduzir um carro.",
        tax: 0.1,
    },
    {
        type: "truck",
        description:
            "é um veículo de quatro ou mais rodas, com motor a diesel, que pode transportar cargas pesadas acima de 3.500 kg. É classificado como veículo de carga ou de tração, dependendo da presença de reboque ou semi-reboque. É necessário ter habilitação na categoria C, D ou E para conduzir um caminhão.",
        tax: 0.5,
    },
    {
        type: "bus",
        description:
            "é um veículo de quatro ou mais rodas, com motor a diesel, elétrico ou híbrido, que pode transportar mais de oito passageiros, incluído o motorista. É classificado como veículo de passageiros ou de tração, dependendo da presença de reboque ou semi-reboque. É necessário ter habilitação na categoria D ou E para conduzir um ônibus.",
        tax: 0.8,
    },
    {
        type: "motorhome",
        description:
            "é um veículo de quatro ou mais rodas, com motor a gasolina, diesel, elétrico ou híbrido, que pode transportar até oito pessoas, excluído o motorista, e que possui uma estrutura interna que permite morar ou acampar dentro dele. É classificado como veículo de passageiros, misto ou especial, dependendo do uso. É necessário ter habilitação na categoria B, C, D ou E para conduzir um motorhome.",
        tax: 0.8,
    },
    {
        type: "trailer",
        description:
            "é um veículo de duas ou mais rodas, sem motor, que pode transportar cargas leves ou pesadas, ou que possui uma estrutura interna que permite morar ou acampar dentro dele. É classificado como veículo de carga, de tração ou especial, dependendo do uso. É necessário ter um veículo trator, como um carro, caminhão ou ônibus, para rebocar um trailer.",
        tax: 0.8,
    },
]

export async function seedVehiclesTypes(prisma: PrismaClient) {
    console.info("[SEED] Start seeding `vehicleTypes` records")
    await prisma.vehicleType.deleteMany()
    console.info("[SEED] Deleted all previous `vehicleTypes` records")

    Promise.all(
        VEHICLES_TYPES_DATA.map((vehicleType) =>
            prisma.vehicleType.create({
                data: {
                    type: vehicleType.type,
                    description: vehicleType.description,
                    tax: vehicleType.tax,
                },
            })
        )
    )
        .then(() => console.info("[SEED] Successfully create `vehicleTypes` records"))
        .catch((e) => console.error("[SEED] Failed to create `vehicleTypes` records", e))
}
