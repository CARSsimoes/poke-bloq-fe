import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import pokemonsService from '@/services/pokemons/pokemonsService'
import type { IPokemonDetail, IPokemonTypes } from '@/shared/types/pokemon'
import type { PokemonDetailsData } from '@/shared/types/api'
import { LIMIT_NUMBER_OF_POKEMONS } from '@/shared/constants/variables'
import { formatDateToDMY } from '@/shared/helpers/formatDate'

interface State {
  pokemons: IPokemonDetail[]
  isInitialLoading: boolean
  isLoading: boolean
  error: boolean
  totalNumberOfPokemons: number
  pokemonsCaught: IPokemonDetail[]
  pokemonsSelected: Set<number>
}
export const usePokemonsStore = defineStore('pokemons', () => {
  const state = reactive<State>({
    pokemons: [],
    isInitialLoading: false,
    isLoading: false,
    error: false,
    totalNumberOfPokemons: 0,
    pokemonsCaught: [],
    pokemonsSelected: new Set(),
  })

  const hasPokemonsCaught = computed(() => state.pokemonsCaught.length === 0)

  const totalNumberOfPokemonsCaught = computed(() => state.pokemonsCaught.length)

  const mapPokemonDetails = (details: PokemonDetailsData): IPokemonDetail => {
    return {
      name: details.name,
      id: details.id,
      height: details.height,
      weight: details.weight,
      hp: details.stats[0]?.base_stat,
      attack: details.stats[1]?.base_stat,
      defense: details.stats[2]?.base_stat,
      specialAttack: details.stats[3]?.base_stat,
      specialDefense: details.stats[4]?.base_stat,
      speed: details.stats[5]?.base_stat,
      types: details.types,
      image: details.sprites.front_default,
      caught: false,
      timestamp: '',
    }
  }

  const fetchPokemonDetails = async (pokemonName: string): Promise<IPokemonDetail> => {
    try {
      const { data: details } = await pokemonsService.getPokemonDetails(pokemonName)
      return mapPokemonDetails(details)
    } catch (e) {
      // use monitoring tools like Posthog or Sentry
      console.log('Failed to fetch Pokémon:', e)
      return {} as IPokemonDetail
    }
  }

  const loadPokemons = async (
    limit = LIMIT_NUMBER_OF_POKEMONS,
    offset = state.pokemons.length,
  ): Promise<void> => {
    try {
      if (state.pokemons.length === 0) {
        state.isInitialLoading = true
      }
      state.isLoading = true

      const container = document.documentElement || document.body
      const previousScrollPosition = container.scrollTop

      const { data } = await pokemonsService.getPokemons(limit, offset)
      state.totalNumberOfPokemons = data.count
      const pokes = await Promise.all(data.results.map((poke) => fetchPokemonDetails(poke.name)))

      state.pokemons = [...state.pokemons, ...pokes]

      container.scrollTop = previousScrollPosition
    } catch (e) {
      state.error = true
      // use monitoring tools like Posthog or Sentry
      console.log('Failed to load Pokémons:', e)
    } finally {
      state.isLoading = false
      state.isInitialLoading = false
    }
  }

  const catchPokemonById = (id: number) => {
    const pokemon = state.pokemons.find((poke) => poke.id === id)

    if (pokemon) {
      pokemon.caught = !pokemon.caught

      if (pokemon.caught) {
        state.pokemonsCaught.push(pokemon)

        if (!pokemon.timestamp) pokemon.timestamp = formatDateToDMY()
      } else {
        state.pokemonsCaught = state.pokemonsCaught.filter(
          (caughtPokemon) => caughtPokemon.id !== pokemon.id,
        )
      }
    }
  }

  const getTypeListById = (id: number): IPokemonTypes[] => {
    const pokemon = state.pokemons.find((poke) => poke.id === id)
    return pokemon ? pokemon.types : []
  }

  const selectPokemon = (pokemonId: number) => {
    if (state.pokemonsSelected.has(pokemonId)) {
      state.pokemonsSelected.delete(pokemonId)
    } else {
      state.pokemonsSelected.add(pokemonId)
    }
  }

  const selectedSize = computed(() => state.pokemonsSelected.size)

  const clearPokemonsSelection = () => state.pokemonsSelected.clear()

  const removeAllPokemonsSelected = (): void => {
    state.pokemonsCaught = state.pokemonsCaught.filter(
      (pokemon) => !state.pokemonsSelected.has(pokemon.id),
    )

    state.pokemons.forEach((pokemon) => {
      if (state.pokemonsSelected.has(pokemon.id)) {
        pokemon.caught = false
      }
    })

    clearPokemonsSelection()
  }

  const hasPokemonsSelected = computed(() => state.pokemonsSelected.size > 0)

  const removePokemon = (id: number): void => {
    state.pokemonsCaught = state.pokemonsCaught.filter((pokemon) => pokemon.id !== id)

    const pokemon = state.pokemons.find((poke) => poke.id === id)
    if (pokemon) {
      pokemon.caught = false
    }
  }

  const searchPokemonNameById = (id: number): string | undefined => {
    const pokemon = state.pokemonsCaught.find((poke) => poke.id === id)
    return pokemon?.name
  }

  return {
    state,
    loadPokemons,
    catchPokemonById,
    getTypeListById,
    hasPokemonsCaught,
    totalNumberOfPokemonsCaught,
    mapPokemonDetails,
    fetchPokemonDetails,
    selectPokemon,
    selectedSize,
    clearPokemonsSelection,
    removeAllPokemonsSelected,
    hasPokemonsSelected,
    removePokemon,
    searchPokemonNameById,
  }
})
