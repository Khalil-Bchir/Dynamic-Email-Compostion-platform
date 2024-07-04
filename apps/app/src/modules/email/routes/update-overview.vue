<template>
  <section class="h-screen flex flex-col">

    <header class="p-5 h-auto">
      <nav class="px-6 py-3">
        <div class="flex justify-between items-center pl-10">
          <div class="flex space-x-20 ">
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

    <div class="flex justify-center bg-editor flex-grow">
      <div class="container flex p-20">
        <Tools class="w-2/5" />
        <UpdatePreview class="w-3/5 bg-white border" @mjmlContentPreview="handleMjmlContent"
          @htmlContentPreview="handleHtmlContent" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { Tools } from '../components';
import { UpdatePreview } from '../components';
import { Button } from '@/components/ui/button';
import { Undo2, Redo2, Smartphone, Monitor } from 'lucide-vue-next';
import type { Block } from '@/types';
import { useTemplateStore } from '@/stores/template';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/stores/app';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const TemplateStore = useTemplateStore();
const appStore = useAppStore();
const UserStore = useUserStore();
const { currentUser } = storeToRefs(useUserStore());

const { t } = useI18n()

const router = useRouter();

const htmlContentPreview = ref('');
const mjmlContentPreview = ref<Block>({} as Block);

const handleHtmlContent = (content: string) => {
  htmlContentPreview.value = content;
}

const handleMjmlContent = (content: Block) => {
  mjmlContentPreview.value = content;
}

const updateTemplate = async (templateId: string, content: string) => {
  try {
    const id = appStore.getOrgId();
    console.log("get Id", id)
    if (id) {
      await TemplateStore.updateTemplate(templateId, { content, createdBy: id });
      console.log('Template updated successfully!');
    } else {
      console.error('User not available.');
    }
  } catch (error) {
    console.error('Error updating template:', error);
  }
}

const saveAndExit = (id: string) => {
  const contentString = JSON.stringify(mjmlContentPreview.value);
  const templateId = appStore.getSelectedTemplateId();
  if (templateId) {
    updateTemplate(templateId, contentString);
    router.push({ name: 'home-overview', params: { id: id } });
  } else {
    console.error('Template ID not found.');
  }
}

</script>
