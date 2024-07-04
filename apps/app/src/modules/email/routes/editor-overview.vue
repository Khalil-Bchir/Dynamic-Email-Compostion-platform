<template>
  <section class="h-screen flex flex-col">
    <!-- Header section -->
    <header class="p-5 h-auto">
      <!-- Navigation -->
      <nav class="px-6 py-3">
        <div class="flex justify-between items-center pl-10">
          <div class="flex space-x-20">
            <div>
              <img src="@/assets/images/logo.svg" alt="Route Genius" height="50" width="100" />
            </div>
            <div class="flex items-center space-x-4">
              <Button variant="outline" size="icon">
                <Undo2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Redo2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <Button variant="outline" size="icon">
              <Monitor className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>
          <div class="flex items-center space-x-4 pr-10">
            <button @click="saveAndExit" class="text-info text-sm font-semibold hover:underline">
              {{ t('save_and_exit') }}
            </button>
          </div>
        </div>
      </nav>
    </header>

    <!-- Editor section -->
    <div class="flex justify-center bg-editor flex-grow">
      <div class="container flex p-20">
        <Tools class="w-2/5" />
        <Preview class="w-3/5 bg-white border" @mjmlContentPreview="handleMjmlContent"
          @htmlContentPreview="handleHtmlContent" @imageDroppedPrev="handelImage" />
      </div>
    </div>

    <!-- Modal component -->
    <Modal :isOpen="imageDroppedPrev" @close="handleModalClose" title="Select Image">
      <MediaList @imageSelected="handleImageSelected"></MediaList>
    </Modal>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { Tools, Preview, MediaList } from '../components';
import { Modal } from '../components/blocks';
import { Button } from '@/components/ui/button';
import { Undo2, Redo2, Smartphone, Monitor } from 'lucide-vue-next';
import type { Block } from '@/types';
import { useTemplateStore } from '@/stores/template';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/stores/app';

const TemplateStore = useTemplateStore();
const appStore = useAppStore();
const { currentUser } = storeToRefs(useUserStore());
const { t } = useI18n();
const router = useRouter();

const htmlContentPreview = ref('');
const mjmlContentPreview = ref<Block>({} as Block);
const imageDroppedPrev = ref<boolean>(false);

const handelImage = (state: boolean) => {
  imageDroppedPrev.value = state;
};

const handleHtmlContent = (content: string) => {
  htmlContentPreview.value = content;
};

const handleMjmlContent = (content: Block) => {
  mjmlContentPreview.value = content;
  //console.log("recieved content", content)
};

const saveTemplate = async (content: string) => {
  try {
    //const userId = currentUser.value.id;
    const id = appStore.getOrgId();
    console.log("get Id", id)
    if (id) {
      const newTemplate = await TemplateStore.createTemplate({ content, createdBy: id });
      if (newTemplate && newTemplate.data.id) {
        tryOnTemplate(newTemplate.data.id, newTemplate.data.content);
        //console.log('Template saved successfully with ID:', newTemplate.data.id);
      } else {
        console.error('Failed to retrieve the new template ID.');
      }
    } else {
      console.error('User not available.');
    }
  } catch (error) {
    console.error('Error saving template:', error);
  }
};

const saveAndExit = (id: string) => {
  const contentString = JSON.stringify(mjmlContentPreview.value);
  saveTemplate(contentString);
  //console.log("saved content", contentString )
  router.push({ name: 'home-overview', params: { id: id } });
};

const handleModalClose = () => {
  imageDroppedPrev.value = false;
};

const handleImageSelected = (state: boolean) => {
  imageDroppedPrev.value = state;
  //console.log('state', state);
};

const tryOnTemplate = (templateId: string, templateContent: string) => {
  try {
    appStore.setSelectedTemplateId(templateId);
    const contentObject = JSON.parse(templateContent);
    appStore.setSelectedTemplateContent(contentObject);
    //console.log('Selected Template ID:', templateId);
    //console.log('Selected Template content:', contentObject);
  } catch (error) {
    console.error('Error parsing template content:', error);
  }
};
</script>
