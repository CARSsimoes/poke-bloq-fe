<script setup lang="ts">
import { usePokemonsStore } from '@/stores/pokemons/usePokemonsStore'
import uncaughtPokemon from '@/assets/img/uncaught_pokeball.png'
import caughtPokemon from '@/assets/img/caught_pokeball.png'
import Routes from '@/shared/types/routes'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import PokemonModalRemove from '@/components/pokemons/PokemonModalRemove/PokemonModalRemove.vue'

interface Props {
  caught: boolean
  id: number
}

defineProps<Props>()

const showModal = ref<boolean>(false)

const closeModal = () => {
  showModal.value = false
}

const pokemonsStore = usePokemonsStore()
const route = useRoute()

const disablePokeballButton = computed(() => {
  return pokemonsStore.hasPokemonsSelected && route.path === Routes.MY_POKEMONS
})

const throwPokeball = (id: number): void => {
  const isCaught = !!pokemonsStore.state.pokemonsCaught.find((poke) => poke.id === id)

  if (route.path === Routes.HOME && isCaught) return

  if (isCaught) {
    showModal.value = true
  } else {
    pokemonsStore.catchPokemonById(id)
  }
}
</script>

<template>
  <button
    class="pokeball-button"
    @click.stop="throwPokeball(id)"
    :disabled="disablePokeballButton"
    :class="{ 'pokeball-button--disabled': disablePokeballButton }"
  >
    <img
      v-if="!caught"
      :src="uncaughtPokemon"
      alt="Pokeball without Pokemon"
      class="pokeball-img"
    />
    <img v-else :src="caughtPokemon" alt="Pokeball with Pokemon" class="pokeball-img" />
  </button>
  <PokemonModalRemove :isVisible="showModal" :close-modal="closeModal" :pokemon-id="id" />
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

.pokeball-button--disabled {
  opacity: 0.5;
}
</style>
