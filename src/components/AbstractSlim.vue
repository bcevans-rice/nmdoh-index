<template>
  <div class="mb-4 min-w-full">
    <div class="rounded-lg drop-shadow-sm ring-1 ring-gray-900/5 bg-nmdoh-purple">
      <dl class="flex flex-wrap text-left">
        <div class="flex-auto pl-4 py-4 cursor-pointer hover:underline" @click="$emit('openAbstract', props.idx)">
          <a class="mt-0.5 text-lg font-bold text-left text-white">{{ props.abstract.programName }}</a>
          <div class="text-sm font-semibold text-left text-white" v-if="showSponsor">
            <span>{{ props.abstract.healthOrgName }}</span>
          </div>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps(['abstract', 'idx', 'filterActive', 'showSponsor'])
</script>