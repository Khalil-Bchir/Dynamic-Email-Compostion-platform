<template>
  <div class="flex flex-col items-center justify-center mt-10">
    <input type="file" @change="uploadMedia" class="mb-4">
  </div>
</template>

<script setup lang="ts">
import { useMediaStore } from '@/stores/media'
import type { UploadMedia } from '@/types/media'

const mediaStore = useMediaStore()

const uploadMedia = async (event: Event) => {
  const fileInput = event.target as HTMLInputElement
  if (fileInput.files && fileInput.files.length > 0) {
    const file = fileInput.files[0]
    const mediaData: UploadMedia = {
      file: file,
    }
    await mediaStore.uploadMedia(mediaData)
  }
}
</script>

