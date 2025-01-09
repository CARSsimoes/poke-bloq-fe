<script setup lang="ts">
import Pokemon from '@/shared/classes/pokemon/pokemon'
import type { IPokemonDetail } from '@/shared/types/pokemon'
import { computed, type ComputedRef } from 'vue'
import AppBadgeList from '@/components/app/AppBadgeList/AppBadgeList.vue'

interface Props {
  pokemonDetail: IPokemonDetail
}

const props = defineProps<Props>()
const pokemonDetailInstance: ComputedRef<Pokemon> = computed(() => new Pokemon(props.pokemonDetail))
</script>

<template>
  <div
    class="pokemon-card"
    :class="{ 'pokemon-card--caught': pokemonDetailInstance.isCaught() }"
    :style="{
      backgroundColor: `var(--${pokemonDetailInstance.types[0].type.name.toLowerCase()})`,
    }"
  >
    <p class="pokemon-card__title">{{ pokemonDetailInstance.name }}</p>
    <img
      class="pokemon-card__img"
      :src="pokemonDetailInstance.image"
      :alt="pokemonDetailInstance.name"
    />
    <AppBadgeList :types="pokemonDetailInstance.getTypeList()" />
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

  &:hover {
    opacity: 1;
  }
}

.pokemon-card--caught {
  opacity: 0.25;

  &:hover {
    opacity: 0.5;
    color: vars.$black;
  }
}

.pokemon-card__title {
  text-transform: capitalize;
}

.pokemon-card__img {
  width: 6rem;
}
</style>
