export type EventPayload = {
  id: number;
  event: string;
  email: string;
  'message-id': string;
  date: Date;
  ts: number;
  ts_event: number;
  subject: string;
  'X-Mailin-custom'?: string;
  sending_ip: string;
  ts_epoch: number;
  template_id?: string;
  tags: string[];
  link?: string;
  sender_email: string;
};
