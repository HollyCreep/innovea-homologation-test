<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { Article } from '@/services/HttpService'
import { type ViewMode, useAppStore } from '@/stores/app'

defineProps<Article>()

const { t } = useI18n()
const appStore = useAppStore()

const placeholder = 'placeholder-image.png'

const imageProps: Record<ViewMode, Object> = {
  grid: {
    'height': 200,
    'max-height': 200,
  },
  list: {
    'max-height': 200,
    'width': '40%',
    'max-width': '40%',
    'min-width': '40%',
  },
}
</script>

<template>
  <v-card
    border class="mb-2 fill-height d-flex" :class="appStore.viewMode === 'grid' ? 'flex-column' : 'flex-row'"
    density="compact"
  >
    <v-img
      v-bind="imageProps[appStore.viewMode]" :key="appStore.viewMode" :src="urlToImage || placeholder"
      cover
    />

    <div class="d-flex flex-column fill-height">
      <v-card-item>
        <v-card-title>{{ title }}</v-card-title>
        <v-card-subtitle>{{ author }}</v-card-subtitle>
      </v-card-item>

      <v-card-text class="flex-grow-1">
        {{ description }}
      </v-card-text>

      <v-btn class="ml-auto" color="primary" variant="text" target="_blank" :href="url">
        {{ t('view_more') }}
      </v-btn>
    </div>
  </v-card>
</template>

<style scoped></style>
