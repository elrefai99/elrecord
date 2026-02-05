/*
  Warnings:

  - Added the required column `email_id` to the `OTP` table without a default value. This is not possible if the table is not empty.
  - Added the required column `site_id` to the `OTP` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OTP" ADD COLUMN     "email_id" VARCHAR(255) NOT NULL,
ADD COLUMN     "site_id" VARCHAR(255) NOT NULL;
