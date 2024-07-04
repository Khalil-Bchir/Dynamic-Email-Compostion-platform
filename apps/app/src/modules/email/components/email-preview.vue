<template>
  <div class="flex justify-center">
    <div class="w-full max-w-md mx-auto overflow-hidden md:max-w-2xl m-4">
      <EmailRender :emailData="emailData" @htmlContent="updateHtmlContent" @blockContent="updateBlockContent" @imageDropped="updateImageDropped" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import EmailRender from './email-render.vue';
import { mjmlDocument } from '@/blocks';
import { type Block } from '@/types';

const emailData = ref(mjmlDocument);

const htmlContent = ref('');
const blockContent = ref<Block>({} as Block);
const imageDropped = ref<boolean>(false);

const emits = defineEmits(['htmlContentPreview', 'mjmlContentPreview', 'imageDroppedPrev']);

const updateHtmlContent = (HtmlContent: string) => {
  htmlContent.value = HtmlContent;
  emits('htmlContentPreview', HtmlContent);
  //console.log('Received htmlContent:', HtmlContent);
};

const updateBlockContent = (MjmlContent: Block) => {
  blockContent.value = MjmlContent;
  emits('mjmlContentPreview', MjmlContent);
  //console.log('Received blockContent:', MjmlContent);
};

const updateImageDropped = ( state: boolean) => {
  imageDropped.value = state;
  emits('imageDroppedPrev', state);
  console.log('Received imageDropped:', imageDropped.value);
};
</script>
