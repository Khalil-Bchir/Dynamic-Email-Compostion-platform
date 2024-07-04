<template>
  <section class="mx-auto max-w-4xl mt-15">

    <div class="text-lg font-medium mt-8 mb-4">
      {{ t('empty_email') }}
    </div>

    <div class="grid grid-cols-3 gap-4 ">
      <!-- Grid 1 -->
      <div class="border p-8 rounded-lg flex flex-col justify-center items-center cursor-pointer">
        <img src="@/assets/images/outline_1.png" alt="placeholder" class="mb-4" />
        <router-link :to="{ name: 'editor-overview' }">
          <Button class="flex items-center text-md">
            {{ t('try_on') }}
            <ArrowRight class="w-4 h-4 ml-2" />
          </Button>
        </router-link>
      </div>
      <!-- Grid 2 -->
      <div class="border p-8 rounded-lg flex flex-col justify-center items-center cursor-pointer">
        <img src="@/assets/images/outline_2.png" alt="placeholder" class="mb-4" />
        <Button class="flex items-center text-md">
          {{ t('try_on') }}
          <ArrowRight class="w-4 h-4 ml-2" />
        </Button>
      </div>
      <!-- Grid 3 -->
      <div class="border p-8 rounded-lg flex flex-col justify-center items-center cursor-pointer">
        <img src="@/assets/images/outline_3.png" alt="placeholder" class="mb-4" />
        <Button class="flex items-center text-md">
          {{ t('try_on') }}
          <ArrowRight class="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>

  </section>

</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-vue-next';

const { t } = useI18n()
</script>
