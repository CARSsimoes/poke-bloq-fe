<script setup lang="ts">
import type { IPokemonDetail } from '@/shared/types/pokemon'
import AppBadgeList from '@/components/app/AppBadgeList/AppBadgeList.vue'
import PokemonId from '@/components/pokemons/PokemonId/PokemonId.vue'
import { usePokemonsStore } from '@/stores/pokemons/usePokemonsStore'

interface Props {
  pokemon: IPokemonDetail
  isSelected: boolean
}

defineProps<Props>()

const { getTypeListById } = usePokemonsStore()
</script>

<template>
  <div
    v-if="pokemon"
    class="pokemon-card"
    :class="{
      'pokemon-card--caught': pokemon.caught,
      'pokemon-card--selected': isSelected,
      'pokemon-card--has-timestamp': pokemon.timestamp !== '',
    }"
    :style="{
      backgroundColor: `var(--${pokemon.types[0]?.type.name.toLowerCase()})`,
    }"
  >
    <PokemonId
      :name="pokemon.name"
      :image="pokemon.image"
      :caught="pokemon.caught"
      :id="pokemon.id"
    />
    <AppBadgeList :types="getTypeListById(pokemon.id)" />
  </div>
  <div v-else>Pokemon Not found</div>
</template>

<style scoped lang="scss">
.pokemon-card {
  border: 0.25rem solid $white;
  color: $white;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1rem;
  padding: 0.2rem;
  opacity: 0.5;
  width: 8rem;
  @media (min-width: 720px) {
    width: 9.125rem;
  }
}

.pokemon-card--caught {
  opacity: 1;
  color: $black;
}

.pokemon-card--selected {
  border: 0.25rem solid $primary-color;
}

.pokemon-card--has-timestamp {
  opacity: 1;
}
</style>
