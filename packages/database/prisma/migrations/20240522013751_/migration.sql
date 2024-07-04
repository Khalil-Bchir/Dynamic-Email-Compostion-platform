/*
  Warnings:

  - A unique constraint covering the columns `[filename]` on the table `Media` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Media_filename_key" ON "Media"("filename");
