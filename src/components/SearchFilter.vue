<template>
  <!-- Filters -->
  <section aria-labelledby="filter-heading">
      <h2 id="filter-heading" class="sr-only">Filters</h2>

      <div class="border-b border-gray-200 bg-white pb-4">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button type="button" class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden" @click="open = true">Filters</button>

          <div class="hidden sm:block">
            <div class="flow-root">
              <PopoverGroup class="-mx-4 grid grid-cols-6 divide-x divide-gray-200">
                <Popover v-for="(section, sectionIdx) in searchFilters" :key="section.name" class="relative inline-block px-2 text-center col-auto">
                  <PopoverButton class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    <span>{{ section.name }}</span>
                    <ChevronDownIcon class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                    <span :class="{'invisible': filterSectionCount[section.id] === 0}" class="ml-1.5 rounded bg-nmdoh-green-2 px-2 py-0.5 text-xs font-semibold tabular-nums text-white text-center">{{ filterSectionCount[section.id] }}</span>
                  </PopoverButton>

                  <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <PopoverPanel class="absolute z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <form class="space-y-4">
                        <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex items-center">
                          <input :id="`filter-${section.id}-${optionIdx}`" :name="`${section.id}[]`" v-model="option.checked" type="checkbox" :checked="option.checked" class="h-4 w-4 rounded border-gray-300 text-nmdoh-purple focus:ring-nmdoh-purple" />
                          <label :for="`filter-${section.id}-${optionIdx}`" class="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900">{{ option.label }}</label>
                        </div>
                      </form>
                    </PopoverPanel>
                  </transition>
                </Popover>
              </PopoverGroup>
            </div>
          </div>
        </div>
      </div>

      <!-- Active filters -->
      <div class="bg-gray-100" :class="{'invisible': allOptions.length === 0}">
        <div class="mx-auto max-w-7xl px-4 py-3 sm:flex sm:items-center sm:px-6 lg:px-8">
          <h3 class="text-sm font-medium text-gray-500">
            Filters
            <span class="sr-only">, active</span>
          </h3>

          <div aria-hidden="true" class="hidden h-5 w-px bg-gray-300 sm:ml-4 sm:block" />

          <div class="mt-2 sm:ml-4 sm:mt-0">
            <div class="-m-1 flex flex-wrap items-center">
              <span v-for="activeFilter in allOptions" :key="activeFilter.value" class="m-1 inline-flex items-baseline rounded-full border border-nmdoh-purple bg-nmdoh-purple py-1.5 pl-3 pr-2 text-sm font-medium text-white">
                {{ activeFilter.label }}
                <button type="button" @click="store.removeFilter(activeFilter.label)" class="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-white">
                  <span class="sr-only">Remove filter for {{ activeFilter.label }}</span>
                  <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                    <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
                  </svg>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

</template>

<script setup>
import { ref } from 'vue'
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel
} from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia'

// access the `store` variable anywhere in the component
const store = useSearchStore()

const { searchFilters, filterSectionCount, allOptions } = storeToRefs(store)

const open = ref(false)

</script>