export type OrganizationPayload = {
  name: string;
  user: string;
};

export type InviteUserPayload = {
  organizationId: string;
  emails: string;
  role: 'Admin' | 'Member';
};
