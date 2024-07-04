<template id="create-campaign">
  <section class="mx-auto max-w-4xl mt-15">

    <div class="flex justify-between items-end mb-8">
      <div class="flex justify-between">
        <span class="flex items-end">
          <div class="flex cursor-pointer" @click="goBack">
            <ChevronLeft class="p-1 text-muted" />
            <span class="text-muted">{{ t('back') }}</span>
          </div>
          <div class="ml-2 cursor-pointer" @click="goBack">
            <span class="text-3xl font-semibold">{{ t('campaigns') }}</span>
          </div>
          <div class="ml-2 text-info">
            <span class="mb-1">\{{ t('create_new') }}</span>
          </div>
        </span>
      </div>

      <div>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button class="bg-primary flex items-center p-5">
              <span>{{ t('save_and_publish') }}</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you ready to launch your campaign?</AlertDialogTitle>
              <AlertDialogDescription>
                You are about to publish and send this campaign to your selected audience. Please ensure all details are
                correct, as this action cannot be undone. Do you wish to proceed?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction @click="saveAndPublish">Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>
    </div>

    <hr class="my-2 border-gray-300">

    <div class="mb-4">

      <div class="flex items-top justify-between mt-5 mb-5">
        <div class="flex items-top">
          <CheckCheck class="text-primary mr-4 mt-2" />
          <div>
            <div class="text-2xl font-medium">{{ t('campaign_name') }}</div>
            <div class="mt-2 text-muted">{{ t('name_campaign_text') }}</div>
          </div>
        </div>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">{{ t('edit') }}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{{ t('campaign_name') }}</DialogTitle>
                <DialogDescription>
                  {{ t('name_campaign_text') }}
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Input type="text" class="mt-2" v-model="editedCampaignName" />
                </div>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <div class="flex justify-between">
                    <Button variant="outline" class="p-5">{{ t('Cancel') }}</Button>
                    <Button class="p-5" @click="confirmName">{{ t('Confirm') }}</Button>
                  </div>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <hr class="my-2 border-gray-300">

      <div>
        <div class="flex items-top justify-between mt-5 mb-5">
          <div class="flex items-top">
            <CheckCheck class="text-primary mr-4 mt-2" />
            <div>
              <div class="text-2xl font-medium">{{ t('sender') }}</div>
              <div class="mt-2 text-muted">{{ t('sender_text') }}</div>
            </div>
          </div>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">{{ t('edit') }}</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>{{ t('sender') }}</DialogTitle>
                  <DialogDescription>
                    {{ t('sender_text') }}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Input type="email" class="mt-2" v-model="editedSenderName" placeholder="example@example.com" />
                  </div>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <div class="flex justify-between">
                      <Button variant="outline" class="p-5">{{ t('Cancel') }}</Button>
                      <Button class="p-5" @click="confirmSender">{{ t('Confirm') }}</Button>
                    </div>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <hr class="my-2 border-gray-300">

        <div class="flex items-top justify-between mt-5 mb-5">
          <div class="flex items-top">
            <CheckCheck class="text-primary mr-4 mt-2" />
            <div>
              <div class="text-2xl font-medium">{{ t('recipient') }}</div>
              <div class="mt-2 text-muted">{{ t('subsribed_text') }}</div>
            </div>
          </div>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">{{ t('mention') }}</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                  <DialogTitle>{{ t('recipient') }}</DialogTitle>
                  <DialogDescription>
                    {{ t('subsribed_text') }}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2 ">
                  <ContactTable @selectedContacts="handleSelectedContacts" />
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <div class="flex justify-between">
                      <Button variant="outline" class="p-5">{{ t('Cancel') }}</Button>
                      <Button class="p-5" @click="confirmRecipients">{{ t('Confirm') }}</Button>
                    </div>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <hr class="my-2 border-gray-300">

        <div class="flex items-top justify-between mt-5 mb-5">
          <div class="flex items-top">
            <CheckCheck class="text-primary mr-4 mt-2" />
            <div>
              <div class="text-2xl font-medium">{{ t('subject') }}</div>
              <div class="mt-2 text-muted">{{ t('subject_text') }}</div>
            </div>
          </div>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">{{ t('fill_up') }}</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>{{ t('subject') }}</DialogTitle>
                  <DialogDescription>
                    {{ t('subject_text') }}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Input type="text" class="mt-2" v-model="editedSubject" />
                  </div>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <div class="flex justify-between">
                      <Button variant="outline" class="p-5">{{ t('Cancel') }}</Button>
                      <Button class="p-5" @click="confirmSubject">{{ t('Confirm') }}</Button>
                    </div>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <hr class="my-2 border-gray-300">

        <div class="flex items-top justify-between mt-5 mb-5">
          <div class="flex items-top">
            <CheckCheck class="text-primary mr-4 mt-2" />
            <div>
              <div class="text-2xl font-medium">{{ t('forward_programming') }}</div>
              <div class="mt-2 text-muted">{{ t('schedual_text') }}</div>
            </div>
          </div>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">{{ t('program') }}</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>{{ t('forward_programming') }}</DialogTitle>
                  <DialogDescription>
                    {{ t('schedual_text') }}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Input type="text" class="mt-2" v-model="editedSubject" />
                    <!-- Add input field for scheduling -->
                    <!--Input type="datetime-local" class="mt-2" v-model="editedSchedule" /-->
                  </div>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <div class="flex justify-between">
                      <Button variant="outline" class="p-5">{{ t('Cancel') }}</Button>
                      <!-- Modify Confirm button to include scheduling -->
                      <Button class="p-5" @click="confirmSubject">{{ t('Confirm') }}</Button>
                    </div>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>


        <hr class="my-2 border-gray-300">

        <div class="flex items-top justify-between mt-5 mb-5">
          <div class="flex items-top">
            <CheckCheck class="text-primary mr-4 mt-2" />
            <div>
              <div class="text-2xl font-medium">{{ t('content') }}</div>
              <div class="mt-2 text-muted">{{ t('content_text') }}</div>
            </div>
          </div>
          <div>
            <Button variant="outline" @click="goDesign">{{ t('design') }}</Button>
          </div>
        </div>
      </div>

      <hr class="my-2 border-gray-300">

    </div>

  </section>

