<template>
  <div class="min-w-full text-left my-8 transform overflow-hidden rounded-xl bg-white shadow-2xl border-nmdoh-purple border-2 transition-all">
      <div class="relative">
        <input v-model="searchText" @keyup.enter="performSearch"
          class="min-w-full h-10 border-0 bg-transparent pl-4 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
          placeholder="Enter search terms" />
          <button @click="performSearch" class="absolute inset-y-0 right-0 font-bold flex items-center rounded-r-md px-2 focus:outline-none bg-nmdoh-green-2 text-white
          ">
            <MagnifyingGlassIcon class="h-5 w-5 mr-2.5" aria-hidden="true" />
            Search <span class="hidden md:inline-block">&nbsp;Programs</span>
          </button>
      </div>
    
  </div>
</template>

<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia'

const store = useSearchStore()
const { searchText } = storeToRefs(store)


async function performSearch() {
  await setTimeout(() => {
    store.performSearch()
  }, 150)
}

</script>