/*
  Warnings:

  - You are about to drop the column `status` on the `UserOrganization` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "InvitationStatus" ADD VALUE 'INACTIVE';

-- AlterTable
ALTER TABLE "UserOrganization" DROP COLUMN "status";

-- DropEnum
DROP TYPE "Status";
