import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePokemonsStore } from '@/stores/pokemons/usePokemonsStore'

export const usePokemonsByRoute = () => {
  const route = useRoute()
  const pokemonsStore = usePokemonsStore()

  const pokemons = computed(() => {
    if (route.path === '/') {
      return pokemonsStore.state.pokemons
    }
    if (route.path === '/my-pokemons') {
      return pokemonsStore.computedPokemonsCaught
    }
    return []
  })

  return {
    pokemons,
  }
}
