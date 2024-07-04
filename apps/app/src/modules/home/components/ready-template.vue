<template>
  <section class="mx-auto max-w-4xl mt-15">
    <div v-if="isLoading" class="text-lg font-medium mt-8 mb-4">
      Loading...
    </div>
    <div v-else>
      <div class="text-lg font-medium mt-8 mb-4">
        {{ t('ready_template') }}
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div v-for="template in templates" :key="template.id"
          class="border p-5 rounded-lg flex flex-col justify-between items-center  ">
          <div class="mb-4 w-full">
            <!--img :src="templateImageUrls[template.id]" style="object-fit: fill;" alt="Template Image"
              class="w-full h-auto rounded-lg" v-if="templateImageUrls[template.id]"-->
            <div>
              <div v-html="convertMjmlToHtmlContent(template.content)" style="pointer-events: none;"></div>
            </div>
          </div>
          <router-link :to="{ name: 'UpdateOverview', params: { templateId: template.id } }"
            @click="tryOnTemplate(template.id, template.content)">
            <Button class="flex items-center text-md mt-4">
              {{ t('try_on') }}
              <ArrowRight class="w-4 h-4 ml-2" />
            </Button>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-vue-next';
import { useTemplateStore } from '@/stores/template';
import { useUserStore } from '@/stores/user';
import { useAppStore } from '@/stores/app';
import type { Template } from '@/types/template';
import { convertMjmlToHtml } from '@/utils';
import html2canvas from 'html2canvas';
import { storeToRefs } from 'pinia';

const { t } = useI18n();

const store = useTemplateStore();
const appStore = useAppStore();
const { currentUser } = storeToRefs(useUserStore());

const templates = ref<Template[]>([]);
const templateImageUrls = ref<{ [key: string]: string }>({});
const isLoading = ref(true);

onMounted(async () => {
  try {
    const id = appStore.getOrgId();
    console.log("get Id", id)
    if (id) {
      //const userId = currentUser.value.id;
      const fetchedTemplates = await store.getAllTemplates(id);
      templates.value = fetchedTemplates;
      await convertTemplatesToImages(fetchedTemplates);
      isLoading.value = false;
    } else {
      console.error('User not available.');
    }
  } catch (error) {
    console.error('Error fetching templates:', error);
    isLoading.value = false;
  }
});

const tryOnTemplate = (templateId: string, templateContent: string) => {
  try {
    appStore.setSelectedTemplateId(templateId);
    const contentObject = JSON.parse(templateContent);
    appStore.setSelectedTemplateContent(contentObject);
    console.log('Selected Template ID:', templateId);
    console.log('Selected Template content:', contentObject);
  } catch (error) {
    console.error('Error parsing template content:', error);
  }
};

const convertMjmlToHtmlContent = (mjmlContent: string) => {
  const mjml = JSON.parse(mjmlContent);
  return convertMjmlToHtml(mjml);
};

const loadImage = (img: HTMLImageElement): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    if (img.complete) {
      resolve();
    } else {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Failed to load image'));
    }
  });
};

const waitForImagesToLoad = (container: HTMLElement): Promise<void[]> => {
  const images = Array.from(container.getElementsByTagName('img'));
  return Promise.all(images.map(loadImage));
};

const convertTemplatesToImages = async (templates: Template[]) => {
  for (const template of templates) {
    try {
      const htmlContent = convertMjmlToHtmlContent(template.content);
      const container = document.createElement('div');
      container.innerHTML = htmlContent;
      container.id = 'capture';
      document.body.appendChild(container);

      // Wait for all images to load
      await waitForImagesToLoad(container);

      const canvas = await html2canvas(container, { logging: true });
      const imageUrl = canvas.toDataURL('assets/images/canvas');

      templateImageUrls.value[template.id] = imageUrl;

      document.body.removeChild(container);
      document.body.removeChild(canvas);
    } catch (error) {
      console.error('Error converting template to image:', error);
    }
  }
};

</script>
