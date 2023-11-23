import { BaseCustomerProps, CustomerModel, LicenseTypeEnum } from "@/models/customer.ts"
import { beforeEach, describe, expect, it } from "vitest"

describe("CustomerModel", () => {
    let customer: CustomerModel
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

        customer = new CustomerModel(baseCustomerProps)
    })

    it("should create a new customer", () => {
        expect(customer).toBeDefined()
    })

    it("should have correct properties", () => {
        expect(customer.name).toBe(baseCustomerProps.name)
        expect(customer.email).toBe(baseCustomerProps.email)
    })
})
