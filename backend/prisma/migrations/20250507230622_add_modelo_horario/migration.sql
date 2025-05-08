/*
  Warnings:

  - You are about to drop the column `fecha` on the `Reserva` table. All the data in the column will be lost.
  - You are about to drop the column `hora` on the `Reserva` table. All the data in the column will be lost.
  - Added the required column `horarioId` to the `Reserva` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Horario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dia" TEXT NOT NULL,
    "hora" TEXT NOT NULL,
    "reservado" BOOLEAN NOT NULL DEFAULT false
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reserva" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "horarioId" INTEGER NOT NULL,
    CONSTRAINT "Reserva_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reserva_horarioId_fkey" FOREIGN KEY ("horarioId") REFERENCES "Horario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reserva" ("id", "userId") SELECT "id", "userId" FROM "Reserva";
DROP TABLE "Reserva";
ALTER TABLE "new_Reserva" RENAME TO "Reserva";
CREATE UNIQUE INDEX "Reserva_horarioId_key" ON "Reserva"("horarioId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
