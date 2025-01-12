<script setup lang="ts">
import { usePokemonsStore } from '@/stores/pokemons/usePokemonsStore'
import LayoutViewsSwapper from '../LayoutViewsSwapper/LayoutViewsSwapper.vue'

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
        `${pokemonsStore.computedPokemonsCaught.length} / ${pokemonsStore.state.totalNumberOfPokemons}`
      }}
    </p>
    <button @click="downloadPokemonCSV">Download</button>
  </div>
  <LayoutViewsSwapper :layoutType="pokemonsStore.activeLayout" />
</template>

<style scoped lang="scss">
.my-pokemons-view__details {
  display: flex;
  justify-content: space-between;
}
</style>
