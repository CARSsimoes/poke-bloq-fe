<script setup lang="ts">
import { usePokemonsStore } from '@/stores/pokemons/usePokemonsStore'
import { computed, onMounted } from 'vue'
import LayoutViewsSwapper from '../LayoutViewsSwapper/LayoutViewsSwapper.vue'
import LayoutType from '@/shared/layouts/layouts'
import AppLoading from '@/components/app/AppLoading/AppLoading.vue'
import AppButton from '@/components/app/AppButton/AppButton.vue'

interface Props {
  activeLayout: LayoutType
}

defineProps<Props>()

const pokemonsStore = usePokemonsStore()

const fetchPokemons = () => {
  pokemonsStore.state.error = false
  pokemonsStore.loadPokemons()
}

const finalPokemonFetched = computed(
  () => pokemonsStore.state.pokemons?.length === pokemonsStore.state.totalNumberOfPokemons,
)

onMounted(() => {
  if (pokemonsStore.state.pokemons?.length === 0) fetchPokemons()
})
</script>

<template>
  <!-- show loading spinner only for the first load -->
  <AppLoading v-if="pokemonsStore.state.isInitialLoading" />

  <!-- show error message if there's an error -->
  <div v-else-if="pokemonsStore.state.error" class="error-message">
    <p>Some error occur, please try again</p>
    <button @click="fetchPokemons()">Retry</button>
  </div>

  <!-- show content once the data is loaded -->
  <LayoutViewsSwapper v-else :layoutType="activeLayout" />

  <!-- load More button for subsequent loading -->
  <div class="pokedex-view__bottom-section" v-if="!finalPokemonFetched">
    <AppButton
      v-if="!pokemonsStore.state.isLoading"
      class="pokedex-view__load-more-button"
      text="Load more Pokemons"
      :action="fetchPokemons"
      :disabled="pokemonsStore.state.isLoading"
    />
    <p v-else>Loading ...</p>
  </div>
</template>

<style scoped lang="scss">
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
  color: $white;
  font-size: 2rem;
}

.pokedex-view__load-more-button {
  margin-top: 1rem;
}

.pokedex-view__bottom-section {
  display: flex;
  justify-content: center;
}
</style>
