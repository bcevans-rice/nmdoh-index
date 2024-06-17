<template>
  <HeaderTitle :title="'Editing ' + originalAbstract.programName">
    <button @click="saveAbstractUpdates" class="ml-8 rounded bg-nmdoh-green-2 text-white px-4 py-2">Save Edits</button>
    <button @click="saveAbstractUpdatesAndIndex" class="ml-2 rounded bg-nmdoh-green-2 text-white px-4 py-2">Save &
      Index</button>

  </HeaderTitle>

  <div class="mx-auto xl:px-36 lg:px-20 md:px-12 px-12 py-6">
    <div class="-space-y-px rounded-md shadow-sm">

      <div
        class="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-nmdoh-purple">
        <label for="name" class="block text-xs font-semibold text-nmdoh-purple">Program Name</label>
        <input type="text" v-model="editedAbstract.programName"
          class="block w-full border-0 p-0  placeholder: focus:ring-0 sm:leading-6" placeholder="NMDOH Program" />
        <div class="absolute inset-y-0 right-0 flex items-center pr-3">
          <span class="text-gray-500 sm:text-sm">{{ editedAbstract.responseID }}</span>
        </div>
      </div>

      <div
        class="relative rounded-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-nmdoh-purple">
        <label for="job-title" class="block text-xs font-semibold text-nmdoh-purple">Program Sponsor</label>
        <input type="text" v-model="editedAbstract.healthOrgName"
          class="block w-full border-0 p-0 placeholder: focus:ring-0 sm:leading-6" placeholder="Health Organization" />
      </div>

      <div class="flex flex-wrap">
        <div :class="[editedAbstract.healthOrgType.indexOf('Other (please specify)') > -1 ? 'w-1/2 md:w-1/4' : 'w-full']"
          class="relative rounded-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-nmdoh-purple">
          <label for="job-title" class="block text-xs font-semibold text-nmdoh-purple">Program Sponsor Type</label>

          <!-- healthOrgType dropdown -->
          <Menu as="div" class="relative inline-block text-left">
            <div>
              <MenuButton
                class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white pr-3 pl-1 py-2 text-md hover:bg-gray-50">
                <span v-if="editedAbstract.healthOrgType">{{ editedAbstract.healthOrgType }}</span>
                <span v-else class="text-gray-400">Select</span>
                <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              </MenuButton>

              
            </div>

            <transition enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <MenuItems
                class="absolute cursor-pointer left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100">
                <div class="py-1">

                  <MenuItem v-for="val in dropdowns['healthOrgType']">
                  <a @click="editedAbstract.healthOrgType = val"
                    :class="[editedAbstract.healthOrgType === val ? 'bg-nmdoh-purple text-white' : 'text-gray-700', 'block px-4 py-2 text-sm']">{{
                      val }}</a>
                  </MenuItem>

                </div>
                <div class="py-1">
                  <MenuItem>
                  <a class="block px-4 py-2 text-sm text-gray-700" @click="editedAbstract.healthOrgType = ''">
                    <XMarkIcon class="text-sm text-gray-700 w-3 h-3 mr-1 inline-block" />
                    <span>Clear</span>
                  </a>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
        <div v-if="editedAbstract.healthOrgType.indexOf('Other (please specify)') > -1"
            class="relative grow max-w-3/4 rounded-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-nmdoh-purple">
            <label for="job-title" class="block text-xs font-semibold text-nmdoh-purple">Other Sponsor Type</label>
            <input type="text" class="block w-full border-0 p-0 placeholder: focus:ring-0 sm:leading-6" v-model="editedAbstract.healthOrgNameOther" placeholder="Other sponsor type" />
        </div>
      </div>


      <div
        class="relative rounded-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-nmdoh-purple">
        <label for="job-title" class="block text-xs font-semibold text-nmdoh-purple">Program Operation</label>
        <textarea type="text" v-model="editedAbstract.programOperation" rows="5"
          class="block w-full h-auto resize-none border-0 p-0  placeholder: focus:ring-0 sm:leading-6"
          placeholder="Describe how the NMDOH program operates" />
      </div>

      <div
        class="relative rounded-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-nmdoh-purple">
        <label for="job-title" class="block text-xs font-semibold text-nmdoh-purple">Program Landing Page</label>
        <input type="text" v-model="editedAbstract.programUrl"
          class="block w-full border-0 p-0 placeholder: focus:ring-0 sm:leading-6" placeholder="Landing page URL" />
      </div>

      <div
        class="relative rounded-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-nmdoh-purple">
        <label for="job-title" class="block text-xs font-semibold text-nmdoh-purple">Program Funding</label>
        <input type="text" v-model="editedAbstract.programFunding"
          class="block w-full border-0 p-0 placeholder: focus:ring-0 sm:leading-6" placeholder="Description of program funding" />
      </div>

      <div
        class="relative rounded-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-nmdoh-purple">
        <label for="job-title" class="block text-xs font-semibold text-nmdoh-purple">Funder</label>
        <input type="text" v-model="editedAbstract.programFunder"
          class="block w-full border-0 p-0 placeholder: focus:ring-0 sm:leading-6" placeholder="Program funders" />
      </div>

      <div class="flex flex-wrap">
        <div :class="[editedAbstract.programFundingType.indexOf('Other') > -1 ? 'rounded-tl-md max-w-[75%]' : 'rounded-md max-w-[100%]']"
          class="grow rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-nmdoh-purple">
          <label for="name" class="block text-xs font-semibold text-nmdoh-purple">Funding type</label>

          <!-- NMDOH Targets array tags -->
          <Menu as="div" class="relative inline-flex flex-wrap text-left">

              <MenuButton
                class="inline-flex justify-center gap-x-1.5 rounded-md bg-white pr-3 pl-1 py-2 text-md hover:bg-gray-50">
                <span class="text-gray-400">Add</span>
                <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              </MenuButton>

              <span v-for="(tgt, idx) in editedAbstract.programFundingType"
                class="m-1 inline-flex items-baseline rounded-full border border-nmdoh-purple bg-nmdoh-purple py-1 pl-2 pr-2 text-sm font-medium text-white min-w-fit">
                {{ tgt }}
                <button type="button" @click="editedAbstract.programFundingType.splice(idx, 1)"
                  class="ml-1 inline-block h-4 w-4 flex-shrink-0 rounded-full p-1 text-white">
                  <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                    <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
                  </svg>
                </button>
              </span>


            <transition enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <MenuItems
                class="absolute cursor-pointer left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100">
                <div class="py-1">
                  <MenuItem
                    v-for="val in dropdowns['programFundingType'].filter(tgt => editedAbstract.programFundingType.indexOf(tgt) === -1)">
                  <a @click="editedAbstract.programFundingType.push(val)"
                    :class="[editedAbstract.programFundingType.indexOf(val) > -1 ? 'bg-nmdoh-purple text-white' : 'text-gray-700', 'block px-4 py-2 text-sm']">{{
                      val }}</a>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>

        <div v-if="editedAbstract.programFundingType.indexOf('Other') > -1"
          class="grow max-w-[25%] rounded-tr-md px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-nmdoh-purple">
          <label for="job-title" class="block text-xs font-semibold text-nmdoh-purple">Other funding type</label>
          <input type="text" v-model="editedAbstract.programFundingTypeOther"
            class="block w-full border-0 p-0 placeholder: focus:ring-0 sm:leading-6" placeholder="Other funding type" />
        </div>

      </div>
      <div
        class="relative rounded-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-nmdoh-purple">
        <label for="name" class="block text-xs font-semibold text-nmdoh-purple">Program is Active</label>
        <!-- programIsActive dropdown -->
        <Menu as="div" class="relative inline-block text-left">
          <div>
            <MenuButton
              class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white pr-3 py-2 text-md hover:bg-gray-50">
              <span v-if="editedAbstract.programIsActive">{{ editedAbstract.programIsActive }}</span>
              <span v-else class="text-gray-400">Select</span>
              <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
            </MenuButton>
          </div>

          <transition enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <MenuItems
              class="absolute cursor-pointer left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100">
              <div class="py-1">

                <MenuItem v-for="val in dropdowns['programIsActive']">
                <a @click="editedAbstract.programIsActive = val"
                  :class="[editedAbstract.programIsActive === val ? 'bg-nmdoh-purple text-white' : 'text-gray-700', 'block px-4 py-2 text-sm']">{{
                    val }}</a>
                </MenuItem>

              </div>
              <div class="py-1">
                <MenuItem>
                <a class="block px-4 py-2 text-sm text-gray-700" @click="editedAbstract.programIsActive = ''">
                  <XMarkIcon class="text-sm text-gray-700 w-3 h-3 mr-1 inline-block" />
                  <span>Clear</span>
                </a>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>

      <div
        class="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-nmdoh-purple">
        <label for="name" class="block text-xs font-semibold text-nmdoh-purple">Program is Evaluated</label>
        <!-- programIsEvaluated dropdown -->
        <Menu as="div" class="relative inline-block text-left">
          <div>
            <MenuButton
              class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white pr-3 py-2 text-md hover:bg-gray-50">
              <span v-if="editedAbstract.programIsEvaluated">{{ editedAbstract.programIsEvaluated }}</span>
              <span v-else class="text-gray-400">Select</span>
              <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
            </MenuButton>
          </div>

          <transition enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <MenuItems
              class="absolute cursor-pointer left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100">
              <div class="py-1">

                <MenuItem v-for="val in dropdowns['programIsEvaluated']">
                <a @click="editedAbstract.programIsEvaluated = val"
                  :class="[editedAbstract.programIsEvaluated === val ? 'bg-nmdoh-purple text-white' : 'text-gray-700', 'block px-4 py-2 text-sm']">{{
                    val }}</a>
                </MenuItem>

              </div>
              <div class="py-1">
                <MenuItem>
                <a class="block px-4 py-2 text-sm text-gray-700" @click="editedAbstract.programIsEvaluated = ''">
                  <XMarkIcon class="text-sm text-gray-700 w-3 h-3 mr-1 inline-block" />
                  <span>Clear</span>
                </a>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>

    <br><br>
    <div class="-space-y-px rounded-md shadow-sm mb-6">
      <div class="flex flex-wrap">

        <div :class="[editedAbstract.nmdohTargets.indexOf('Other') > -1 ? 'rounded-tl-md max-w-[75%]' : 'rounded-md max-w-[100%]']"
          class="grow rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-nmdoh-purple">
          <label for="name" class="block text-xs font-semibold text-nmdoh-purple">NMDOH Targets</label>

          <!-- NMDOH Targets array tags -->
          <Menu as="div" class="relative inline-flex flex-wrap text-left">

              <MenuButton
                class="inline-flex justify-center gap-x-1.5 rounded-md bg-white pr-3 pl-1 py-2 text-md hover:bg-gray-50">
                <span class="text-gray-400">Add</span>
                <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              </MenuButton>

              <span v-for="(tgt, idx) in editedAbstract.nmdohTargets"
                class="m-1 inline-flex items-baseline rounded-full border border-nmdoh-purple bg-nmdoh-purple py-1 pl-2 pr-2 text-sm font-medium text-white min-w-fit">
                {{ tgt }}
                <button type="button" @click="editedAbstract.nmdohTargets.splice(idx, 1)"
                  class="ml-1 inline-block h-4 w-4 flex-shrink-0 rounded-full p-1 text-white">
                  <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                    <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
                  </svg>
                </button>
              </span>


            <transition enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <MenuItems
                class="absolute cursor-pointer left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100">
                <div class="py-1">
                  <MenuItem
                    v-for="val in dropdowns['nmdohTargets'].filter(tgt => editedAbstract.nmdohTargets.indexOf(tgt) === -1)">
                  <a @click="editedAbstract.nmdohTargets.push(val)"
                    :class="[editedAbstract.nmdohTargets.indexOf(val) > -1 ? 'bg-nmdoh-purple text-white' : 'text-gray-700', 'block px-4 py-2 text-sm']">{{
                      val }}</a>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>

        <!-- nmdohTargetsOther -->
        <div v-if="editedAbstract.nmdohTargets.indexOf('Other') > -1"
          class="grow max-w-[25%] rounded-tr-md px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-nmdoh-purple">
          <label for="job-title" class="block text-xs font-semibold text-nmdoh-purple">Other NMDOH Target</label>
          <input type="text" v-model="editedAbstract.nmdohTargetsOther"
            class="block w-full border-0 p-0 placeholder: focus:ring-0 sm:leading-6" placeholder="Other target" />
        </div>


      </div>


      <div class="flex flex-wrap">
        <div :class="[editedAbstract.nmdohTargetPopulations.indexOf('Other') > -1 ? 'max-w-[75%]' : 'max-w-[100%]']"
          class="relative grow rounded-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-nmdoh-purple">
          <label for="name" class="block text-xs font-semibold text-nmdoh-purple">NMDOH Target Populations</label>

          <!-- NMDOH Target Populations array tags -->
          <Menu as="div" class="relative inline-flex text-left">
            <div>
              <MenuButton
                class="inline-flex justify-center gap-x-1.5 rounded-md bg-white pr-3 pl-1 py-2 text-md hover:bg-gray-50">
                <span class="text-gray-400">Add</span>
                <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              </MenuButton>

              <span v-for="(tgt, idx) in editedAbstract.nmdohTargetPopulations"
                class="m-1 inline-flex items-baseline rounded-full border border-nmdoh-purple bg-nmdoh-purple py-1 pl-2 pr-2 text-sm font-medium text-white">
                {{ tgt }}
                <button type="button" @click="editedAbstract.nmdohTargetPopulations.splice(idx, 1)"
                  class="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-white">
                  <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                    <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
                  </svg>
                </button>
              </span>
            </div>

            <transition enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <MenuItems
                class="absolute cursor-pointer left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100">
                <div class="py-1">
                  <MenuItem
                    v-for="val in dropdowns['nmdohTargetPopulations'].filter(tgt => editedAbstract.nmdohTargetPopulations.indexOf(tgt) === -1)">
                  <a @click="editedAbstract.nmdohTargetPopulations.push(val)"
                    :class="[editedAbstract.nmdohTargetPopulations.indexOf(val) > -1 ? 'bg-nmdoh-purple text-white' : 'text-gray-700', 'block px-4 py-2 text-sm']">{{
                      val }}</a>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>

        <!-- nmdohTargetPopulationsOther -->
        <div v-if="editedAbstract.nmdohTargetPopulations.indexOf('Other') > -1"
          class="grow max-w-[25%] rounded-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-nmdoh-purple">
          <label for="job-title" class="block text-xs font-semibold text-nmdoh-purple">Other Target Population</label>
          <input type="text" v-model="editedAbstract.nmdohTargetPopulationsOther"
            class="block w-full border-0 p-0 placeholder: focus:ring-0 sm:leading-6" placeholder="Other target population" />
        </div>
      </div>

      <div class="flex flex-wrap">
        <div :class="[editedAbstract.conditionFocus.indexOf('Other') > -1 ? 'max-w-[75%]' : 'max-w-[100%]']"
          class="grow rounded-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-nmdoh-purple">
          <label for="name" class="block text-xs font-semibold text-nmdoh-purple">Health Conditions</label>

          <!-- NMDOH Conditions Focus array tags -->
          <Menu as="div" class="relative inline-flex text-left">
            <div>
              <MenuButton
                class="inline-flex justify-center gap-x-1.5 rounded-md bg-white pr-3 pl-1 py-2 text-md hover:bg-gray-50">
                <span class="text-gray-400">Add</span>
                <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              </MenuButton>

              <span v-for="(tgt, idx) in editedAbstract.conditionFocus"
                class="m-1 inline-flex items-baseline rounded-full border border-nmdoh-purple bg-nmdoh-purple py-1 pl-2 pr-2 text-sm font-medium text-white">
                {{ tgt }}
                <button type="button" @click="editedAbstract.conditionFocus.splice(idx, 1)"
                  class="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-white">
                  <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                    <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
                  </svg>
                </button>
              </span>
            </div>

            <transition enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <MenuItems
                class="absolute cursor-pointer left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100">
                <div class="py-1">
                  <MenuItem
                    v-for="val in dropdowns['conditionFocus'].filter(tgt => editedAbstract.conditionFocus.indexOf(tgt) === -1)">
                  <a @click="editedAbstract.conditionFocus.push(val)"
                    :class="[editedAbstract.conditionFocus.indexOf(val) > -1 ? 'bg-nmdoh-purple text-white' : 'text-gray-700', 'block px-4 py-2 text-sm']">{{
                      val }}</a>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>

        <!-- nmdohTargetPopulationsOther -->
        <div v-if="editedAbstract.conditionFocus.indexOf('Other') > -1"
          class="relative grow max-w-[25%] rounded-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-nmdoh-purple">
          <label for="job-title" class="block text-xs font-semibold text-nmdoh-purple">Other Health Condition </label>
          <input type="text" v-model="editedAbstract.conditionFocusOther"
            class="w-full block border-0 p-0 placeholder: focus:ring-0 sm:leading-6" placeholder="Other condition" />
        </div>
      </div>

      <div
        class="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-nmdoh-purple">
        <label for="name" class="block text-xs font-semibold text-nmdoh-purple">Counties Offered</label>


        <!-- NMDOH Target Populations array tags -->
        <Menu as="div" class="relative inline-flex text-left">
          <div>
            <MenuButton
              class="inline-flex justify-center gap-x-1.5 rounded-md bg-white pr-3 pl-1 py-2 text-md hover:bg-gray-50">
              <span class="text-gray-400">Add</span>
              <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
            </MenuButton>

            <span v-for="(tgt, idx) in editedAbstract.countiesOffered"
              class="m-1 inline-flex items-baseline rounded-full border border-nmdoh-purple bg-nmdoh-purple py-1 pl-2 pr-2 text-sm font-medium text-white">
              {{ tgt }}
              <button type="button" @click="editedAbstract.countiesOffered.splice(idx, 1)"
                class="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-white">
                <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                  <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
                </svg>
              </button>
            </span>
          </div>

          <transition enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">

            <MenuItems
              class="absolute cursor-pointer left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100">
              <div class="py-1">
                <!-- Search text filter -->
                <input autofocus type="text" v-model="countySearch"
                  class="block w-full border-0 px-4 py-2 focus:ring-0 sm:leading-6 text-sm"
                  placeholder="Filter counties" />
              </div>
              <div class="py-1">
                <MenuItem
                  v-for="val in allCounties.filter(tgt => editedAbstract.countiesOffered.indexOf(tgt) === -1 && tgt.toLowerCase().startsWith(countySearch.toLowerCase())).slice(0, 10)">
                <a @click="addCounty(val)"
                  :class="[editedAbstract.countiesOffered.indexOf(val) > -1 ? 'bg-nmdoh-purple text-white' : 'text-gray-700', 'block px-4 py-2 text-sm']">{{
                    val }}</a>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>

      </div>
    </div>

    <div class="-space-y-px rounded-md shadow-sm">
      <div
        class="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-nmdoh-purple">
        <!-- TODO: Finish updated label styles -->
        <!--<label for="name" :class="[updatesToAbstract.contactFirstName ? 'text-nmdoh-green-2' : 'text-nmdoh-purple']" class="block text-xs font-semibold">
          <span>Contact First</span>
          <span v-show="updatesToAbstract.contactFirstName"><PencilSquareIcon class="h-3 w-3 inline-block ml-1" /></span>
        </label>-->
        <label for="name" class="block text-xs font-semibold text-nmdoh-purple">Contact First</label>
        <input type="text" v-model="editedAbstract.contactFirstName"
          class="block w-full border-0 p-0  placeholder: focus:ring-0 sm:leading-6" placeholder="First name" />
      </div>

      <div
        class="relative px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-nmdoh-purple">
        <label for="name" class="block text-xs font-semibold text-nmdoh-purple">Contact Last</label>
        <input type="text" v-model="editedAbstract.contactLastName"
          class="block w-full border-0 p-0  placeholder: focus:ring-0 sm:leading-6" placeholder="Last name" />
      </div>

      <div
        class="relative px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-nmdoh-purple">
        <label for="name" class="block text-xs font-semibold text-nmdoh-purple">Contact Email</label>
        <input type="text" v-model="editedAbstract.contactEmail"
          class="block w-full border-0 p-0  placeholder: focus:ring-0 sm:leading-6" placeholder="Email address" />
      </div>

      <div
        class="rounded-md rounded-t-none relative px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-nmdoh-purple">
        <label for="name" class="block text-xs font-semibold text-nmdoh-purple">Contact Phone</label>
        <input type="tel" v-model="editedAbstract.contactPhone"
          class="block w-full border-0 p-0  placeholder: focus:ring-0 sm:leading-6" placeholder="Phone number" />
      </div>
    </div>


    <hr class="my-4" />
    <div class="pb-6">
      <div class="float-left">
          <!--<button @click="saveAbstractUpdatesAndArchive"
          class="rounded rounded-t-none bg-nmdoh-purple text-white px-4 py-2">Archive Abstract</button> -->
        <!--<button class="ml-2 rounded bg-nmdoh-gray-1 text-white px-4 py-2">Delete Abstract</button>-->


        <Menu as="div" class="relative inline-block text-left">
          <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems class="absolute left-0 bottom-0 z-10 mb-10 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div class="px-4 py-3">
          <p class="text-sm">Are you sure you want to archive the program <strong>{{ editedAbstract.programName }}</strong>?</p>
        </div>
        <div class="py-1">
          <MenuItem v-slot="{ active }">
            <a @click="saveAbstractUpdatesAndArchive" :class="[active ? 'bg-nmdoh-purple text-white' : 'text-gray-700', 'block px-4 py-2 text-sm']">Yes</a>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">No</a>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
    <div>
      <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-md text-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm bg-nmdoh-purple">
        Archive Abstract
      </MenuButton>
    </div>    
  </Menu>

      </div>
      <div class="float-right">
        <button @click="saveAbstractUpdates" class="ml-8 rounded bg-nmdoh-green-2 text-white px-4 py-2">Save Edits</button>
        <button @click="saveAbstractUpdatesAndIndex" class="ml-2 rounded bg-nmdoh-green-2 text-white px-4 py-2">Save &
          Index</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSearchStore } from '@/stores/search'
