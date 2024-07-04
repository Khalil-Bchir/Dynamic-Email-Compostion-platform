export const templateSchema = {
  create: {
    tags: ['Template'],
    body: {
      type: 'object',
      properties: {
        content: { type: 'string' },
      },
      required: ['content'],
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          id: { type: 'string' },
          content: { type: 'string' },
          createdById: { type: 'string' },
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
  get: {
    tags: ['Template'],
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
      required: ['id'],
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          id: { type: 'string' },
          content: { type: 'string' },
          createdById: { type: 'string' },
          createdAt: { type: 'string' },
          updatedAt: { type: 'string' },
        },
      },
      404: {
        description: 'Template not found',
        type: 'object',
        properties: {
          status: { type: 'number', default: 404 },
          code: { type: 'string', default: 'TEMPLATE_NOT_FOUND' },
          message: { type: 'string', default: 'Template not found' },
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
    tags: ['Template'],
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
            content: { type: 'string' },
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
  update: {
    tags: ['Template'],
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
      required: ['id'],
    },
    body: {
      type: 'object',
      properties: {
        content: { type: 'string' },
      },
      required: ['content'],
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          id: { type: 'string' },
          content: { type: 'string' },
          createdById: { type: 'string' },
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
};
