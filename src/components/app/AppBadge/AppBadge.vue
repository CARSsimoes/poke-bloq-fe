<script setup lang="ts">
interface Props {
  name: string
}

defineProps<Props>()
</script>

<template>
  <p class="app-badge" :style="{ backgroundColor: `var(--${name.toLowerCase()})` }">
    {{ name }}
  </p>
</template>

<style scoped lang="scss">
.app-badge {
  display: inline-block;
  border-radius: 1rem;
  padding: 0.25rem;
  font-size: 1rem;
  color: white;
  font-weight: bold;
}
</style>
