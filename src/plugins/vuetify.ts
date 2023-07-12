import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const primary = '#21c2f8'
const secondary = '#9846bb'

const Vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary,
          secondary,
        },
      },
      dark: {
        colors: {
          primary,
          secondary,
        },
      },
    },
  },
})

export default Vuetify
