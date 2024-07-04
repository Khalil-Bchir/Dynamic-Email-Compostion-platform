// mediaService.ts
import { PrismaClient } from '@saas-monorepo/database';

import { MediaUploadPayload } from '../types/media.js';
import { AbstractServiceOptions } from '../types/services.js';

// Define the MediaService class
export class MediaService {
  prisma: PrismaClient;

  constructor(options: AbstractServiceOptions) {
    this.prisma = options.prisma;
  }

  async create(payload: MediaUploadPayload) {
    try {
      // Save the media with the generated filename and organizationId if provided
      const media = await this.prisma.media.create({
        data: {
          filename: payload.file.filename,
          mimetype: payload.file.mimetype,
          createdById: payload.createdBy, // Include organizationId if provided
        },
      });
      return media;
    } catch (error) {
      console.error('Error occurred while creating media:', error);
      throw error;
    }
  }

  async getById(filename: string) {
    try {
      const media = await this.prisma.media.findUnique({
        where: { filename: filename },
      });

      if (!media) {
        throw new Error(`Media with filename ${filename} not found`);
      }

      return media;
    } catch (error) {
      console.error('Error occurred while retrieving media:', error);
      throw error;
    }
  }

  async getAll(createdById: string) {
    try {
      const media = await this.prisma.media.findMany({
        where: { createdById: createdById },
      });
      return media;
    } catch (error) {
      console.error('Error occurred while retrieving all media:', error);
      throw error;
    }
  }
}
