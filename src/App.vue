<script setup lang="ts">
import AppToggle from '@/components/app/AppToggle/AppToggle.vue'
import LayoutType from '@/shared/layouts/layouts'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePokemonsStore } from '@/stores/pokemons/usePokemonsStore'
import Routes from './shared/types/routes'

const route = useRoute()
const pokemonsStore = usePokemonsStore()

const isCardView = ref<boolean>(false)
const toggleViewMode = () => {
  isCardView.value = !isCardView.value
}

const activeLayout = computed(() => (isCardView.value ? LayoutType.TABLE : LayoutType.CARD))

watch(
  () => route.path,
  (newPath) => {
    if (newPath !== Routes.MY_POKEMONS) {
      pokemonsStore.clearPokemonsSelection()
    }
  },
)
</script>

<template>
  <div class="app__nav-container">
    <nav>
      <router-link
        :to="Routes.HOME"
        :class="{ 'app__page-title--selected': $route.path === Routes.HOME }"
        >Pokedéx</router-link
      >
      <router-link
        :to="Routes.MY_POKEMONS"
        :class="{ 'app__page-title--selected': $route.path === Routes.MY_POKEMONS }"
        >My Pokemons</router-link
      >
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

.app__page-title--selected {
  color: vars.$dark;
}
</style>
