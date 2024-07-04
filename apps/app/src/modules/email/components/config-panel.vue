<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Plugin Configuration</h2>
    <Accordion type="single" collapsible className="w-full">
      <div v-for="(sector, index) in pluginConfig.sectors" :key="index">
        <AccordionItem :value="'item-' + index">
          <AccordionTrigger>{{ sector.name }}</AccordionTrigger>
          <AccordionContent>
            <div class="mb-4">
              <div v-for="(property, propIndex) in sector.properties" :key="propIndex" class="mb-4">
                <p class="mb-1"><strong>{{ property.property }}</strong> </p>
                <div v-if="property.list" class="mb-1">
                  <ul class="list-disc list-inside">
                    <li v-for="(item, itemIndex) in property.list" :key="itemIndex">
                      <span v-if="item.name">{{ item.name }}</span>
                      <span v-if="item.className">({{ item.className }})</span>
                    </li>
                  </ul>
                </div>
                <div v-if="property.properties" class="mb-1">
                  <ul class="list-disc list-inside">
                    <li v-for="(subProp, subIndex) in property.properties" :key="subIndex">
                      {{ subProp.name }}
                    </li>
                  </ul>
                </div>
                <!-- Input field for assigning value -->
                <input v-model="property.value" v-if="!property.detached && !property.list && !property.properties"
                  type="text" class="border border-gray-300 px-2 py-1 rounded-md w-full" />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </div>
    </Accordion>
  </div>
</template>

<script setup lang="ts">
import { watch, reactive } from 'vue';
import { useAppStore } from '@/stores/app';
import { pluginConfig as originalPluginConfig } from '@/blocks';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const blockStyleStore = useAppStore();

const pluginConfig = reactive(originalPluginConfig);

// Watch for changes in selectedBlockStyle
watch(() => blockStyleStore.selectedBlockStyle, (newStyles) => {
 // console.log('selectedBlockStyle changed:', newStyles);

  // Check if newStyles is not null
  if (newStyles) {
    // Loop through each sector in the pluginConfig
    pluginConfig.sectors.forEach((sector) => {
      // Loop through each property in the sector
      sector.properties.forEach((property) => {
        // If the newStyles object has a property that matches one in the pluginConfig
        if ((newStyles as any)[property.property]) {
          // Update the value of the property in the pluginConfig
          property.value = (newStyles as any)[property.property];
          //console.log(`Updated value for property ${property.property}:`, property.value);
        }
      });
    });
  }
}, { immediate: true });

// Add a watcher for each property in pluginConfig
pluginConfig.sectors.forEach((sector, sectorIndex) => {
  ///console.log(`Processing sector ${sectorIndex}: ${sector.name}`);

  sector.properties.forEach((property, propIndex) => {
    //console.log(`Processing property ${propIndex} in sector ${sectorIndex}: ${property.property}`);

    watch(() => property.value, (newValue, oldValue) => {
      //console.log(`Value for property ${property.property} changed from ${oldValue} to ${newValue}`);

      // Update the currentStyle in the store
      const updatedStyle = { ...blockStyleStore.currentStyle, [property.property]: newValue } as CSSStyleDeclaration;
      //console.log(`Updated style: `, updatedStyle);

      blockStyleStore.currentStyle = updatedStyle;
      //console.log(`Current style in store: `, blockStyleStore.currentStyle);
    }, { immediate: true });
  });
});

</script>
