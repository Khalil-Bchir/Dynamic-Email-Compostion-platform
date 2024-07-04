<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
const { t } = useI18n()
const appStore = useAppStore()
const { isSideBarOpen } = storeToRefs(appStore)
const { currentUser } = storeToRefs(useUserStore())
import { Button } from '@/components/ui/button'
import { PartyPopper, LogOut, Users  } from 'lucide-vue-next'
const authStore = useAuthStore()

const orgId = appStore.getOrgId();
</script>

<template>

  <section id="sidebar" :class="[
    isSideBarOpen ? ' z-50 flex min-w-[256px]' : 'hidden lg:relative lg:z-0 lg:flex lg:w-20'
  ]" class="bg-accent h-full min-h-[calc(100vh-5rem)] flex-col justify-between px-6">


    <div class="flex flex-col gap-2 py-4">

      <img alt="Saas monorepo" height="46" width="115" src="@/assets/images/logo.svg"  class="m-2"/>

      <hr>

      <router-link v-slot="{ isActive, href, navigate }" custom :to="{ name: 'home-overview', params: { id: orgId } }">
        <a v-bind="$attrs" :href="href" :class="[isSideBarOpen ? 'flex-row' : 'flex-col text-center']"
          class="flex items-center gap-2 rounded-lg px-4 py-2" @click="navigate">
          <PartyPopper :class="isActive ? 'text-primary' : 'text-muted-foreground'" />
          <h1 :class="[isActive ? 'font-medium' : 'text-muted-foreground']" class="text-sm">
            {{ t('campaigns') }}
          </h1>
        </a>
      </router-link>

      <router-link v-slot="{ isActive, href, navigate }" custom :to="{ name: 'support-overview' }">
        <a v-bind="$attrs" :href="href" :class="[isSideBarOpen ? 'flex-row' : 'flex-col text-center']"
          class="flex items-center gap-2 rounded-lg px-4 py-2" @click="navigate">
          <Users  :class="isActive ? 'text-primary' : 'text-muted-foreground'" />
          <h1 class="text-sm" :class="[isActive ? 'font-medium' : 'text-muted-foreground']">
            {{ t('audience') }}
          </h1>
        </a>
      </router-link>

    </div>

    <Button variant="ghost" class="text-destructive justify-start gap-2 text-start" @click="authStore.logout()">
      <LogOut :size="16" />
      <span class="">{{ t('logout') }}</span>
    </Button>
  </section>
</template>
