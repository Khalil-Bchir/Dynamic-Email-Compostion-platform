import { PrismaClient } from '@saas-monorepo/database';
import { TemplatePayload } from 'src/types/templates.js';

import { AbstractServiceOptions } from '../types/services.js';

export class TemplateService {
  prisma: PrismaClient;

  constructor(options: AbstractServiceOptions) {
    this.prisma = options.prisma;
  }

  async createTemplate(payload: TemplatePayload) {
    try {
      const template = await this.prisma.emailTemplate.create({
        data: {
          content: payload.content,
          createdBy: {
            connect: {
              id: payload.createdBy,
            },
          },
        },
      });
      return template;
    } catch (error) {
      throw error;
    }
  }

  async getTemplate(templateId: string) {
    try {
      const template = await this.prisma.emailTemplate.findUnique({
        where: { id: templateId },
      });
      return template;
    } catch (error) {
      throw error;
    }
  }

  async getAllTemplates(createdById: string) {
    try {
      const templates = await this.prisma.emailTemplate.findMany({
        where: { createdById: createdById },
      });
      return templates;
    } catch (error) {
      throw error;
    }
  }

  async updateTemplate(templateId: string, payload: TemplatePayload) {
    try {
      const updateData: any = {
        content: payload.content,
      };

      if (payload.createdBy) {
        updateData.createdBy = {
          connect: {
            id: payload.createdBy,
          },
        };
      }

      const updatedTemplate = await this.prisma.emailTemplate.update({
        where: { id: templateId },
        data: updateData,
      });
      return updatedTemplate;
    } catch (error) {
      throw error;
    }
  }
}
