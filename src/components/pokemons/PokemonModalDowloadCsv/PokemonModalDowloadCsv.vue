<script setup lang="ts">
import AppModal from '@/components/app/AppModal/AppModal.vue'
import AppButton from '@/components/app/AppButton/AppButton.vue'
import { usePokemonsStore } from '@/stores/pokemons/usePokemonsStore'
import useExportCSV from '@/composables/useExportCSV/useExportCSV'

interface Props {
  isVisible: boolean
  closeModal: () => void
  numberOfPokemons: number
}

const props = defineProps<Props>()

const pokemonsStore = usePokemonsStore()

const { downloadCSV } = useExportCSV()

function downloadPokemonCSV() {
  downloadCSV(pokemonsStore.state.pokemonsCaught, 'pokemons.csv')
  props.closeModal()
}
</script>

<template>
  <AppModal class="app-modal" :isVisible="isVisible" @close="closeModal">
    <template #header>
      <h2>Are you sure?</h2>
    </template>
    <template #body>
      <p>
        You will download data regarding
        <span class="pokemon-modal-remove__name"
          ><b>{{ numberOfPokemons }}</b></span
        >
        pokemons
      </p>
    </template>
    <template #bottom>
      <AppButton text="Cancel" :action="closeModal" />
      <AppButton text="Confirm" :action="downloadPokemonCSV" />
    </template>
  </AppModal>
</template>

<style scoped lang="scss">
.pokemon-modal-remove__name {
  text-transform: capitalize;
}

p {
  text-align: left;
}

.app-modal {
  z-index: 1001;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
