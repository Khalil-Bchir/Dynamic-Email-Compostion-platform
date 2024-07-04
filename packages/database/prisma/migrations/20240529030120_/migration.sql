/*
  Warnings:

  - A unique constraint covering the columns `[invitationToken]` on the table `UserOrganization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,organizationId]` on the table `UserOrganization` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserOrganization_userId_organizationId_invitationToken_key";

-- CreateIndex
CREATE UNIQUE INDEX "UserOrganization_invitationToken_key" ON "UserOrganization"("invitationToken");

-- CreateIndex
CREATE UNIQUE INDEX "UserOrganization_userId_organizationId_key" ON "UserOrganization"("userId", "organizationId");
