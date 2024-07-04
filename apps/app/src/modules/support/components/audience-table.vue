<template>
  <section class="flex justify-center items-center h-full w-full flex-col">
    <!-- Table to display contacts -->
    <Table class="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Select</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead class="flex justify-between items-center">
            <div class="flex justify-start">
              Email
            </div>
            <div class="flex justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button class="bg-primary p-2"> <!-- Reduced padding here -->
                    <Plus class="h-4 w-6" /> <!-- Adjusted icon size -->
                  </Button>
                </DialogTrigger>
                <DialogContent class="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>{{ t('Add Audience') }}</DialogTitle>
                    <DialogDescription>
                      {{ t('Create New Contact') }}
                    </DialogDescription>
                  </DialogHeader>
                  <!-- Form to add new contact -->
                  <div class="flex items-center space-x-2">
                    <div class="grid grid-cols-1 gap-4 w-full">
                      <Input type="text" class="mt-2" v-model="newContact.firstName" placeholder="First Name" />
                      <Input type="text" class="mt-2" v-model="newContact.lastName" placeholder="Last Name" />
                      <Input type="email" class="mt-2" v-model="newContact.email" placeholder="Email" />
                      <Input type="text" class="mt-2" v-model="newContact.phone" placeholder="Phone" />
                    </div>
                  </div>
                  <DialogFooter class="sm:justify-start mt-4">
                    <DialogClose asChild>
                      <div class="flex justify-end">
                        <Button variant="outline" class="p-4 mr-2">{{ t('Cancel') }}</Button>
                        <Button class="p-4 bg-primary" @click="createNewContact">{{ t('Confirm') }}</Button>
                      </div>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <!-- Iterate over contacts -->
        <TableRow v-for="contact in contacts" :key="contact.id">
          <TableCell>
            <Checkbox :checked="isSelected(contact.email)" @click="toggleSelection(contact.email)"
              :key="`checkbox-${contact.email}`" />
          </TableCell>
          <TableCell>{{ contact.firstName }}</TableCell>
          <TableCell>{{ contact.lastName }}</TableCell>
          <TableCell>{{ contact.email }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue'
import { useContactStore } from '@/stores/contact'
import { useAppStore } from '@/stores/app'
import type { Contact, createContact } from '@/types/contact'
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus } from 'lucide-vue-next';

import { useI18n } from 'vue-i18n'

const appStore = useAppStore();
const { t } = useI18n()

const orgId = appStore.getOrgId();
// Define the newContact object using the createContact type
const newContact = ref<createContact>({
  firstName: '',
  lastName: '',
  email: '',
  phone: ''
})

// Create a reactive variable to store the contacts
const contacts = ref<Contact[]>([])
const selectedContacts = ref<string[]>([])

const emit = defineEmits(['selectedContacts'])

// Fetch contacts when the component is mounted
onMounted(async () => {
  const contactStore = useContactStore()
  if (orgId) {
    try {
      const data: Contact[] = await contactStore.getAllContacts(orgId)
      contacts.value = data
    } catch (error) {
      console.error('Error fetching contacts:', error)
    }
  }
})

// Check if a contact is selected
const isSelected = (email: string) => {
  return selectedContacts.value.includes(email)
}

// Toggle selection of a contact
const toggleSelection = (email: string) => {
  const index = selectedContacts.value.indexOf(email);
  if (index !== -1) {
    // Contact is already selected, deselect it
    selectedContacts.value.splice(index, 1);
  } else {
    // Contact is not selected, select it
    selectedContacts.value.push(email);
  }
  console.log('Selected contact emails:', selectedContacts.value)
  emit('selectedContacts', selectedContacts.value)
  console.log('Emitted selected contact emails:', selectedContacts.value)
}

// Method to create a new contact
const createNewContact = async () => {
  const contactStore = useContactStore()
  if (orgId) {
    const newContactData: Contact = {
      firstName: newContact.value.firstName,
      lastName: newContact.value.lastName,
      email: newContact.value.email,
      id: Math.random().toString(36).substr(2, 9), // Generate a random ID
      phone: newContact.value.phone,
      createdBy: orgId
    }
    try {
      await contactStore.createContact(newContactData)
      console.log('New contact created:', newContactData)
      contacts.value.push(newContactData) // Add the new contact to the local list
      // Clear input fields after creating the contact
      newContact.value = {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      }
    } catch (error) {
      console.error('Error creating new contact:', error)
    }
  }
}
</script>
