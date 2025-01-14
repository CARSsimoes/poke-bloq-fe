<script setup lang="ts">
import type { IPokemonDetail } from '@/shared/types/pokemon'
import AppBadgeList from '@/components/app/AppBadgeList/AppBadgeList.vue'
import PokemonId from '@/components/pokemons/PokemonId/PokemonId.vue'
import { usePokemonsStore } from '@/stores/pokemons/usePokemonsStore'
import Routes from '@/shared/types/routes'

interface Props {
  pokemon: IPokemonDetail
  isSelected: boolean
}

defineProps<Props>()

const { getTypeListById } = usePokemonsStore()

const shareClicked = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log('Text copied to clipboard:', text)
    })
    .catch((err) => {
      console.error('Failed to copy text: ', err)
    })
}
</script>

<template>
  <div
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
    <button
      v-if="$route.path === Routes.MY_POKEMONS"
      class="pokemon-card-button"
      @click="shareClicked(pokemon.image)"
    >
      🔗
    </button>
    <AppBadgeList :types="getTypeListById(pokemon.id)" />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as vars;

.pokemon-card {
  position: relative;
  border: 0.25rem solid vars.$white;
  color: vars.$white;
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
  color: vars.$black;
}

.pokemon-card--selected {
  border: 0.25rem solid vars.$primary-color;
}

.pokemon-card--has-timestamp {
  opacity: 1;
}

.pokemon-card-button {
  position: absolute;
  top: 2rem;
  right: 1.2rem;
  border: none;
  width: 0.5rem;
  height: 0.5rem;
  font-size: 1.5rem;
  cursor: pointer;
  background-color: transparent;
}
</style>
