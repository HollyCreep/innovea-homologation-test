import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ToggleThemeButton from '../ToggleThemeButton.vue'
import { useAppStore } from '@/stores/app'

describe('ToggleThemeButton', () => {
  it('mount component', () => {
    expect(ToggleThemeButton).toBeTruthy()
    const wrapper = mount(ToggleThemeButton)
    expect(wrapper.isVisible())
  })

  it('should display user prefered theme', () => {
    const wrapper = mount(ToggleThemeButton)
    const store = useAppStore()
    expect(wrapper.get('.sun').classes('hide')).toBe(store.theme === 'dark')
    expect(wrapper.get('.moon').classes('hide')).toBe(store.theme === 'light')
  })

  it('should change change theme on click', async () => {
    const wrapper = mount(ToggleThemeButton)
    const store = useAppStore()
    const theme = store.theme
    const isDark = theme === 'dark'

    expect(wrapper.get('.sun').classes('hide')).toBe(isDark)
    expect(wrapper.get('.moon').classes('hide')).toBe(!isDark)

    wrapper.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.get('.moon').classes('hide')).toBe(isDark)
    expect(wrapper.get('.sun').classes('hide')).toBe(!isDark)
    expect(store.theme).not.toBe(theme)
  })
})
