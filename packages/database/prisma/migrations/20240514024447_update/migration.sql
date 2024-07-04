/*
  Warnings:

  - You are about to drop the column `file` on the `Media` table. All the data in the column will be lost.
  - Added the required column `filename` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimetype` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Media" DROP COLUMN "file",
ADD COLUMN     "filename" TEXT NOT NULL,
ADD COLUMN     "mimetype" TEXT NOT NULL,
ADD COLUMN     "size" INTEGER NOT NULL;
