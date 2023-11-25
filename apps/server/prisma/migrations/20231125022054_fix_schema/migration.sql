/*
  Warnings:

  - You are about to drop the column `vehicleTypeId` on the `vehicles` table. All the data in the column will be lost.
  - Added the required column `vehicleType` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_vehicles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "plate" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "manufacturingYear" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "hourlyRentalRate" DECIMAL NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "popularity" INTEGER NOT NULL,
    "vehicleType" TEXT NOT NULL
);
INSERT INTO "new_vehicles" ("available", "brand", "color", "hourlyRentalRate", "id", "manufacturingYear", "model", "plate", "popularity") SELECT "available", "brand", "color", "hourlyRentalRate", "id", "manufacturingYear", "model", "plate", "popularity" FROM "vehicles";
DROP TABLE "vehicles";
ALTER TABLE "new_vehicles" RENAME TO "vehicles";
CREATE UNIQUE INDEX "vehicles_plate_key" ON "vehicles"("plate");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
