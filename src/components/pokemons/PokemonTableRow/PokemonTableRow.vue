<script setup lang="ts">
import type { IPokemonDetail } from '@/shared/types/pokemon'
import AppBadgeList from '@/components/app/AppBadgeList/AppBadgeList.vue'
import PokemonId from '../PokemonId/PokemonId.vue'
import { usePokemonsStore } from '@/stores/pokemons/usePokemonsStore'
import Routes from '@/shared/types/routes'

interface Props {
  pokemonDetail: IPokemonDetail
}

defineProps<Props>()

const { getTypeListById } = usePokemonsStore()
</script>

<template>
  <td>
    <PokemonId
      :name="pokemonDetail.name"
      :image="pokemonDetail.image"
      :caught="pokemonDetail.caught"
      :id="pokemonDetail.id"
    />
  </td>
  <td>{{ pokemonDetail.height }}</td>
  <td>{{ pokemonDetail.weight }}</td>
  <td>{{ pokemonDetail.hp }}</td>
  <td>{{ pokemonDetail.speed }}</td>
  <td>{{ pokemonDetail.attack }}</td>
  <td>{{ pokemonDetail.defense }}</td>
  <td>{{ pokemonDetail.specialAttack }}</td>
  <td>{{ pokemonDetail.specialDefense }}</td>
  <td class="pokemon-table-row__types-container">
    <AppBadgeList :types="getTypeListById(pokemonDetail.id)" />
  </td>
  <td v-if="$route.path !== Routes.MY_POKEMONS" class="pokemon-table-row--break-text">
    {{ pokemonDetail.timestamp }}
  </td>
</template>

<style scoped lang="scss">
td {
  border: 0.15rem solid #ddd;
}

td {
  padding: 0.75rem;
  text-align: center;
}

.pokemon-table-row--break-text {
  word-wrap: break-word;
  white-space: normal;
  width: 6rem;
}

.pokemon-table-row__types-container {
  min-width: 8rem;
}
</style>
