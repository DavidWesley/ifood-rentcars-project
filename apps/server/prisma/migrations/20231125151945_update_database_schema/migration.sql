/*
  Warnings:

  - You are about to drop the `ExtraService` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VehicleType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `hourlyRentalRate` on the `vehicles` table. All the data in the column will be lost.
  - You are about to drop the column `manufacturingYear` on the `vehicles` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleType` on the `vehicles` table. All the data in the column will be lost.
  - The primary key for the `license_types` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `customerId` on the `license_types` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `license_types` table. All the data in the column will be lost.
  - You are about to drop the column `ammount` on the `rentals` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `customers` table. All the data in the column will be lost.
  - Added the required column `hourly_rental_rete` to the `vehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `manufacturing_year` to the `vehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `vehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `rentals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `rentals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `license` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "VehicleType_vehicle_type_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ExtraService";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "VehicleType";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "vehicle_types" (
    "type" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT,
    "tax" REAL NOT NULL DEFAULT 1.0
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "invoiceId" TEXT,
    CONSTRAINT "services_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_vehicles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "plate" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "manufacturing_year" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "hourly_rental_rete" REAL NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "popularity" INTEGER NOT NULL,
    CONSTRAINT "vehicles_type_fkey" FOREIGN KEY ("type") REFERENCES "vehicle_types" ("type") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_vehicles" ("available", "brand", "color", "id", "model", "plate", "popularity") SELECT "available", "brand", "color", "id", "model", "plate", "popularity" FROM "vehicles";
DROP TABLE "vehicles";
ALTER TABLE "new_vehicles" RENAME TO "vehicles";
CREATE UNIQUE INDEX "vehicles_plate_key" ON "vehicles"("plate");
CREATE TABLE "new_license_types" (
    "type" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT
);
INSERT INTO "new_license_types" ("description", "type") SELECT "description", "type" FROM "license_types";
DROP TABLE "license_types";
ALTER TABLE "new_license_types" RENAME TO "license_types";
CREATE UNIQUE INDEX "license_types_type_key" ON "license_types"("type");
CREATE TABLE "new_rentals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "amount" REAL NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'active',
    "customerId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "invoiceId" TEXT,
    CONSTRAINT "rentals_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "rentals_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "rentals_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_rentals" ("customerId", "endDate", "id", "invoiceId", "startDate", "state", "vehicleId") SELECT "customerId", "endDate", "id", "invoiceId", "startDate", "state", "vehicleId" FROM "rentals";
DROP TABLE "rentals";
ALTER TABLE "new_rentals" RENAME TO "rentals";
CREATE TABLE "new_invoices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "customerId" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'open'
);
INSERT INTO "new_invoices" ("created_at", "customerId", "id", "state") SELECT "created_at", "customerId", "id", "state" FROM "invoices";
DROP TABLE "invoices";
ALTER TABLE "new_invoices" RENAME TO "invoices";
CREATE UNIQUE INDEX "invoices_customerId_key" ON "invoices"("customerId");
CREATE TABLE "new_customers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "gender" TEXT NOT NULL,
    "license" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    CONSTRAINT "customers_license_fkey" FOREIGN KEY ("license") REFERENCES "license_types" ("type") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_customers" ("birthDate", "cpf", "created_at", "email", "gender", "id", "name", "points") SELECT "birthDate", "cpf", "created_at", "email", "gender", "id", "name", "points" FROM "customers";
DROP TABLE "customers";
ALTER TABLE "new_customers" RENAME TO "customers";
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");
CREATE UNIQUE INDEX "customers_cpf_key" ON "customers"("cpf");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_types_type_key" ON "vehicle_types"("type");
