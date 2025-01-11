<script setup lang="ts">
import type { IPokemonDetail } from '@/shared/types/pokemon'
import AppBadgeList from '@/components/app/AppBadgeList/AppBadgeList.vue'
import PokemonId from '@/components/pokemons/PokemonId/PokemonId.vue'
import { usePokemonsStore } from '@/stores/pokemons/usePokemonsStore'

interface Props {
  pokemonDetail: IPokemonDetail
}

defineProps<Props>()

const { getTypeListById } = usePokemonsStore()
</script>

<template>
  <div
    class="pokemon-card"
    :class="{ 'pokemon-card--caught': pokemonDetail.caught }"
    :style="{
      backgroundColor: `var(--${pokemonDetail.types[0].type.name.toLowerCase()})`,
    }"
  >
    <PokemonId
      :name="pokemonDetail.name"
      :image="pokemonDetail.image"
      :caught="pokemonDetail.caught"
      :id="pokemonDetail.id"
    />
    <AppBadgeList :types="getTypeListById(pokemonDetail.id)" />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as vars;

.pokemon-card {
  color: vars.$white;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1rem;
  padding: 0.2rem;
  opacity: 0.5;
}

.pokemon-card--caught {
  opacity: 1;
  color: vars.$black;
}
</style>
