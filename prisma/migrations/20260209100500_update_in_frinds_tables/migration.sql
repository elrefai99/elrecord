/*
  Warnings:

  - You are about to drop the column `userId` on the `friends` table. All the data in the column will be lost.
  - Added the required column `senderId` to the `friends` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "friends" DROP CONSTRAINT "friends_userId_fkey";

-- AlterTable
ALTER TABLE "friends" DROP COLUMN "userId",
ADD COLUMN     "senderId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
