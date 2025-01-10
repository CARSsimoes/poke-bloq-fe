<script setup lang="ts">
import Pokemon from '@/shared/classes/pokemon/pokemon'
import type { IPokemonDetail } from '@/shared/types/pokemon'
import { computed, type ComputedRef } from 'vue'
import AppBadgeList from '@/components/app/AppBadgeList/AppBadgeList.vue'
import PokemonId from '../PokemonId/PokemonId.vue'

interface Props {
  pokemonDetail: IPokemonDetail
}

const props = defineProps<Props>()
const pokemonDetailInstance: ComputedRef<Pokemon> = computed(() => new Pokemon(props.pokemonDetail))
</script>

<template>
  <td>
    <PokemonId :name="pokemonDetailInstance.name" :image="pokemonDetailInstance.image" />
  </td>
  <td>{{ pokemonDetailInstance.height }}</td>
  <td>{{ pokemonDetailInstance.weight }}</td>
  <td>{{ pokemonDetailInstance.hp }}</td>
  <td>
    <AppBadgeList :types="pokemonDetailInstance.getTypeList()" />
  </td>
  <td>{{ pokemonDetailInstance.attack }}</td>
  <td>{{ pokemonDetailInstance.defense }}</td>
</template>
