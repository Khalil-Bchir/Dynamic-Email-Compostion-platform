/*
  Warnings:

  - You are about to drop the column `organizationId` on the `Media` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_organizationId_fkey";

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "organizationId",
ADD COLUMN     "createdById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
