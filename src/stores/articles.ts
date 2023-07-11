import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useAppStore } from './app'
import HttpService from '@/services/HttpService'

import type { Article, Params, ResponseSuccess } from '@/services/HttpService'

export const useArticlesStore = defineStore('articles', () => {
  const appStore = useAppStore()
  const http = new HttpService()

  const params = ref<Params & { pageSize: number; page: number }>({
    q: '',
    page: 1,
    pageSize: 12,
    language: appStore.language,
  })

  const totalItems = ref<number>()
  const articles = ref<Article[]>([])
  const loading = ref(false)

  const counter = computed(() =>
    articles.value.length && totalItems.value ? `${articles.value.length}/${totalItems.value}` : '0',
  )

  async function fetchArticles(args?: Params) {
    if (
      !!loading.value
      || (!params.value.q && (!args || !args.q))
      || (args && args.q === params.value.q)
    )
      return

    articles.value = []
    params.value = { ...params.value, language: appStore.language, ...args }
    loading.value = true
    const { data: response } = await http.getAllArticles(params.value)
    loading.value = false

    if (response.status === 'ok') {
      const { articles: responseArticles, totalResults } = response as ResponseSuccess
      articles.value = responseArticles
      totalItems.value = totalResults
    }
  }

  async function fetchMoreArticles() {
    if (
      !!loading.value
      || !articles.value
      || !totalItems.value
      || articles.value.length === totalItems.value
    )
      return

    params.value.page = params.value.page + 1
    loading.value = true
    const { data: response } = await http.getAllArticles(params.value)
    loading.value = false

    if (response.status === 'ok') {
      const { articles: responseArticles } = response as ResponseSuccess
      articles.value.push(...responseArticles)
    }
  }

  watch(
    () => appStore.language,
    () => fetchArticles(),
  )

  return { articles, totalItems, params, counter, fetchArticles, fetchMoreArticles }
})
