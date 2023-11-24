import { ModelProps } from "@/interfaces/model.ts"
import { UUID, createUUID, validateUUID } from "@/utils/id.ts"

export enum LicenseTypeEnum {
    A = "A",
    B = "B",
    AB = "AB",
    C = "C",
}

export type BaseCustomerGenderType = "male" | "female" | "other"

export interface BaseCustomerProps {
    name: string
    email: string
    cpf: string
    licenseType: LicenseTypeEnum
    birthDate: Date
    gender: BaseCustomerGenderType
}

export interface CustomerProps extends ModelProps, BaseCustomerProps {
    id: UUID
    points: number
}

interface CustomerMethods {}

export class CustomerModel implements CustomerProps, CustomerMethods {
    public readonly name: string
    public readonly email: string
    public readonly cpf: string
    public readonly licenseType: LicenseTypeEnum
    public readonly birthDate: Date
    public readonly gender: BaseCustomerGenderType

    public readonly points: number

    public readonly id: UUID
    public readonly createdAt: Date
    public updatedAt: Date

    constructor(data: BaseCustomerProps) {
        this.id = createUUID()
        this.name = data.name
        this.email = data.email
        this.cpf = data.cpf
        this.licenseType = data.licenseType
        this.birthDate = data.birthDate
        this.gender = data.gender

        this.points = 0
        this.createdAt = new Date()
        this.updatedAt = this.createdAt
    }

    static validaCustomerId(id: string): id is CustomerModel["id"] {
        return validateUUID(id)
    }
}
