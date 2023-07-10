<template>
  <v-select v-model="locale" :items="(availableLocales as AvaibleLocale[])" hide-details hide-selected v-bind="$attrs"
    variant="plain" density="compact" class="custom-input" style="max-width: 230px;">
    <template #selection="{ item }">
      <v-list-item :title="t(item.value)">
        <template v-slot:prepend>
          <v-avatar size="32" :image="flags[item.value]" />
        </template>
      </v-list-item>
    </template>
    <template #item="{ item }">
      <v-list-item :title="t(item.value)" @click="locale = item.value">
        <template v-slot:prepend>
          <v-avatar size="32" :image="flags[item.value]" />
        </template>
      </v-list-item>
    </template>
  </v-select>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
const { t, locale, availableLocales } = useI18n({ useScope: 'global' })

type AvaibleLocale = {
  title: string,
  value: keyof typeof flags
}

const flags = {
  en: 'flags/UnitedStates.svg',
  es: 'flags/Spain.svg',
  pt: 'flags/Brazil.svg'
}

</script>

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
