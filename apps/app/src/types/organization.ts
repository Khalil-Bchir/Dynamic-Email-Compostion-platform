export type Organization = {
  id: string
  name: string
  user: string
}

export type CreateOrganization = {
  name: string
  user: string
}

export type InviteUser = {
  organizationId: string
  emails: string[]
}

export type userOrg = {
  id: string
  email: string
  role: string
  userOrg: string
}
