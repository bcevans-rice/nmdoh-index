<template>
  <div>
    <div class="px-4 sm:px-0">
      <h3 class="text-2xl font-semibold leading-7 text-gray-900">{{ abstract.programName }}</h3>
      <a v-if="abstract.programUrl" tabindex="-1" class="text-md text-nmdoh-purple hover:underline ring-0" :href="abstract.programUrl" target="_blank" rel="noopener noreferrer">{{ abstract.programUrl }}</a>
    </div>
    <div class="mt-6 border-t border-gray-100">
      <div class="border-t border-gray-100 px-4 py-3 sm:col-span-2 sm:px-0">
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{{ abstract.programOperation }}</dd>
        </div>
      <dl class="divide-y divide-gray-100">
        <div class="bg-gray-50 px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
          <dt class="text-sm font-bold leading-6 text-gray-900">Drivers of Health</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ abstract.nmdohTargets.join(', ') }}</dd>
        </div>
        <div class="bg-gray-50 px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
          <dt class="text-sm font-bold leading-6 text-gray-900">Target Conditions</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ abstract.conditionFocus.join(', ') }}</dd>
        </div>
        <div class="bg-white px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
          <dt class="text-sm font-bold leading-6 text-gray-900">Target Populations</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ abstract.nmdohTargetPopulations.join(', ') }}</dd>
        </div>
        <div class="bg-gray-50 px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
          <dt class="text-sm font-bold leading-6 text-gray-900">Program Funding</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ abstract.programFunding }}</dd>
        </div>
        
        <div class="bg-gray-50 px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
          <dt class="text-sm font-bold leading-6 text-gray-900">Health Organization</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ abstract.healthOrgName }}</dd>

        </div>
        <div class="bg-gray-50 px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
          <dt class="text-sm font-bold leading-6 text-gray-900">Health Org Type</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ abstract.healthOrgType }}</dd>
        </div>
        <div class="bg-gray-50 px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
          <dt class="text-sm font-bold leading-6 text-gray-900">Count{{ abstract.countiesOffered.length > 1 ? 'ies' : 'y'}} Offered</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ abstract.countiesOffered.join(', ') }}</dd>
        </div>
      </dl>
    </div>

  </div>
</template>

<script setup>
const props = defineProps(['abstract'])
</script>