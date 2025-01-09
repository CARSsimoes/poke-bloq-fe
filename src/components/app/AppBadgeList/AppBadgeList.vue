<script setup lang="ts">
import type { IPokemonTypes } from '@/shared/types/pokemon'
import AppBadge from '@/components/app/AppBadge/AppBadge.vue'

interface Props {
  types: IPokemonTypes[]
}

defineProps<Props>()
</script>

<template>
  <div class="app-badge-list__container">
    <AppBadge v-for="(type, index) in types" :key="index" :name="type.type.name" />
  </div>
</template>

<style scoped lang="scss">
.app-badge-list__container {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 1rem;
  min-width: 2rem;
  background-color: white;
  height: 1.5rem;
}
</style>
