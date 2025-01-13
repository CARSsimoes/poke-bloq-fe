import { describe, it, expect, beforeEach, vi, beforeAll } from 'vitest'
import { createPinia } from 'pinia'
import { setActivePinia } from 'pinia'
import { usePokemonsStore } from '@/stores/pokemons/usePokemonsStore'
import { mockIPokemonDetail1, mockIPokemonDetail2, mockPokemonDetailsData1 } from '@/mocks/pokemon'
import pokemonsService from '@/services/pokemons/pokemonsService'
import type { IPokemonTypes } from '@/shared/types/pokemon'

beforeAll(() => {
  setActivePinia(createPinia())
})
vi.mock('@/services/pokemons/pokemonsService', () => ({
  default: {
    getPokemonDetails: vi.fn(),
  },
}))

describe('usePokemonsStore ->', () => {
  let store: ReturnType<typeof usePokemonsStore>

  describe('computed ->', () => {
    beforeEach(() => {
      store = usePokemonsStore()
    })

    it('should return the correct total number of caught pokemons', () => {
      expect(store.hasPokemonsCaught).toBe(true)

      expect(store.totalNumberOfPokemonsCaught).toBe(0)

      store.state.pokemonsCaught.push(mockIPokemonDetail1({ caught: true }))

      expect(store.totalNumberOfPokemonsCaught).toBe(1)

      store.state.pokemonsCaught.push(mockIPokemonDetail2)

      expect(store.totalNumberOfPokemonsCaught).toBe(2)

      expect(store.hasPokemonsCaught).toBe(false)
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
      it('with sucess - should fetch details and map them to IPokemonDetail with sucess', () => {
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

        pokemonsStore.fetchPokemonDetails(mockPokemonName)

        expect(pokemonsService.getPokemonDetails).toHaveBeenCalledWith(mockPokemonName)
      })

      it('with error - should not fetch details', () => {
        const mockPokemonName = 'pikachu'
        const pokemonsStore = usePokemonsStore()

        pokemonsService.getPokemonDetails = vi.fn().mockImplementationOnce(() => Promise.reject())

        pokemonsStore.fetchPokemonDetails(mockPokemonName)

        expect(pokemonsStore.state.pokemons).toHaveLength(0)
      })
    })
  })

  describe('getTypeListById', () => {
    beforeEach(() => {
      store = usePokemonsStore()
    })

    it('should return an empty aray if there is no pokemon found', () => {
      const result: IPokemonTypes[] = store.getTypeListById(1)
      expect(result).toEqual([])
    })

    it('should return the types of the Pokémon with the given id', () => {
      store.state.pokemons = [mockIPokemonDetail1({ caught: true }), mockIPokemonDetail2]
      const result: IPokemonTypes[] = store.getTypeListById(1)
      expect(result).toEqual([
        { slot: 1, type: { name: 'grass', url: 'fake_url_grass' } },
        { slot: 2, type: { name: 'poison', url: 'fake_url_poison' } },
      ])
    })
  })
})
