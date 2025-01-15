import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { createPinia } from 'pinia'
import { setActivePinia } from 'pinia'
import { usePokemonsStore } from '@/stores/pokemons/usePokemonsStore'
import {
  mockIPokemonDetail1,
  mockIPokemonDetail2,
  mockPokemon1WithStats,
  mockPokemonDetailsData1,
} from '@/mocks/pokemon'
import pokemonsService from '@/services/pokemons/pokemonsService'
import type { IPokemonTypes } from '@/shared/types/pokemon'

beforeEach(() => {
  setActivePinia(createPinia())
  vi.clearAllMocks()
  vi.spyOn(console, 'log').mockImplementation(() => {})
})

afterEach(() => {
  vi.restoreAllMocks()
})

vi.mock('@/services/pokemons/pokemonsService', () => ({
  default: {
    getPokemons: vi.fn(),
    getPokemonDetails: vi.fn(),
  },
}))

describe('usePokemonsStore ->', () => {
  let store: ReturnType<typeof usePokemonsStore>

  describe('computed ->', () => {
    beforeEach(() => {
      store = usePokemonsStore()
    })

    describe('selectedSize ->', () => {
      it('should return 0 when no Pokemon are selected', () => {
        expect(store.selectedSize).toBe(0)
      })

      it('should return the correct size when Pokemon are selected', () => {
        store.state.pokemonsSelected.add(1)
        store.state.pokemonsSelected.add(2)
        expect(store.selectedSize).toBe(2)
      })
    })

    describe('hasPokemonsSelected ->', () => {
      it('should return false when no Pokemon are selected', () => {
        expect(store.hasPokemonsSelected).toBe(false)
      })

      it('should return true when Pokemon are selected', () => {
        store.state.pokemonsSelected.add(1)
        expect(store.hasPokemonsSelected).toBe(true)
      })
    })
  })

  describe('methods ->', () => {
    beforeEach(() => {
      store = usePokemonsStore()
    })

    describe('mapPokemonDetails ->', () => {
      it('should map PokemonDetailsData to IPokemonDetail correctly', () => {
        const result = store.mapPokemonDetails(mockPokemonDetailsData1)

        expect(result).toEqual(mockIPokemonDetail1({ caught: false }))
      })
    })

    describe('fetchPokemonDetails ->', () => {
      it('with sucess - should fetch details and map them to IPokemonDetail with sucess', async () => {
        const mockPokemonName = 'pikachu'
        const pokemonsStore = usePokemonsStore()

        const mockedGetPokemonDetails = vi.mocked(pokemonsService.getPokemonDetails)

        mockedGetPokemonDetails.mockReturnValue(
          Promise.resolve({
            status: 200,
            statusText: 'ok',
            data: mockPokemonDetailsData1,
          }),
        )

        await pokemonsStore.fetchPokemonDetails(mockPokemonName)

        expect(pokemonsService.getPokemonDetails).toHaveBeenCalledWith(mockPokemonName)
      })

      it('with error - should not fetch details', async () => {
        const mockPokemonName = 'pikachu'
        const pokemonsStore = usePokemonsStore()

        pokemonsService.getPokemonDetails = vi.fn().mockImplementationOnce(() => Promise.reject())

        await pokemonsStore.fetchPokemonDetails(mockPokemonName)

        expect(pokemonsStore.state.pokemons).toHaveLength(0)
      })
    })
    describe('getTypeListById ->', () => {
      beforeEach(() => {
        store = usePokemonsStore()
      })

      it('should return an empty aray if there is no pokemon found', () => {
        const result: IPokemonTypes[] = store.getTypeListById(1)
        expect(result).toEqual([])
      })

      it('should return the types of the pokemon with the given id', () => {
        store.state.pokemons = [mockIPokemonDetail1({ caught: true }), mockIPokemonDetail2]
        const result: IPokemonTypes[] = store.getTypeListById(1)
        expect(result).toEqual([
          { slot: 1, type: { name: 'grass', url: 'fake_url_grass' } },
          { slot: 2, type: { name: 'poison', url: 'fake_url_poison' } },
        ])
      })
    })
    describe('catchPokemonById ->', () => {
      vi.mock('@/shared/helpers/formatDate', () => ({
        formatDateToDMY: vi.fn(() => '12/01/2025'),
      }))
      it('should catch a pokemon and add it to the caught list', () => {
        const pokemonsStore = usePokemonsStore()
        const mockPokemon = mockIPokemonDetail1({ caught: false })

        pokemonsStore.state.pokemons = [mockPokemon]
        expect(mockPokemon.caught).toBe(false)

        pokemonsStore.catchPokemonById(mockPokemon.id)

        expect(mockPokemon.caught).toBe(true)
        expect(mockPokemon.timestamp).toBe('12/01/2025')

        expect(store.totalNumberOfPokemonsCaught).toBe(1)
        expect(store.noPokemonsCaught).toBe(false)
      })

      it('should release a Pokemon and remove it from the caught list', () => {
        const pokemonsStore = usePokemonsStore()
        const mockPokemon = mockIPokemonDetail1({ caught: true })

        pokemonsStore.state.pokemons = [mockPokemon]
        pokemonsStore.state.pokemonsCaught = [mockPokemon]

        pokemonsStore.catchPokemonById(mockPokemon.id)

        expect(mockPokemon.caught).toBe(false)
        expect(pokemonsStore.state.pokemonsCaught).not.toContain(mockPokemon)
        expect(store.totalNumberOfPokemonsCaught).toBe(0)
        expect(store.noPokemonsCaught).toBe(true)
      })

      it('should not overwrite timestamp if it is already set', () => {
        const pokemonsStore = usePokemonsStore()
        const mockPokemon = mockIPokemonDetail1({ caught: false })
        mockPokemon.timestamp = '11/01/2025'

        pokemonsStore.state.pokemons = [mockPokemon]

        pokemonsStore.catchPokemonById(mockPokemon.id)

        expect(mockPokemon.caught).toBe(true)
        expect(mockPokemon.timestamp).toBe('11/01/2025')
      })
    })

    describe('loadPokemons ->', () => {
      it('should load Pokemons and set state correctly', async () => {
        const pokemonsStore = usePokemonsStore()

        pokemonsService.getPokemons = vi.fn().mockResolvedValue({
          data: {
            count: 1,
            results: [{ name: 'pikachu' }],
          },
        })

        pokemonsService.getPokemonDetails = vi
          .fn()
          .mockImplementation(() => Promise.resolve({ data: mockPokemon1WithStats }))

        await pokemonsStore.loadPokemons()

        expect(pokemonsStore.state.pokemons).toEqual([mockIPokemonDetail1({ caught: false })])
        expect(pokemonsStore.state.totalNumberOfPokemons).toBe(1)
        expect(pokemonsStore.state.isLoading).toBe(false)
        expect(pokemonsStore.state.isInitialLoading).toBe(false)
      })

      it('should load Pokemons with error', async () => {
        const pokemonsStore = usePokemonsStore()

        pokemonsService.getPokemons = vi.fn().mockImplementationOnce(() => Promise.reject())

        await pokemonsStore.loadPokemons()

        expect(pokemonsStore.state.pokemons).toEqual([])
        expect(pokemonsStore.state.totalNumberOfPokemons).toBe(0)
        expect(pokemonsStore.state.isLoading).toBe(false)
        expect(pokemonsStore.state.isInitialLoading).toBe(false)
        expect(pokemonsStore.state.error).toBe(true)
      })

      it('should handle no results returned correctly', async () => {
        const pokemonsStore = usePokemonsStore()

        pokemonsService.getPokemons = vi.fn().mockResolvedValue({
          data: {
            count: 0,
            results: [],
          },
        })

        pokemonsService.getPokemonDetails = vi.fn().mockResolvedValue({ data: {} })

        await pokemonsStore.loadPokemons()

        expect(pokemonsStore.state.pokemons).toEqual([])
        expect(pokemonsStore.state.totalNumberOfPokemons).toBe(0)
        expect(pokemonsStore.state.isLoading).toBe(false)
        expect(pokemonsStore.state.isInitialLoading).toBe(false)
      })

      it('should set loading states properly when loading pokemons', async () => {
        const pokemonsStore = usePokemonsStore()

        pokemonsStore.state.isLoading = true
        pokemonsStore.state.isInitialLoading = true

        pokemonsService.getPokemons = vi.fn().mockResolvedValue({
          data: {
            count: 1,
            results: [{ name: 'pikachu' }],
          },
        })

        pokemonsService.getPokemonDetails = vi
          .fn()
          .mockImplementation(() => Promise.resolve({ data: mockPokemon1WithStats }))

        await pokemonsStore.loadPokemons()

        expect(pokemonsStore.state.isLoading).toBe(false)
        expect(pokemonsStore.state.isInitialLoading).toBe(false)
      })
    })

    describe('selectPokemon ->', () => {
      it('should add a Pokemon ID to the selection if not already selected', () => {
        store.selectPokemon(1)
        expect(store.state.pokemonsSelected.has(1)).toBe(true)
      })

      it('should remove a Pokemon ID from the selection if already selected', () => {
        store.state.pokemonsSelected.add(1)
        store.selectPokemon(1)
        expect(store.state.pokemonsSelected.has(1)).toBe(false)
      })
    })

    describe('clearPokemonsSelection ->', () => {
      it('should clear the selected Pokemon set', () => {
        store.state.pokemonsSelected.add(1)
        store.state.pokemonsSelected.add(2)
        expect(store.selectedSize).toBe(2)

        store.clearPokemonsSelection()
        expect(store.selectedSize).toBe(0)
      })
    })

    describe('searchPokemonNameById ->', () => {
      it('should return the correct Pokemon name when the ID exists', () => {
        store.state.pokemonsCaught = [mockIPokemonDetail2]
        const result1 = store.searchPokemonNameById(1)
        expect(result1).toBe('bulbasaur')
        const result2 = store.searchPokemonNameById(2)
        expect(result2).toBeUndefined()
      })

      it('should return undefined when the pokemonsCaught array is empty', () => {
        store.state.pokemonsCaught = []

        const result = store.searchPokemonNameById(1)
        expect(result).toBeUndefined()
      })
    })

    describe('removePokemon ->', () => {
      it('should remove the Pokemon with the given ID from the pokemonsCaught array', () => {
        store.state.pokemonsCaught = [mockIPokemonDetail2]

        store.state.pokemons = [mockIPokemonDetail2]

        store.removePokemon(1)

        expect(store.state.pokemonsCaught).toEqual([])
      })

      it('should not modify the arrays if the ID does not exist', () => {
        store.state.pokemonsCaught = [mockIPokemonDetail2]

        store.state.pokemons = [mockIPokemonDetail2]

        store.removePokemon(3)

        expect(store.state.pokemonsCaught).toEqual([mockIPokemonDetail2])
        expect(store.state.pokemons).toEqual([mockIPokemonDetail2])
      })
    })

    describe('removeAllPokemonsSelected ->', () => {
      it('should remove Pokemon in the selected set from the pokemonsCaught array', () => {
        store.state.pokemonsCaught = [mockIPokemonDetail2]

        store.state.pokemons = [mockIPokemonDetail2]

        store.state.pokemonsSelected = new Set([1])

        store.removeAllPokemonsSelected()

        expect(store.state.pokemonsCaught).toEqual([])
      })

      it('should clear the pokemonsSelected set after removing Pokemon', () => {
        store.state.pokemonsCaught = [mockIPokemonDetail2]

        store.state.pokemons = [mockIPokemonDetail2]

        store.state.pokemonsSelected = new Set([1])

        store.removeAllPokemonsSelected()

        expect(store.state.pokemonsSelected.size).toBe(0)
      })
    })
  })
})
