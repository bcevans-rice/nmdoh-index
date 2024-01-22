<template>
  <!-- Purple Header -->
  <section
    class="xl:px-36 lg:px-20 md:px-12 px-12 border-b border-gray-200 bg-nmdoh-purple pt-12 bg-header-background bg-no-repeat bg-center bg-cover">
    <h1 class="text-4xl text-left font-light text-white">Programs In Texas</h1>
    <h3 class="text-2xl text-left font-light text-white">Non-Medical Drivers of Health Program Index</h3>
    <p class="text-base text-left font-light text-white pb-4">
    <p>You can search for Texas NMDOH programs by selecting your areas of interest in the 8 fields listed below.</p>
    <p>You may select one, all, or none of the areas listed under each field. You may also use the search bar below to
      find a specific term(s).</p>
    <p>An alphabetical listing of all programs grouped by program sponsor appears below.</p>

    <AbstractSearch />
    </p>
  </section>

  <!-- Page -->
  <div class="bg-white xl:px-36 lg:px-20 md:px-12 px-12">
    <div>
      <!-- Mobile filter dialog -->
      <main v-if="isMobile">
        <!-- Sidebar  -->
        <TransitionRoot as="template" :show="sidebarOpen">
          <Dialog as="div" class="relative z-50 lg:hidden" @close="sidebarOpen = false">
            <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
              enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
              leave-to="opacity-0">
              <div class="fixed inset-0 bg-gray-900/80" />
            </TransitionChild>

            <div class="fixed inset-0 flex">
              <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                enter-from="-translate-x-full" enter-to="translate-x-0"
                leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                leave-to="-translate-x-full">
                <DialogPanel class="relative mr-16 flex w-full max-w-md flex-1">
                  <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                    enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                    <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                        <span class="sr-only">Close sidebar</span>
                        <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </TransitionChild>
                  <!-- Sidebar component, swap this element with another sidebar if you like -->
                  <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                    <div class=" block">
                      <form class="space-y-2 divide-y divide-gray-200">

                        <Disclosure as="div" v-for="section in searchFilters" :key="section.id"
                          class="border-t border-gray-200 px-4 py-6" v-slot="{ open }">
                          <h3 class="-mx-4 -my-3 flow-root">
                            <DisclosureButton
                              class="flex w-full items-center justify-between bg-white px-2 py-2 text-gray-400 hover:text-gray-600">
                              <span class="font-bold text-gray-900">{{ section.name }}
                                <span :class="{ 'invisible': filterSectionCount[section.id] === 0 }"
                                  class="ml-1.5 rounded bg-nmdoh-green-2 px-2 py-0.5 text-xs font-semibold tabular-nums text-white text-center">{{
                                    filterSectionCount[section.id] }}</span>

                              </span>

                              <span class="flex items-center">
                                <PlusIcon v-if="!open" class="h-5 w-5" aria-hidden="true" />
                                <MinusIcon v-else class="h-5 w-5" aria-hidden="true" />
                              </span>
                            </DisclosureButton>
                          </h3>
                          <DisclosurePanel class="pt-6">
                            <div class="space-y-3">
                              <div v-for="(option, optionIdx) in section.options" :key="option.value"
                                class="flex items-center text-gray-600">
                                <!--   -->
                                <input v-model="option.checked" @change="recalc"
                                  :disabled="!(option.value in counts[section.id])"
                                  :class="{ 'text-gray-300 cursor-not-allowed': !(option.value in counts[section.id]) }"
                                  :id="`filter-mobile-${section.id}-${optionIdx}`" :name="`${section.id}[]`"
                                  type="checkbox"
                                  class="h-4 w-4 rounded border-gray-300 text-nmdoh-purple focus:ring-nmdoh-purple" />
                                <label :for="`filter-mobile-${section.id}-${optionIdx}`" class="mx-2 grow text-left"
                                  :class="{ 'text-gray-300 cursor-not-allowed': !(option.value in counts[section.id]) }">
                                  {{ option.label }}
                                  <span class="font-bold text-left text-sm">{{ counts[section.id][option.value] ? '(' +
                                    counts[section.id][option.value] + ')' : '' }}</span>
                                </label>
                              </div>
                            </div>
                          </DisclosurePanel>
                        </Disclosure>

                      </form>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </TransitionRoot>

        <!-- Main content section -->
        <section>
          <div>
            <div class="my-3 font-bold text-2xl" v-if="!isFiltered && allOptions.length === 0">Index contains {{
              allAbstracts.length }} programs</div>
          <div class="my-3 font-bold text-2xl" v-else>Showing {{ filteredAbstracts.length }} {{ allAbstracts.length >
            filteredAbstracts.length ? 'of ' + allAbstracts.length : '' }} programs</div>
          <button type="button" class="block flex items-center gap-x-1.5 rounded-md bg-nmdoh-green-2 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click="sidebarOpen = true">
            <Bars3Icon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Filters
          </button>
        </div>
          <div class="flex flex-wrap lg:col-span-8 max-h-12 place-content-start">
            <div class="w-full text-right" :class="{ 'invisible': !isFiltered && allOptions.length === 0 }">
              <button @click="filterClear" class="bg-nmdoh-green-2 font-bold text-white rounded-md p-2 inset-y-0 right-0">
                <XMarkIcon class="h-5 w-5 mr-1.5 inline-block" aria-hidden="true" />
                <span>Clear filters</span>
              </button>
            </div>
            <!-- Content -->
            <div v-if="filteredAbstracts.length === 0" class="my-2 min-w-full mt-3">
              <EmptyAbstract />
            </div>
            <div v-if="!isFiltered && allOptions.length === 0" class="my-2 min-w-full mt-3">
              <!-- New way by Sponsor -->
              <div v-for="sp in sponsors" class="pb-6">
                <h3 class="mb-3 font-bold text-xl">{{ sp }} </h3>
                <div v-for="ab in sponsorPrograms[sp]">
                  <AbstractSlim :abstract="ab[0]" :idx="ab[1]" :showSponsor="false" :key="ab.responseID"
                    @openAbstract="openSelectedModal" />
                </div>
              </div>
            </div>
            <div v-else class="my-2 min-w-full mt-3">
              <div v-for="(ab, abIdx) in filteredAbstracts">
                <Abstract :abstract="ab" :idx="abIdx" :key="ab.responseID" @openAbstract="openSelectedModal" />
              </div>
            </div>
  
          </div>
        </section>
      </main>

      <!-- Desktop filters -->
      <main v-else>
        <div class="grid grid-cols-12 gap-x-8">

          <aside class="col-span-4 max-w-lg">
            <div class="my-5 font-bold text-2xl" v-if="!isFiltered && allOptions.length === 0">Index contains {{
              allAbstracts.length }} programs</div>
            <div class="my-5 font-bold text-2xl" v-else>Showing {{ filteredAbstracts.length }} {{ allAbstracts.length >
              filteredAbstracts.length ? 'of ' + allAbstracts.length : '' }} programs</div>

            <button type="button" class="inline-flex items-center lg:hidden" @click="mobileFiltersOpen = true">
              <!--<span class="text-sm font-medium text-gray-700">Filters</span>-->
              <PlusIcon class="ml-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            </button>

            <div class="hidden lg:block">
              <form class="space-y-2 divide-y divide-gray-200">

                <Disclosure as="div" v-for="section in searchFilters" :key="section.id"
                  class="border-t border-gray-200 px-4 py-6" v-slot="{ open }">
                  <h3 class="-mx-4 -my-3 flow-root">
                    <DisclosureButton
                      class="flex w-full items-center justify-between bg-white px-2 py-2 text-gray-400 hover:text-gray-600">
                      <span class="font-bold text-gray-900">{{ section.name }}
                        <span :class="{ 'invisible': filterSectionCount[section.id] === 0 }"
                          class="ml-1.5 rounded bg-nmdoh-green-2 px-2 py-0.5 text-xs font-semibold tabular-nums text-white text-center">{{
                            filterSectionCount[section.id] }}</span>

                      </span>

                      <span class="flex items-center">
                        <PlusIcon v-if="!open" class="h-5 w-5" aria-hidden="true" />
                        <MinusIcon v-else class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel class="pt-6">
                    <div class="space-y-3">
                      <div v-for="(option, optionIdx) in section.options" :key="option.value"
                        class="flex items-center text-gray-600">
                        <!--   -->
                        <input v-model="option.checked" @change="recalc" :disabled="!(option.value in counts[section.id])"
                          :class="{ 'text-gray-300 cursor-not-allowed': !(option.value in counts[section.id]) }"
                          :id="`filter-mobile-${section.id}-${optionIdx}`" :name="`${section.id}[]`" type="checkbox"
                          class="h-4 w-4 rounded border-gray-300 text-nmdoh-purple focus:ring-nmdoh-purple" />
                        <label :for="`filter-mobile-${section.id}-${optionIdx}`" class="mx-2 grow text-left"
                          :class="{ 'text-gray-300 cursor-not-allowed': !(option.value in counts[section.id]) }">
                          {{ option.label }}
                          <span class="font-bold text-left text-sm">{{ counts[section.id][option.value] ? '(' +
                            counts[section.id][option.value] + ')' : '' }}</span>
                        </label>
                      </div>
                    </div>
                  </DisclosurePanel>
                </Disclosure>

              </form>
            </div>
          </aside>

          <!-- Filter content -->
          <div class="flex flex-wrap lg:col-span-8 max-h-12 place-content-start mt-6">
            <div class="w-full text-right" :class="{ 'invisible': !isFiltered && allOptions.length === 0 }">
              <button @click="filterClear" class="bg-nmdoh-green-2 font-bold text-white rounded-md p-2 inset-y-0 right-0">
                <XMarkIcon class="h-5 w-5 mr-1.5 inline-block" aria-hidden="true" />
                <span>Clear filters</span>
              </button>
            </div>
            <!-- Content -->
            <div v-if="filteredAbstracts.length === 0" class="my-2 min-w-full mt-3">
              <EmptyAbstract />
            </div>
            <div v-if="!isFiltered && allOptions.length === 0" class="my-2 min-w-full mt-3">
              <!-- New way by Sponsor -->
              <div v-for="sp in sponsors" class="pb-6">
                <h3 class="mb-3 font-bold text-xl">{{ sp }} </h3>
                <div v-for="ab in sponsorPrograms[sp]">
                  <AbstractSlim :abstract="ab[0]" :idx="ab[1]" :showSponsor="false" :key="ab.responseID"
                    @openAbstract="openSelectedModal" />
                </div>
              </div>
            </div>
            <div v-else class="my-2 min-w-full mt-3">
              <div v-for="(ab, abIdx) in filteredAbstracts">
                <Abstract :abstract="ab" :idx="abIdx" :key="ab.responseID" @openAbstract="openSelectedModal" />
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>


    <Modal :abstract="filteredAbstracts[selectedAbstractID]" :open="openModal" @closeModal="closeModal" />

  </div>
