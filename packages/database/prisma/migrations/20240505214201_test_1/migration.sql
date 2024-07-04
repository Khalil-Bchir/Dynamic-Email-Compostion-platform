/*
  Warnings:

  - You are about to drop the column `description` on the `EmailTemplate` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `EmailTemplate` table. All the data in the column will be lost.
  - Changed the type of `content` on the `EmailTemplate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "EmailTemplate" DROP COLUMN "description",
DROP COLUMN "name",
DROP COLUMN "content",
ADD COLUMN     "content" JSONB NOT NULL;
