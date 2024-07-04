<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { storeToRefs } from 'pinia'
import { ArrowLeftRight } from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'
import { useOrgStore } from '@/stores/orgainzation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import avatarPlaceholder from '@/assets/images/avatar-placeholder.png'
import { BellRingIcon, LogOutIcon, Users } from 'lucide-vue-next'
import { Plus, UserPlus } from 'lucide-vue-next'
import { Modal } from '@/modules/email/components/blocks'
import { router } from '@/router'
import { UserOrgList } from '@/modules/organization/components'
import { X } from 'lucide-vue-next';

const { t } = useI18n()
const appStore = useAppStore()
const authStore = useAuthStore()
const { currentUser } = storeToRefs(useUserStore())

const isModalOpen = ref(false)
const isMembersModalOpen = ref(false)
const emailList = ref([''])
const orgStore = useOrgStore()
const { isLoading } = storeToRefs(useOrgStore())

const fetchedRole = appStore.getRole();

const addEmailField = () => {
  emailList.value.push('')
}

const removeEmailField = (index: number) => {
  if (emailList.value.length > 1) {
    emailList.value.splice(index, 1)
  }
}

const onSubmit = async () => {
  const orgId = appStore.getOrgId()
  const emails = emailList.value.filter(email => email.trim() !== '')

  if (orgId) {
    await orgStore.inviteUsersToOrganization({ organizationId: orgId, emails });
    isModalOpen.value = !isModalOpen.value
  } else {
    console.error('organization ID is missing')
  }

  router.replace({ name: 'home-overview', params: { id: orgId } })
}

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
}

const toggleMembersModal = () => {
  isMembersModalOpen.value = !isMembersModalOpen.value
}
</script>

<template>
  <header class="container relative z-20 hidden py-6 md:block">
    <nav class="flex w-full items-center justify-between">
      <div class=""></div>

      <div class="flex items-center gap-5">
        <BellRingIcon class="text-muted-foreground" />

        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Avatar class="relative cursor-pointer">
              <AvatarImage :src="avatarPlaceholder" :alt="currentUser?.email" />
              <div class="absolute inset-0 bg-overlay opacity-40 rounded-lg"></div>
              <AvatarFallback>{{ t('user') }}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent :side="'bottom'" :align="'end'" class="w-56">
            <DropdownMenuLabel>My Workspace</DropdownMenuLabel>
            <DropdownMenuLabel v-if="currentUser"> {{currentUser?.email}} </DropdownMenuLabel>
            <hr>
            <DropdownMenuGroup>
              <DropdownMenuItem class=" flex cursor-pointer items-center justify-start gap-2" @click="toggleMembersModal">
                <Users class="mr-2 h-4 w-4" />
                <span>Members</span>
              </DropdownMenuItem>
              <DropdownMenuItem v-if="fetchedRole == 'Admin'" class="flex cursor-pointer items-center justify-start gap-2" @click="toggleModal">
                <UserPlus class="mr-2 h-4 w-4" />
                <span>Invite members</span>
              </DropdownMenuItem>
              <router-link :to="{ name: 'create-org' }">
                <DropdownMenuItem class=" flex cursor-pointer items-center justify-start gap-2">
                  <Plus class="mr-2 h-4 w-4" />
                  <span>New Workspace</span>
                </DropdownMenuItem>
              </router-link>
              <router-link :to="{ name: 'organization-overview' }">
                <DropdownMenuItem class=" flex cursor-pointer items-center justify-start gap-2">
                  <ArrowLeftRight class="mr-2 h-4 w-4" />
                  <span>Change Workspace</span>
                </DropdownMenuItem>
              </router-link>
            </DropdownMenuGroup>
            <hr>
            <DropdownMenuGroup>
              <DropdownMenuItem class="text-destructive flex cursor-pointer items-center justify-start gap-2"
                @click="authStore.logout()">
                <LogOutIcon :size="16" />
                <span class="">{{ t('logout') }}</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  </header>
  <section
    class="bg-neutral-content shadow-center relative z-20 flex h-14 w-full items-center justify-between px-6 md:hidden">
    <Button variant="ghost" @click="appStore.toggleSideBar()">
      <i class="material-icons">menu</i>
    </Button>
    <img src="@/assets/images/logo.svg" alt="Route Genius" height="30" width="75" />
  </section>

  <Modal :isOpen="isModalOpen" @close="toggleModal" title="Invite Members" width="w-1/4">
    <div class="max-w-md mx-5">
      <div class="flex flex-col gap-5">
        <div v-for="(email, index) in emailList" :key="index" class="flex justify-between items-center">
          <label class="text-neutral-900">{{ t('Email') }} {{ index + 1 }}</label>
          <div class="flex gap-2">
            <input v-model="emailList[index]" type="email" placeholder="Email" class="w-full border border-neutral-400 rounded p-2" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" required />
            <Button @click="removeEmailField(index)" v-if="emailList.length > 1" variant="destructive" class="text-sm mt-1"> <X /></Button>
          </div>
        </div>
        <div class="flex justify-between items-center">
        <Button @click="addEmailField" variant="secondary" class="text-sm text-neutral-600 mt-1">{{ t('Add another email') }}</Button>
        <Button :disabled="isLoading" @click="onSubmit" class="bg-secondary-foreground text-white rounded-md py-2 px-4 mt-4" :class="{ 'opacity-50 cursor-not-allowed': isLoading }">
          <LoaderSpinner v-if="isLoading" class="mr-2 size-4 animate-spin" />
          <span>{{ t('Send Invitation') }}</span>
        </Button>
      </div>
      </div>
    </div>
  </Modal>

  <Modal :isOpen="isMembersModalOpen" @close="toggleMembersModal" title="Members" width="w-1/3">
    <div class="max-w-md mx-auto">
      <UserOrgList />
    </div>
  </Modal>

</template>
