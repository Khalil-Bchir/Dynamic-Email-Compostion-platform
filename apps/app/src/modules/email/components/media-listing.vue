<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div class="flex flex-col items-center mt-10 p-8 max-w-6xl mx-auto">
    <!-- Upload section -->
    <div class="w-full max-w-2xl mb-10">
      <div class="flex items-center justify-center w-full">
        <label for="dropzone-file"
          class="flex flex-col items-center justify-center w-full h-64 border-2 border-primary border-dashed rounded-lg cursor-pointer bg-accent hover:bg-accent-hover hover:text-primary"
          @dragenter.prevent @drop.prevent="handleDrop">
          <div class="flex flex-col items-center justify-center pt-5 pb-6 group ">
            <svg class="w-10 h-10 mb-3 text-gray-400 group-hover:text-primary" fill="none" stroke="currentColor"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p class="mb-2 text-sm text-gray-500 group-hover:text-primary">
              <span class="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p class="text-xs text-gray-500 group-hover:text-primary">
              SVG, PNG or JPG
            </p>
          </div>
          <input id="dropzone-file" type="file" class="hidden" @change="uploadMedia" />
        </label>
      </div>
    </div>

    <!-- Gallery section -->
    <div class="w-full">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="image in imagesWithUrls" :key="image.id" class="relative" @click="selectImage(image.url)">
          <img crossorigin="anonymous" :src="image.url" :alt="image.mimetype"
            class="w-full h-full object-cover rounded shadow-md cursor-pointer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useMediaStore } from '@/stores/media';
import { useAppStore } from '@/stores/app';
import type { Media, UploadMedia } from '@/types/media';

const store = useMediaStore();
const app = useAppStore();
const images = ref<Media[]>([]);
const baseURL = import.meta.env.VITE_API_URL;
const orgId = app.getOrgId();
console.log("orgid",orgId)

const uploadMedia = async (event: Event) => {
  try {
    console.log('uploadMedia triggered');
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0 && orgId) {
      const file = fileInput.files[0];
      console.log('Selected file:', file.name);
      const mediaData: UploadMedia = { file, createdBy: orgId };

      console.log('Uploading media data:', mediaData);
      const uploadedMedia = await store.uploadMedia(mediaData);
      console.log('Uploaded media:', uploadedMedia);

      images.value.push({
        id: '',
        filename: uploadedMedia.filename,
        mimetype: uploadedMedia.mimetype,
      });

      console.log('Updated images array:', images.value);
      await fetchData();
    } else {
      console.warn('No file selected or orgId is missing');
    }
  } catch (error) {
    console.error('Error uploading media:', error);
  }
};

const handleDrop = async (event: DragEvent) => {
  event.preventDefault();
  try {
    console.log('handleDrop triggered');
    const files = event.dataTransfer?.files;
    if (files && files.length > 0 && orgId) {
      const file = files[0];
      console.log('Dropped file:', file.name);
      const mediaData: UploadMedia = { file, createdBy: orgId };

      console.log('Uploading media data:', mediaData);
      const uploadedMedia = await store.uploadMedia(mediaData);
      console.log('Uploaded media:', uploadedMedia);

      images.value.push({
        id: '',
        filename: uploadedMedia.filename,
        mimetype: uploadedMedia.mimetype,
      });

      console.log('Updated images array:', images.value);
      await fetchData(); // Re-fetch images after upload
    } else {
      console.warn('No files dropped or orgId is missing');
    }
  } catch (error) {
    console.error('Error uploading media:', error);
  }
};

const fetchData = async () => {
  try {
    console.log('Fetching images');
    if (orgId) {
      const fetchedImages = await store.getAllMedia(orgId);
      images.value = fetchedImages;
      console.log('Fetched images:', images.value);
    } else {
      console.warn('orgId is missing');
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
};

onMounted(async () => {
  try {
    console.log('Component mounted, fetching images');
    await fetchData();
  } catch (error) {
    console.error('Error fetching images on mount:', error);
  }
});

const imagesWithUrls = computed(() => {
  return images.value.map((image: Media) => {
    return {
      id: image.id,
      mimetype: image.mimetype,
      url: `${baseURL}/media/${image.filename}`
    };
  });
});

const emits = defineEmits(['imageSelected']);

const selectImage = (imageUrl: string) => {
  console.log('Image selected:', imageUrl);
  app.setSelectedImgSrc(imageUrl);
  emits('imageSelected', true);
};

</script>
