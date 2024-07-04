import { FastifyPluginAsync } from 'fastify';

import { campaignSchema } from '../../../schemas/index.js';
import { CampaignService } from '../../../services/campaign.js';
import { CampaignPayload } from '../../../types/campaign.js';

const routes: FastifyPluginAsync = async (fastify, opts) => {
  const { prisma } = fastify;
  const campaignService = new CampaignService({ prisma });

  fastify.post<{ Body: CampaignPayload }>(
    '/create',
    {
      schema: campaignSchema.create,
    },
    async (request, reply) => {
      try {
        const data = await campaignService.createCampaign(request.body);
        return reply.code(200).send(data);
      } catch (err) {
        console.error('Error during campaign creation:', err);
        reply.code(500).send(err);
      }
    },
  );

  fastify.get<{ Params: { id: string } }>(
    '/:id',
    {
      schema: campaignSchema.get,
    },
    async (request, reply) => {
      try {
        const campaignId = request.params.id;
        const campaign = await campaignService.getCampaign(campaignId);
        return reply.code(200).send(campaign);
      } catch (err) {
        console.error('Error fetching campaign:', err);
        reply.code(500).send(err);
      }
    },
  );

  fastify.get<{ Querystring: { page: number; limit: number }; Params: { createdById: string } }>(
    '/org/:createdById',
    {
      schema: campaignSchema.getAll,
    },
    async (request, reply) => {
      try {
        const createdById = request.params.createdById;
        const { page, limit } = request.query;

        // Validate and parse query parameters
        const parsedPage = parseInt(page.toString(), 10);
        const parsedLimit = parseInt(limit.toString(), 10);

        if (isNaN(parsedPage) || isNaN(parsedLimit) || parsedPage < 1 || parsedLimit < 1) {
          return reply.code(400).send({ error: 'Invalid page or limit' });
        }

        const allCampaigns = await campaignService.getAllCampaigns(
          parsedPage,
          parsedLimit,
          createdById,
        );
        return reply.code(200).send(allCampaigns);
      } catch (err) {
        console.error('Error fetching all campaigns:', err);
        return reply.code(500).send({ error: 'Internal Server Error' });
      }
    },
  );
};

export default routes;
