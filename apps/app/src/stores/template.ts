/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineStore } from 'pinia'
import type { CreateTemplate } from '../types/template'
import api from '@/services/api'
import type { ServerError } from '@/types/server'

export const useTemplateStore = defineStore({
  id: 'template-store',
  state: () => ({
    isLoading: false,
    error: null as ServerError | null,
    message: null as string | null
  }),
  actions: {
    async createTemplate(templateData: CreateTemplate) {
      try {
        this.isLoading = true
        const response = await api.post('/email_temp/create', templateData)
        this.isLoading = false
        this.message = response.data.message
        return response
      } catch (error) {
        this.isLoading = false
        this.error = (error as any).response?.data
      }
    },

    async getTemplate(templateId: string) {
      try {
        this.isLoading = true
        const response = await api.get(`/email_temp/${templateId}`)
        this.isLoading = false
        return response.data
      } catch (error) {
        this.isLoading = false
        this.error = (error as any).response?.data
        return null
      }
    },

    async getAllTemplates(createdById: string) {
      try {
        this.isLoading = true
        const response = await api.get(`/email_temp/user/${createdById}`)
        this.isLoading = false
        return response.data
      } catch (error) {
        this.isLoading = false
        this.error = (error as any).response?.data
        return null
      }
    },

    async updateTemplate(templateId: string, templateData: CreateTemplate) {
      try {
        this.isLoading = true
        const response = await api.put(`/email_temp/${templateId}`, templateData)
        this.isLoading = false
        this.message = response.data.message
      } catch (error) {
        this.isLoading = false
        this.error = (error as any).response?.data
      }
    }
  }
})
