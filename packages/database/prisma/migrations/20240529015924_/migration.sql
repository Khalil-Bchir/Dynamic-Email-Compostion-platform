/*
  Warnings:

  - A unique constraint covering the columns `[role,userOrganizationId]` on the table `UserRole` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `role` on the `UserRole` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "UserRole" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_role_userOrganizationId_key" ON "UserRole"("role", "userOrganizationId");