</template>

<script setup>
import AbstractSearch from '@/components/AbstractSearch.vue'
import Abstract from '@/components/Abstract.vue'
import AbstractSlim from '@/components/AbstractSlim.vue'
import EmptyAbstract from '@/components/EmptyAbstract.vue'
import Modal from '@/components/Modal.vue'
import { ref } from 'vue'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,

  // mobile sidebar
  Dialog, DialogPanel, TransitionChild, TransitionRoot

} from '@headlessui/vue'
import { MinusIcon, PlusIcon, XMarkIcon, Bars3Icon } from '@heroicons/vue/20/solid'

import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia'

const store = useSearchStore()
const { allAbstracts, filteredAbstracts, searchFilters, filterSectionCount, allOptions, counts, isFiltered, sponsors, sponsorPrograms } = storeToRefs(store)

const openModal = ref(false)
const selectedAbstractID = ref(-1)

const mobileFiltersOpen = ref(false)

const isMobile = ref((window.innerWidth <= 1024) ? true : false);
const sidebarOpen = ref(false)

// updateCounts()
store.recalculateCounts()
function recalc() {
  store.recalculateCounts()
}

window.addEventListener("resize", (e) => {
  isMobile.value = (window.innerWidth <= 1024) ? true : false;
});

/*
const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}
*/

function openSelectedModal(idx) {
  selectedAbstractID.value = idx
  const rId = allAbstracts.value[idx]['responseID'];
  const progName = allAbstracts.value[idx]['programName'];

  gtag('event', 'open-abstract', {
    'responseID': rId,
    'programName': progName
  });

  openModal.value = true
}

function closeModal() {
  selectedAbstractID.value = -1
  openModal.value = false
}

function filterClear() {
  store.clearFilters()
}

</script>
