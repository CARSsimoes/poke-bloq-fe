<script setup lang="ts">
import { usePokemonsStore } from '@/stores/pokemons/usePokemonsStore'
import LayoutViewsSwapper from '../LayoutViewsSwapper/LayoutViewsSwapper.vue'
import LayoutType from '@/shared/layouts/layouts'
import PokemonsSelection from '@/components/pokemons/PokemonsSelection/PokemonsSelection.vue'
import AppButton from '@/components/app/AppButton/AppButton.vue'
import AppNoData from '@/components/app/AppNoData/AppNoData.vue'
import { ref } from 'vue'
import PokemonModalDowloadCsv from '@/components/pokemons/PokemonModalDowloadCsv/PokemonModalDowloadCsv.vue'

interface Props {
  activeLayout: LayoutType
}

defineProps<Props>()

const pokemonsStore = usePokemonsStore()
const showModal = ref<boolean>(false)

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
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
    <AppButton text="Download" :action="openModal" :disabled="pokemonsStore.hasPokemonsCaught" />
  </div>
  <AppNoData v-if="pokemonsStore.state.pokemonsCaught.length === 0" />
  <LayoutViewsSwapper v-else :layoutType="activeLayout" />
  <PokemonsSelection />
  <PokemonModalDowloadCsv
    v-if="showModal"
    :isVisible="showModal"
    :close-modal="closeModal"
    :number-of-pokemons="pokemonsStore.totalNumberOfPokemonsCaught"
  />
</template>

<style scoped lang="scss">
.my-pokemons-view__details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