</template>

<script setup lang="ts">
import { defineEmits, ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { CheckCheck, ChevronLeft } from 'lucide-vue-next'
import { useCampaignStore } from '@/stores/campaign'
import { useAppStore } from '@/stores/app'
import { emptyCampaign } from '@/constants'
import type { NewCampaign } from '@/types/campaign'
import { ContactTable } from '@/modules/support/components'

const appStore = useAppStore();
const campaignStore = useCampaignStore();

const { t } = useI18n()

const emits = defineEmits(['switchView'])

const editedCampaignName = ref('');
const editedSenderName = ref('');
const editedSubject = ref('');
const editedSchedule = ref<Date>(new Date()); // Initialize with a default value
const selectedRecipients = ref<string[]>([]);

const goBack = () => {
  emits('switchView', 'listing')
}

const goDesign = () => {
  // Save the temporary campaign data in the Pinia store
  appStore.setTemporaryCampaign({
    name: editedCampaignName.value,
    sender: editedSenderName.value,
    subject: editedSubject.value,
    sendAt: editedSchedule.value,
    emailRecipients: selectedRecipients.value,
    emailTemplateId: '',
    createdBy: ''
  });
  emits('switchView', 'design')
}

const handleSelectedContacts = (selectedContacts: string[]) => {
  ////console.log('Received selected contact IDs from child component:', selectedContacts)
  selectedRecipients.value = selectedContacts;
}

let modifiedCampaign: NewCampaign = { ...emptyCampaign };

const confirmName = () => {
  modifiedCampaign.name = editedCampaignName.value;
  // Save the modified campaign in the Pinia store
  campaignStore.addCampaign(modifiedCampaign);
  ////console.log('Modified campaign:', modifiedCampaign)
};

const confirmSender = () => {
  modifiedCampaign.sender = editedSenderName.value;
  campaignStore.addCampaign(modifiedCampaign);
  ////console.log('Modified campaign:', modifiedCampaign)
};

const confirmSubject = () => {
  modifiedCampaign.subject = editedSubject.value;
  campaignStore.addCampaign(modifiedCampaign);
  ////console.log('Modified campaign:', modifiedCampaign)
};

const confirmRecipients = () => {
  modifiedCampaign.emailRecipients = selectedRecipients.value;
  campaignStore.addCampaign(modifiedCampaign);
  //console.log('Modified campaign:', modifiedCampaign)
};

const saveAndPublish = async () => {
  try {
    //console.log('Starting Save and Publish process...');

    // Get the saved email template ID
    const emailTemplateId: string | null = appStore.getSelectedTemplateId();
    if (!emailTemplateId) {
      throw new Error('Email template ID is not available.');
    }
    //console.log('Retrieved email template ID:', emailTemplateId);

    // Construct the payload
    const id = appStore.getOrgId();
    console.log("get Id", id)
    if (id) {
      const payload = {
        name: editedCampaignName.value,
        sender: editedSenderName.value,
        subject: editedSubject.value,
        sendAt: editedSchedule.value,
        emailRecipients: selectedRecipients.value,
        emailTemplateId: emailTemplateId,
        createdBy: id,
      };
      await campaignStore.createCampaign(payload);

    }
    goBack();
  } catch (error) {
    console.error('Error occurred during Save and Publish:', error);
  }
};

// Retrieve the temporary campaign data when the component is mounted
onMounted(() => {
  const temporaryCampaign = appStore.getTemporaryCampaign();
  if (temporaryCampaign) {
    // Populate the fields with the temporary campaign data
    editedCampaignName.value = temporaryCampaign.name;
    editedSenderName.value = temporaryCampaign.sender;
    editedSubject.value = temporaryCampaign.subject;
    selectedRecipients.value = temporaryCampaign.emailRecipients;

    // Log the temporary campaign data
    //console.log('Temporary Campaign Data:', temporaryCampaign);
  }

  // Log the edited values
  //console.log('Edited Campaign Name:', editedCampaignName.value);
  //console.log('Edited Sender Name:', editedSenderName.value);
  //console.log('Edited Subject:', editedSubject.value);
  //console.log('Selected Recipients:', selectedRecipients.value);
});

</script>