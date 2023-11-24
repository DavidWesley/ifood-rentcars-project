import { CustomerModel, LicenseTypeEnum } from "@/models/customer.ts";
import { RentalModel } from "@/models/rental.ts";
import { InvoiceModel } from "@/models/invoice.ts";
import { VehicleTypeEnum, VehicleModel, BaseVehicleProps } from "@/models/vehicle.ts";
import { beforeEach, describe, expect, it } from "vitest";

describe("InvoiceModel", () => {
  let invoice: InvoiceModel;
  let customer: CustomerModel;
  let rentals: RentalModel[];
  let expiresAt: Date;

  beforeEach(() => {
    customer = {
      name: "John Doe",
      email: "john@example.com",
      cpf: "123.456.789-00",
      licenseType: LicenseTypeEnum.AB,
      birthDate: new Date("1990-01-01"),
      gender: "male",
      points: 0,
      id: "1-2-3-4-5-6",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const vehicleProps1: BaseVehicleProps = {
      plate: "ABC123",
      vehicleType: VehicleTypeEnum.CAR,
      brand: "Toyota",
      model: "Corolla",
      manufacturingYear: 2020,
      color: "black",
      available: true,
      hourlyRentalRate: 50,
    };

    const vehicleProps2: BaseVehicleProps = {
      plate: "DEF123",
      vehicleType: VehicleTypeEnum.CAR,
      brand: "Honda",
      model: "Civic",
      manufacturingYear: 2021,
      color: "black",
      available: true,
      hourlyRentalRate: 50,
    };

    const startDate = new Date("2023-11-01");
    const endDate = new Date("2023-11-05");

    const vehicle1 = new VehicleModel(vehicleProps1);
    const vehicle2 = new VehicleModel(vehicleProps2);

    const rental1 = new RentalModel(customer, vehicle1, startDate, endDate);
    const rental2 = new RentalModel(customer, vehicle2, startDate, endDate);

    rentals = [rental1, rental2];

    expiresAt = new Date("2023-12-31");

    invoice = new InvoiceModel(customer, rentals, expiresAt);
  });

  it("should create a new InvoiceModel instance", () => {
    expect(invoice).toBeInstanceOf(InvoiceModel);
  });

  it("should have correct initial values", () => {
    expect(invoice.customer).toBe(customer);
    expect(invoice.rentals).toBe(rentals);
    expect(invoice.expiresAt).toBe(expiresAt);
    expect(invoice.state).toBe("opened");
  });

});
