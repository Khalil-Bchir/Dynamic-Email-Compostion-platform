import { FastifyPluginAsync } from 'fastify';

import { EmailSchema } from '../../../schemas/email.js';
import { CampaignService } from '../../../services/campaign.js';
import { MailingService } from '../../../services/mailing.js';
import { EventPayload } from '../../../types/event.js';

const routes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const { prisma } = fastify;
  const campaignService = new CampaignService({ prisma });
  const mailingService = new MailingService({ prisma });

  fastify.post<{ Body: EventPayload }>('/event', async (request, reply) => {
    try {
      const event = request.body;

      // Extract the messageId from the event data
      const messageId = event['message-id'];

      // Find the campaign with the messageId from the event data
      const campaign = await campaignService.getCampaignByMessageId(messageId);

      console.log('campaign', campaign);

      if (!campaign) {
        fastify.log.info(`No campaign found for messageId: ${messageId}`);
        return reply.code(404).send({ received: false, message: 'No campaign found' });
      }

      console.log('event', event);

      // Save the event data
      const savedEvent = await mailingService.saveEventData(event);

      if (!savedEvent) {
        fastify.log.error(`Failed to save event data for messageId: ${messageId}`);
        return reply.code(500).send({ received: false, message: 'Failed to save event data' });
      }

      // Convert BigInt fields to strings before sending the response
      const responseEvent = {
        ...savedEvent,
        ts_epoch: savedEvent.ts_epoch.toString(), // Ensure BigInt is converted to string for serialization
      };

      console.log('Saved event:', responseEvent);
      return reply.code(200).send({ received: true, event: responseEvent });
    } catch (error) {
      fastify.log.error(`Error processing event: ${error}`);
      return reply.code(500).send({ received: false });
    }
  });

  fastify.post<{ Body: EventPayload }>('/event-test', async (request, reply) => {
    try {
      const event = request.body;

      // Extract the messageId from the event data
      const messageId = event['message-id'];

      // Find the campaign with the messageId from the event data
      const campaign = await campaignService.getCampaignByMessageId(messageId);

      console.log('campaign', campaign);

      if (!campaign) {
        fastify.log.info(`No campaign found for messageId: ${messageId}`);
        return reply.code(404).send({ received: false, message: 'No campaign found' });
      }

      console.log('event', event);

      // Save the event data
      const savedEvent = await mailingService.saveEventData(event);

      if (!savedEvent) {
        fastify.log.error(`Failed to save event data for messageId: ${messageId}`);
        return reply.code(500).send({ received: false, message: 'Failed to save event data' });
      }

      // Convert BigInt fields to strings before sending the response
      const responseEvent = {
        ...savedEvent,
        ts_epoch: savedEvent.ts_epoch.toString(), // Ensure BigInt is converted to string for serialization
      };

      console.log('Saved event:', responseEvent);
      return reply.code(200).send({ received: true, event: responseEvent });
    } catch (error) {
      fastify.log.error(`Error processing event: ${error}`);
      return reply.code(500).send({ received: false });
    }
  });

  fastify.get('/events', async (request, reply) => {
    try {
      // Retrieve all events using Prisma's findMany method
      const events = await prisma.event.findMany();

      // Convert BigInt fields to strings before sending the response
      const responseEvents = events.map((event) => ({
        ...event,
        ts_epoch: event.ts_epoch.toString(), // Convert BigInt to string
      }));

      return reply.code(200).send(responseEvents);
    } catch (error) {
      fastify.log.error(`Error retrieving events: ${error}`);
      return reply.code(500).send({ message: 'Error retrieving events' });
    }
  });

  fastify.get<{ Params: { id: number } }>(
    '/events/:id',

    async (request, reply) => {
      try {
        // Extract the messageId from the route parameters
        const id = request.params.id;

        // Retrieve events with the given messageId using Prisma's findMany method
        const events = await prisma.event.findMany({
          where: {
            messageId: {
              contains: `<${id}`,
            },
          },
        });

        // Convert BigInt fields to strings before sending the response
        const responseEvents = events.map((event) => ({
          ...event,
          ts_epoch: event.ts_epoch.toString(), // Convert BigInt to string
        }));

        return reply.code(200).send(responseEvents);
      } catch (error) {
        fastify.log.error(`Error retrieving events for messageId: ${error}`);
        return reply.code(500).send({ message: 'Error retrieving events' });
      }
    },
  );
};

export default routes;
