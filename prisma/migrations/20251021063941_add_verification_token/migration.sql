/*
  Warnings:

  - A unique constraint covering the columns `[VerificationToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "VerificationToken" TEXT;
ALTER TABLE "User" ADD COLUMN "VerificationTokenExpiry" DATETIME;

-- CreateIndex
CREATE UNIQUE INDEX "User_VerificationToken_key" ON "User"("VerificationToken");
