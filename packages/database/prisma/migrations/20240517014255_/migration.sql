/*
  Warnings:

  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `messageId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Event` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `event` to the `Event` table without a default value. This is not possible if the table is not empty.
  - The required column `event_id` was added to the `Event` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `message-id` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender_email` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_messageId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "messageId",
DROP COLUMN "type",
DROP COLUMN "updatedAt",
ADD COLUMN     "event" TEXT NOT NULL,
ADD COLUMN     "event_id" TEXT NOT NULL,
ADD COLUMN     "link" TEXT,
ADD COLUMN     "message-id" TEXT NOT NULL,
ADD COLUMN     "sender_email" TEXT NOT NULL,
ALTER COLUMN "date" SET DATA TYPE TEXT,
ALTER COLUMN "subject" DROP NOT NULL,
ALTER COLUMN "X-Mailin-custom" DROP NOT NULL,
ALTER COLUMN "sending_ip" DROP NOT NULL,
ALTER COLUMN "ts_epoch" DROP NOT NULL,
ALTER COLUMN "template_id" DROP NOT NULL,
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("event_id");

-- CreateIndex
CREATE UNIQUE INDEX "Event_id_key" ON "Event"("id");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_message-id_fkey" FOREIGN KEY ("message-id") REFERENCES "Campaign"("messageId") ON DELETE RESTRICT ON UPDATE CASCADE;
