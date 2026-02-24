-- DropIndex
DROP INDEX "User_email_key";

-- CreateIndex
CREATE INDEX "User_status_role_idx" ON "User"("status", "role");
