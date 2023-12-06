<template>
  <TransitionRoot as="div" :show="open" v-if="open">
    <Dialog as="div" class="relative z-10">
      <TransitionChild as="div" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="div" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 max-w-5xl sm:p-6">
              <!-- Abstract listing below -->
              <div>
                <AbstractCard :abstract="props.abstract" />
              </div>
              <div class="mt-5 sm:mt-6">
                <button type="button" tabindex="0" class="inline-flex w-full justify-center rounded-md bg-nmdoh-green-2 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nmdoh-green-2" @click="closeModal">Back to Index</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import AbstractCard from '@/components/AbstractCard.vue'

const props = defineProps(['abstract', 'open'])
const emit = defineEmits(['closeModal'])

function closeModal() {
  emit('closeModal')
}
</script>