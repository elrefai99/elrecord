/*
  Warnings:

  - You are about to drop the column `users` on the `friends` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[senderId,receiverId]` on the table `friends` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `receiverId` to the `friends` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "friends_id_users_status_uuid_idx";

-- AlterTable
ALTER TABLE "friends" DROP COLUMN "users",
ADD COLUMN     "receiverId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER;

-- CreateIndex
CREATE INDEX "friends_id_senderId_receiverId_status_uuid_idx" ON "friends"("id", "senderId", "receiverId", "status", "uuid");

-- CreateIndex
CREATE UNIQUE INDEX "friends_senderId_receiverId_key" ON "friends"("senderId", "receiverId");

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
