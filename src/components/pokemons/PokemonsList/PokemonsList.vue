<script setup lang="ts">
import PokemonCard from '../PokemonCard/PokemonCard.vue'
import { usePokemonsByRoute } from '@/composables/usePokemonsByRoute/usePokemonsByRoute'

const { pokemons } = usePokemonsByRoute()

const isSelected = true
</script>

<template>
  <ul class="pokemons-list__container">
    <template v-for="pokemon in pokemons" :key="pokemon.id">
      <PokemonCard :pokemonDetail="pokemon" :is-selected="isSelected" />
    </template>
  </ul>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as vars;
@use 'sass:map';

.pokemons-list__container {
  padding-inline-start: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
