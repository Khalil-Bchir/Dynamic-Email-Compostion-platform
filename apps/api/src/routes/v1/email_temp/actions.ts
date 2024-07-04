import { FastifyPluginAsync } from 'fastify';

import { templateSchema } from '../../../schemas/index.js';
import { TemplateService } from '../../../services/templates.js';
import { TemplatePayload } from '../../../types/templates.js';

const routes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const { prisma } = fastify;
  const templateService = new TemplateService({ prisma });

  // Create a template
  fastify.post<{ Body: TemplatePayload }>(
    '/create',
    {
      schema: templateSchema.create,
    },
    async (request, reply) => {
      try {
        const data = await templateService.createTemplate(request.body);
        return reply.code(200).send(data);
      } catch (err) {
        console.error('Error during template creation:', err);
        reply.code(500).send(err);
      }
    },
  );

  // Get a template by ID
  fastify.get<{ Params: { id: string } }>(
    '/:id',
    {
      schema: templateSchema.get,
    },
    async (request, reply) => {
      try {
        const templateId = request.params.id;
        const template = await templateService.getTemplate(templateId);
        return reply.code(200).send(template);
      } catch (err) {
        console.error('Error fetching template:', err);
        reply.code(500).send(err);
      }
    },
  );

  // Get all templates
  fastify.get<{ Params: { createdById: string } }>(
    '/user/:createdById',
    {
      schema: templateSchema.getAll,
    },
    async (request, reply) => {
      try {
        const createdById = request.params.createdById;
        const templates = await templateService.getAllTemplates(createdById);
        return reply.code(200).send(templates);
      } catch (err) {
        console.error('Error fetching all templates:', err);
        reply.code(500).send(err);
      }
    },
  );

  // Update a template by ID
  fastify.put<{ Params: { id: string }; Body: TemplatePayload }>(
    '/:id',
    {
      schema: templateSchema.update,
    },
    async (request, reply) => {
      try {
        const templateId = request.params.id;
        const payload = request.body;
        const updatedTemplate = await templateService.updateTemplate(templateId, payload);
        return reply.code(200).send(updatedTemplate);
      } catch (err) {
        console.error('Error updating template:', err);
        reply.code(500).send(err);
      }
    },
  );
};

export default routes;
