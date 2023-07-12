import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import LanguageSelector from '../LanguageSelector.vue'

describe('LanguageSelector', () => {
  it('mount component', () => {
    expect(LanguageSelector).toBeTruthy()
    const wrapper = mount(LanguageSelector)
    const selectedLanguage = wrapper.get('[data-test="language-selector"]')
    expect(selectedLanguage.isVisible())
  })

  it('should has all avaible languages', () => {
    const wrapper = mount(LanguageSelector)
    const select = wrapper.getComponent({ name: 'VSelect' })

    const { items } = select.vm
    expect(items.length).toBe(3)
    expect(items).toStrictEqual(['en', 'es', 'pt'])
  })

  it('should has initial value of default', () => {
    const wrapper = mount(LanguageSelector)
    expect(wrapper.text()).toBe('English')
  })

  it('should change language on selection', async () => {
    const wrapper = mount(LanguageSelector);

    (wrapper.vm as any).language = 'pt'

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toBe('Português')
  })
})
