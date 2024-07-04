<template>
  <div class="" @click="handleClick">
    <div v-if="renderedEmail" ref="emailContainer">
      <div v-if="emailData" v-html="renderedEmail" @drop="handleDrop" @dragover.prevent ref="emailContent"></div>
      <div v-else>No email data available</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, computed, defineEmits, watch } from 'vue';
import { convertMjmlToHtml } from '@/utils';
import { type Block } from "@/types/block";
import { styleToAttributeMapping } from '@/constants';
import { pluginConfig } from '@/blocks';
import { useAppStore } from '@/stores/app';
import { v4 as uuidv4 } from 'uuid'

const props = defineProps({
  emailData: {
    type: Object,
    required: true
  },
});

const clickedElement = ref<HTMLElement | null>(null);
const emailData = ref(JSON.parse(JSON.stringify(props.emailData)));
const renderedEmail = computed(() => convertMjmlToHtml(emailData.value));

const emits = defineEmits(['htmlContent', 'blockContent', 'imageDropped']);

const blockStyleStore = useAppStore();
const selectedImageUrl = ref<string>('');

watch(() => blockStyleStore.getSelectedImgSrc(), (newUrl) => {
  selectedImageUrl.value = newUrl ?? '';
  //console.log('Selected image URL updated:', newUrl);
  if (newUrl) {
    updateEmailData(newUrl);
  }
});

const updateEmailData = (newImageUrl: string) => {
  //console.log('Updating email data with new image URL:', newImageUrl);
  const clonedEmailData: Block = JSON.parse(JSON.stringify(emailData.value));
  const updatedEmailData = updateImageSrc(clonedEmailData, newImageUrl);
  emailData.value = updatedEmailData;
  //console.log('Email data after update:', emailData.value);
  updateAndEmitHtmlContent();
};

const updateImageSrc = (node: Block, newSrc: string): Block => {
  //console.log('Updating image src in node:', node, 'with new src:', newSrc);
  if (node.children) {
    node.children.forEach((child) => {
      if (child.tagName === 'mj-image' && child.attributes && child.attributes['css-class']?.includes('image-block')) {
        //console.log('Updating image src for child:', child);
        if (child.id == "") {
          child.id = uuidv4();
          child.attributes.src = newSrc;
        }
      } else {
        updateImageSrc(child, newSrc);
      }
    });
  }
  return node;
};

const findImages = (node: Block): Block[] => {
  let images: Block[] = [];
  if (node.children) {
    node.children.forEach((child: Block) => {
      if (child.attributes && child.attributes['css-class']?.includes('image-block') && child.tagName === 'mj-image') {
        //console.log('Found image block:', child);
        images.push(child);
      } else {
        images = images.concat(findImages(child));
      }
    });
  }
  return images;
};

const findColumns = (node: Block): Block[] => {
  let columns: Block[] = [];
  if (node.children) {
    node.children.forEach((child: Block) => {
      if (child.tagName === 'mj-column') {
        //console.log('Found column:', child);
        columns.push(child);
      } else {
        columns = columns.concat(findColumns(child));
      }
    });
  }
  return columns;
};

const findTargetColumnIndex = (target: HTMLElement): number => {
  let columnElement = target.parentElement;
  while (columnElement && !columnElement.classList.contains('columnIndex')) {
    columnElement = columnElement.parentElement;
  }
  if (columnElement) {
    const columns = document.querySelectorAll('.columnIndex');
    const index = Array.from(columns).indexOf(columnElement);
    //console.log('Found target column index:', index);
    return index;
  } else {
    return -1;
  }
};

const findInitialBlockIndex = (target: HTMLElement): number => {
  let initialBlockElement = target.parentElement;
  while (initialBlockElement && !initialBlockElement.classList.contains('Initial-block')) {
    initialBlockElement = initialBlockElement.parentElement;
  }
  if (initialBlockElement) {
    //console.log('Found initial block element');
    return 0;
  } else {
    return -1;
  }
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  event.stopPropagation();
  const droppedBlockData = event.dataTransfer?.getData('application/json');

  if (droppedBlockData) {
    //console.log('Dropped block data:', droppedBlockData);
    const block: Block = JSON.parse(droppedBlockData);
    const droppedImageBlocks = findImages(block);
    if (droppedImageBlocks.length > 0) {
      emits('imageDropped', true);
      //console.log('Emitting imageDropped event with value:', true);
      if (selectedImageUrl.value) {
        droppedImageBlocks.forEach((imageBlock: Block) => {
          if (imageBlock.attributes) {
            imageBlock.attributes.src = selectedImageUrl.value;
            //console.log('Updated src of dropped image block:', imageBlock);
          }
        });
      }
    }

    const mjBodyIndex = emailData.value.children.findIndex(
      (child: { tagName: string }) => child.tagName === 'mj-body'
    );

    if (mjBodyIndex !== -1) {
      const mjBody = emailData.value.children[mjBodyIndex];
      const columns = findColumns(mjBody);
      const targetColumnIndex = findTargetColumnIndex(event.target as HTMLElement);

      if (targetColumnIndex !== -1) {
        const initialBlockIndex = findInitialBlockIndex(event.target as HTMLElement);
        if (initialBlockIndex !== -1) {
          columns[targetColumnIndex].children = [{ ...block }];
        } else {
          if (!columns[targetColumnIndex].children) {
            columns[targetColumnIndex].children = [];
          }
          columns[targetColumnIndex].children.push({ ...block });
        }
        //console.log('Updated email data after handling drop:', emailData.value);
        updateAndEmitHtmlContent();
      }
    }
  }
};

