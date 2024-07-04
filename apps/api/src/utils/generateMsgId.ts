import { v4 as uuidv4 } from 'uuid';

export const generateInvitationToken = () => {
  return uuidv4();
};

export const generateMessageId = (sender: string, uniqueId: string) => {
  const timestamp = Date.now();
  const domain = sender.split('@')[1];
  return `<${uniqueId}-${timestamp}@${domain}>`;
};
