/*
  Warnings:

  - You are about to drop the column `createdById` on the `Media` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_createdById_fkey";

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "createdById";
