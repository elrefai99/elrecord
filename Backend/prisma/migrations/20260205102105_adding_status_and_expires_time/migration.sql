/*
  Warnings:

  - Added the required column `expiresAt` to the `OTP` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OTPStatus" AS ENUM ('PENDING', 'VERIFIED', 'EXPIRED');

-- AlterTable
ALTER TABLE "OTP" ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "OTPStatus" NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE INDEX "OTP_user_id_status_idx" ON "OTP"("user_id", "status");
