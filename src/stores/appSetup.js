import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'

export const useAppSetupStore = defineStore('appSetup', () => {
    const nmdohIndexServiceURL = import.meta.env.VITE_LAMBDAURL_SERVICE;
    const mode = import.meta.env.VITE_APP_MODE;
    return { nmdohIndexServiceURL, mode }
})