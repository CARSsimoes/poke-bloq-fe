<script setup lang="ts">
import AppTableHeader from '@/components/app/AppTableHeader/AppTableHeader.vue'
import PokemonsTableRow from '@/components/pokemons/PokemonTableRow/PokemonTableRow.vue'
import { POKEDEX_TABLE_COLUMNS } from '@/shared/constants/variables'
import { usePokemonsByRoute } from '@/composables/usePokemonsByRoute/usePokemonsByRoute'
import { computed } from 'vue'
import Routes from '@/shared/types/routes'
import { useRoute } from 'vue-router'

const { pokemons } = usePokemonsByRoute()
const route = useRoute()

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
        :class="{
          'pokemons-table--caught': pokemon.caught,
          'pokemons-table--has-timestamp': Boolean(pokemon.timestamp),
        }"
        class="pokemons-table"
        :style="{
          backgroundColor: `var(--${pokemon.types[0]?.type.name.toLowerCase()})`,
        }"
      >
        <PokemonsTableRow :pokemonDetail="pokemon" />
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss">
@use '@/assets/scss/variables' as vars;

table {
  display: table;
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;
  border-radius: 2rem;
}

td {
  border: 0.15rem solid #ddd;
}

th,
td {
  padding: 0.75rem;
  text-align: center;
}

th {
  background-color: vars.$white;
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

  td:first-child,
  th:first-child {
    position: sticky;
    left: 0;
    background-color: vars.$primary-color;
    z-index: 1;
  }
}

.pokemons-table--caught {
  opacity: 1;
  color: vars.$black;
}

.pokemons-table--has-timestamp {
  opacity: 1;
}
</style>