import { useAppSetupStore } from '@/stores/appSetup'
import { storeToRefs } from 'pinia'

import HeaderTitle from './HeaderTitle.vue';
import { ref, reactive, watch, nextTick} from 'vue'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/vue/20/solid'

import { useRouter } from 'vue-router'
const router = useRouter();

// All Counties	
const allCounties = ['All Counties','Anderson', 'Andrews', 'Angelina', 'Aransas', 'Archer', 'Armstrong', 'Atascosa', 'Austin', 'Bailey', 'Bandera', 'Bastrop', 'Baylor', 'Bee', 'Bell', 'Bexar', 'Blanco', 'Borden', 'Bosque', 'Bowie', 'Brazoria', 'Brazos', 'Brewster', 'Briscoe', 'Brooks', 'Brown', 'Burleson', 'Burnet', 'Caldwell', 'Calhoun', 'Callahan', 'Cameron', 'Camp', 'Carson', 'Cass', 'Castro', 'Chambers', 'Cherokee', 'Childress', 'Clay', 'Cochran', 'Coke', 'Coleman', 'Collin', 'Collingsworth', 'Colorado', 'Comal', 'Comanche', 'Concho', 'Cooke', 'Coryell', 'Cottle', 'Crane', 'Crockett', 'Crosby', 'Culberson', 'Dallam', 'Dallas', 'Dawson', 'Deaf Smith', 'Delta', 'Denton', 'DeWitt', 'Dickens', 'Dimmit', 'Donley', 'Duval', 'Eastland', 'Ector', 'Edwards', 'Ellis', 'El Paso', 'Erath', 'Falls', 'Fannin', 'Fayette', 'Fisher', 'Floyd', 'Foard', 'Fort Bend', 'Franklin', 'Freestone', 'Frio', 'Gaines', 'Galveston', 'Garza', 'Gillespie', 'Glasscock', 'Goliad', 'Gonzales', 'Gray', 'Grayson', 'Gregg', 'Grimes', 'Guadalupe', 'Hale', 'Hall', 'Hamilton', 'Hansford', 'Hardeman', 'Hardin', 'Harris', 'Harrison', 'Hartley', 'Haskell', 'Hays', 'Hemphill', 'Henderson', 'Hidalgo', 'Hill', 'Hockley', 'Hood', 'Hopkins', 'Houston', 'Howard', 'Hudspeth', 'Hunt', 'Hutchinson', 'Irion', 'Jack', 'Jackson', 'Jasper', 'Jeff Davis', 'Jefferson', 'Jim Hogg', 'Jim Wells', 'Johnson', 'Jones', 'Karnes', 'Kaufman', 'Kendall', 'Kenedy', 'Kent', 'Kerr', 'Kimble', 'King', 'Kinney', 'Kleberg', 'Knox', 'Lamar', 'Lamb', 'Lampasas', 'LaSalle', 'Lavaca', 'Lee', 'Leon', 'Liberty', 'Limestone', 'Lipscomb', 'Live Oak', 'Llano', 'Loving', 'Lubbock', 'Lynn', 'Madison', 'Marion', 'Martin', 'Mason', 'Matagorda', 'Maverick', 'McCulloch', 'McLennan', 'McMullen', 'Medina', 'Menard', 'Midland', 'Milam', 'Mills', 'Mitchell', 'Montague', 'Montgomery', 'Moore', 'Morris', 'Motley', 'Nacogdoches', 'Navarro', 'Newton', 'Nolan', 'Nueces', 'Ochiltree', 'Oldham', 'Orange', 'Palo Pinto', 'Panola', 'Parker', 'Parmer', 'Pecos', 'Polk', 'Potter', 'Presidio', 'Rains', 'Randall', 'Reagan', 'Real', 'Red River', 'Reeves', 'Refugio', 'Roberts', 'Robertson', 'Rockwall', 'Runnels', 'Rusk', 'Sabine', 'San Augustine', 'San Jacinto', 'San Patricio', 'San Saba', 'Schleicher', 'Scurry', 'Shackelford', 'Shelby', 'Sherman', 'Smith', 'Somervell', 'Starr', 'Stephens', 'Sterling', 'Stonewall', 'Sutton', 'Swisher', 'Tarrant', 'Taylor', 'Terrell', 'Terry', 'Throckmorton', 'Titus', 'Tom Green', 'Travis', 'Trinity', 'Tyler', 'Upshur', 'Upton', 'Uvalde', 'Val Verde', 'Van Zandt', 'Victoria', 'Walker', 'Waller', 'Ward', 'Washington', 'Webb', 'Wharton', 'Wheeler', 'Wichita', 'Wilbarger', 'Willacy', 'Williamson', 'Wilson', 'Winkler', 'Wise', 'Wood', 'Yoakum', 'Young', 'Zapata', 'Zavala']

