<script setup lang="ts">
import AppToggle from '@/components/app/AppToggle/AppToggle.vue'
import LayoutType from '@/shared/layouts/layouts'
import { usePokemonsStore } from './stores/pokemons/usePokemonsStore'

const { toggleViewMode } = usePokemonsStore()
</script>

<template>
  <div class="app__nav-container">
    <nav>
      <router-link to="/">Pokedéx</router-link>
      <router-link to="/my-pokemons">My Pokemons</router-link>
    </nav>
    <AppToggle
      class="app__toggle-button"
      :option1="LayoutType.CARD"
      :option2="LayoutType.TABLE"
      :toggleMethod="toggleViewMode"
    />
  </div>

  <router-view />
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as vars;

.app__nav-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

nav {
  display: flex;
  gap: 2rem;
  color: vars.$white;
  font-size: 2rem;
  text-decoration: none;
}

.app__toggle-button {
  width: 8rem;
}
</style>
