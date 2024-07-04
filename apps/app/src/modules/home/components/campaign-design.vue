<template>
  <section class="mx-auto max-w-4xl mt-15" >

    <div class="flex justify-between items-end mb-8">
      <div class="flex justify-between">
        <span class="flex items-end">
          <div class="flex cursor-pointer" @click="goBack">
            <ChevronLeft class="p-1 text-muted" />
            <span class="text-muted">{{ t('back') }}</span>
          </div>
          <div class="ml-2 cursor-pointer" @click="goCampaign">
            <span class="text-3xl font-semibold">{{ t('campaign') }}</span>
          </div>
          <div class="ml-2 text-muted cursor-pointer" @click="goBack">
            <span class="mb-1">\{{ t('create_new') }}</span>
          </div>
          <div class="ml-2 text-info">
            <span class="mb-1">\{{ t('content') }}</span>
          </div>
        </span>
      </div>
    </div>

    <div class="flex items-center justify-center pt-5">
      <div>
        <div class="text-center text-3xl font-semibold mb-2">
          {{ t('start_design_journey') }}
        </div>
        <div class="text-center text-muted text-xl">
          {{ t('start_design_journey_text') }}
        </div>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-4 mt-10">
      <!-- Grid 1 - Empty Email -->
      <div :class="{ 'border-primary': activeComponent === 'emptyEmail' }" class="border p-14 rounded-lg flex flex-col justify-center items-center cursor-pointer" @click="showEmptyEmail" >
        <Square :class="{ 'text-primary': activeComponent === 'emptyEmail' }" class="mb-4" />
        <h3  class="text-lg font-semibold mb-2 text-center">{{ t('empty_email') }}</h3>
        <p  class="text-md text-muted text-center">{{ t('empty_email_text') }}</p>
      </div>
      <!-- Grid 2 - Ready Template -->
      <div :class="{ 'border-primary': activeComponent === 'readyTemplate' }" class="border p-14 rounded-lg flex flex-col justify-center items-center cursor-pointer" @click="showReadyTemplate" >
        <Leaf :class="{ 'text-primary': activeComponent === 'readyTemplate' }" class="mb-4" />
        <h3  class="text-lg font-semibold mb-2">{{ t('ready_template') }}</h3>
        <p  class="text-md text-muted text-center">{{ t('ready_template_text') }}</p>
      </div>
      <!-- Grid 3 - Saved Template -->
      <div :class="{ 'border-primary': activeComponent === 'savedTemplate' }" class="border p-14 rounded-lg flex flex-col justify-center items-center cursor-pointer" @click="showSavedTemplate">
        <Save :class="{ 'text-primary': activeComponent === 'savedTemplate' }" class="mb-4" />
        <h3  class="text-lg font-semibold mb-2">{{ t('saved_template') }}</h3>
        <p class="text-md text-muted text-center">{{ t('saved_template_text') }}</p>
      </div>
    </div>

    <div>
      <div v-if="activeComponent === 'emptyEmail'">
        <EmptyEmail />
      </div>
      <div v-if="activeComponent === 'readyTemplate'">
        <ReadyTemplate />
      </div>
      <div v-if="activeComponent === 'savedTemplate'">
        <div>Comming Soon ...</div>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { defineEmits, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ChevronLeft, Square, Leaf, Save } from 'lucide-vue-next'

import EmptyEmail from './empty-email.vue'
import ReadyTemplate from './ready-template.vue'

const { t } = useI18n()

const emits = defineEmits(['switchView'])

const activeComponent = ref('emptyEmail')

const goBack = () => {
  emits('switchView', 'create')
}

const goCampaign = () => {
  emits('switchView', 'listing')
}

const showEmptyEmail = () => {
  activeComponent.value = 'emptyEmail'
}

const showReadyTemplate = () => {
  activeComponent.value = 'readyTemplate'
}

const showSavedTemplate = () => {
  activeComponent.value = 'savedTemplate'
}
</script>

