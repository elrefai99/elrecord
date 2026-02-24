-- AlterTable
ALTER TABLE "User" ADD COLUMN     "updatePasswordAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "OTP" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OTP_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OTP_id_key" ON "OTP"("id");

-- AddForeignKey
ALTER TABLE "OTP" ADD CONSTRAINT "OTP_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
