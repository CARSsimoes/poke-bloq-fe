import { reactive } from 'vue'
import { defineStore } from 'pinia'
import pokemonsService from '@/services/pokemons/pokemonsService'
import type { IPokemon, IPokemonDetail } from '@/shared/types/pokemon'
import type { PokemonDetailsData } from '@/shared/types/api'
import { LIMIT_NUMBER_OF_POKEMONS } from '@/shared/constants/variables'

interface State {
  pokemons: IPokemonDetail[]
  isLoading: boolean
  error: string | null
}
export const usePokemonsStore = defineStore('pokemons', () => {
  const state = reactive<State>({
    pokemons: [],
    isLoading: false,
    error: null,
  })

  const mapPokemonDetails = (details: PokemonDetailsData): IPokemonDetail => {
    return {
      name: details.name,
      id: details.id,
      height: details.height,
      weight: details.weight,
      hp: details.hp,
      speed: details.speed,
      attack: details.attack,
      defense: details.defense,
      specialAttack: details.specialAttack,
      specialDefense: details.specialDefense,
      types: details.types,
      image: details.sprites.front_default,
      caught: details.caught || false,
    }
  }

  const fetchPokemonDetails = async (pokemon: IPokemon): Promise<IPokemonDetail> => {
    const { data: details } = await pokemonsService.getPokemonDetails(pokemon.url)
    return mapPokemonDetails(details)
  }

  const loadPokemons = async (limit = LIMIT_NUMBER_OF_POKEMONS, offset = 0): Promise<void> => {
    try {
      state.isLoading = true
      const { data } = await pokemonsService.getPokemons(limit, offset)
      const pokes = await Promise.all(data.results.map(fetchPokemonDetails))
      state.pokemons = pokes
    } catch (e) {
      // use monitoring tools like Posthog or Sentry
      console.log('error', e)
    } finally {
      state.isLoading = false
    }
  }

  return {
    state,
    loadPokemons,
  }
})
