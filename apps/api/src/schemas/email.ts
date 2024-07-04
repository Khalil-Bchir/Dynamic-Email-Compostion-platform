export const EmailSchema = {
  send: {
    tags: ['mailing'],
    body: {
      type: 'object',
      required: ['recipient', 'html'],
      properties: {
        recipient: { type: 'array', items: { type: 'string' } },
        bcc: { type: 'array', items: { type: 'string' } },
        cc: { type: 'array', items: { type: 'string' } },
        subject: { type: 'string' },
        html: { type: 'string' },
      },
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
        },
      },
      '4xx': {
        type: 'object',
        properties: {
          status: { type: 'number' },
          code: { type: 'string' },
          message: { type: 'string' },
        },
      },
      '5xx': {
        description: 'Error response',
        type: 'object',
        properties: {
          success: { type: 'boolean', default: false },
          code: { type: 'string' },
          message: { type: 'string' },
        },
      },
    },
  },
  event: {
    tags: ['event'],
    body: {
      type: 'object',
      required: ['type', 'messageId'],
      properties: {
        type: { type: 'string' },
        messageId: { type: 'string' },
      },
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          received: { type: 'boolean' },
        },
      },
      '4xx': {
        type: 'object',
        properties: {
          status: { type: 'number' },
          code: { type: 'string' },
          message: { type: 'string' },
        },
      },
      '5xx': {
        description: 'Error response',
        type: 'object',
        properties: {
          success: { type: 'boolean', default: false },
          code: { type: 'string' },
          message: { type: 'string' },
        },
      },
    },
  },
  getByMessageId: {
    tags: ['event'],
    params: {
      type: 'object',
      properties: {
        event_id: { type: 'string' },
      },
      required: ['event_id'],
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          event_id: { type: 'string' },
          id: { type: 'number' },
          event: { type: 'string' },
          email: { type: 'string' },
          'message-id': { type: 'string' },
          date: { type: 'string', format: 'date-time' },
          ts: { type: 'number' },
          ts_event: { type: 'number' },
          subject: { type: 'string' },
          'X-Mailin-custom': { type: 'string', nullable: true },
          sending_ip: { type: 'string' },
          ts_epoch: { type: 'number' },
          template_id: { type: 'string', nullable: true },
          tags: { type: 'array', items: { type: 'string' } },
          link: { type: 'string', nullable: true },
          sender_email: { type: 'string' },
        },
      },
      '4xx': {
        type: 'object',
        properties: {
          status: { type: 'number' },
          code: { type: 'string' },
          message: { type: 'string' },
        },
      },
      '5xx': {
        description: 'Error response',
        type: 'object',
        properties: {
          success: { type: 'boolean', default: false },
          code: { type: 'string' },
          message: { type: 'string' },
        },
      },
    },
  },
};
