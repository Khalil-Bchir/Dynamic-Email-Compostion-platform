/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineStore } from 'pinia'
import type { Media, UploadMedia } from '@/types'
import api from '@/services/api'
import type { ServerError } from '@/types/server'

export const useMediaStore = defineStore({
  id: 'media-store',
  state: () => ({
    isLoading: false,
    error: null as ServerError | null,
    message: null as string | null,
    media: null as Media | null
  }),
  actions: {
    async uploadMedia(mediaData: UploadMedia) {
      try {
        this.isLoading = true

        // Create a new FormData instance
        const formData = new FormData()

        // Append the file data to the FormData instance
        formData.append('file', mediaData.file)

        // Send the request to the backend
        const response = await api.post(`/media/upload/${mediaData.createdBy}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        this.isLoading = false
        this.message = response.data.message
        return response.data
      } catch (error) {
        this.isLoading = false
        this.error = (error as any).response?.data
      }
    },

    async getMediaById(filename: string) {
      try {
        this.isLoading = true
        const response = await api.get(`/media/${filename}`)
        this.isLoading = false
        return response.data
      } catch (error) {
        this.isLoading = false
        this.error = (error as any).response?.data
        return null
      }
    },

    async getAllMedia(id: string) {
      try {
        this.isLoading = true
        const response = await api.get(`/media/organization/${id}`)
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
