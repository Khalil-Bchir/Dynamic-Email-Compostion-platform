<template>
  <section class="w-full min-h-screen py-12 md:py-24 lg:py-32 bg-background">
    <router-link :to="{ name: 'create-org' }" class="absolute top-5 right-10 text-primary hover:text-primary-dark">
      <Button>Create New Workspace</Button>
    </router-link>
    <div class="container mx-auto grid items-center justify-center gap-8 px-4 text-center md:px-6 lg:gap-10 relative">
      <div class="space-y-5">
        <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Workspaces</h2>
        <p class="mx-auto max-w-[700px] md:text-xl lg:text-base xl:text-xl text-muted">
          Choose a workspace to kickstart your productivity.
        </p>
      </div>
      <div class="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        <div v-for="layout in organizations" :key="layout.id"
          class="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2 bg-card p-6"
          @click="handleWorkspaceClick(layout.id)">
          <div class="cursor-pointer">
            <h3 class="font-bold text-xl mb-2 text-card-foreground dark:text-gray-200 uppercase">{{ layout.name }}</h3>
            <p class="text-gray-500 dark:text-gray-400 text-sm">Designed for team-based projects and communication.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useOrgStore } from '@/stores/orgainzation';
import { useUserStore } from '@/stores/user';
import { useAppStore } from '@/stores/app';
import { storeToRefs } from 'pinia';
import type { Organization } from '@/types';
import { Button } from '@/components/ui/button';

const organizations = ref<Organization[]>([]);
const useApp = useAppStore();
const orgStore = useOrgStore();
const { currentUser } = storeToRefs(useUserStore());
const router = useRouter();

// Function to initialize orgId from local storage
const initializeOrgId = () => {
  const storedOrgId = localStorage.getItem('orgId');
  if (storedOrgId) {
    useApp.setOrgId(storedOrgId);
  }
};

const initializeRole = () => {
  const storedRole = localStorage.getItem('Role')
  if (storedRole) {
    useApp.setRole(storedRole)
  }
}

const fetchRole = async (orgId: string) => {
  if (currentUser.value) {
    const userId = currentUser.value.id;
    const fetchedRole = await orgStore.fetchUserRole(userId, orgId );
    return fetchedRole
  }
};

// Function to handle clicking on workspace
const handleWorkspaceClick = async (id: string) => {
  try {
    useApp.setOrgId(id);
    localStorage.setItem('orgId', id);

    // Fetch the user's role for the selected organization
    const userRole = await fetchRole(id);
    console.log(userRole)
    useApp.setRole(userRole);
    localStorage.setItem('Role', userRole);

    // Redirect to the home overview page
    router.push({ name: 'home-overview', params: { id: id } });
  } catch (error) {
    console.error('Error handling workspace click:', error);
  }
};

onMounted(async () => {
  try {
    initializeOrgId(); // Initialize orgId from local storage
    initializeRole(); // Initialize role from local storage
    if (currentUser.value) {
      const userId = currentUser.value.id;
      const fetchedOrg = await orgStore.fetchOrganizations(userId);
      organizations.value = fetchedOrg;
    } else {
      console.error('User not available.');
    }
  } catch (error) {
    console.error('Error fetching organizations:', error);
  }
});
</script>
