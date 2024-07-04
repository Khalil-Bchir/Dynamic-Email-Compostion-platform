export enum Type {
  HEAD = 'head',
  BODY = 'body',
  PAGE = 'page',
  SECTION = 'section',
  COLUMN = 'column',
  COLUMNS = 'columns',
  TEXT = 'text',
  BUTTON = 'button',
  WRAPPER = 'wrapper',
  DIVIDER = 'devider',
  IMAGE = 'image',
  TITLE = 'title',
  CLASS = 'class',
  ATTRIBUTES = 'attributes',
  STYLE = 'style',
  HTML_ATTRIBUTES = 'html-attributes',
  SELECTOR = 'selector',
  GROUP = 'group',
  RAW = 'raw'
}
export type BlockType = Type

export const styleToAttributeMapping: { [key: string]: string } = {
  width: 'width',
  height: 'height',
  'max-width': 'max-width',
  'min-height': 'min-height',
  margin: 'padding', // MJML uses padding for margins
  padding: 'padding',
  'vertical-align': 'vertical-align',
  'margin-top': 'padding-top',
  'margin-right': 'padding-right',
  'margin-bottom': 'padding-bottom',
  'margin-left': 'padding-left',
  'padding-top': 'padding-top',
  'padding-right': 'padding-right',
  'padding-bottom': 'padding-bottom',
  'padding-left': 'padding-left',
  'font-family': 'font-family',
  'font-size': 'font-size',
  'font-weight': 'font-weight',
  'letter-spacing': 'letter-spacing',
  color: 'color',
  'line-height': 'line-height',
  'text-align': 'text-align',
  align: 'align',
  'text-decoration': 'text-decoration',
  'font-style': 'font-style',
  'background-color': 'background-color',
  'container-background-color': 'container-background-color',
  'background-url': 'background-url',
  'background-repeat': 'background-repeat',
  'background-size': 'background-size',
  'border-radius': 'border-radius',
  'border-width': 'border',
  'border-style': 'border',
  'border-color': 'border',
  'border-top-left-radius': 'border-radius',
  'border-top-right-radius': 'border-radius',
  'border-bottom-left-radius': 'border-radius',
  'border-bottom-right-radius': 'border-radius'
}

export const emptyCampaign = {
  name: '',
  sender: '',
  emailRecipients: [],
  subject: '',
  sendAt: new Date(), // Initialize sendAt as a Date object
  emailTemplateId: '',
  createdBy: ''
}

export const eventTypes = {
  Delivered: 'Delivered',
  Clicked: 'Clicked',
  FirstOpening: 'First Opening',
  Opened: 'Opened'
  //Deferred: 'Deferred',
  //Delivered: 'Delivered',
  //SoftBounced: 'Soft Bounced',
  //Complaint: 'Complaint',
  //HardBounced: 'Hard Bounced',
  //InvalidEmail: 'Invalid Email',
  //Blocked: 'Blocked',
  //Error: 'Error',
  //Unsubscribed: 'Unsubscribed',
  //ProxyOpen: 'Proxy Open'
}
