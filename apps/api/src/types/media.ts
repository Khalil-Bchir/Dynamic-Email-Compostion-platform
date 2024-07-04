export type MediaUploadPayload = {
  file: {
    filename: string;
    mimetype: string;
  };
  createdBy: string;
};
