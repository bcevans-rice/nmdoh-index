import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'

export const useAuthenticationStore = defineStore('authentication', () => {
    const isAuthenticated = ref(false)
    return { isAuthenticated }
})