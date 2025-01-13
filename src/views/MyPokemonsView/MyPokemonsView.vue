<script setup lang="ts">
import { usePokemonsStore } from '@/stores/pokemons/usePokemonsStore'
import LayoutViewsSwapper from '../LayoutViewsSwapper/LayoutViewsSwapper.vue'
import LayoutType from '@/shared/layouts/layouts'
import PokemonsSelection from '@/components/pokemons/PokemonsSelection/PokemonsSelection.vue'
import AppButton from '@/components/app/AppButton/AppButton.vue'

interface Props {
  activeLayout: LayoutType
}

defineProps<Props>()

const pokemonsStore = usePokemonsStore()

function downloadPokemonCSV() {
  // downloadCSV(pokemonsStore.state.pokemonsCaught, 'pokemons.csv')
  console.log('download')
}
</script>

<template>
  <div class="my-pokemons-view__details">
    <p>
      Caught:
      {{
        `${pokemonsStore.totalNumberOfPokemonsCaught} / ${pokemonsStore.state.totalNumberOfPokemons}`
      }}
    </p>
    <AppButton
      text="Download"
      :action="downloadPokemonCSV"
      :disabled="pokemonsStore.hasPokemonsCaught"
    />
  </div>
  <LayoutViewsSwapper :layoutType="activeLayout" />

  <PokemonsSelection />
</template>

<style scoped lang="scss">
.my-pokemons-view__details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
