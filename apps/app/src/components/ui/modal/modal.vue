<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto">
    <div class="fixed inset-0 transition-opacity" aria-hidden="true">
      <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>
    <div class="relative bg-white rounded-lg px-8 py-10" :style="{ width: width, height: height }">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-semibold">{{ title }}</h3>
        <X @click="close" class="cursor-pointer text-muted" />
      </div>
      <div class="mb-6">
        <slot></slot>
      </div>
      <div class="flex justify-between">
        <Button @click="cancel" variant="outline" class="p-5">{{ cancelButtonText }}</Button>
        <Button @click="confirm" class="p-5">{{ confirmButtonText }}</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-vue-next'

defineProps({
  show: Boolean,
  title: String,
  width: String,
  height: String,
  cancelButtonText: String,
  confirmButtonText: String
})

const emits = defineEmits(['close', 'cancel', 'confirm'])

const close = () => {
  emits('close');
}

const cancel = () => {
  emits('cancel');
}

const confirm = () => {
  emits('confirm');
}
</script>
