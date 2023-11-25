-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_invoices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "expires_at" DATETIME NOT NULL,
    "customerId" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'opened'
);
INSERT INTO "new_invoices" ("created_at", "customerId", "expires_at", "id", "state", "updated_at") SELECT "created_at", "customerId", "expires_at", "id", "state", "updated_at" FROM "invoices";
DROP TABLE "invoices";
ALTER TABLE "new_invoices" RENAME TO "invoices";
CREATE UNIQUE INDEX "invoices_customerId_key" ON "invoices"("customerId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
