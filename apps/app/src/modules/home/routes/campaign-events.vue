<template>
  <private-view>
    <section class="mx-auto max-w-4xl mt-15">
      <div class="text-3xl font-semibold mb-8 ml-3 mr-3">{{ t('events') }}</div>

      <div class="overflow-x-auto mb-10">
        <table class="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th class="px-4 py-2 border-b">Title</th>
              <th class="px-4 py-2 border-b">Date</th>
              <th class="px-4 py-2 border-b">Description</th>
              <th class="px-4 py-2 border-b">Link</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in events" :key="event['message-id']" class="hover:bg-gray-100">
              <td class="px-4 py-2 border-b">{{ event.email }}</td>
              <td class="px-4 py-2 border-b">{{ event.date }}</td>
              <td class="px-4 py-2 border-b">{{ event.event }}</td>
              <td class="px-4 py-2 border-b">{{ event.link }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mb-10">
        <Bar :data="eventCountData" :options="eventCountOptions" />
      </div>

      <div class="mb-10">
        <Line :data="eventDistributionData" :options="eventDistributionOptions" />
      </div>

      <div class="mb-10">
        <Bar :data="eventByEmailData" :options="eventByEmailOptions" />
      </div>
    </section>
  </private-view>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useEmailBuilderStore } from '@/stores/email'
import type { Event } from '@/types'

import { Bar, Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  type ChartOptions
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, LineElement, CategoryScale, LinearScale, PointElement)

const { t } = useI18n()
const route = useRoute()
const emailBuilderStore = useEmailBuilderStore()

const events = ref<Event[]>([])

const fetchEvents = async (id: string) => {
  try {
    const data = await emailBuilderStore.campaignEvent(id)
    events.value = data
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  const id = route.params.id as string
  fetchEvents(id)
})

// Event Count by Type Chart Data and Options
const eventCountData = computed(() => {
  const eventCounts = events.value.reduce((acc, event) => {
    acc[event.event] = (acc[event.event] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return {
    labels: Object.keys(eventCounts),
    datasets: [
      {
        label: t('eventCounts'),
        data: Object.values(eventCounts),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  }
})

const eventCountOptions: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: t('eventCountsChart'),
    },
  },
}

// Event Distribution Over Time Chart Data and Options
const eventDistributionData = computed(() => {
  const eventsByDate = events.value.reduce((acc, event) => {
    const date = new Date(event.date).toISOString().split('T')[0] // Group by date (YYYY-MM-DD)
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const labels = Object.keys(eventsByDate).sort()
  const data = labels.map(label => eventsByDate[label])

  return {
    labels,
    datasets: [
      {
        label: t('eventCountsOverTime'),
        data,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        fill: false,
      },
    ],
  }
})

const eventDistributionOptions: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: t('eventCountsOverTimeChart'),
    },
  },
}

// Event Breakdown by Email Chart Data and Options
const eventByEmailData = computed(() => {
  const eventsByEmail = events.value.reduce((acc, event) => {
    acc[event.email] = (acc[event.email] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return {
    labels: Object.keys(eventsByEmail),
    datasets: [
      {
        label: t('eventCountsByEmail'),
        data: Object.values(eventsByEmail),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  }
})

const eventByEmailOptions: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: t('eventCountsByEmailChart'),
    },
  },
}
</script>