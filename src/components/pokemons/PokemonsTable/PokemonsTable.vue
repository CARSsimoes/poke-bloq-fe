<script setup lang="ts">
import AppTableHeader from '@/components/app/AppTableHeader/AppTableHeader.vue'
import PokemonsTableRow from '@/components/pokemons/PokemonTableRow/PokemonTableRow.vue'
import { POKEDEX_TABLE_COLUMNS } from '@/shared/constants/variables'
import { usePokemonsByRoute } from '@/composables/usePokemonsByRoute/usePokemonsByRoute'

const { pokemons } = usePokemonsByRoute()
</script>

<template>
  <table>
    <AppTableHeader :columns="POKEDEX_TABLE_COLUMNS" />
    <tbody>
      <tr
        v-for="pokemon in pokemons"
        :key="pokemon.name"
        :class="{ 'pokemons-table--caught': pokemon.caught }"
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
</style>
