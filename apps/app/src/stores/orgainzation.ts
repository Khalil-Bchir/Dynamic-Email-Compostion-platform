import { defineStore } from 'pinia'
import type { Organization, CreateOrganization, InviteUser, userOrg } from '@/types'
import api from '@/services/api'
import type { ServerError } from '@/types/server'

export const useOrgStore = defineStore({
  id: 'org-store',
  state: () => ({
    isLoading: false,
    error: null as ServerError | null,
    message: null as string | null,
    organization: null as Organization | null,
    organizations: [] as Organization[],
    users: [] as userOrg[],
    role: null as string | null
  }),
  actions: {
    async createOrganization(payload: CreateOrganization) {
      this.isLoading = true
      this.error = null
      try {
        const response = await api.post('/organization/create', payload)
        this.organization = response.data
        this.message = 'Organization created successfully'
      } catch (error) {
        this.error = (error as any).response?.data || { message: 'Failed to create organization' }
      } finally {
        this.isLoading = false
      }
    },

    async inviteUsersToOrganization(payload: InviteUser) {
      this.isLoading = true
      this.error = null
      try {
        const response = await api.post('/organization/invite', payload)
        this.message = response.data.message
      } catch (error) {
        this.error = (error as any).response?.data || { message: 'Failed to invite user' }
      } finally {
        this.isLoading = false
      }
    },

    async acceptInvitation(invitationToken: string) {
      this.isLoading = true
      this.error = null
      try {
        const response = await api.post('/organization/accept-invitation', { invitationToken })
        this.message = response.data.message
      } catch (error) {
        this.error = (error as any).response?.data || { message: 'Failed to accept invitation' }
      } finally {
        this.isLoading = false
      }
    },

    async deactivateUser(id: string) {
      this.isLoading = true
      this.error = null
      try {
        const response = await api.put(`/organization/deactivate/${id}`)
        this.message = response.data.message
      } catch (error) {
        this.error = (error as any).response?.data || { message: 'Failed to remove user' }
      } finally {
        this.isLoading = false
      }
    },

    async fetchOrganizations(id: string) {
      this.isLoading = true
      this.error = null
      try {
        const response = await api.get(`/organization/user/${id}`)
        this.organizations = response.data
        return response.data
      } catch (error) {
        this.error = (error as any).response?.data || { message: 'Failed to fetch organizations' }
      } finally {
        this.isLoading = false
      }
    },

    async fetchOrganizationById(id: string) {
      this.isLoading = true
      this.error = null
      try {
        const response = await api.get(`/organization/${id}`)
        this.organization = response.data
      } catch (error) {
        this.error = (error as any).response?.data || { message: 'Failed to fetch organization' }
      } finally {
        this.isLoading = false
      }
    },

    async updateOrganization(id: string, payload: Organization) {
      this.isLoading = true
      this.error = null
      try {
        const response = await api.put(`/organization/${id}`, payload)
        this.organization = response.data
        this.message = 'Organization updated successfully'
      } catch (error) {
        this.error = (error as any).response?.data || { message: 'Failed to update organization' }
      } finally {
        this.isLoading = false
      }
    },

    async deleteOrganization(id: string) {
      this.isLoading = true
      this.error = null
      try {
        await api.delete(`/organization/${id}`)
        this.message = 'Organization deleted successfully'
        this.organization = null
      } catch (error) {
        this.error = (error as any).response?.data || { message: 'Failed to delete organization' }
      } finally {
        this.isLoading = false
      }
    },

    async fetchUsersByOrganization(organizationId: string) {
      this.isLoading = true
      this.error = null
      try {
        const response = await api.get(`/organization/${organizationId}/users`)
        this.users = response.data
        return response.data
      } catch (error) {
        this.error = (error as any).response?.data || { message: 'Failed to fetch users' }
      } finally {
        this.isLoading = false
      }
    },

    async fetchUserRole(userId: string, organizationId: string) {
      this.isLoading = true
      this.error = null
      try {
        const response = await api.get(`/organization/${organizationId}/users/${userId}/role`)
        this.role = response.data
        return response.data
      } catch (error) {
        this.error = (error as any).response?.data || { message: 'Failed to fetch user role' }
      } finally {
        this.isLoading = false
      }
    },

    async assignRole(userId: string, organizationId: string, role: string) {
      this.isLoading = true
      this.error = null
      try {
        const response = await api.put(`/organization/${organizationId}/users/${userId}/role`, {
          role
        })
        this.message = 'Role assigned successfully'
        return response.data
      } catch (error) {
        this.error = (error as any).response?.data || { message: 'Failed to assign role' }
      } finally {
        this.isLoading = false
      }
    }
  }
})
