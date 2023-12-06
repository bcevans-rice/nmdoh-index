<template>
  <div class="bg-nmdoh-green-2 inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm md:mt-2 lg:mt-0 text-white">
    {{ count }}
  </div>
</template>

<script setup>
  const props = defineProps(['count'])
</script>