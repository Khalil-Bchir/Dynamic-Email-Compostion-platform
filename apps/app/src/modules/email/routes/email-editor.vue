<template>
  <div>
    <header class="flex items-center justify-between bg-gray-100 p-4">
      <h1 class="text-2xl font-bold text-gray-800">Email Editor</h1>
      <Button class="px-4 py-2 rounded-lg" @click="openModal">Share</Button>
    </header>

    <!-- Modal -->
    <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50" v-if="modalOpen">
      <div class="bg-white rounded-lg p-6 max-w-sm w-full">
        <h2 class="text-lg font-semibold mb-4">Enter Email Recipient</h2>

        <label for="emailRecipient" class="block text-sm font-semibold mb-2">Recipient</label>
        <input type="email"  class="w-full border-2 border-gray-200 rounded-md p-2 mb-4">

        <label for="emailCc" class="block text-sm font-semibold mb-2"> CC (optional)</label>
        <input type="email"  class="w-full border-2 border-gray-200 rounded-md p-2 mb-4">

        <label for="emailBcc" class="block text-sm font-semibold mb-2"> BCC (optional)</label>
        <input type="email" class="w-full border-2 border-gray-200 rounded-md p-2 mb-4">

        <label for="emailSubject" class="block text-sm font-semibold mb-2"> Subject</label>
        <input type="email"  class="w-full border-2 border-gray-200 rounded-md p-2 mb-4">

        <div class="flex justify-end">
          <Button class="mr-2" @click="closeModal">Cancel</Button>
          <Button primary >Send</Button>
        </div>
      </div>
    </div>

    <div class="flex h-screen">

      <!-- Left panel -->
      <Tools></Tools>

      <!-- Canvas -->
      <div class="w-3/5 bg-white">
        <Preview ref="emailPreview" @htmlContentPreview="handleHtmlContent" ></Preview>
      </div>

      <!-- Left panel -->
      <div class="w-1/5 bg-gray-100 border-2">
        <Configs></Configs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, } from 'vue';

import { Tools } from '../components';
import { Preview } from '../components';
import { Configs } from '../components';

import { Button } from '@/components/ui/button';

import { useEmailBuilderStore } from '@/stores/email';

const htmlContentPreview = ref('');
const modalOpen = ref(false);
const emailRecipient = ref('');
const emailSubject = ref('');
const emailCc = ref('');
const emailBcc = ref('');

const handleHtmlContent = (content: string) => {
  htmlContentPreview.value = content;
}

const openModal = () => {
  modalOpen.value = true;
}

const closeModal = () => {
  modalOpen.value = false;
}


</script>