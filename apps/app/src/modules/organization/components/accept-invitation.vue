<template>
  <div class="flex justify-center items-center h-screen">
    <div class="bg-white p-8 rounded shadow-md w-80">
      <h2 class="text-2xl mb-4">{{ t('Accept Invitation') }}</h2>
      <p v-if="!isVerifying">{{ t('Verifying your invitation...') }}</p>
      <p v-if="error" class="text-red-500">{{ error }}</p>
      <p v-if="isVerifying && !error">{{ t('Invitation verified. Please log in to continue.') }}</p>
      <router-link to="/login" class="mt-4 block text-center text-blue-500">{{ t('Log in') }}</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useOrgStore } from '@/stores/orgainzation'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const orgStore = useOrgStore()
const { currentUser } = storeToRefs(useUserStore())

const error = ref<string | null>(null)
const isVerifying = ref(false)

onMounted(async () => {
  const invitationToken = route.params.invitationToken as string

  if (!invitationToken) {
    error.value = t('Invalid invitation token.')
    return
  }

  try {
    isVerifying.value = true
    await orgStore.acceptInvitation(invitationToken)
    isVerifying.value = false

    if (!currentUser) {
      // If the user is not logged in, redirect to the login page
      router.push({ name: 'login' })
    }
  } catch (err) {
    error.value = t('Failed to verify the invitation.')
    isVerifying.value = false
    console.error(err)
  }
})
</script>
