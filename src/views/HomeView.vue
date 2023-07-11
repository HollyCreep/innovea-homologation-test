<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ArticleCard from '@/components/ArticleCard.vue'
import { useArticlesStore } from '@/stores/articles'
import { useAppStore } from '@/stores/app'

const { t } = useI18n()
const articlesStore = useArticlesStore()
const appStore = useAppStore()

const search = ref('')
const loading = ref(false)

onMounted(() => {
  window.addEventListener(
    'scroll',
    () => {
      const { scrollTop, scrollHeight, clientHeight }
        = document.documentElement

      if (scrollTop + clientHeight >= scrollHeight - 5)
        articlesStore.fetchMoreArticles()
    },
    {
      passive: true,
    },
  )
})

async function getArticles() {
  if (!search.value)
    return

  loading.value = true
  await articlesStore.fetchArticles({
    q: search.value,
  })
  loading.value = false
}
</script>

<template>
  <div class="about">
    <div class="d-flex justify-space-between align-center mb-8">
      <h2 class="text-primary">
        {{ t('articles') }}
      </h2>

      <v-btn-toggle v-model="appStore.viewMode" density="compact">
        <v-btn value="list">
          <v-icon size="1.5rem">
            mdi-view-list
          </v-icon>
        </v-btn>

        <v-btn value="grid">
          <v-icon size="1.5rem">
            mdi-view-grid
          </v-icon>
        </v-btn>
      </v-btn-toggle>
    </div>

    <v-text-field
      v-model="search"
      :label="t('label')"
      :hint="t('hint')"
      class="mb-8"
      append-inner-icon="mdi-magnify"
      @blur="getArticles"
      @keyup.enter="getArticles"
      @click:append-inner="getArticles"
    >
      <template #loader>
        <v-progress-linear :active="loading" color="secondary" indeterminate />
      </template>
    </v-text-field>

    <h5 v-show="articlesStore.counter" class="text-right mb-2">
      Total de registros: {{ articlesStore.counter }}
    </h5>

    <v-row v-if="articlesStore.articles">
      <v-col
        v-for="(article, i) in articlesStore.articles"
        :key="i"
        cols="12"
        :sm="appStore.viewMode === 'grid' ? 6 : 12"
        :md="appStore.viewMode === 'grid' ? 4 : 12"
        :lg="appStore.viewMode === 'grid' ? 3 : 12"
      >
        <ArticleCard v-bind="article" />
      </v-col>
    </v-row>
  </div>
</template>
