<script setup lang="ts">
import { usePokemonsStore } from '@/stores/pokemons/usePokemonsStore'

const { pokemonsCaught } = usePokemonsStore()
</script>

<template>
  <p>{{ pokemonsCaught() }}</p>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as vars;
</style>
