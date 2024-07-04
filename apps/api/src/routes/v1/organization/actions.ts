import { Role } from '@saas-monorepo/database';
import { FastifyPluginAsync } from 'fastify';

import { InviteUserPayload, OrganizationPayload } from '../../..//types/organization.js';
import { organizationSchema } from '../../../schemas/index.js';
import { OrganizationService } from '../../../services/organization.js';

const routes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const { prisma } = fastify;
  const organizationService = new OrganizationService({ prisma });

  fastify.post<{ Body: OrganizationPayload }>(
    '/create',
    {
      schema: organizationSchema.create,
    },
    async (request, reply) => {
      try {
        const data = await organizationService.createOrganization(request.body);
        return reply.code(200).send(data);
      } catch (err) {
        console.error('Error during organization creation:', err);
        reply.code(500).send(err);
      }
    },
  );

  fastify.post<{ Body: InviteUserPayload }>(
    '/invite',
    {
      schema: organizationSchema.invite,
    },
    async (request, reply) => {
      try {
        const data = await organizationService.inviteUsersToOrganization(request.body);
        return reply.code(200).send(data);
      } catch (err) {
        console.error('Error during user invitation:', err);
        reply.code(500).send({ message: 'Failed to invite user to organization' });
      }
    },
  );

  fastify.post<{ Body: { invitationToken: string } }>(
    '/accept-invitation',
    {
      schema: organizationSchema.acceptInvitation,
    },
    async (request, reply) => {
      try {
        const { invitationToken } = request.body;
        const data = await organizationService.acceptInvitation(invitationToken);
        return reply.code(200).send(data);
      } catch (err) {
        console.error('Error during invitation acceptance:', err);
        reply.code(500).send({ message: 'Failed to accept invitation' });
      }
    },
  );

  fastify.get<{ Params: { userId: string } }>(
    '/user/:userId',
    {
      schema: organizationSchema.all,
    },
    async (request, reply) => {
      try {
        const userId = request.params.userId; // Assuming you can access the user's ID from the request
        const organizations = await organizationService.getAllOrganizations(userId);
        return reply.code(200).send(organizations);
      } catch (err) {
        console.error('Error getting all organizations:', err);
        reply.code(500).send(err);
      }
    },
  );

  fastify.put<{ Params: { id: string } }>(
    '/deactivate/:id',
    {
      schema: organizationSchema.deactivateUser,
    },
    async (request, reply) => {
      const { id } = request.params;
      try {
        const updatedOrganization = await organizationService.deactivateUser(id);
        return reply.code(200).send(updatedOrganization);
      } catch (err) {
        console.error('Error deactivating user:', err);
        reply.code(500).send(err);
      }
    },
  );

  fastify.get<{ Params: { id: string } }>(
    '/:id',
    {
      schema: organizationSchema.byId,
    },
    async (request, reply) => {
      const { id } = request.params;
      try {
        const organization = await organizationService.getOrganization(id);
        if (!organization) {
          reply.code(404).send('Organization not found');
        }
        return reply.code(200).send(organization);
      } catch (err) {
        console.error('Error getting organization by ID:', err);
        reply.code(500).send(err);
      }
    },
  );

  fastify.put<{ Params: { id: string }; Body: OrganizationPayload }>(
    '/:id',
    {
      schema: organizationSchema.update,
    },
    async (request, reply) => {
      const { id } = request.params;
      const { body } = request;
      try {
        const updatedOrganization = await organizationService.updateOrganization(id, body);
        return reply.code(200).send(updatedOrganization);
      } catch (err) {
        console.error('Error updating organization:', err);
        reply.code(500).send(err);
      }
    },
  );

  fastify.delete<{ Params: { id: string } }>(
    '/:id',
    {
      schema: organizationSchema.delete,
    },
    async (request, reply) => {
      const { id } = request.params;
      try {
        await organizationService.deleteOrganization(id);
        return reply.code(204).send();
      } catch (err) {
        console.error('Error deleting organization:', err);
        reply.code(500).send(err);
      }
    },
  );

  fastify.get<{ Params: { organizationId: string } }>(
    '/:organizationId/users',
    {
      schema: organizationSchema.getUsersByOrganization,
    },
    async (request, reply) => {
      const { organizationId } = request.params;
      try {
        const users = await organizationService.getUsersByOrganization(organizationId);
        return reply.code(200).send(users);
      } catch (err) {
        console.error('Error getting users by organization:', err);
        reply.code(500).send(err);
      }
    },
  );

  fastify.get<{ Params: { organizationId: string; userId: string } }>(
    '/:organizationId/users/:userId/role',
    {
      schema: organizationSchema.getUsersRole,
    },
    async (request, reply) => {
      const { organizationId, userId } = request.params;
      try {
        const users = await organizationService.getUsersRole(organizationId, userId);
        return reply.code(200).send(users);
      } catch (err) {
        console.error('Error getting users by organization:', err);
        reply.code(500).send(err);
      }
    },
  );

  fastify.put<{ Params: { userId: string; organizationId: string }; Body: { role: Role } }>(
    '/:organizationId/users/:userId/role',
    {
      schema: organizationSchema.assignRole,
    },
    async (request, reply) => {
      const { userId, organizationId } = request.params;
      const { role } = request.body;
      try {
        const updatedUserOrganization = await organizationService.assignRole(
          userId,
          organizationId,
          role,
        );
        return reply.code(200).send(updatedUserOrganization);
      } catch (err) {
        console.error('Error assigning role:', err);
        reply.code(500).send(err);
      }
    },
  );
};

export default routes;
