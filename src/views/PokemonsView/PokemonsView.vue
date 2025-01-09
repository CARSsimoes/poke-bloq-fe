<script setup lang="ts">
import AppToggle from '@/components/app/AppToggle/AppToggle.vue'
import PokemonsList from '@/components/pokemons/PokemonsList/PokemonsList.vue'
import { usePokemonsStore } from '@/stores/pokemons/usePokemonsStore'
import { onMounted, ref } from 'vue'

const pokemonsStore = usePokemonsStore()

const isCardView = ref<boolean>(true)

const toggleViewMode = () => {
  isCardView.value = !isCardView.value
}

onMounted(() => {
  pokemonsStore.loadPokemons()
})
</script>

<template>
  <div>
    <header>
      <div>
        <h1 class="pokemons-view__title">Pokémons List</h1>
      </div>
      <AppToggle
        class="pokemons-view__toggle-button"
        :option1="'Table'"
        :option2="'Card'"
        :toggleMethod="toggleViewMode"
      />
    </header>
    <template v-if="isCardView">
      <PokemonsList />
    </template>
    <template v-else>
      <p></p>
    </template>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as vars;

header {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  @media (min-width: 720px) {
    flex-direction: row;
  }
}

.pokemons-view__title {
  color: vars.$white;
}

.pokemons-view__toggle-button {
  width: 15%;
}
</style>
