import { computed, type ComputedRef } from 'vue'
import { useRoute } from 'vue-router'
import { usePokemonsStore } from '@/stores/pokemons/usePokemonsStore'
import type { IPokemonDetail } from '@/shared/types/pokemon'

export const usePokemonsByRoute = () => {
  const route = useRoute()
  const pokemonsStore = usePokemonsStore()

  const pokemons: ComputedRef<IPokemonDetail[]> = computed(() => {
    if (route.path === '/') {
      return pokemonsStore.state.pokemons
    }
    if (route.path === '/my-pokemons') {
      return pokemonsStore.state.pokemonsCaught
    }
    return []
  })

  return {
    pokemons,
  }
}
