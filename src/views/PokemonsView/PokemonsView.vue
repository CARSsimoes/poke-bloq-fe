<script setup lang="ts">
import PokemonsList from '@/components/pokemons/PokemonsList/PokemonsList.vue'
import { usePokemonsStore } from '@/stores/pokemons/usePokemonsStore'
import { onMounted } from 'vue'

const pokemonsStore = usePokemonsStore()

onMounted(() => {
  pokemonsStore.loadPokemons()
})
</script>

<template>
  <div>
    <h1 class="pokemons-view__title">Pokémons List</h1>
    <PokemonsList />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as vars;

.pokemons-view__title {
  color: vars.$white;
}
</style>
