
<template>
  <div class="sm:px-2 py-2 sm:gap-4 sm:px-3">
    <dt class="text-md font-bold leading-6 text-gray-900">{{ title }}</dt>
    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ body }}</dd>
  </div>
</template>

<script setup>
const props = defineProps(['title', 'body'])
</script>