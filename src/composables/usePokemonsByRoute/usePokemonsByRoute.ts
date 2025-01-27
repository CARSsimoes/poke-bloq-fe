import { computed, type ComputedRef } from 'vue'
import { useRoute } from 'vue-router'
import { usePokemonsStore } from '@/stores/pokemons/usePokemonsStore'
import type { IPokemonDetail } from '@/shared/types/pokemon'
import Routes from '@/shared/types/routes'

export const usePokemonsByRoute = () => {
  const route = useRoute()
  const pokemonsStore = usePokemonsStore()

  const pokemons: ComputedRef<IPokemonDetail[] | null> = computed(() => {
    if (route.path === Routes.HOME) {
      return pokemonsStore.state.pokemons
    }
    if (route.path === Routes.MY_POKEMONS) {
      return pokemonsStore.state.pokemonsCaught
    }
    return []
  })

  return {
    pokemons,
  }
}
