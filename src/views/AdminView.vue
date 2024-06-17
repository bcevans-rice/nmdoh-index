<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-gray-100">
    <body class="h-full">
    ```
  -->
  <div  v-if="isAuthenticated" class="min-h-full">
    <Disclosure as="nav" class="bg-nmdoh-purple" v-slot="{ open }">
      <div class="mx-auto xl:px-36 lg:px-20 md:px-12">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="hidden md:block">
              <div class="flex items-baseline space-x-4">
                <router-link v-for="item in navigation" :key="item.name" :to="item.href" :class="[item.href === $route.path ? 'bg-white text-nmdoh-purple' : 'text-white hover:bg-nmdoh-purple-2', 'rounded-md px-3 py-2 text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</router-link>
                <button class="text-white hover:bg-nmdoh-purple-2 rounded-md px-3 py-2 text-sm font-medium" @click="exportToExcel">
                  <span>
                    <Cog8ToothIcon v-if="isExporting" class="inline-block h-4 w-4 font-bold animate-spin" aria-hidden="true" />
                    <DocumentArrowDownIcon v-else class="inline-block h-4 w-4 font-bold" aria-hidden="true" />
                  </span>
                  Export to Excel
                </button>
              </div>
            </div>
          </div>

          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton class="inline-flex items-center justify-center rounded-md bg-nmdoh-purple p-2 text-white hover:bg-nmdoh-purple-2 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" :class="[item.current ? 'bg-indigo-700 text-white' : 'text-white hover:bg-indigo-500 hover:bg-opacity-75', 'block rounded-md px-3 py-2 text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <main>
      <Suspense>
        <RouterView />
        <!-- loading state via #fallback slot -->
        <template #fallback>
          <div class="text-center text-lg">Loading...</div>
        </template>
      </Suspense>
    </main>
  </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { DocumentArrowDownIcon, Cog8ToothIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'
import { useAuthenticationStore } from '@/stores/authentication'
import { useAppSetupStore } from '@/stores/appSetup'
import { storeToRefs } from 'pinia'

const appSetupStore = useAppSetupStore()
const { isAuthenticated } = storeToRefs(useAuthenticationStore())

const API_URL = appSetupStore.nmdohIndexServiceURL;
const EXCEL_URL = 'https://index.driversofhealthtx.org/nmdoh-program-abstracts.xlsx';

const isExporting = ref(false)

const navigation = [
  { name: 'Staged Abstracts', href: '/admin/new'},
  { name: 'Indexed Abstracts', href: '/admin/index' },
  { name: 'Archived Abstracts', href: '/admin/archive' },
]

async function exportToExcel() {
  isExporting.value = true
  const response = await fetch(`${API_URL}/export`, {cors: true});
  await response.json();

  window.open(EXCEL_URL)
  isExporting.value = false
}
</script>