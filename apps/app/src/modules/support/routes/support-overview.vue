<script setup lang="ts">
import  ContactList  from '../components/audience-listing.vue';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
<template>
  <private-view :title="t('support')">
   <ContactList/>
  </private-view>
</template>
