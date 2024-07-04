export type EmailPayload = {
  sender: string;
  recipient: string[];
  subject: string;
  html: string;
  messageId?: string;
  sendAt?: string;
};
