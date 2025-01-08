<script setup lang="ts">
import { usePokemonsStore } from '@/stores/pokemons/usePokemonsStore'
import { onMounted } from 'vue'

const pokemonsStore = usePokemonsStore()

onMounted(() => {
  pokemonsStore.loadPokemons()
})
</script>

<template>
  <div>
    <h1>Pokémon List</h1>
    <ul>
      <li v-for="pokemon in pokemonsStore.state.pokemons" :key="pokemon.id">
        <p>{{ pokemon.name }}</p>
        <img :src="pokemon.image" :alt="pokemon.name" />
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
