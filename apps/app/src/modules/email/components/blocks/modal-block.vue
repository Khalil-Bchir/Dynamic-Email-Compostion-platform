<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-gray-900 bg-opacity-50 z-50">
    <div :class="['bg-white border border-gray-300 rounded-lg overflow-hidden shadow-xl', widthClass, heightClass]">
      <header class="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold">{{ title }}</h2>
        <button @click="closeModal" class="text-gray-400 hover:text-gray-600 focus:outline-none">
          <span class="sr-only">Close</span>
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </header>
      <main class="p-4">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: 'w-1/2'
  },
  height: {
    type: String,
    default: 'h-auto'
  }
});

const emits = defineEmits(['close']);

const closeModal = () => {
  emits('close');
};

const widthClass = computed(() => props.width);
const heightClass = computed(() => props.height);
</script>
