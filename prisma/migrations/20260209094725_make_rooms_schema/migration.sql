/*
  Warnings:

  - Added the required column `rooms` to the `DMs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uuid` to the `DMs` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "type_rooms" AS ENUM ('DMS', 'SERVER');

-- AlterTable
ALTER TABLE "DMs" ADD COLUMN     "roomId" INTEGER,
ADD COLUMN     "rooms" INTEGER NOT NULL,
ADD COLUMN     "uuid" VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE "rooms" (
    "id" SERIAL NOT NULL,
    "users" INTEGER[],
    "uuid" VARCHAR(255) NOT NULL,
    "type" "type_rooms" NOT NULL DEFAULT 'DMS',
    "maxSize_number" INTEGER NOT NULL DEFAULT 5,
    "maxSize_unit" TEXT NOT NULL DEFAULT 'MB',
    "maxUsers_number" INTEGER NOT NULL DEFAULT 5,
    "maxUsers_unit" TEXT NOT NULL DEFAULT 'users',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rooms_id_key" ON "rooms"("id");

-- AddForeignKey
ALTER TABLE "DMs" ADD CONSTRAINT "DMs_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;
