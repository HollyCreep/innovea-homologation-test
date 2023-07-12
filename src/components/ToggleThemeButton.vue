<script lang="ts" setup>
import { useTheme } from 'vuetify'
import { onMounted } from 'vue'
import LightThemeIcon from '@/assets/icons/light-theme.svg'
import DarkThemeIcon from '@/assets/icons/dark-theme.svg'
import { useAppStore } from '@/stores/app'

const theme = useTheme()
const appStore = useAppStore()

function toggleTheme() {
  const newTheme = theme.global.current.value.dark ? 'light' : 'dark'
  theme.global.name.value = newTheme
  appStore.theme = newTheme
}

onMounted(() => {
  theme.global.name.value = appStore.theme
})
</script>

<template>
  <v-btn class="toggle-theme" icon @click="toggleTheme">
    <v-img
      width="28"
      height="28"
      class="sun"
      :class="{ hide: appStore.theme === 'dark' }"
      :src="LightThemeIcon"
      contain
    />
    <v-img
      width="28"
      height="28"
      class="moon"
      :class="{ hide: appStore.theme === 'light' }"
      :src="DarkThemeIcon"
      contain
    />
  </v-btn>
</template>

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

    &:not(.hide) {
      opacity: 1;
      transform: translateX(0px);
    }
  }

  .moon {
    position: absolute;
    transition: transform 0.5s ease, opacity 0.5s ease, color 0.5s ease;
    transform: translateX(0px);

    &.hide {
      opacity: 0;
      transform: translateX(-50px);
    }
  }
}
</style>
