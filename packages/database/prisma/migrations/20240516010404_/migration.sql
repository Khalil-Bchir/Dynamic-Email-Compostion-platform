/*
  Warnings:

  - A unique constraint covering the columns `[messageId]` on the table `Campaign` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Campaign_messageId_key" ON "Campaign"("messageId");
