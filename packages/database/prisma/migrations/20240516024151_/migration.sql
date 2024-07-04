/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "ts" INTEGER NOT NULL,
    "ts_event" INTEGER NOT NULL,
    "subject" TEXT NOT NULL,
    "X-Mailin-custom" TEXT NOT NULL,
    "sending_ip" TEXT NOT NULL,
    "ts_epoch" INTEGER NOT NULL,
    "template_id" INTEGER NOT NULL,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Campaign"("messageId") ON DELETE RESTRICT ON UPDATE CASCADE;
