<script setup lang="ts">
import { usePokemonsStore } from '@/stores/pokemons/usePokemonsStore'
import PokemonCard from '../PokemonCard/PokemonCard.vue'

const pokemonsStore = usePokemonsStore()
</script>

<template>
  <ul class="pokemons-list__container">
    <template v-for="pokemon in pokemonsStore.state.pokemons" :key="pokemon.name">
      <PokemonCard :pokemonDetail="pokemon" />
    </template>
  </ul>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as vars;
@use 'sass:map';

.pokemons-list__container {
  padding-inline-start: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.5rem;
}
</style>
