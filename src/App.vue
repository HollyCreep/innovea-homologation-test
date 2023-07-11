<script setup lang="ts">
import { RouterView } from 'vue-router'
import ToggleThemeButton from './components/ToggleThemeButton.vue'

import LanguageSelector from './components/LanguageSelector.vue'
</script>

<template>
  <v-app>
    <v-app-bar app floating height="100">
      <v-img src="logo.png" height="60" max-width="250" />

      <v-spacer />

      <LanguageSelector class="mr-4" />
      <ToggleThemeButton />
    </v-app-bar>

    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>
