<script lang="ts" setup>
import ArticleCard from '@/components/ArticleCard.vue';
import CustomPagination from '@/components/CustomPagination.vue';
import HttpService, { type Article, type ResponseSuccess } from '@/services/HttpService'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

type ViewMode = 'list' | 'grid'

const { t } = useI18n()
const http = new HttpService()
const articles = ref<Article[]>()
const search = ref('')
const totalItems = ref(1000)
const loading = ref(false)
const viewMode = ref<ViewMode>('list')

const page = ref(1)

async function fetchPosts() {
  if (!search.value) return

  loading.value = true
  const { data: response } = await http.getAllArticles({
    q: search.value,
    page: page.value,
    pageSize: 10
  })
  loading.value = false
  console.log('res', response)
  if (response.status === 'ok') {
    const { articles: responseArticles, totalResults } = response as ResponseSuccess
    articles.value = responseArticles
    totalItems.value = totalResults
  }
}
</script>

<template>
  <div class="about">
    <h2>{{ totalItems }}</h2>

    <v-btn-toggle v-model="viewMode">
      <v-btn value="list">
        <v-icon>mdi-view-list</v-icon>
      </v-btn>

      <v-btn value="grid">
        <v-icon>mdi-view-grid</v-icon>
      </v-btn>

    </v-btn-toggle>

    <CustomPagination v-model:page="page" :total-items="totalItems" />

    <v-text-field v-model="search" @blur="fetchPosts" @keyup.enter="fetchPosts" :loading="loading"
      append-inner-icon="mdi-magnify" @click:append-inner="fetchPosts" />


    <v-row>
      <v-col v-for="(article, i) in 20" :key="i" :cols="viewMode === 'grid' ? 4 : 12">
        <ArticleCard />
      </v-col>
    </v-row>
  </div>
</template>
