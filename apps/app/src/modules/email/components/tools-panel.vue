<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div class="flex gap-4 p-4 flex-grow">
    <!-- First column -->
    <div class="flex flex-col gap-4 flex-grow">
      <TextBlock class="bg-white border" />
      <ButtonBlock class="bg-white border" />
    </div>
    <!-- Second column -->
    <div class="flex flex-col gap-4 flex-grow">
      <!-- First grid -->
      <div class="flex flex-col gap-4">
        <ColumnBlock class="bg-white border" />
        <TwoColumnsBlock class="bg-white border" />
      </div>
      <!-- Second grid -->
      <div class="flex flex-col gap-4">
        <ImageBlock class="bg-white border" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TextBlock, ButtonBlock, ColumnBlock, TwoColumnsBlock, ImageBlock } from './blocks';
</script>
