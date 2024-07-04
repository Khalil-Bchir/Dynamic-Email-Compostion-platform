/*
  Warnings:

  - Added the required column `sendAt` to the `Campaign` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "sendAt" TIMESTAMP(3) NOT NULL;
