<template>
  <div class="mb-4">
    <div class="rounded-lg drop-shadow-sm ring-1 ring-gray-900/5 bg-nmdoh-purple">
      <dl class="flex flex-wrap text-left">
        <div class="flex-auto pl-4 pt-4 cursor-pointer hover:underline" @click="$emit('openAbstract', props.idx)">
          <a class="mt-0.5 text-lg font-bold text-left text-white">{{ props.abstract.programName }}</a>
          <div class="text-sm font-semibold text-left text-white">
            <!--<BuildingLibraryIcon class="-ml-0.5 mr-0.5 pb-1 h-5 w-5 flex-shrink-0 self-center text-white inline" aria-hidden="true" />-->
            <span>{{ props.abstract.healthOrgName }}</span>
          </div>
        </div>
        <!--<div class="flex-none self-end px-6 pt-4">
          <dd class="inline-flex rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{{ props.abstract.programIsActive }}</dd>
        </div>-->
        <div class="mt-4 flex w-full flex-none gap-x-4 p-4 bg-nmdoh-gray-4">
          <!--<dt class="flex-none">

            <DocumentTextIcon class="h-6 w-5 text-gray-400" aria-hidden="true" />
          </dt>-->
          <dd class="text-md text-justify leading-6 text-nmdoh-gray-1 sm:normal">{{ props.abstract.programOperation }}</dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup>
import { BuildingLibraryIcon } from '@heroicons/vue/20/solid'
const props = defineProps(['abstract', 'idx', 'filterActive'])


// console.log(abstract.abstract)

</script>