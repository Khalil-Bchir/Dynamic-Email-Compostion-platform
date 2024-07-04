export type CampaignPayload = {
  id: String;
  name: string;
  sender: string;
  emailRecipients: string[];
  subject: string;
  sendAt?: Date;
  emailTemplateId: string;
  messageId: string;
  createdBy: string;
};

export interface QueryParams {
  page?: string;
  limit?: string;
}