const countySearch = ref('')

// Prepare dropdowns
const store = useSearchStore()
const appSetupStore = useAppSetupStore()

const { searchFilters } = storeToRefs(store)
const dropdowns = {}

for (const f of searchFilters.value) {
  dropdowns[f['id']] = f['options'].map(opt => opt.value)
}

const API_URL = appSetupStore.nmdohIndexServiceURL;

// Declare responseID as a prop so we can pull it in from parent component
const props = defineProps(['responseID'])
const responseID = props['responseID']

const r = await fetch(`${API_URL}/edit?` + new URLSearchParams({
  id: responseID
}), { cors: true });

let originalAbstract = await r.json();
delete originalAbstract['PK']
delete originalAbstract['SK']

const clone = JSON.parse(JSON.stringify(originalAbstract))

const editedAbstract = reactive(clone);
const updatesToAbstract = ref({})

// Update the editedAbstract object in real-time
watch(editedAbstract, (newVal, oldVal) => {
  // fires on nested property mutations
  // Note: `newValue` will be equal to `oldValue` here
  // because they both point to the same object!

  
  updatesToAbstract.value = {}
  let updates = {}

  for (const k of Object.keys(originalAbstract)) {
    if (reactive(originalAbstract[k]) !== editedAbstract[k]) {
      updates[k] = newVal[k]
    }
  }
  updatesToAbstract.value = updates
});

async function saveAbstractUpdates() {
  const r = await fetch(`${API_URL}/edit?` + new URLSearchParams({
    id: responseID
  }), {
    method: 'POST',
    cors: true,
    body: JSON.stringify(updatesToAbstract.value)
  });

  // When done, go back a page
  router.go(-1);
}

async function saveAbstractUpdatesAndIndex() {
  const r = await fetch(`${API_URL}/index?` + new URLSearchParams({
    id: responseID
  }), {
    method: 'POST',
    cors: true,
    body: JSON.stringify(updatesToAbstract.value)
  });

  // When done, go back a page
  router.go(-1);
}

async function saveAbstractUpdatesAndArchive() {
  const r = await fetch(`${API_URL}/archive?` + new URLSearchParams({
    id: responseID
  }), {
    method: 'POST',
    cors: true,
    body: JSON.stringify(updatesToAbstract.value)
  });

  // When done, go back a page
  router.go(-1);

}

function addCounty(cty) {
  editedAbstract.countiesOffered.push(cty)
  countySearch.value = ''
}

</script>

<style scoped></style>