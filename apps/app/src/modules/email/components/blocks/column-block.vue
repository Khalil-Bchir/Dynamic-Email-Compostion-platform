<template>
  <!-- Render MJML text block with attributes and content -->
  <div class="draggable-card flex flex-col items-center  rounded p-4 cursor-pointer "
       draggable="true"
       @dragstart="handleDragStart"
       @dragend="handleDragEnd">
    <Square class="w-8 h-8 mb-2" />
    <div class="text-center flex-grow">1 Column</div>
  </div>
</template>

<script setup lang="ts">
import { columnsBlock }  from '../../../../blocks';
import { Square } from 'lucide-vue-next';

// Handler for drag start event
const handleDragStart = (event: DragEvent) => {
  // Set the data being dragged (JSON content of the block)
  event.dataTransfer?.setData('application/json', JSON.stringify(columnsBlock));
};

// Handler for drag end event
const handleDragEnd = (event: DragEvent) => {
  // Clear any data being dragged
  event.dataTransfer?.clearData();
};
</script>

