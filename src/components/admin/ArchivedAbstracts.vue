<template>
  <HeaderTitle title="Archived Abstracts" />

  <div class="mx-auto xl:px-36 lg:px-20 md:px-12 px-12 sm:px-6 lg:px-8">
    <!-- Your content -->
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="mt-6 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Program
                      Name</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Program Sponsor</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-nmdoh-gray-1">Contact</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Submitted</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="abs in newAbstracts" :key="abs.responseID">
                    <td class="truncate py-4 pl-4 pr-3 text-sm font-bold text-gray-900 sm:pl-6">
                      <router-link :to="'/admin/edit/' + abs.responseID" class="text-nmdoh-purple hover:text-nmdoh-purple-2 hover:underline">
                        {{ abs.programName }}
                      </router-link>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-nmdoh-gray-1">{{ abs.healthOrgName }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-nmdoh-gray-1">{{ abs.contactFirstName }} {{ abs.contactLastName }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-nmdoh-gray-1">{{ abs.metaSubmittedDate }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAppSetupStore } from '@/stores/appSetup'
const appSetupStore = useAppSetupStore()

import HeaderTitle from './HeaderTitle.vue';

const response = await fetch(appSetupStore.nmdohIndexServiceURL + '/archive', {cors: true});
let newAbstracts = await response.json();
newAbstracts.sort(sortAbstracts)


function sortAbstracts(a, b) {
  if (a['metaSubmittedDate'] > b['metaSubmittedDate']) return 1
  else if (a['metaSubmittedDate'] < b['metaSubmittedDate']) return -1
  else return 0
}
</script>