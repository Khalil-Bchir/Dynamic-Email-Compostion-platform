export const mediaSchema = {
  upload: {
    tags: ['Media'],
    consumes: ['multipart/form-data'],
    body: {
      type: 'object',
      properties: {
        file: { type: 'object', additionalProperties: true },
      },
      required: ['file'],
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          id: { type: 'string' },
          file: { type: 'object' },
          createdAt: { type: 'string' },
          updatedAt: { type: 'string' },
        },
      },
      500: {
        description: 'Error response',
        type: 'object',
        properties: {
          status: { type: 'number', default: 500 },
          code: { type: 'string' },
          message: { type: 'string' },
        },
      },
    },
  },
  getById: {
    tags: ['Media'],
    params: {
      type: 'object',
      properties: {
        filename: { type: 'string' },
      },
      required: ['filename'],
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          id: { type: 'string' },
          filename: { type: 'string' },
          mimetype: { type: 'string' },
          createdById: { type: 'string' },
          createdAt: { type: 'string' },
          updatedAt: { type: 'string' },
        },
      },
      404: {
        description: 'Media not found',
        type: 'object',
        properties: {
          status: { type: 'number', default: 404 },
          message: { type: 'string' },
        },
      },
      500: {
        description: 'Error response',
        type: 'object',
        properties: {
          status: { type: 'number', default: 500 },
          code: { type: 'string' },
          message: { type: 'string' },
        },
      },
    },
  },
  getAll: {
    tags: ['Media'],
    params: {
      type: 'object',
      properties: {
        createdById: { type: 'string' },
      },
      required: ['createdById'],
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            filename: { type: 'string' },
            mimetype: { type: 'string' },
            createdById: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
          },
        },
      },
      500: {
        description: 'Error response',
        type: 'object',
        properties: {
          status: { type: 'number', default: 500 },
          code: { type: 'string' },
          message: { type: 'string' },
        },
      },
    },
  },
};
