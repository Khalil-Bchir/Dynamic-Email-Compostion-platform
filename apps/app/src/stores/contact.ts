import { defineStore } from 'pinia'
import { type Contact } from '../types/contact'
import api from '@/services/api'
import type { ServerError } from '@/types/server'

export const useContactStore = defineStore({
  id: 'contact-store',
  state: () => ({
    isLoading: false,
    error: null as ServerError | null,
    message: null as string | null,
    contacts: [] as Contact[]
  }),
  actions: {
    async createContact(contactData: Contact) {
      try {
        this.isLoading = true
        const response = await api.post('/contact/create', contactData)
        this.isLoading = false
        this.message = response.data.message
      } catch (error) {
        this.isLoading = false
        this.error = (error as any).response?.data
      }
    },

    async getContact(contactId: string) {
      try {
        this.isLoading = true
        const response = await api.get(`/contact/${contactId}`)
        this.isLoading = false
        return response.data
      } catch (error) {
        this.isLoading = false
        this.error = (error as any).response?.data
        return null
      }
    },

    async getAllContacts(organizationId: string) {
      try {
        this.isLoading = true
        const response = await api.get(`/contact/organization/${organizationId}`)
        this.isLoading = false
        return response.data
      } catch (error) {
        this.isLoading = false
        this.error = (error as any).response?.data
        return null
      }
    }
  }
})
