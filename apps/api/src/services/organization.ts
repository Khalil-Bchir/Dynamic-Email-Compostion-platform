import { PrismaClient, Role } from '@saas-monorepo/database';

import { EmailPayload } from '../types/email.js';
import { InviteUserPayload, OrganizationPayload } from '../types/organization.js';
import { AbstractServiceOptions } from '../types/services.js';
import { generateInvitationToken } from '../utils/generateMsgId.js';
import { sendEmail } from '../utils/mailing-transporter.js';

export class OrganizationService {
  prisma: PrismaClient;

  constructor(options: AbstractServiceOptions) {
    this.prisma = options.prisma;
  }

  async createOrganization(payload: OrganizationPayload) {
    try {
      const { name, user } = payload;

      // Create the organization
      const organization = await this.prisma.organization.create({
        data: {
          name,
          users: {
            create: [
              {
                user: { connect: { id: user } },
                role: 'Admin',
                invitationStatus: 'ACCEPTED',
              },
            ],
          },
        },
      });

      return organization;
    } catch (error) {
      throw error;
    }
  }

  async inviteUsersToOrganization(payload: InviteUserPayload) {
    try {
      const { organizationId, emails, role } = payload;

      // Find an admin user of the organization
      const admin = await this.prisma.userOrganization.findFirst({
        where: {
          organizationId,
          role: 'Admin',
        },
        include: {
          user: true,
        },
      });

      if (!admin || !admin.user.email) {
        throw new Error('No admin found for this organization');
      }

      const adminEmail = admin.user.email;

      // Create an array to store user organization records
      const userOrganizations = [];

      for (const email of emails) {
        // Generate a new invitation token for each user
        const invitationToken = generateInvitationToken();

        // Create or find the user
        let user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
          throw new Error(`No user found with email: ${email}`);
        }

        // Create UserOrganization record
        const userOrganization = await this.prisma.userOrganization.create({
          data: {
            userId: user.id,
            organizationId,
            role: 'Member',
            invitationStatus: 'PENDING',
            invitationToken,
          },
        });

        console.log('user org', userOrganization);

        // Define the invitation email payload
        const emailPayload: EmailPayload = {
          sender: adminEmail,
          recipient: [email],
          subject: 'Organization Invitation',
          html: `<p>You have been invited to join an organization. Click <a href="https://email-builder-rho.vercel.app/invite/${invitationToken}">here</a> to accept the invitation.</p>`,
        };

        console.log('email', emailPayload);

        // Send the invitation email
        await sendEmail(emailPayload);

        // Add the created user organization record to the array
        userOrganizations.push(userOrganization);
      }

      return userOrganizations;
    } catch (error) {
      console.error('Error inviting users to organization:', error);
      throw new Error('Failed to invite users to organization');
    }
  }

  async acceptInvitation(invitationToken: string) {
    try {
      // Find the UserOrganization record by invitationToken
      const userOrganization = await this.prisma.userOrganization.findUnique({
        where: { invitationToken },
      });

      if (!userOrganization) {
        throw new Error('Invalid invitation token');
      }

      // Update the invitationStatus to ACCEPTED
      const updatedUserOrganization = await this.prisma.userOrganization.update({
        where: { invitationToken },
        data: {
          invitationStatus: 'ACCEPTED',
          invitationToken: null, // Clear the token after acceptance
        },
      });

      return updatedUserOrganization;
    } catch (error) {
      console.error('Error accepting invitation:', error);
      throw new Error('Failed to accept invitation');
    }
  }

  async deactivateUser(id: string) {
    try {
      // Find the UserOrganization record by organizationId, userId, and invitationStatus
      const userOrganization = await this.prisma.userOrganization.findFirst({
        where: { id, invitationStatus: 'ACCEPTED' },
      });

      if (!userOrganization) {
        throw new Error('User organization not found or invitation status not accepted');
      }

      // Update the status to INACTIVE
      const updatedUserOrganization = await this.prisma.userOrganization.update({
        where: { id: userOrganization.id, invitationStatus: 'ACCEPTED' },
        data: {
          invitationStatus: 'INACTIVE',
        },
      });

      return updatedUserOrganization;
    } catch (error) {
      console.error('Error deactivating user:', error);
      throw new Error('Failed to deactivate user');
    }
  }

  async getAllOrganizations(userId: string) {
    try {
      const userOrganizations = await this.prisma.userOrganization.findMany({
        where: { userId, invitationStatus: 'ACCEPTED' },
        include: { organization: true }, // Include associated organizations
      });

      // Extract organizations from userOrganizations
      const organizations = userOrganizations.map((userOrg) => userOrg.organization);

      return organizations;
    } catch (error) {
      throw error;
    }
  }

  async getOrganization(id: string) {
    try {
      return await this.prisma.organization.findUnique({
        where: { id: id },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateOrganization(id: string, payload: OrganizationPayload) {
    try {
      const updatedOrganization = await this.prisma.organization.update({
        where: { id: id },
        data: payload,
      });
      return updatedOrganization;
    } catch (error) {
      throw error;
    }
  }

  async deleteOrganization(id: string) {
    try {
      const deletedOrganization = await this.prisma.organization.delete({
        where: { id: id },
      });
      return deletedOrganization;
    } catch (error) {
      throw error;
    }
  }

  async getUsersByOrganization(organizationId: string) {
    try {
      const users = await this.prisma.userOrganization.findMany({
        where: { organizationId, invitationStatus: 'ACCEPTED' },
        include: { user: true }, // Include the user details
      });

      // Map user details including the role from userOrganizations
      const userDetails = users.map((userOrg) => ({
        id: userOrg.user.id,
        userOrg: userOrg.id,
        email: userOrg.user.email,
        role: userOrg.role, // Include the role from UserOrganization
      }));

      return userDetails;
    } catch (error) {
      console.error('Error fetching users for organization:', error);
      throw error;
    }
  }

  async getUsersRole(organizationId: string, userId: string) {
    try {
      const userOrg = await this.prisma.userOrganization.findFirst({
        where: { organizationId, userId },
      });

      if (!userOrg) {
        throw new Error('User organization not found');
      }

      // Map user details including the role from userOrganizations
      const role = userOrg.role;

      console.log('role', role);

      return role;
    } catch (error) {
      console.error('Error fetching users for organization:', error);
      throw error;
    }
  }

  async assignRole(userId: string, organizationId: string, newRole: Role) {
    try {
      // Find the UserOrganization record for the specified user and organization
      const userOrganization = await this.prisma.userOrganization.findFirst({
        where: {
          userId,
          organizationId,
          invitationStatus: 'ACCEPTED',
        },
      });

      if (!userOrganization) {
        throw new Error('User not found in the specified organization');
      }

      // Update the role for the user in the specified organization
      const updatedUserOrganization = await this.prisma.userOrganization.update({
        where: { id: userOrganization.id },
        data: { role: newRole },
      });

      return updatedUserOrganization;
    } catch (error) {
      console.error('Error assigning role:', error);
      throw new Error('Failed to assign role');
    }
  }
}
