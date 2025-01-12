<script setup lang="ts">
import AppToggle from '@/components/app/AppToggle/AppToggle.vue'
import LayoutType from '@/shared/layouts/layouts'
import { computed, ref } from 'vue'

const isCardView = ref<boolean>(false)
const toggleViewMode = () => {
  isCardView.value = !isCardView.value
}

const activeLayout = computed(() => (isCardView.value ? LayoutType.CARD : LayoutType.TABLE))
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

  <router-view :activeLayout="activeLayout" />
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as vars;

.app__nav-container {
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  margin-bottom: 2rem;
  @media (min-width: 720px) {
    flex-direction: row;
  }
}

nav {
  display: flex;
  gap: 2rem;
  font-size: 2rem;
  a {
    color: vars.$white;
    text-decoration: none;
  }
}

.app__toggle-button {
  width: 8rem;
}
</style>
