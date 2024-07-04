/*
  Warnings:

  - Added the required column `status` to the `UserOrganization` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "UserOrganization" ADD COLUMN     "status" "Status" NOT NULL;
