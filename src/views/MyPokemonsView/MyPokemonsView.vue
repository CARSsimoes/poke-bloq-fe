<script setup lang="ts">
import { usePokemonsStore } from '@/stores/pokemons/usePokemonsStore'
import LayoutViewsSwapper from '../LayoutViewsSwapper/LayoutViewsSwapper.vue'
import LayoutType from '@/shared/layouts/layouts'
import PokemonsSelection from '@/components/pokemons/PokemonsSelection/PokemonsSelection.vue'
import AppButton from '@/components/app/AppButton/AppButton.vue'
import AppNoData from '@/components/app/AppNoData/AppNoData.vue'
import { ref, watch } from 'vue'
import PokemonModalDowloadCsv from '@/components/pokemons/PokemonModalDowloadCsv/PokemonModalDowloadCsv.vue'

interface Props {
  activeLayout: LayoutType
}

defineProps<Props>()

const filters = ref({
  name: '',
  minHeight: 0,
  maxHeight: 9999,
  type: '',
  sortBy: 'name',
})

const pokemonsStore = usePokemonsStore()
const showModal = ref<boolean>(false)

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const applyFilters = () => {
  if (!filters.value.name && !filters.value.sortBy) {
    pokemonsStore.resetPokemonsCaught()
  } else {
    pokemonsStore.filterAndSortPokemons(filters.value)
  }
}

const resetFilters = () => {
  filters.value = { name: '', minHeight: 0, maxHeight: 9999, type: '', sortBy: 'name' }
  pokemonsStore.resetPokemonsCaught()
}

watch(
  filters,
  () => {
    applyFilters()
  },
  { deep: true },
)
</script>

<template>
  <div class="my-pokemons-view__details">
    <p>
      Caught:
      {{
        `${pokemonsStore.totalNumberOfPokemonsCaught} / ${pokemonsStore.state.totalNumberOfPokemons}`
      }}
    </p>
    <AppButton text="Download" :action="openModal" :disabled="pokemonsStore.noPokemonsCaught" />
  </div>
  <AppNoData v-if="pokemonsStore.state.pokemonsCaughtOriginal.length === 0" />
  <template v-else>
    <div class="my-pokemons__filters">
      <input type="text" v-model="filters.name" placeholder="Search by name" />

      <select v-model="filters.sortBy">
        <option value="name">Name</option>
        <option value="height">Height</option>
        <option value="timestamp">Timestamp</option>
      </select>

      <AppButton text="Reset" :action="resetFilters" />
    </div>
    <LayoutViewsSwapper :layoutType="activeLayout" />
    <PokemonsSelection v-if="pokemonsStore.hasPokemonsSelected" />
    <PokemonModalDowloadCsv
      v-if="showModal"
      :isVisible="showModal"
      :close-modal="closeModal"
      :number-of-pokemons="pokemonsStore.totalNumberOfPokemonsCaught"
    />
  </template>
</template>

<style scoped lang="scss">
.my-pokemons-view__details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.my-pokemons__filters {
  display: flex;
}
</style>
