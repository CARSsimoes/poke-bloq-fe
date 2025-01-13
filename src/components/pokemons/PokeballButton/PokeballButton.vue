<script setup lang="ts">
import { usePokemonsStore } from '@/stores/pokemons/usePokemonsStore'
import uncaughtPokemon from '@/assets/img/uncaught_pokeball.png'
import caughtPokemon from '@/assets/img/caught_pokeball.png'

interface Props {
  caught: boolean
  id: number
}

defineProps<Props>()

const { catchPokemonById } = usePokemonsStore()
</script>

<template>
  <button class="pokeball-button" @click.stop="catchPokemonById(id)">
    <img
      v-if="!caught"
      :src="uncaughtPokemon"
      alt="Pokeball without Pokemon"
      class="pokeball-img"
    />
    <img v-else :src="caughtPokemon" alt="Pokeball with Pokemon" class="pokeball-img" />
  </button>
</template>

<style scoped lang="scss">
.pokeball-button {
  display: inline-block;
  width: 2rem;
  height: 100%;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  position: relative;
}

.pokeball-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
}
</style>
