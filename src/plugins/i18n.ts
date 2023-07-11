import { createI18n } from 'vue-i18n'

import en from '@/locales/en'
import es from '@/locales/es'
import pt from '@/locales/pt'

const i18n = createI18n({
  locale: 'en',
  legacy: false,
  messages: {
    en,
    es,
    pt,
  },
})

export default i18n
