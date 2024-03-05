<template>
  <div class="">

    <!-- Card Header -->
    <div>
        <h3 class="text-xl font-bold leading-6 text-nmdoh-gray-1">
          {{ abstract.programName }}
          <div class="my-2 md:my-0 md:float-right">
            <!-- Active/Inactive -->
            <div :class="[abstract.programIsActive === 'Active' ? 'ring-nmdoh-green-2 bg-nmdoh-green-2' : 'ring-nmdoh-purple bg-nmdoh-purple', 'ring-2 ring-inset inline-flex items-baseline rounded-full px-3.5 py-1 mr-1 md:mx-1 text-sm font-medium md:mt-2 lg:mt-0 text-white']">
              <CheckCircleIcon v-if="abstract.programIsActive === 'Active'" class="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-white" aria-hidden="true" />
              <PauseCircleIcon v-else class="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-white" aria-hidden="true" />
              {{ abstract.programIsActive }}
            </div>

            <!-- Evaluated -->
            <div :class="[abstract.programIsEvaluated === 'Yes' ? 'ring-nmdoh-green-2 bg-nmdoh-green-2' : 'ring-nmdoh-purple bg-nmdoh-purple', 'ring-2 ring-inset inline-flex items-baseline rounded-full px-3.5 py-1 mx-1 text-sm font-medium md:mt-2 lg:mt-0 text-white']">
              <CheckCircleIcon v-if="abstract.programIsEvaluated === 'Yes'" class="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-white" aria-hidden="true" />
              <PauseCircleIcon v-else class="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-white" aria-hidden="true" />
              {{ abstract.programIsEvaluated === 'Yes' ? 'Evaluated' : 'Not Yet Evaluated'}}
            </div>
          </div>
        </h3>
        <a v-if="abstract.programUrl" tabindex="-1" class="text-md text-nmdoh-purple underline ring-0"
          :href="abstract.programUrl" target="_blank" rel="noopener noreferrer">{{ abstract.programUrl }}</a>

          <h5 class="text-base font-bold leading-6 mt-2">
            <!-- healthOrgName -->
            <span class="text-nmdoh-gray mr-2">{{ abstract.healthOrgName }}</span>

            <div class="bg-nmdoh-purple inline-flex items-baseline rounded-full px-3.5 py-1 text-sm md:mt-2 lg:mt-0 text-white">
              <BuildingLibraryIcon class="-ml-1 mr-0.5 pb-0.5 h-5 w-5 flex-shrink-0 self-center text-white inline" aria-hidden="true" />
              {{ abstract.healthOrgType }}
            </div>
          </h5>

    </div>

    <div class="grid sm:grid-cols-12 sm:gap-4 sm:px-4 sm:px-0">
      <div class="sm:col-span-8 sm:min-w-4/5">

        <div class="mt-3 border-t sm:border-gray-100 pt-2 sm:p-2 sm:col-span-2 sm:px-0">
          <div class="text-md font-bold leading-6 text-gray-900">Program Description</div>
          <div class="text-sm leading-6 text-gray-700 mt-1 mb-4 sm:mb-8">{{ abstract.programOperation }}</div>

          <div class="text-md font-bold leading-6 text-gray-900">Funding</div>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <p v-for="f in abstract.programFunding.split('\n')">{{ f }}</p>
          </dd>
        </div>
      </div>

      <div class="sm:col-span-4">
        <div class="mt-3 border-t border-gray-100">

          <!--<AbstractCardRow title="Sponsor Type" :body="abstract.healthOrgType" />-->
          <AbstractCardRow title="Non-Medical Drivers of Health" :body="abstract.nmdohTargets.join(', ')" />
          <AbstractCardRow title="Target Populations" :body="abstract.nmdohTargetPopulations.join(', ')" />
          <AbstractCardRow title="Health Conditions" :body="abstract.conditionFocus.join(', ')" />
          <AbstractCardRow :title="'Count' + (abstract.countiesOffered.length > 1 ? 'ies' : 'y')"
            :body="abstract.countiesOffered.join(', ')" />

          <!--
          <div class="bg-gray-50 px-2 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt class="text-sm font-bold leading-6 text-gray-900">Health Organization</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"></dd>
          </div>
          -->

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckCircleIcon, PauseCircleIcon, BuildingLibraryIcon } from '@heroicons/vue/20/solid';
import AbstractCardRow from './AbstractCardRow.vue';
const props = defineProps(['abstract'])
</script>