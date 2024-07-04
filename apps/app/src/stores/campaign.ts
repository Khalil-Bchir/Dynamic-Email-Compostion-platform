import { defineStore } from 'pinia'
import type { Campaign, NewCampaign, CampaignResponse } from '../types/campaign'
import api from '@/services/api'
import type { ServerError } from '@/types/server'

export const useCampaignStore = defineStore({
  id: 'campaign-store',
  state: () => ({
    isLoading: false,
    error: null as ServerError | null,
    message: null as string | null,
    campaigns: [] as Campaign[],
    newCampaigns: [] as NewCampaign[]
  }),
  actions: {
    addCampaign(campaign: NewCampaign) {
      this.newCampaigns.push(campaign)
      console.log(campaign)
    },
    async createCampaign(payload: NewCampaign) {
      try {
        this.isLoading = true
        const response = await api.post('/campaigns/create', payload)
        this.message = response.data.message
      } catch (error) {
        this.error = (error as any).response?.data
      } finally {
        this.isLoading = false
      }
    },
    async getCampaign(campaignId: string) {
      try {
        this.isLoading = true
        const response = await api.get(`/campaigns/${campaignId}`)
        return response.data
      } catch (error) {
        this.error = (error as any).response?.data
      } finally {
        this.isLoading = false
      }
    },
    async getAllCampaigns(
      page: number,
      limit: number,
      id: string
    ): Promise<CampaignResponse | null> {
      try {
        this.isLoading = true

        // Ensure the URL and parameters are correctly formatted
        const response = await api.get(`/campaigns/org/${id}`, {
          params: { page, limit }
        })

        this.campaigns = response.data
        return response.data
      } catch (error) {
        this.error = (error as any).response?.data
        return null
      } finally {
        this.isLoading = false
      }
    }
  }
})
