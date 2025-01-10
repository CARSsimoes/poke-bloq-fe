<script setup lang="ts">
import AppToggle from '@/components/app/AppToggle/AppToggle.vue'
import { usePokemonsStore } from '@/stores/pokemons/usePokemonsStore'
import { computed, onMounted, ref } from 'vue'
import LayoutViewsSwapper from '../LayoutViewsSwapper/LayoutViewsSwapper.vue'
import LayoutType from '@/shared/layouts/layouts'

const pokemonsStore = usePokemonsStore()

const isCardView = ref<boolean>(false)

const toggleViewMode = () => {
  isCardView.value = !isCardView.value
}

const activeLayout = computed(() => (isCardView.value ? LayoutType.CARD : LayoutType.TABLE))

onMounted(() => {
  pokemonsStore.loadPokemons()
})
</script>

<template>
  <div>
    <header>
      <div>
        <h1 class="pokemons-view__title">Pokedéx</h1>
      </div>
      <AppToggle
        class="pokemons-view__toggle-button"
        :option1="LayoutType.CARD"
        :option2="LayoutType.TABLE"
        :toggleMethod="toggleViewMode"
      />
    </header>
    <LayoutViewsSwapper :layoutType="activeLayout" />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as vars;

header {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 2rem;
  @media (min-width: 720px) {
    flex-direction: row;
  }
}

.pokemons-view__title {
  color: vars.$white;
  font-size: 2rem;
}

.pokemons-view__toggle-button {
  width: 8rem;
}
</style>
