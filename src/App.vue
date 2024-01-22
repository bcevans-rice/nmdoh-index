<template>
  <main >
    <p v-if="appSetupStore.mode == 'development'" class="px-6 mx-4 lg:mx-24 mb-1 font-bold">DEVELOPMENT</p>
    <router-view />
  </main>
  
  <!-- modal dialog for admin password | need to swap out for amplify -->
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-nmdoh-gray-1 bg-opacity-95 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
              <div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Enter password</DialogTitle>
                </div>
              </div>
              <div class="mt-5 sm:mt-6">
                <input v-model="token" @keyup.enter="authenticateToken" type="password" class="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 shadow-sm">
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useRoute, useRouter } from 'vue-router';
import { useAppSetupStore } from '@/stores/appSetup'
const appSetupStore = useAppSetupStore()

const API_URL = appSetupStore.nmdohIndexServiceURL

const route = useRoute();
const router = useRouter();

const open = ref(false);
const isAuthenticated = ref(false);
const token = ref('')

watch(route, () => {
  if(route.path.startsWith('/admin') && !isAuthenticated.value) open.value = true
});

onMounted(() => {
  // Set page title
  document.title = 'Programs in Texas - Texas Consortium for the Non-Medical Drivers of Health'
})

async function authenticateToken() {
  const r = await fetch(`${API_URL}/authenticate`, { 
    method: 'POST',
    cors: true,
    body: JSON.stringify({token: token.value})
  });

  const authResult = await r.json();

  if(authResult === true) {
    isAuthenticated.value = true
    open.value = false
  } else {
    isAuthenticated.value = false
    open.value = false
    router.go(-1);
  }
}

</script>

<style>
#app {
  font-family: 'Oxygen', Helvetica, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}

</style>
