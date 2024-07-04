export type PageData = {
  elements: Array<PageElement>;
};

export type PageElement = {
  id: string;
  name: string;
};

export type PreviewInjectData = {
  recipient: string;
  sender: string;
  subject: string;
};