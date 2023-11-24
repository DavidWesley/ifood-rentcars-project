import { CustomerModel, LicenseTypeEnum } from "@/models/customer.ts";
import { RentalModel } from "@/models/rental.ts";
import { VehicleModel, VehicleTypeEnum } from "@/models/vehicle.ts";
import { beforeEach, describe, expect, it } from "vitest";

describe("RentalModel", () => {
  let rental: RentalModel;
  let customer: CustomerModel;
  let vehicle: VehicleModel;
  let startDate: Date;
  let endDate: Date;

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

    const vehicleProps = {
      plate: "ABC123",
      vehicleType: VehicleTypeEnum.CAR,
      brand: "Toyota",
      model: "Corolla",
      manufacturingYear: 2020,
      color: "black",
      available: true,
      hourlyRentalRate: 50,
    };

    vehicle = new VehicleModel(vehicleProps);

    startDate = new Date("2023-11-01");
    endDate = new Date("2023-11-05");

    rental = new RentalModel(customer, vehicle, startDate, endDate);
  });

  it("should create a new RentalModel instance", () => {
    expect(rental).toBeInstanceOf(RentalModel);
  });

  it("should have correct initial values", () => {
    expect(rental.customer).toBe(customer);
    expect(rental.vehicle).toBe(vehicle);
    expect(rental.startDate).toBe(startDate);
    expect(rental.endDate).toBe(endDate);
  });

  it("should calculate total amount correctly", () => {
    const hourlyRate = vehicle.hourlyRentalRate;
    const durationInHours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
    const expectedTotalAmount = hourlyRate * durationInHours;

    expect(rental.calculateTotalAmount()).toBe(expectedTotalAmount);
  });
});
