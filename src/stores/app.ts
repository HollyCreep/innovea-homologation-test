import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useTheme } from 'vuetify'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  function toggleTheme() {
    const theme = useTheme()
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  }

  return { toggleTheme }
})
