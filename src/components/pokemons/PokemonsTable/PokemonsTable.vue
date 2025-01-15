<script setup lang="ts">
import AppTableHeader from '@/components/app/AppTableHeader/AppTableHeader.vue'
import PokemonsTableRow from '@/components/pokemons/PokemonTableRow/PokemonTableRow.vue'
import { POKEDEX_TABLE_COLUMNS } from '@/shared/constants/variables'
import { usePokemonsByRoute } from '@/composables/usePokemonsByRoute/usePokemonsByRoute'
import { computed } from 'vue'
import Routes from '@/shared/types/routes'
import { useRoute } from 'vue-router'
import { usePokemonsStore } from '@/stores/pokemons/usePokemonsStore'

const { pokemons } = usePokemonsByRoute()
const route = useRoute()
const pokemonsStore = usePokemonsStore()

const filteredColumns = computed(() => {
  return route.path !== Routes.MY_POKEMONS
    ? POKEDEX_TABLE_COLUMNS
    : POKEDEX_TABLE_COLUMNS.filter((column) => column !== 'Caught at')
})
</script>

<template>
  <table>
    <AppTableHeader :columns="filteredColumns" />
    <tbody>
      <tr
        v-for="pokemon in pokemons"
        :key="pokemon.name"
        :class="[
          'pokemons-table',
          `pokemon-${pokemon.types[0]?.type.name.toLowerCase()}`,
          {
            'pokemons-table--caught': pokemon.caught,
            'pokemon-table--selected': pokemonsStore.state.pokemonsSelected.has(pokemon.id),
            'pokemons-table--has-timestamp': pokemon.timestamp !== '',
          },
        ]"
        @dblclick.stop="
          route.path === Routes.MY_POKEMONS ? pokemonsStore.selectPokemon(pokemon.id) : null
        "
      >
        <PokemonsTableRow :pokemonDetail="pokemon" />
      </tr>
    </tbody>
  </table>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as vars;

table {
  display: table;
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;
  border-radius: 2rem;
}

tbody tr {
  opacity: 0.5;
}

@media (max-width: 719px) {
  table {
    overflow-x: auto;
    display: block;
    width: 100%;
  }

  tbody tr {
    display: table-row;
  }
}

.pokemons-table--caught {
  opacity: 1;
  color: vars.$black;
}

.pokemons-table--has-timestamp {
  opacity: 1;
}

.pokemon-table--selected {
  background-color: vars.$secondary-color;
}
</style>
