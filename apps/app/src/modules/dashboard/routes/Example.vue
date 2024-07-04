<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useEmailBuilderStore } from '@/stores/email'
import type { Event } from '@/types'
import { ref, onMounted, computed } from 'vue'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Bar, Line, Radar } from 'vue-chartjs'


const route = useRoute()
const emailBuilderStore = useEmailBuilderStore()
ChartJS.register(Title, Tooltip, Legend, BarElement, LineElement, CategoryScale, LinearScale, PointElement)

const events = ref<Event[]>([])

const fetchEvents = async (id: string) => {
  try {
    const data = await emailBuilderStore.campaignEvent(id)
    events.value = data
  } catch (err) {
    console.log(err)
  }
}

const lastFiveEvents = computed(() => {
  return events.value.slice(-5).reverse()
})

onMounted(() => {
  const id = route.params.id as string
  fetchEvents(id);
})

const eventByEmailData = computed(() => {
  const eventsByEmail = events.value.reduce((acc, event) => {
    acc[event.email] = (acc[event.email] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return {
    labels: Object.keys(eventsByEmail),
    datasets: [
      {
        label: 'event Counts By Email',
        data: Object.values(eventsByEmail),
        backgroundColor: '#6ad2a7',
        borderColor: '#3AC99E',
        borderWidth: 1,
      },
    ],
  }
})

const eventByEmailOptions: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    title: {
      display: true,
      text: '',
    },
  },
}

const eventCounts = computed(() => {
  const counts: Record<string, number> = {}
  events.value.forEach(event => {
    counts[event.event] = (counts[event.event] || 0) + 1
  })
  return counts
})

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
        label: 'eventCountsOverTime',
        data,
        backgroundColor: '#6ad2a7',
        borderColor: '#3AC99E',
        fill: false,
      },
    ],
  }
})

const eventDistributionOptions: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    title: {
      display: true,
      text: '',
    },
  },
}

const eventsByEmailAndTypeData = computed(() => {
  const emailEventMap = events.value.reduce((acc, event) => {
    if (!acc[event.email]) acc[event.email] = {}
    acc[event.email][event.event] = (acc[event.email][event.event] || 0) + 1
    return acc
  }, {} as Record<string, Record<string, number>>)

  const labels = Object.keys(emailEventMap)
  const eventTypes = Array.from(new Set(events.value.map(event => event.event)))

  const datasets = eventTypes.map(eventType => ({
    label: eventType,
    data: labels.map(email => emailEventMap[email][eventType] || 0),
    backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`,
    borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`,
    borderWidth: 1,
  }))

  return {
    labels,
    datasets,
  }
})

const eventsByEmailAndTypeOptions: ChartOptions<'radar'> = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    title: {
      display: true,
      text: '',
    },
  },
}
</script>

<template>
  <private-view>
    <div class="hidden flex-col md:flex">
      <div class="flex-1 space-y-4 p-8 pt-6">
        <div class="flex items-center justify-between space-y-2">
          <h2 class="text-3xl font-bold tracking-tight">
            Dashboard
          </h2>
        </div>

        <!-- total count for each event -->
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card v-for="(count, event) in eventCounts" :key="event">
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">{{ event }}</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">{{ count }}</div>
            </CardContent>
          </Card>
        </div>

        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <!-- barchart -->
          <Card class="col-span-4">
            <CardHeader>
              <CardTitle>Event Counts By Email</CardTitle>
            </CardHeader>
            <CardContent class="pl-2">
              <Bar :data="eventByEmailData" :options="eventByEmailOptions" />
            </CardContent>
          </Card>

          <!-- recent events -->
          <Card class="col-span-3">
            <CardHeader>
              <CardTitle>Recent Events</CardTitle>
              <CardDescription>
                Showing the last 5 events.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div class="space-y-8">
                <div v-for="event in lastFiveEvents" :key="event.id" class="flex items-center">
                  <Avatar class="h-9 w-9">
                    <AvatarImage :src="`/avatars/${event.id % 5 + 1}.png`" alt="Avatar" />
                    <AvatarFallback>{{ event.id }}</AvatarFallback>
                  </Avatar>
                  <div class="ml-4 space-y-1">
                    <p class="text-sm font-medium leading-none">
                      {{ event.email }}
                    </p>
                    <p class="text-sm text-muted-foreground">
                      {{ event.sender_email }}
                    </p>
                  </div>
                  <div class="ml-auto font-medium">
                    {{ event.event }}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <!-- Radar Chart -->
          <!--Card class="col-span-2">
            <CardHeader>
              <CardTitle>Events by Email and Type</CardTitle>
            </CardHeader>
            <CardContent class="pl-2">
              <Radar :data="eventsByEmailAndTypeData" :options="eventsByEmailAndTypeOptions" />
            </CardContent>
          </!--Card-->

          <Card class="col-span-5">
            <CardHeader>
              <CardTitle>Event Counts Over Time</CardTitle>
            </CardHeader>
            <CardContent class="pl-2">
              <Line :data="eventDistributionData" :options="eventDistributionOptions" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </private-view>
</template>
