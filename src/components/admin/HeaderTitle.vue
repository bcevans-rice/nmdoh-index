<template>
  <header class="bg-white shadow-md">
    <div class="mx-auto xl:px-36 lg:px-20 md:px-12 px-12 py-6 flex">
      <h1 class="grow text-3xl font-bold leading-tight tracking-tight text-gray-900 truncate">{{ title }}</h1>
      <slot class="flex-initial w-64">

      </slot>
    </div>
  </header>
</template>

<script setup>
const props = defineProps(['title'])
</script>