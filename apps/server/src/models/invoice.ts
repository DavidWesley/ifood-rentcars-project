import { ModelProps } from "@/interfaces/model.ts"
import { CustomerModel } from "@/models/customer.ts"
import { RentalModel } from "@/models/rental.ts"
import { UUID, createUUID } from "@/utils/id.ts"

export interface BaseInvoiceProps {
    customer: CustomerModel
}

export interface InvoiceProps extends ModelProps {
    id: UUID
    rentals: RentalModel[]
    expiresAt: Date
    state: "payed" | "opened" | "canceled" | "expired"
    // extraServices: Extraservice[]
}

export interface invoiceMethods {}

export class InvoiceModel implements InvoiceProps, invoiceMethods {
    public readonly customer: CustomerModel
    public readonly rentals: RentalModel[]

    // public readonly extraServices: ExtraService[]

    expiresAt: Date
    state: "payed" | "opened" | "canceled" | "expired"

    public readonly id: UUID
    public readonly createdAt: Date
    public updatedAt: Date

    constructor(customer: CustomerModel, rentals: RentalModel[], expiresAt: Date) {
        this.customer = customer
        this.rentals = rentals

        // Talvez esse state seja um método e não uma propriedade
        this.state = "opened"
        // Validar para que o invoice tenha data de expiração coerente
        this.expiresAt = expiresAt

        this.id = createUUID()
        this.createdAt = new Date()
        this.updatedAt = this.createdAt
    }
}
