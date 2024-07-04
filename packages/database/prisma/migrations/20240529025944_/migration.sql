/*
  Warnings:

  - A unique constraint covering the columns `[userId,organizationId,invitationToken]` on the table `UserOrganization` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserOrganization_userId_organizationId_key";

-- CreateIndex
CREATE UNIQUE INDEX "UserOrganization_userId_organizationId_invitationToken_key" ON "UserOrganization"("userId", "organizationId", "invitationToken");
