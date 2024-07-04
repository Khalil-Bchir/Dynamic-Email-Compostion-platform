<template>
  <Table class="w-full">
    <TableHeader>
      <TableRow>
        <TableHead class="w-2/3">Email</TableHead>
        <TableHead class="w-1/3 text-center">Role</TableHead>
        <TableHead v-if="fetchedRole == 'Admin'" class="w-1/3 text-center">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="user in orgStore.users" :key="user.id">
        <TableCell class="w-2/3">{{ user.email }}</TableCell>
        <TableCell class="w-1/3 text-right">
          <Select v-if="fetchedRole == 'Admin'" v-model="user.role"
            @update:modelValue="(value) => confirmRoleUpdate(user.id, value)">
            <SelectTrigger class="w-[100px]">
              <SelectValue :placeholder="user.role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Roles</SelectLabel>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Member">Member</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <TableCell v-else class="w-2/3">{{ user.role }}</TableCell>
        </TableCell>
        <TableCell class="w-1/3 text-center">
          <Button v-if="fetchedRole == 'Admin'" @click="removeUser(user.userOrg)"
            class="mr-2 bg-destructive">
            <Trash2  class="p-1" />
          </Button>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useOrgStore } from '@/stores/orgainzation';
import { useAppStore } from '@/stores/app';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-vue-next';


const orgStore = useOrgStore();
const appStore = useAppStore();
const orgId = appStore.getOrgId();
const fetchedRole = appStore.getRole();
//console.log(fetchedRole);

onMounted(async () => {
  //console.log('Mounted, orgId:', orgId);
  if (orgId) {
    const fetched = await orgStore.fetchUsersByOrganization(orgId);
    console.log('Fetched users:', fetched);
  }
});

// Method to confirm role update
const confirmRoleUpdate = async (userId: string, newRole: string) => {
  //console.log('confirmRoleUpdate called:', userId, newRole);
  try {
    if (orgId) {
      await orgStore.assignRole(userId, orgId, newRole);
      //console.log("Updated role:", userRole);
    }
  } catch (error) {
    console.error('Error confirming role update:', error);
  }
};

const removeUser = async (id: string) => {
  try {
      await orgStore.deactivateUser(id);
  } catch (error) {
    console.error('Error removing user:', error);
  }
};
</script>
