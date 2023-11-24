import { VehicleModel, VehicleTypeEnum } from "@/models/vehicle.ts";
import { beforeEach, describe, expect, it } from "vitest";

describe("VehicleModel", () => {
  let vehicle: VehicleModel;

  beforeEach(() => {
    const baseVehicleProps = {
      plate: "ABC1234",
      vehicleType: VehicleTypeEnum.CAR,
      brand: "Toyota",
      model: "Corolla",
      manufacturingYear: 2020,
      color: "black",
      available: true,
      hourlyRentalRate: 50,
    };

    vehicle = new VehicleModel(baseVehicleProps);
  });

  it("should create a new VehicleModel instance", () => {
    expect(vehicle).toBeInstanceOf(VehicleModel);
  });

  it("should have correct initial values", () => {
    expect(vehicle.available).toBe(true);
    expect(vehicle.popularity).toBe(0);
  });

//   it('should update hourly rental rate', () => {
//     const newHourlyRate = 60;
//     vehicle.updateHourlyRentalRate(newHourlyRate);
//     expect(vehicle.hourlyRentalRate).toBe(newHourlyRate);
//   });

//   it('should update availability', () => {
//     const newAvailability = false;
//     vehicle.updateAvailable(newAvailability);
//     expect(vehicle.available).toBe(newAvailability);
//   });

//   it('should update popularity', () => {
//     const newPopularity = 10;
//     vehicle.updatePopularity(newPopularity);
//     expect(vehicle.popularity).toBe(newPopularity);
//   });
});
