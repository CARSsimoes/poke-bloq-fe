<script setup lang="ts">
import { usePokemonsStore } from '@/stores/pokemons/usePokemonsStore'
import LayoutViewsSwapper from '../LayoutViewsSwapper/LayoutViewsSwapper.vue'
import LayoutType from '@/shared/layouts/layouts'
import PokemonsSelection from '@/components/pokemons/PokemonsSelection/PokemonsSelection.vue'
import AppButton from '@/components/app/AppButton/AppButton.vue'
import AppNoData from '@/components/app/AppNoData/AppNoData.vue'
import { ref, watch } from 'vue'
import PokemonModalDowloadCsv from '@/components/pokemons/PokemonModalDowloadCsv/PokemonModalDowloadCsv.vue'
import type { IFilters } from '@/shared/types/filters'

interface Props {
  activeLayout: LayoutType
}

defineProps<Props>()

const filters = ref<IFilters>({
  name: '',
  minHeight: 0,
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
  filters.value = { name: '', minHeight: 0, type: '', sortBy: 'name' }
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

      <input type="number" v-model="filters.minHeight" placeholder="Min height" />

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
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (min-width: 720px) {
    flex-direction: row;
  }
}
</style>
