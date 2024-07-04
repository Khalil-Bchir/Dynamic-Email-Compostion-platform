<template>
  <section class="mx-auto max-w-4xl mt-15">
    <div class="flex justify-between items-center mb-8 ml-3 mr-3">
      <div class="text-3xl font-semibold">{{ t('campaigns') }}</div>
      <div>
        <Button class="bg-primary flex items-center" @click="createCampaigns">
          <Plus class="mr-1" />
          <span>{{ t('create_campaign') }}</span>
        </Button>
      </div>
    </div>

    <hr class="my-2 border-gray-300">
    <div>
      <div v-for="(campaign) in displayedCampaigns" :key="campaign.id" class="mb-4">
        <div class="flex items-top">
          <Mails class="text-primary mr-4 mt-2" />
          <div>
            <router-link :to="{ name: 'campaignEvents', params: { id: campaign.id } }">
            <div class="text-2xl font-medium cursor-pointer hover:text-primary">
              {{ campaign.name }}
            </div>
          </router-link>
            <div class="pt-2">Created At: {{ logAndFormatDate(campaign.createdAt) }}</div>
            <div class="mt-4 text-muted italic">Edited At: {{ logAndFormatDate(campaign.updatedAt) }}</div>
          </div>
        </div>
        <hr class="my-2 border-gray-300">
      </div>
    </div>

    <div class="mt-4 flex justify-end pr-10">
      <Pagination v-model:currentPage="currentPage" v-model:totalPages="totalPages" v-model:hasNextPage="hasNextPage"
        v-model:hasPreviousPage="hasPreviousPage" v-model:pageSize="pageSize"
        class="flex items-center justify-center space-x-4">

        <PaginationItem>
          <PaginationPrev :disabled="!hasPreviousPage" @click="prevPage" />
        </PaginationItem>

        <PaginationItem v-for="page in totalPages" :key="page">
          <PaginationListItem :value="page" @click="currentPage = page"
            :class="{ ' border text-primary border-primary': currentPage === page }"
            class="cursor-pointer text-muted h-10 w-10 p-0 rounded hover:text-primary">
            {{ page }}
          </PaginationListItem>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext :disabled="!hasNextPage" @click="nextPage" />
        </PaginationItem>
      </Pagination>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, defineEmits, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/ui/button'
import { useCampaignStore } from '@/stores/campaign'
import { useAppStore } from '@/stores/app'
import type { Campaign } from '@/types/campaign'
import { Mails, Plus } from 'lucide-vue-next'
import {
  Pagination,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination"

const { t } = useI18n()
const campaignStore = useCampaignStore()
const appStore = useAppStore();

const formatDate = (date: Date | null | undefined) => {
  if (!date) return 'Unknown Date';
  try {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    return formattedDate;
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
}

const logAndFormatDate = (date: Date | null | undefined) => {
  return formatDate(date);
}

const displayedCampaigns = ref<Campaign[]>([]);
const currentPage = ref(1);
const totalPages = ref(0);
const hasNextPage = ref(false);
const hasPreviousPage = ref(false);
const pageSize = 5;

const emits = defineEmits(['switchView'])

const createCampaigns = () => {
  emits('switchView', 'create')
}

const nextPage = () => {
  if (hasNextPage.value) {
    currentPage.value++;
  }
}

const prevPage = () => {
  if (hasPreviousPage.value) {
    currentPage.value--;
  }
}

const fetchCampaigns = async () => {
  try {
    const id = appStore.getOrgId();
    //console.log("get Id", id)
    if (id) {
      const response = await campaignStore.getAllCampaigns(currentPage.value, pageSize, id);
      if (response && response.data && response.data.length > 0) {
        totalPages.value = response.pages;
        hasNextPage.value = response.hasNextPage;
        hasPreviousPage.value = response.hasPreviousPage;
        displayedCampaigns.value = response.data;
      } else {
        console.error('Invalid response:', response);
      }
    }
  } catch (error) {
    console.error('Error fetching campaigns:', error);
  }
}

watch(currentPage, fetchCampaigns);

onMounted(fetchCampaigns);
</script>
