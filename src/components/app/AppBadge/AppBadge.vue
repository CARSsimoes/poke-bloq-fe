<script setup lang="ts">
import type { PokemonType } from '@/shared/types/colors'

interface Props {
  name: PokemonType
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
  padding: 0.2rem;
  font-size: 0.8rem;
  color: white;
  font-weight: bold;
  @media (min-width: 720px) {
    padding: 0.25rem;
    font-size: 1rem;
  }
}
</style>
