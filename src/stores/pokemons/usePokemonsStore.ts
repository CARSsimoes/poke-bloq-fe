import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import pokemonsService from '@/services/pokemons/pokemonsService'
import type { IPokemon, IPokemonDetail, IPokemonTypes } from '@/shared/types/pokemon'
import type { PokemonDetailsData } from '@/shared/types/api'
import { LIMIT_NUMBER_OF_POKEMONS } from '@/shared/constants/variables'
import { formatDateToDMY } from '@/shared/helpers/formatDate'
import LayoutType from '@/shared/layouts/layouts'

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

  const isCardView = ref<boolean>(false)

  const toggleViewMode = () => {
    isCardView.value = !isCardView.value
  }

  const activeLayout = computed(() => (isCardView.value ? LayoutType.CARD : LayoutType.TABLE))

  const mapPokemonDetails = (details: PokemonDetailsData): IPokemonDetail => {
    return {
      name: details.name,
      id: details.id,
      height: details.height,
      weight: details.weight,
      hp: details.stats[0].base_stat,
      attack: details.stats[1].base_stat,
      defense: details.stats[2].base_stat,
      specialAttack: details.stats[3].base_stat,
      specialDefense: details.stats[4].base_stat,
      speed: details.stats[5].base_stat,
      types: details.types,
      image: details.sprites.front_default,
      caught: false,
      timestamp: '',
    }
  }

  const fetchPokemonDetails = async (pokemon: IPokemon): Promise<IPokemonDetail> => {
    const { data: details } = await pokemonsService.getPokemonDetails(pokemon.url)
    return mapPokemonDetails(details)
  }

  const loadPokemons = async (limit = LIMIT_NUMBER_OF_POKEMONS, offset = 0): Promise<void> => {
    try {
      if (state.pokemons.length === 0) {
        state.isLoading = true
        const { data } = await pokemonsService.getPokemons(limit, offset)
        const pokes = await Promise.all(data.results.map(fetchPokemonDetails))
        state.pokemons = pokes
      }
    } catch (e) {
      // use monitoring tools like Posthog or Sentry
      console.log('error', e)
    } finally {
      state.isLoading = false
    }
  }

  const catchPokemonById = (id: number) => {
    const pokemon = state.pokemons.find((poke) => poke.id === id)
    if (pokemon) {
      pokemon.caught = !pokemon.caught
    }
    if (pokemon?.timestamp === '') {
      pokemon.timestamp = formatDateToDMY()
    }
  }

  const getTypeListById = (id: number): IPokemonTypes[] => {
    const pokemon = state.pokemons.find((poke) => poke.id === id)
    return pokemon?.types || []
  }

  const pokemonsCaught = () => state.pokemons.filter((pokemon) => pokemon.caught)

  return {
    state,
    loadPokemons,
    catchPokemonById,
    getTypeListById,
    pokemonsCaught,
    activeLayout,
    toggleViewMode,
  }
})
