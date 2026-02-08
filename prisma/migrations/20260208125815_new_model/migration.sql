-- CreateEnum
CREATE TYPE "DMStatus" AS ENUM ('PENDING', 'DELIVERED', 'READ');

-- CreateTable
CREATE TABLE "DMs" (
    "id" SERIAL NOT NULL,
    "users" INTEGER[],
    "message" VARCHAR(255) NOT NULL,
    "status" "DMStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "DMs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DMs_id_key" ON "DMs"("id");

-- CreateIndex
CREATE INDEX "DMs_users_idx" ON "DMs"("users");

-- AddForeignKey
ALTER TABLE "DMs" ADD CONSTRAINT "DMs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
