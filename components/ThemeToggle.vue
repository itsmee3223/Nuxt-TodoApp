<template>
  <div class="theme-toggle">
    <v-btn @click="toggleTheme">
      {{ isDarkMode ? 'Light Theme' : 'Dark Theme' }}
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()

const isDarkMode = computed(() => theme.global.current.value.dark)

function toggleTheme() {
  theme.global.name.value = isDarkMode.value ? 'light' : 'dark'
}
</script>

<style scoped>
.theme-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
}
</style>
