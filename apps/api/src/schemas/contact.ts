export const contactSchema = {
  create: {
    tags: ['Contact'],
    body: {
      type: 'object',
      properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
      },
      required: ['firstName', 'lastName', 'email', 'phone'],
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          id: { type: 'string' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          email: { type: 'string' },
          phone: { type: 'string' },
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
  getAllContactsSchema: {
    tags: ['Contact'],
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
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' },
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
  getContactSchema: {
    tags: ['Contact'],
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
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          email: { type: 'string' },
          phone: { type: 'string' },
        },
      },
      404: {
        description: 'Contact not found',
        type: 'object',
        properties: {
          status: { type: 'number', default: 404 },
          code: { type: 'string' },
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
  updateContactSchema: {
    tags: ['Contact'],
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
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
      },
      required: ['firstName', 'lastName', 'email', 'phone'],
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          email: { type: 'string' },
          phone: { type: 'string' },
        },
      },
      404: {
        description: 'Contact not found',
        type: 'object',
        properties: {
          status: { type: 'number', default: 404 },
          code: { type: 'string' },
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
  deleteContactSchema: {
    tags: ['Contact'],
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
          message: { type: 'string', default: 'Contact deleted successfully' },
        },
      },
      404: {
        description: 'Contact not found',
        type: 'object',
        properties: {
          status: { type: 'number', default: 404 },
          code: { type: 'string' },
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
};
