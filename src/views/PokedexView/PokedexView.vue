<script setup lang="ts">
import { usePokemonsStore } from '@/stores/pokemons/usePokemonsStore'
import { onMounted } from 'vue'
import LayoutViewsSwapper from '../LayoutViewsSwapper/LayoutViewsSwapper.vue'
import LayoutType from '@/shared/layouts/layouts'

interface Props {
  activeLayout: LayoutType
}

defineProps<Props>()

const pokemonsStore = usePokemonsStore()

onMounted(() => {
  pokemonsStore.loadPokemons()
})
</script>

<template>
  <LayoutViewsSwapper :layoutType="activeLayout" />
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as vars;

header {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 2rem;
  @media (min-width: 720px) {
    flex-direction: row;
  }
}

.pokedex-view__title {
  color: vars.$white;
  font-size: 2rem;
}
</style>
