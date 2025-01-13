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
  <td>{{ pokemonDetail.attack }}</td>
  <td>{{ pokemonDetail.defense }}</td>
  <td>
    <AppBadgeList :types="getTypeListById(pokemonDetail.id)" />
  </td>
  <td v-if="$route.path !== Routes.MY_POKEMONS">{{ pokemonDetail.timestamp }}</td>
</template>
