<script setup lang="ts">
import { Loader2 as LoaderSpinner, ChevronLeft } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useOrgStore } from '@/stores/orgainzation'
import { useUserStore } from '@/stores/user'
import { router } from '@/router'
import { Input } from '@/components/ui/input'
import * as z from 'zod'
import { storeToRefs } from 'pinia'

// Use the translation function
const { t } = useI18n()

// Use the organization store
const orgStore = useOrgStore()
const { currentUser } = storeToRefs(useUserStore());

const { isLoading, error } = storeToRefs(orgStore)

// Define the form schema using Zod
const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, { message: t('Name is required') }),
    description: z.string().optional() // Add description field
  })
)

// Initialize the form with validation
const form = useForm({
  validationSchema: formSchema
})

// Handle form submission
const onSubmit = form.handleSubmit(async (values) => {
  if (currentUser.value) {
    const userId = currentUser.value.id;
    await orgStore.createOrganization({ ...values, user: userId })
  }
  if (!orgStore.error) {
    router.replace({ name: 'organization-overview' })
  }
})
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen overflow-hidden">
    <router-link :to="{ name: 'organization-overview' }" class="absolute top-4 left-4 w-8 h-8 cursor-pointer">
      <ChevronLeft class="absolute top-4 left-4 w-8 h-8  cursor-pointer" />
    </router-link>
    <form class="max-w-xs" @submit.prevent="onSubmit">
      <div class="w-full max-w-xs self-center pb-11 text-center">
        <h1 class="pb-2 text-4xl font-extrabold">{{ t('Create Organization') }}</h1>
        <p class="font- text-muted-foreground pb-2 text-sm">{{ t('Fill in the details to create an organization') }}</p>
        <label class="text-destructive bg-transparent text-xs" :class="[!isLoading && error ? 'block' : 'hidden']">{{
      error?.code ? t(error?.code) : error?.message }}
        </label>
      </div>
      <div class="flex flex-col gap-5">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>{{ t('Organization Name') }}</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Organization Name" v-bind="componentField" />
            </FormControl>
            <FormMessage name="name" />
          </FormItem>
        </FormField>
        <Button :disabled="isLoading" class="bg-secondary-foreground">
          <LoaderSpinner v-if="isLoading" class="mr-2 size-4 animate-spin" />
          <span>{{ t('Create Organization') }}</span>
        </Button>
      </div>
    </form>
  </div>
</template>
