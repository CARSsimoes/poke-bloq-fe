<script setup lang="ts">
import { usePokemonsStore } from '@/stores/pokemons/usePokemonsStore'

const pokemonsStore = usePokemonsStore()
</script>

<template>
  <div v-if="pokemonsStore.selectedSize > 0" class="pokemons-selection">
    <p>Selected: {{ pokemonsStore.selectedSize }}</p>
    <button @click="pokemonsStore.clearPokemonsSelection()">Cancel</button>
    <button @click="pokemonsStore.removeAllPokemonsSelected()">Remove</button>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as vars;

.pokemons-selection {
  position: fixed;
  bottom: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: vars.$white;
  padding: 0.625rem 1.25rem;
  border: 0.0625rem solid vars.$gray;
  box-shadow: 0 0.25rem 0.5rem vars.$box-shadow;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.pokemons-selection button {
  padding: 0.3125rem 0.625rem;
  background-color: vars.$secondary-color;
  color: vars.$white;
  border: none;
  cursor: pointer;
}
</style>
