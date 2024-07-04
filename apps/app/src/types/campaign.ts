export type Campaign = {
  id: string
  name: string
  sender: string
  emailRecipients: string[]
  subject: string
  emailTemplateId: string
  sendAt: Date
  messageId: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export type CampaignResponse = {
  total: number
  pages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  nextPage: number | null
  previousPage: number | null
  page: number
  limit: number
  data: Campaign[]
}

export type NewCampaign = {
  name: string
  sender: string
  emailRecipients: string[]
  subject: string
  sendAt: Date
  emailTemplateId: string
  createdBy: string
}
