<script setup lang="ts">
import AppModal from '@/components/app/AppModal/AppModal.vue'
import AppButton from '@/components/app/AppButton/AppButton.vue'
import { usePokemonsStore } from '@/stores/pokemons/usePokemonsStore'

interface Props {
  isVisible: boolean
  closeModal: () => void
  pokemonId: number
}

const props = defineProps<Props>()

const pokemonsStore = usePokemonsStore()

const removePokemon = () => {
  pokemonsStore.removePokemon(props.pokemonId)
  props.closeModal()
}
</script>

<template>
  <AppModal :isVisible="isVisible" @close="closeModal">
    <template #header>
      <h2>Are you sure?</h2>
    </template>
    <template #body>
      <p>
        <span class="pokemon-modal-remove__name"
          ><b>{{ pokemonsStore.searchPokemonNameById(pokemonId) }}</b></span
        >
        will return to the wild 😞
      </p>
    </template>
    <template #bottom>
      <AppButton text="Cancel" :action="closeModal" />
      <AppButton text="Confirm" :action="removePokemon" />
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
</style>
