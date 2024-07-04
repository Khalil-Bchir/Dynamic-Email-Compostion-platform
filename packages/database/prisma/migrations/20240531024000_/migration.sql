-- DropForeignKey
ALTER TABLE "Campaign" DROP CONSTRAINT "Campaign_createdById_fkey";

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
