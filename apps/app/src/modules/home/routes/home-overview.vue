<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import CampaingsListing from '../components/campaings-listing.vue';
import Campaigncreate from '../components/create-compaign.vue';
import CampaignDesign from '../components/campaign-design.vue';

const { t } = useI18n()

const currentView = ref('listing')

const switchView = (...args: unknown[]) => {
  if (args.length > 0 && typeof args[0] === 'string') {
    currentView.value = args[0] as string;
  }
}

</script>
<template >
  <private-view :title="t('home')" >
    <div v-if="currentView === 'listing'">
      <Campaings-listing @switchView="switchView" />
    </div>
    <div v-if="currentView === 'create'">
      <Campaigncreate @switchView="switchView" />
    </div>
    <div v-if="currentView === 'design'">
      <CampaignDesign @switchView="switchView" />
    </div>
  </private-view>
</template>
