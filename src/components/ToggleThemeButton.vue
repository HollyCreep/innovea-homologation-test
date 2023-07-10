<template>
  <v-btn class="toggle-theme" icon @click="toggleTheme">
    <v-img width="28" height="28" class="sun" :class="{ 'active': theme.name.value === 'light' }" :src="LightThemeIcon"
      contain></v-img>
    <v-img width="28" height="28" class="moon" :class="{ 'active': theme.name.value === 'dark' }" :src="DarkThemeIcon"
      contain></v-img>
  </v-btn>
</template>

<script lang="ts" setup>

import { useTheme } from 'vuetify'
import LightThemeIcon from '@/assets/icons/light-theme.svg'
import DarkThemeIcon from '@/assets/icons/dark-theme.svg'

const theme = useTheme()

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>


<style lang="scss" scoped>
.toggle-theme {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.5s ease;

  .sun {
    position: absolute;
    transition: transform 0.5s ease, opacity 0.5s ease, color 0.5s ease;
    opacity: 0;
    transform: translateX(50px);

    &:not(.active) {
      opacity: 1;
      transform: translateX(0px);
    }
  }

  .moon {
    position: absolute;
    transition: transform 0.5s ease, opacity 0.5s ease, color 0.5s ease;
    transform: translateX(0px);

    &.active {
      opacity: 0;
      transform: translateX(-50px);
    }
  }
}
</style>
