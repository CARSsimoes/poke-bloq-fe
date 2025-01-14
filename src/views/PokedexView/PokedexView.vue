<script setup lang="ts">
import { usePokemonsStore } from '@/stores/pokemons/usePokemonsStore'
import { onMounted } from 'vue'
import LayoutViewsSwapper from '../LayoutViewsSwapper/LayoutViewsSwapper.vue'
import LayoutType from '@/shared/layouts/layouts'
import AppLoading from '@/components/app/AppLoading/AppLoading.vue'

interface Props {
  activeLayout: LayoutType
}

defineProps<Props>()

const pokemonsStore = usePokemonsStore()

const fetchPokemons = () => {
  pokemonsStore.state.error = false
  pokemonsStore.loadPokemons()
}

onMounted(() => {
  fetchPokemons()
})
</script>

<template>
  <AppLoading v-if="pokemonsStore.state.isLoading" />
  <div v-else-if="pokemonsStore.state.error" class="error-message">
    <p>Some error occur, please try again</p>
    <button @click="fetchPokemons()">Retry</button>
  </div>
  <LayoutViewsSwapper v-else :layoutType="activeLayout" />
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
