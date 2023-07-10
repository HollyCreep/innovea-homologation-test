<script setup lang="ts">
import { RouterView } from 'vue-router'
import ToggleThemeButton from './components/ToggleThemeButton.vue';

import LangSelector from './components/LangSelector.vue';
</script>

<template>
  <v-app>
    <v-app-bar app floating>
      <v-img src="logo.png" height="60" max-width="250" />

      <v-spacer></v-spacer>

      <LangSelector />
      <ToggleThemeButton />

    </v-app-bar>

    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>
