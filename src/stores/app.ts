import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'
import { watch } from 'vue'
import { usePreferredDark, usePreferredLanguages, useSessionStorage } from '@vueuse/core'
import type { Language } from '@/services/HttpService'

export type Theme = 'light' | 'dark'
export type ViewMode = 'list' | 'grid'

export const useAppStore = defineStore('app', () => {
  const { locale } = useI18n({ useScope: 'global' })

  const preferredLanguage = usePreferredLanguages().value.reduce((prev, current) => {
    if (['en', 'es', 'pt'].includes(current))
      prev.push(current as Language)
    else if (current === 'pt-BR')
      prev.push('pt')

    return prev
  }, [] as Language[])

  const language = useSessionStorage<Language>('language', preferredLanguage?.[0] || 'en', {
    mergeDefaults: true,
  })
  const theme = useSessionStorage<Theme>('theme', usePreferredDark() ? 'dark' : 'light')
  const viewMode = useSessionStorage<ViewMode>('viewMode', 'list')

  watch(
    () => language.value,
    (newValue) => {
      locale.value = newValue
    },
    { immediate: true },
  )

  return { language, theme, viewMode }
})
