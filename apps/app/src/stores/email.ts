import { defineStore } from 'pinia'
import { type PageData } from '../types/pageData'
import api from '@/services/api'
import type { ServerError } from '@/types/server'

export const useEmailBuilderStore = defineStore('emailBuilder', {
  state: () => ({
    draggedElementId: '',
    isLoading: false,
    error: null as ServerError | null,
    message: null as string | null
  }),
  actions: {
    moveElement(elementId: string, targetPageData: PageData) {
      const index = targetPageData.elements.findIndex((element) => element.id === elementId)

      if (index !== -1) {
        const movedElement = targetPageData.elements.splice(index, 1)[0]
        this.draggedElementId = movedElement.id
      }
    },
    async campaignEvent(id: string) {
      try {
        this.isLoading = true
        const response = await api.get(`/mailing/events/${id}`)
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
