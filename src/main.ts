import 'vuetify/styles'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { createI18n } from 'vue-i18n'
import en from '@/locales/en'
import es from '@/locales/es'
import pt from '@/locales/pt'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(
  createVuetify({
    components,
    directives,
  })
)
app.use(router)
app.use(createI18n({
  locale: 'en',
  legacy: false,
  messages: {
    en,
    es,
    pt
  }
}))

app.mount('#app')
