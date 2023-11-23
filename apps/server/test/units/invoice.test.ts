/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseCustomerProps, LicenseTypeEnum } from "@/models/customer.ts"
import { InvoiceModel, InvoiceProps } from "@/models/invoice.ts"
import { beforeEach, describe, expect, it } from "vitest"

describe("InvoiceModel", () => {
    let invoice: InvoiceModel
    let invoiceProps: InvoiceProps
    let baseCustomerProps: BaseCustomerProps

    beforeEach(() => {
        baseCustomerProps = {
            name: "John Doe",
            email: "john@example.com",
            cpf: "123.456.789-00",
            licenseType: LicenseTypeEnum.AB,
            birthDate: new Date("1990-01-01"),
            gender: "male",
        }

        invoiceProps = {
            customerId: customerId,
            costDetails: "",
            rentals: [rental],
        }

        invoice = new InvoiceModel(invoiceProps)
    })

    it("should create a new invoice", () => {
        expect(invoice).toBeDefined()
    })

    it("should have correct properties", () => {
        expect(invoice.id).toBe(invoiceProps.id)
        expect(invoice.customerId).toBe(invoiceProps.customerId)
        expect(invoice.costDetails).toBe(invoiceProps.costDetails)
        expect(invoice.rentals).toEqual(invoiceProps.rentals)
    })
})