const updateAndEmitHtmlContent = () => {
  emailData.value = { ...emailData.value };
  emits('htmlContent', renderedEmail.value);
  emits('blockContent', emailData.value);
  //console.log('Emitted htmlContent:', renderedEmail.value);
  //console.log('Emitted blockContent:', emailData.value);
};

const handleClick = (event: MouseEvent) => {
  clickedElement.value = event.target as HTMLElement;
  const selectedBlockStyle = window.getComputedStyle(clickedElement.value);
  //console.log('Clicked element:', clickedElement.value);
  blockStyleStore.setSelectedBlockStyle(selectedBlockStyle);
  //console.log('Selected block style in store:', blockStyleStore.selectedBlockStyle);
};

watch(() => blockStyleStore.currentStyle, (newStyles) => {
  // console.log('currentStyle changed:', newStyles);

  if (newStyles && clickedElement.value) {
    pluginConfig.sectors.forEach((sector) => {
      sector.properties.forEach((property) => {
        if ((newStyles as any)[property.property]) {
          property.value = (newStyles as any)[property.property];
          //console.log(`Updated value for property ${property.property}:`, property.value);

          const mjmlAttribute = styleToAttributeMapping[property.property];
          //console.log(`Corresponding MJML attribute for ${property.property}:`, mjmlAttribute);

          if (mjmlAttribute && clickedElement.value) {
            const clickedElementStyle = clickedElement.value?.style;
            if (clickedElementStyle) {
              clickedElementStyle.setProperty(mjmlAttribute, property.value as string);
            }
            //console.log(`Updated style for ${mjmlAttribute} on clicked element:`, (clickedElement.value as HTMLElement).style[mjmlAttribute as keyof CSSStyleDeclaration]);
          }
        }
      });
    });
    updateAndEmitHtmlContent();
  }
}, { immediate: true });

</script>

<style>
/* Add blue border when hovering over any component */
.Initial-section:hover {
  position: relative;
  border: 1px solid #249DF5;
}

.tool-block:hover {
  position: relative;
  border: 1px solid #249DF5;
}

.image-block:hover {
  position: relative;
  border: 1px solid #249DF5;
}

#text:hover {
  position: relative;
  border: 1px solid #249DF5;
}

#button:hover {
  position: relative;
  border: 1px solid #249DF5;
}

#column:hover {
  position: relative;
  border: 1px solid #249DF5;
}

#image:hover {
  position: relative;
  border: 5px solid #249DF5;
}

/* Tag style */
.tool-block:hover::before {
  content: 'column';
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #F8FCFF;
  color: #249DF5 !important;
  padding: 2px 4px;
  font-size: 14px;
}

#text:hover::before {
  content: attr(id);
  position: absolute;
  bottom: 100%;
  right: 0;
  background-color: #F8FCFF;
  color: #249DF5 !important;
  padding: 2px 4px;
  font-size: 14px;
  margin-bottom: 1px;
}

#button:hover::before {
  content: attr(id);
  position: absolute;
  bottom: 100%;
  right: 0;
  background-color: #F8FCFF;
  color: #249DF5 !important;
  padding: 2px 4px;
  font-size: 14px;
  margin-bottom: 1px;
}

#column:hover::before {
  content: attr(id);
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #F8FCFF;
  color: #249DF5 !important;
  padding: 2px 4px;
  font-size: 14px;
  margin-bottom: 1px;
}

.image-block:hover::before {
  content: 'image';
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #F8FCFF;
  color: #249DF5 !important;
  padding: 2px 4px;
  font-size: 14px;
  margin-bottom: 1px;
}
</style>