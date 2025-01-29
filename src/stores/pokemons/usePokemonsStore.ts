import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import pokemonsService from '@/services/pokemons/pokemonsService'
import type { IPokemonDetail, IPokemonTypes } from '@/shared/types/pokemon'
import type { PokemonDetailsData } from '@/shared/types/api'
import { LIMIT_NUMBER_OF_POKEMONS } from '@/shared/constants/variables'
import { formatDateToDMY } from '@/shared/helpers/formatDate'
import type { IFilters } from '@/shared/types/filters'
import axios from 'axios'

interface State {
  pokemons: IPokemonDetail[] | null
  isInitialLoading: boolean
  isLoading: boolean
  error: boolean
  totalNumberOfPokemons: number
  pokemonsCaught: IPokemonDetail[]
  pokemonsCaughtOriginal: IPokemonDetail[]
  pokemonsSelected: Set<number>
}
export const usePokemonsStore = defineStore(
  'pokemons',
  () => {
    const state = reactive<State>({
      pokemons: [],
      isInitialLoading: false,
      isLoading: false,
      error: false,
      totalNumberOfPokemons: 0,
      pokemonsCaught: [],
      pokemonsCaughtOriginal: [],
      pokemonsSelected: new Set(),
    })

    const noPokemonsCaught = computed(() => state.pokemonsCaught.length === 0)

    const totalNumberOfPokemonsCaught = computed(() => state.pokemonsCaughtOriginal.length)

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

    const fetchPokemonDetails = async (pokemonName: string): Promise<IPokemonDetail | null> => {
      try {
        const { data: details } = await pokemonsService.getPokemonDetails(pokemonName)
        return mapPokemonDetails(details)
      } catch (e) {
        // use monitoring tools like Posthog or Sentry
        if (axios.isAxiosError(e) && e.response?.status === 404) {
          console.warn(`Pokemon ${pokemonName} not found, skipping...`)
        } else {
          console.error(`Failed to fetch Pokemon ${pokemonName}:`, e)
        }
        return null
      }
    }

    const loadPokemons = async (
      limit = LIMIT_NUMBER_OF_POKEMONS,
      offset = state.pokemons?.length || 0,
    ): Promise<void> => {
      try {
        if (state.pokemons?.length === 0) {
          state.isInitialLoading = true
        }
        state.isLoading = true

        const container = document.documentElement || document.body
        const previousScrollPosition = container.scrollTop

        const { data } = await pokemonsService.getPokemons(limit, offset)
        state.totalNumberOfPokemons = data.count

        const pokemonDetails = await Promise.all(
          data.results.map((poke) => fetchPokemonDetails(poke.name)),
        )

        const validPokemons = pokemonDetails.filter((p): p is IPokemonDetail => p !== null)
        state.pokemons = [...(state.pokemons ?? []), ...validPokemons]

        container.scrollTop = previousScrollPosition
      } catch (e) {
        state.error = true
        // use monitoring tools like Posthog or Sentry
        console.error('Failed to load Pokemons:', e)
      } finally {
        state.isLoading = false
        state.isInitialLoading = false
      }
    }

    const catchPokemonById = (id: number) => {
      const pokemon = state.pokemons?.find((poke) => poke.id === id)

      if (pokemon) {
        pokemon.caught = !pokemon.caught

        if (pokemon.caught) {
          state.pokemonsCaught.push(pokemon)

          if (!pokemon.timestamp) pokemon.timestamp = formatDateToDMY()

          state.pokemonsCaughtOriginal = [...state.pokemonsCaught]
        } else {
          state.pokemonsCaught = state.pokemonsCaught.filter(
            (caughtPokemon) => caughtPokemon.id !== pokemon.id,
          )

          state.pokemonsCaughtOriginal = [...state.pokemonsCaught]
        }
      }
    }

    const getTypeListById = (id: number): IPokemonTypes[] => {
      const pokemon = state.pokemons?.find((poke) => poke.id === id)
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

      state.pokemons?.forEach((pokemon) => {
        if (state.pokemonsSelected.has(pokemon.id)) {
          pokemon.caught = false
        }
      })

      state.pokemonsCaughtOriginal = [...state.pokemonsCaught]

      clearPokemonsSelection()
    }

    const hasPokemonsSelected = computed(() => state.pokemonsSelected.size > 0)

    const removePokemon = (id: number): void => {
      state.pokemonsCaught = state.pokemonsCaught.filter((pokemon) => pokemon.id !== id)
      state.pokemonsCaughtOriginal = [...state.pokemonsCaught]

      const pokemon = state.pokemons?.find((poke) => poke.id === id)
      if (pokemon) {
        pokemon.caught = false
      }
    }

    const searchPokemonNameById = (id: number): string | undefined => {
      const pokemon = state.pokemonsCaught.find((poke) => poke.id === id)
      return pokemon?.name
    }

    const resetPokemonsCaught = () => {
      state.pokemonsCaught = [...state.pokemonsCaughtOriginal]
    }

    const filterAndSortPokemons = (filters: IFilters) => {
      state.pokemonsCaught = state.pokemonsCaught
        .filter((pokemon) => {
          const matchesName = pokemon.name.toLowerCase().includes(filters.name.toLowerCase())
          const matchesHeight = pokemon.height >= filters.minHeight
          const matchesType = filters.type
            ? pokemon.types.some((type) => type.type.name === filters.type)
            : true
          return matchesName && matchesHeight && matchesType
        })
        .sort((a, b) => {
          if (filters.sortBy === 'name') {
            return a.name.localeCompare(b.name)
          } else if (filters.sortBy === 'height') {
            return a.height - b.height
          } else if (filters.sortBy === 'timestamp') {
            const dateA = new Date(a.timestamp)
            const dateB = new Date(b.timestamp)
            return dateA.getMilliseconds() - dateB.getMilliseconds()
          }
          return 0
        })
    }

    return {
      state,
      loadPokemons,
      catchPokemonById,
      getTypeListById,
      noPokemonsCaught,
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
      filterAndSortPokemons,
      resetPokemonsCaught,
    }
  },
  {
    persist: {
      storage: localStorage,
      pick: [
        'state.pokemons',
        'state.pokemonsCaught',
        'state.pokemonsCaughtOriginal',
        'state.totalNumberOfPokemons',
      ],
    },
  },
)
