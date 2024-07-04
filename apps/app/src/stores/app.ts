import { setLanguage } from '@/lang/set-language'
import type { ServerError } from '@/types/server'
import { defineStore } from 'pinia'
import type { NewCampaign } from '@/types/campaign'

export const useAppStore = defineStore({
  id: 'app-store',
  state: () => ({
    selectedBlockStyle: null as CSSStyleDeclaration | null,
    currentStyle: null as CSSStyleDeclaration | null,
    isSideBarOpen: true,
    isHydrated: false,
    isHydrating: false,
    error: null as ServerError | null,
    selectedTemplateId: null as string | null,
    temporaryCampaign: null as NewCampaign | null,
    selectedTemplateContent: null as Record<string, any> | null,
    selectedImgSrc: null as string | null,
    orgId: localStorage.getItem('orgId') || null,
    role: localStorage.getItem('Role') || null
  }),
  actions: {
    async hydrate() {
      await setLanguage('en')
    },
    async dehydrate() {
      this.$reset()
    },
    toggleSideBar() {
      this.isSideBarOpen = !this.isSideBarOpen
    },
    closeSideBar() {
      this.isSideBarOpen = false
    },
    openSideBar() {
      this.isSideBarOpen = true
    },
    setSelectedBlockStyle(style: CSSStyleDeclaration) {
      this.selectedBlockStyle = style
    },
    setCurrentStyle(style: CSSStyleDeclaration) {
      this.currentStyle = style
    },

    setSelectedImgSrc(url: string) {
      this.selectedImgSrc = url
    },
    getSelectedImgSrc(): string | null {
      return this.selectedImgSrc
    },
    clearSelectedImgSrc() {
      this.selectedImgSrc = null
    },

    setSelectedTemplateId(templateId: string) {
      this.selectedTemplateId = templateId
    },
    getSelectedTemplateId(): string | null {
      return this.selectedTemplateId
    },
    clearSelectedTemplateId() {
      this.selectedTemplateId = null
    },

    setSelectedTemplateContent(content: Record<string, any>) {
      this.selectedTemplateContent = content
      localStorage.setItem('selectedTemplateContent', JSON.stringify(content))
    },
    getSelectedTemplateContent(): Record<string, any> | null {
      return this.selectedTemplateContent
    },
    clearSelectedTemplateContent() {
      this.selectedTemplateContent = null
      localStorage.removeItem('selectedTemplateContent')
    },

    setTemporaryCampaign(campaign: NewCampaign) {
      this.temporaryCampaign = campaign
    },
    getTemporaryCampaign(): NewCampaign | null {
      return this.temporaryCampaign
    },
    clearTemporaryCampaign() {
      this.temporaryCampaign = null
    },

    initializeOrgId() {
      const storedOrgId = localStorage.getItem('orgId')
      if (storedOrgId) {
        this.orgId = storedOrgId
      }
    },
    setOrgId(id: string) {
      this.orgId = id
      localStorage.setItem('orgId', id)
    },
    getOrgId(): string | null {
      return this.orgId
    },

    initializeRole() {
      const storedRole = localStorage.getItem('Role')
      if (storedRole) {
        this.role = storedRole
      }
    },
    setRole(role: string) {
      this.role = role
      localStorage.setItem('Role', role)
    },
    getRole(): string | null {
      return this.role
    }
  }
})
