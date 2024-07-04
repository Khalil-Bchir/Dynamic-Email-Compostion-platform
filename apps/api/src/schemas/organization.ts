export const organizationSchema = {
  create: {
    tags: ['Organization'],
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
      },
      required: ['name'],
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
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
  all: {
    tags: ['Organization'],
    response: {
      200: {
        description: 'Successful response',
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
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
  byId: {
    tags: ['Organization'],
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
        },
      },
      404: {
        description: 'Organization not found',
        type: 'object',
        properties: {
          status: { type: 'number', default: 404 },
          message: { type: 'string', default: 'Organization not found' },
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
    tags: ['Organization'],
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
        name: { type: 'string' },
      },
      required: ['name'],
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
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
  delete: {
    tags: ['Organization'],
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
      required: ['id'],
    },
    response: {
      204: {
        description: 'Successful response',
        type: 'object',
        properties: {
          message: { type: 'string', default: 'Organization deleted successfully' },
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
  invite: {
    tags: ['Organization Invitation'],
    body: {
      type: 'object',
      properties: {
        organizationId: { type: 'string' },
        emails: {
          type: 'array',
          items: { type: 'string', format: 'email' },
        },
      },
      required: ['organizationId', 'emails'],
    },
    response: {
      200: {
        description: 'Invitation sent successfully',
        type: 'object',
        properties: {
          id: { type: 'string' },
          userId: { type: 'string' },
          organizationId: { type: 'string' },
          role: { type: 'string' },
          invitationStatus: { type: 'string' },
          invitationToken: { type: 'string' },
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
  acceptInvitation: {
    tags: ['Organization Invitation'],
    body: {
      type: 'object',
      properties: {
        invitationToken: { type: 'string' },
      },
      required: ['invitationToken'],
    },
    response: {
      200: {
        description: 'Invitation accepted successfully',
        type: 'object',
        properties: {
          id: { type: 'string' },
          userId: { type: 'string' },
          organizationId: { type: 'string' },
          role: { type: 'string' },
          invitationStatus: { type: 'string' },
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
  deactivateUser: {
    tags: ['Organization Invitation'],
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
    },
    response: {
      200: {
        description: 'User organization deactivated successfully',
        type: 'object',
        properties: {
          id: { type: 'string' },
          userId: { type: 'string' },
          organizationId: { type: 'string' },
          role: { type: 'string' },
          invitationStatus: { type: 'string' },
        },
      },
      400: {
        description: 'Bad request',
        type: 'object',
        properties: {
          status: { type: 'number', default: 400 },
          error: { type: 'string' },
        },
      },
      404: {
        description: 'User organization not found',
        type: 'object',
        properties: {
          status: { type: 'number', default: 404 },
          error: { type: 'string' },
        },
      },
      500: {
        description: 'Internal server error',
        type: 'object',
        properties: {
          status: { type: 'number', default: 500 },
          error: { type: 'string' },
        },
      },
    },
  },
  getUsersByOrganization: {
    tags: ['Organization'],
    params: {
      type: 'object',
      properties: {
        organizationId: { type: 'string' },
      },
      required: ['organizationId'],
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            userOrg: { type: 'string' },
            email: { type: 'string' },
            role: { type: 'string' },
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
  getUsersRole: {
    tags: ['Organization'],
    params: {
      type: 'object',
      properties: {
        organizationId: { type: 'string' },
        userId: { type: 'string' },
      },
      required: ['organizationId', 'userId'],
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'object', // Change to object type
        properties: {
          role: { type: 'string' },
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
  assignRole: {
    tags: ['Organization'],
    params: {
      type: 'object',
      properties: {
        userId: { type: 'string' },
      },
      required: ['userId'],
    },
    body: {
      type: 'object',
      properties: {
        role: { type: 'string', enum: ['Admin', 'Member'] },
      },
      required: ['role'],
    },
    response: {
      200: {
        description: 'Role assigned successfully',
        type: 'object',
        properties: {
          id: { type: 'string' },
          userId: { type: 'string' },
          organizationId: { type: 'string' },
          role: { type: 'string' },
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
