-- CreateEnum
CREATE TYPE "friendsStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- DropIndex
DROP INDEX "DMs_users_idx";

-- DropIndex
DROP INDEX "OTP_user_id_status_idx";

-- DropIndex
DROP INDEX "User_status_role_idx";

-- CreateTable
CREATE TABLE "friends" (
    "id" SERIAL NOT NULL,
    "users" INTEGER[],
    "uuid" VARCHAR(255) NOT NULL,
    "status" "friendsStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "friends_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "friends_id_key" ON "friends"("id");

-- CreateIndex
CREATE INDEX "friends_id_users_status_uuid_idx" ON "friends"("id", "users", "status", "uuid");

-- CreateIndex
CREATE INDEX "DMs_id_users_status_uuid_idx" ON "DMs"("id", "users", "status", "uuid");

-- CreateIndex
CREATE INDEX "OTP_id_user_id_status_idx" ON "OTP"("id", "user_id", "status");

-- CreateIndex
CREATE INDEX "User_id_status_role_idx" ON "User"("id", "status", "role");

-- CreateIndex
CREATE INDEX "rooms_id_users_uuid_idx" ON "rooms"("id", "users", "uuid");

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
