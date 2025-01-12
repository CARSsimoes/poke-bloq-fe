<script setup lang="ts">
import { usePokemonsStore } from '@/stores/pokemons/usePokemonsStore'
import LayoutViewsSwapper from '../LayoutViewsSwapper/LayoutViewsSwapper.vue'
import LayoutType from '@/shared/layouts/layouts'

interface Props {
  activeLayout: LayoutType
}

defineProps<Props>()

const pokemonsStore = usePokemonsStore()

function downloadPokemonCSV() {
  // downloadCSV(pokemonsStore.state.pokemonsCaught, 'pokemons.csv')
  console.log('download')
}
</script>

<template>
  <div class="my-pokemons-view__details">
    <p>
      Caughthed:
      {{
        `${pokemonsStore.totalNumberOfPokemonsCaught} / ${pokemonsStore.state.totalNumberOfPokemons}`
      }}
    </p>
    <button @click="downloadPokemonCSV" :disabled="pokemonsStore.hasPokemonsCaught">
      Download
    </button>
  </div>
  <LayoutViewsSwapper :layoutType="activeLayout" />
</template>

<style scoped lang="scss">
.my-pokemons-view__details {
  display: flex;
  justify-content: space-between;
}
</style>
