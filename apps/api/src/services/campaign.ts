import { Contact, PrismaClient } from '@saas-monorepo/database';
import cuid from 'cuid';

import { CampaignPayload } from '../types/campaign.js';
import { EmailPayload } from '../types/email.js';
import { AbstractServiceOptions } from '../types/services.js';
import { generateMessageId } from '../utils/generateMsgId.js';
import { convertMjmlToHtml } from '../utils/json-to-html.js';
import { sendEmail } from '../utils/mailing-transporter.js';

export class CampaignService {
  prisma: PrismaClient;

  constructor(options: AbstractServiceOptions) {
    this.prisma = options.prisma;
  }

  async createCampaign(payload: CampaignPayload) {
    try {
      // Check if email template exists
      let emailTemplateContent = '';
      let content = '';

      const convertMjmlToHtmlContent = (mjmlContent: string) => {
        const mjml = JSON.parse(mjmlContent);
        return convertMjmlToHtml(mjml);
      };

      if (payload.emailTemplateId) {
        const emailTemplate = await this.prisma.emailTemplate.findUnique({
          where: { id: payload.emailTemplateId },
        });

        if (!emailTemplate) {
          throw new Error('The specified email template does not exist.');
        }

        emailTemplateContent = emailTemplate.content?.toString() || 'test content';
        console.log('template', emailTemplateContent);
        content = convertMjmlToHtmlContent(emailTemplateContent);
        console.log('content', content);
      }

      const generatedUUID = cuid();
      const generatedMsgId = generateMessageId(payload.sender, generatedUUID);

      // Construct email payload
      const emailPayload: EmailPayload = {
        sender: payload.sender,
        recipient: payload.emailRecipients.map((email) => email.toLowerCase()),
        subject: payload.subject,
        html: content,
        messageId: generatedMsgId,
      };

      // Send email
      const sentEmail = await sendEmail(emailPayload);
      console.log('Email sent:', sentEmail);

      // Fetch contacts
      const contacts: Contact[] = await this.prisma.contact.findMany({
        where: { email: { in: payload.emailRecipients.map((email) => email.toLowerCase()) } },
      });

      // Check if all recipients exist
      if (contacts.length !== payload.emailRecipients.length) {
        console.log('Contacts:', contacts);
        throw new Error('One or more recipients do not exist in the database.');
      }

      // Create the campaign with the retrieved recipients
      const campaign = await this.prisma.campaign.create({
        data: {
          id: generatedUUID,
          name: payload.name,
          sender: payload.sender,
          subject: payload.subject,
          emailRecipients: {
            createMany: {
              data: contacts.map((contact) => ({ contactId: contact.id })),
            },
          },
          sendAt: payload.sendAt,
          emailTemplateId: payload.emailTemplateId,
          messageId: generatedMsgId,
          createdById: payload.createdBy,
        },
        include: { emailRecipients: true },
      });

      return campaign;
    } catch (error) {
      throw error;
    }
  }

  async getCampaignByMessageId(messageId: string) {
    try {
      const campaign = await this.prisma.campaign.findUnique({
        where: { messageId },
        include: { emailRecipients: true },
      });
      return campaign;
    } catch (error) {
      throw error;
    }
  }

  async getCampaign(campaignId: string) {
    try {
      const campaign = await this.prisma.campaign.findUnique({
        where: { id: campaignId },
        include: { emailRecipients: true },
      });

      console.log(campaign);

      return { ...campaign };
    } catch (error) {
      throw error;
    }
  }

  async getAllCampaigns(page: number, limit: number, createdById: string) {
    try {
      const total = await this.prisma.campaign.count();
      const pages = limit > 0 ? Math.ceil(total / limit) || 1 : 1;
      const hasNextPage = page < pages;
      const hasPreviousPage = page > 1;
      const nextPage = hasNextPage ? page + 1 : null;
      const previousPage = hasPreviousPage ? page - 1 : null;

      const campaigns = await this.prisma.campaign.findMany({
        where: { createdById: createdById },
        skip: (page - 1) * limit,
        take: limit,
        include: { emailRecipients: true },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return {
        total,
        pages,
        hasNextPage,
        hasPreviousPage,
        nextPage,
        previousPage,
        page,
        limit,
        data: campaigns,
      };
    } catch (error) {
      throw error;
    }
  }
}
