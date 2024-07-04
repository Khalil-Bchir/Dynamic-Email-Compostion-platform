import { PrismaClient } from '@saas-monorepo/database';

import { EventPayload } from '../types/event.js';
import { AbstractServiceOptions } from '../types/services.js';

export class MailingService {
  prisma: PrismaClient;

  constructor(options: AbstractServiceOptions) {
    this.prisma = options.prisma;
  }

  async getEventsByCampaignId(campaignId: string) {
    try {
      const events = await this.prisma.event.findMany({
        where: {
          messageId: {
            startsWith: '<${campaignId}',
          },
        },
      });
      return events;
    } catch (error) {
      console.error('Error getting event data:', error);
      throw error;
    }
  }

  async saveEventData(payload: EventPayload) {
    try {
      const event = await this.prisma.event.create({
        data: {
          id: payload.id,
          event: payload.event,
          email: payload.email,
          messageId: payload['message-id'],
          date: new Date(payload.date), // Ensure date is correctly handled as a Date object
          ts: payload.ts,
          ts_event: payload.ts_event,
          subject: payload.subject,
          custom: payload['X-Mailin-custom'] || null,
          sending_ip: payload.sending_ip,
          ts_epoch: BigInt(payload.ts_epoch), // Convert to BigInt
          template_id: payload.template_id || null,
          tags: { set: payload.tags || [] },
          link: payload.link || null,
          sender_email: payload.sender_email,
        },
      });
      return event;
    } catch (error) {
      console.error('Error saving event data:', error);
      throw error;
    }
  }
}
