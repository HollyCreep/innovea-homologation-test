import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ArticleCard from '../ArticleCard.vue'
import { useAppStore } from '@/stores/app'

import { generateArticle } from '@/utils/test-utils'

describe('ArticleCard', () => {
  it('should be rendered', () => {
    expect(ArticleCard).toBeTruthy()
    const article = generateArticle()
    const wrapper = mount(ArticleCard, {
      props: { ...article },
    })
    expect(wrapper.find('[data-test="title"]').text()).toBe(article.title)
    expect(wrapper.find('[data-test="author"]').text()).toBe(article.author)
    expect(wrapper.find('[data-test="description"]').text()).toEqual(article.description)
  })
  it('should change flex-direction on user view mode preference', async () => {
    const article = generateArticle()
    const wrapper = mount(ArticleCard, {
      props: { ...article },
    })
    const appStore = useAppStore()

    appStore.viewMode = 'grid'
    await wrapper.vm.$nextTick()
    expect(wrapper.classes()).toContain('flex-column')
    expect(wrapper.classes()).not.toContain('flex-row')

    appStore.viewMode = 'list'
    await wrapper.vm.$nextTick()
    expect(wrapper.classes()).toContain('flex-row')
    expect(wrapper.classes()).not.toContain('flex-column')
  })
})
