<template>
  <div class="flex justify-center">
    <div class="w-full max-w-md mx-auto overflow-hidden md:max-w-2xl m-4">
      <EmailRender :emailData="selectedTemplate || {}" @imageDropped="updateImageDropped" @htmlContent="updateHtmlContent" @blockContent="updateBlockContent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import EmailRender from './email-render.vue';
import { type Block } from '@/types';
import { useAppStore } from '@/stores/app';

const { getSelectedTemplateContent } = useAppStore();

const selectedTemplate = ref<Record<string, any> | null>(getSelectedTemplateContent());
//console.log('email data:', selectedTemplate);

const htmlContent = ref('');
const blockContent = ref<Block>({} as Block);
const imageDropped = ref<boolean>(false);


const emits = defineEmits(['htmlContentPreview', 'mjmlContentPreview', 'imageDroppedPrev']);

const updateHtmlContent = (HtmlContent: string) => {
  htmlContent.value = HtmlContent;
  emits('htmlContentPreview', HtmlContent);
};

const updateBlockContent = (MjmlContent: Block) => {
  blockContent.value = MjmlContent;
  emits('mjmlContentPreview', MjmlContent);
};

const updateImageDropped = ( state: boolean) => {
  imageDropped.value = state;
  emits('imageDroppedPrev', state);
  console.log('Received imageDropped:', imageDropped.value);
};
</script>
