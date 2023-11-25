-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VehicleType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vehicle_type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tax" DECIMAL NOT NULL,
    "licenseTypeId" INTEGER,
    CONSTRAINT "VehicleType_licenseTypeId_fkey" FOREIGN KEY ("licenseTypeId") REFERENCES "license_types" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_VehicleType" ("description", "id", "tax", "vehicle_type") SELECT "description", "id", "tax", "vehicle_type" FROM "VehicleType";
DROP TABLE "VehicleType";
ALTER TABLE "new_VehicleType" RENAME TO "VehicleType";
CREATE UNIQUE INDEX "VehicleType_vehicle_type_key" ON "VehicleType"("vehicle_type");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
