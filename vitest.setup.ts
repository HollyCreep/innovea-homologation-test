/* eslint-disable import/first */
(global as any).CSS = { supports: () => false }

import { beforeAll, beforeEach } from 'vitest'
import { config } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

class ResizeObserverStub {
  observe() { }
  unobserve() { }
  disconnect() { }
}

window.ResizeObserver = window.ResizeObserver || ResizeObserverStub

import Vuetify from './src/plugins/vuetify'
import i18n from './src/plugins/i18n'

beforeAll(() => {
  global.CSS = {
    supports: () => false,
    escape: (str: string) => str,
  }
})

beforeEach(() => {
  setActivePinia(createPinia())
  config.global.plugins.push(Vuetify)
  config.global.plugins.push(i18n)
})
