import { ModelProps } from "@/interfaces/model.ts"
import { UUID, createUUID, validateUUID } from "@/utils/id.ts"
import { TimeUnits } from "@/utils/timeUnits.ts"

export type BaseCustomerGenderType = "male" | "female" | "other"

// TODO:
// Tornar o tipo abaixo numa classe no futuro para centralizar as validações
export type LicenseType = "A" | "B" | "AB" | "C" | "D" | "E"

export interface BaseCustomerProps extends Partial<ModelProps> {
    name: string
    email: string
    cpf: string
    license: LicenseType
    birthDate: Date
    gender: BaseCustomerGenderType
    points: number
}

export interface CustomerProps extends BaseCustomerProps {
    id: UUID
}

export interface CustomerMethods {}

export class CustomerModel implements CustomerProps, CustomerMethods {
    public readonly name: string
    public readonly email: string
    public readonly cpf: string
    public readonly license: LicenseType
    public readonly birthDate: Date
    public readonly gender: BaseCustomerGenderType

    public readonly points: number

    public readonly id: UUID
    public readonly createdAt: Date
    public updatedAt: Date

    constructor(data: BaseCustomerProps) {
        // TODO: Separar essa validação no futuro
        const today = new Date()
        const duration = today.getTime() - data.birthDate.getTime()
        const resolvedDuration = TimeUnits.convertTimeDurationToParts(duration, "millisecond", "year")
        const isAdult = resolvedDuration.year! >= 18
        if (isAdult === false) throw new Error("Customer must be at least 18 years old")

        if (typeof data.id !== "string") this.id = createUUID()
        else if (CustomerModel.validateCustomerId(data.id)) this.id = data.id
        else throw new Error("Invalid Customer Id")

        this.name = data.name
        this.email = data.email
        // TODO: Checar CPF no futuro
        this.cpf = data.cpf
        this.license = data.license
        this.birthDate = data.birthDate
        this.gender = data.gender
        this.points = data.points ?? 0

        this.createdAt = data.createdAt ?? new Date()
        this.updatedAt = data.updatedAt ?? this.createdAt
    }

    public static validateCustomerId(id: string): id is CustomerModel["id"] {
        return validateUUID(id)
    }
}
