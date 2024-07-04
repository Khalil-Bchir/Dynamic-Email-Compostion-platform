import Static from '@fastify/static';
import { FastifyPluginAsync } from 'fastify';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';
import { fileURLToPath } from 'url';
import util from 'util';

import { mediaSchema } from '../../../schemas/index.js';
import { MediaService } from '../../../services/media.js';
import { MediaUploadPayload } from '../../../types/media.js';

const pump = util.promisify(pipeline);

// Define the routes
const routes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const { prisma } = fastify;
  const mediaService = new MediaService({ prisma });

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Register the @fastify/static plugin to serve static files
  fastify.register(Static, {
    root: path.join(__dirname, '../../../uploads'),
    prefix: '/media/', // Files will be served under /api/media/ prefix
  });

  fastify.post<{ Params: { createdBy: string }; Body: MediaUploadPayload }>(
    '/upload/:createdBy',
    {
      schema: mediaSchema.upload,
    },
    async (request, reply) => {
      try {
        const data = (request.body as any).file;
        const { createdBy } = request.params;

        if (!data) {
          throw new Error('File data is undefined');
        }

        const uploadDir = path.join(__dirname, '../../../uploads');
        console.log('Upload directory:', uploadDir);
        fs.mkdirSync(uploadDir, { recursive: true });
        const fileBuffer = await data.toBuffer();
        const filePath = path.join(uploadDir, data.filename);
        await fs.promises.writeFile(filePath, fileBuffer);

        const media = await mediaService.create({
          file: {
            filename: data.filename,
            mimetype: data.mimetype,
          },
          createdBy,
        });
        reply.code(200).send(media);
      } catch (err) {
        console.error('Error during uploading file:', err);
        reply.code(500).send({ error: 'Failed to upload file', details: (err as Error).message });
      }
    },
  );

  fastify.get<{ Params: { filename: string } }>(
    '/:filename',
    {
      schema: mediaSchema.getById,
    },
    async (request, reply) => {
      try {
        // Use the mediaService to get the media record from the database
        const media = await mediaService.getById(request.params.filename);

        // Ensure the file exists
        const filePath = path.join(__dirname, '../../../uploads', media.filename);
        if (!fs.existsSync(filePath)) {
          throw new Error('File does not exist');
        }

        // Set the appropriate headers and send the file
        reply.header('Content-Type', media.mimetype);
        return reply.sendFile(media.filename, path.join(__dirname, '../../../uploads'));
      } catch (err) {
        console.error('Error during serving file:', err);
        reply.code(500).send({ error: 'Failed to serve file' });
      }
    },
  );

  fastify.get<{ Params: { createdById: string } }>(
    '/organization/:createdById',
    {
      schema: mediaSchema.getAll,
    },
    async (request, reply) => {
      try {
        const allMedia = await mediaService.getAll(request.params.createdById);
        reply.code(200).send(allMedia);
      } catch (err) {
        console.error('Error during retrieving all media:', err);
        reply.code(500).send({ error: 'Failed to retrieve media' });
      }
    },
  );
};

// Export the routes
export default routes;
