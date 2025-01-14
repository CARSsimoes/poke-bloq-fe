<script setup lang="ts">
import PokemonCard from '../PokemonCard/PokemonCard.vue'
import { usePokemonsByRoute } from '@/composables/usePokemonsByRoute/usePokemonsByRoute'
import { useRoute } from 'vue-router'
import { usePokemonsStore } from '@/stores/pokemons/usePokemonsStore'
import Routes from '@/shared/types/routes'

const { pokemons } = usePokemonsByRoute()
const route = useRoute()
const pokemonsStore = usePokemonsStore()
</script>

<template>
  <ul class="pokemons-list__container">
    <li
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      @dblclick.stop="
        route.path === Routes.MY_POKEMONS ? pokemonsStore.selectPokemon(pokemon.id) : null
      "
    >
      <PokemonCard
        :pokemon="pokemon"
        :is-selected="pokemonsStore.state.pokemonsSelected.has(pokemon.id)"
      />
    </li>
  </ul>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as vars;

.pokemons-list__container {
  padding-inline-start: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  li {
    list-style-type: none;
  }
}
</style>
