import 'vuetify/styles'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Vuetify from '@/plugins/vuetify'
import i18n from '@/plugins/i18n'

const app = createApp(App)

app.use(createPinia())
app.use(Vuetify)
app.use(router)
app.use(i18n)

app.mount('#app')
