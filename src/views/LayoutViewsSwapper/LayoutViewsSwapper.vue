<script setup lang="ts">
import PokemonsList from '@/components/pokemons/PokemonsList/PokemonsList.vue'
import PokemonsTable from '@/components/pokemons/PokemonsTable/PokemonsTable.vue'
import LayoutType from '@/shared/layouts/layouts'
import { computed } from 'vue'

interface Props {
  layoutType?: LayoutType
}

const props = defineProps<Props>()

const computedView = computed(() => {
  switch (props.layoutType) {
    case LayoutType.CARD:
      return PokemonsList
    default:
      return PokemonsTable
  }
})
</script>
<template>
  <component :is="computedView" />
</template>
