/*
  Warnings:

  - You are about to drop the column `X-Mailin-custom` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `message-id` on the `Event` table. All the data in the column will be lost.
  - The `template_id` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `messageId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `ts` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ts_event` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `subject` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sending_ip` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `ts_epoch` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Made the column `sender_email` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_message-id_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "X-Mailin-custom",
DROP COLUMN "message-id",
ADD COLUMN     "custom" TEXT,
ADD COLUMN     "messageId" TEXT NOT NULL,
DROP COLUMN "ts",
ADD COLUMN     "ts" INTEGER NOT NULL,
DROP COLUMN "ts_event",
ADD COLUMN     "ts_event" INTEGER NOT NULL,
ALTER COLUMN "subject" SET NOT NULL,
ALTER COLUMN "sending_ip" SET NOT NULL,
DROP COLUMN "ts_epoch",
ADD COLUMN     "ts_epoch" BIGINT NOT NULL,
DROP COLUMN "template_id",
ADD COLUMN     "template_id" INTEGER,
ALTER COLUMN "sender_email" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Campaign"("messageId") ON DELETE RESTRICT ON UPDATE CASCADE;
