<template>
  <div class="mb-4">
    <div class="rounded-lg shadow-sm ring-1 ring-gray-900/5 bg-nmdoh-green-2">
      <dl class="flex flex-wrap text-left">
        <div class="flex-auto pl-4 pt-2">
          <dd class="mt-1 text-base font-semibold text-left text-white">No programs found</dd>
        </div>
        <!--<div class="flex-none self-end px-6 pt-4">
          <dd class="inline-flex rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{{ abstract.abstract.programIsActive }}</dd>
        </div>-->
        <div class="mt-4 flex w-full flex-none gap-x-4 px-6 py-6 bg-gray-50">
          <dt class="flex-none">

            <InformationCircleIcon class="h-6 w-5 text-gray-400" aria-hidden="true" />
          </dt>
          <dd class="text-sm leading-6 text-gray-500">
            No programs were found for the selected criteria, please revise your search criteria
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup>
import { CalendarDaysIcon, CreditCardIcon, MagnifyingGlassCircleIcon, UserGroupIcon, MapPinIcon, InformationCircleIcon } from '@heroicons/vue/20/solid'
const abstract = defineProps(['abstract'])


// console.log(abstract.abstract)

</script>