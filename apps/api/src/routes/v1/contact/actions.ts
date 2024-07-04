import { FastifyPluginAsync } from 'fastify';

import { contactSchema } from '../../../schemas/index.js';
import { ContactService } from '../../../services/contact.js';
import { ContactPayload } from '../../../types/contact.js';

const routes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const { prisma } = fastify;
  const contactService = new ContactService({ prisma });

  // Create a contact
  fastify.post<{ Body: ContactPayload }>(
    '/create',
    {
      schema: contactSchema.create,
    },
    async (request, reply) => {
      try {
        const data = await contactService.createContact(request.body);
        return reply.code(200).send(data);
      } catch (err) {
        console.error('Error during contact creation:', err);
        reply.code(500).send(err);
      }
    },
  );

  // Get all contacts
  fastify.get<{ Params: { createdById: string } }>(
    '/organization/:createdById',
    {
      schema: contactSchema.getAllContactsSchema,
    },
    async (request, reply) => {
      try {
        const contacts = await contactService.getAllContacts(request.params.createdById);
        return reply.code(200).send(contacts);
      } catch (err) {
        console.error('Error getting all contacts:', err);
        reply.code(500).send(err);
      }
    },
  );

  // Get a contact by ID
  fastify.get<{ Params: { id: string } }>(
    '/:id',
    {
      schema: contactSchema.getContactSchema,
    },
    async (request, reply) => {
      const { id } = request.params;
      try {
        const contact = await contactService.getContact(id);
        return reply.code(200).send(contact);
      } catch (err) {
        console.error(`Error getting contact with ID ${id}:`, err);
        reply.code(500).send(err);
      }
    },
  );

  // Update a contact
  fastify.put<{ Params: { id: string }; Body: ContactPayload }>(
    '/:id',
    {
      schema: contactSchema.updateContactSchema,
    },
    async (request, reply) => {
      const { id } = request.params;
      try {
        const updatedContact = await contactService.updateContact(id, request.body);
        return reply.code(200).send(updatedContact);
      } catch (err) {
        console.error(`Error updating contact with ID ${id}:`, err);
        reply.code(500).send(err);
      }
    },
  );

  // Delete a contact
  fastify.delete<{ Params: { id: string } }>(
    '/:id',
    {
      schema: contactSchema.deleteContactSchema,
    },
    async (request, reply) => {
      const { id } = request.params;
      try {
        await contactService.deleteContact(id);
        return reply.code(200).send({ message: `Contact with ID ${id} deleted successfully` });
      } catch (err) {
        console.error(`Error deleting contact with ID ${id}:`, err);
        reply.code(500).send(err);
      }
    },
  );
};

export default routes;
