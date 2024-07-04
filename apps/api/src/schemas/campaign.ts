export const campaignSchema = {
  create: {
    tags: ['Campaign'],
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        sender: { type: 'string' },
        emailRecipients: { type: 'array', items: { type: 'string' } },
        subject: { type: 'string' },
        emailTemplateId: { type: 'string' },
      },
      required: ['name', 'sender', 'emailRecipients', 'subject', 'emailTemplateId'],
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          sender: { type: 'string' },
          emailRecipients: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                firstName: { type: 'string' },
                lastName: { type: 'string' },
                email: { type: 'string' },
                phone: { type: 'string' },
              },
            },
          },
          subject: { type: 'string' },
          emailTemplateId: { type: 'string' },
          messageId: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' }, // Include createdAt timestamp
          updatedAt: { type: 'string', format: 'date-time' }, // Include updatedAt timestamp
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
    tags: ['Campaign'],
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
          name: { type: 'string' },
          sender: { type: 'string' },
          emailRecipients: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                firstName: { type: 'string' },
                lastName: { type: 'string' },
                email: { type: 'string' },
                phone: { type: 'string' },
              },
            },
          },
          subject: { type: 'string' },
          emailTemplateId: { type: 'string' },
          messageId: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' }, // Include createdAt timestamp
          updatedAt: { type: 'string', format: 'date-time' }, // Include updatedAt timestamp
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
    tags: ['Campaign'],
    querystring: {
      type: 'object',
      properties: {
        page: { type: 'number', minimum: 1, default: 1 },
        limit: { type: 'number', minimum: 1, default: 5 },
      },
    },
    params: {
      type: 'object',
      properties: {
        createdById: { type: 'string' },
      },
      required: ['createdById'],
    },
    response: {
      '2xx': {
        description: 'Successful response',
        type: 'object',
        properties: {
          total: { type: 'number' },
          pages: { type: 'number' },
          hasNextPage: { type: 'boolean' },
          hasPreviousPage: { type: 'boolean' },
          nextPage: { type: ['number', 'null'] },
          previousPage: { type: ['number', 'null'] },
          page: { type: 'number' },
          limit: { type: 'number' },
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                sender: { type: 'string' },
                emailRecipients: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                    },
                  },
                },
                subject: { type: 'string' },
                emailTemplateId: { type: 'string' },
                messageId: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
              },
            },
          },
        },
      },
      '5xx': {
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
