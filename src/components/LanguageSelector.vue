<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import type { Language } from '@/services/HttpService'
import { useAppStore } from '@/stores/app'

const { t, availableLocales } = useI18n({ useScope: 'global' })
const appStore = useAppStore()
const { language } = storeToRefs(appStore)

interface AvaibleLocale {
  title: Language
  value: Language
}

const flags = {
  en: 'flags/UnitedStates.svg',
  es: 'flags/Spain.svg',
  pt: 'flags/Brazil.svg',
}
</script>

<template>
  <v-select
    v-model="language"
    :items="availableLocales"
    hide-details
    hide-selected
    v-bind="$attrs"
    variant="plain"
    density="compact"
    class="custom-input"
    style="max-width: 200px;"
  >
    <template #selection="{ item }">
      <v-list-item :title="t(item.value)">
        <template #prepend>
          <v-avatar size="32" :image="flags[item.value]" />
        </template>
      </v-list-item>
    </template>
    <template #item="{ item }">
      <v-list-item :title="t(item.value)" @click="language = item.value">
        <template #prepend>
          <v-avatar size="32" :image="flags[item.value]" />
        </template>
      </v-list-item>
    </template>
  </v-select>
</template>

<style lang="scss" scoped>
.custom-input {
  :deep(.v-input__control) {
    padding-top: 0;
    margin-top: 0;

    .v-field__input {
      padding: 0 !important;
    }

    .v-field__append-inner {
      padding-top: 8px !important;
    }
  }
}
</style>
