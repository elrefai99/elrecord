-- AlterTable
ALTER TABLE "DMs" ADD COLUMN     "maxSize_number" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "maxSize_unit" TEXT NOT NULL DEFAULT 'MB',
ADD COLUMN     "maxUsers_number" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "maxUsers_unit" TEXT NOT NULL DEFAULT 'users';
