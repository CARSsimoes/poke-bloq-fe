<script setup lang="ts">
import type { IPokemonDetail } from '@/shared/types/pokemon'
import AppBadgeList from '@/components/app/AppBadgeList/AppBadgeList.vue'
import PokemonId from '@/components/pokemons/PokemonId/PokemonId.vue'
import { usePokemonsStore } from '@/stores/pokemons/usePokemonsStore'

interface Props {
  pokemonDetail: IPokemonDetail
  isSelected: boolean
}

defineProps<Props>()

const { getTypeListById } = usePokemonsStore()
</script>

<template>
  <div
    class="pokemon-card"
    :class="{ 'pokemon-card--caught': pokemonDetail.caught, 'pokemon-card--selected': isSelected }"
    :style="{
      backgroundColor: `var(--${pokemonDetail.types[0]?.type.name.toLowerCase()})`,
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
  width: 8.5rem;
  @media (min-width: 720px) {
    width: 9.125rem;
  }
}

.pokemon-card--caught {
  opacity: 1;
  color: vars.$black;
}

.pokemon-card--selected {
  border-color: #f00;
  background-color: #fee;
}
</style>
