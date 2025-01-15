<script setup lang="ts">
import { defineProps, onMounted, onUnmounted, ref } from 'vue'

defineProps<{
  message: string
  color: string
}>()

const isVisible = ref(true)

onMounted(() => {
  const timeout = setTimeout(() => {
    isVisible.value = false
  }, 2000)

  onUnmounted(() => {
    clearTimeout(timeout)
  })
})
</script>

<template>
  <div v-if="isVisible" class="app-notify" :style="{ backgroundColor: color }">
    <p class="app-notify__message">{{ message }}</p>
  </div>
</template>

<style scoped lang="scss">
.app-notify {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  padding: 0.75rem 1.125rem;
  border-radius: 0.5rem;
  z-index: 1000;
  transition: opacity 0.5s ease-in-out;
  opacity: 0.9;
  text-align: center;
}
</style>
