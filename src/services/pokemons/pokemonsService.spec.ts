import { describe, expect, it, vi } from 'vitest'
import pokemonsService from './pokemonsService'

vi.mock('@/plugins/axios/axios')

describe('Pokemons Service', () => {
  it('should call getPokemons method', () => {
    const spyService = vi.spyOn(pokemonsService, 'getPokemons')
    pokemonsService.getPokemons(20, 20)
    expect(spyService).toHaveBeenCalledOnce()
    expect(spyService).toHaveBeenCalledWith(20, 20)
  })

  it('should call getPokemonDetails method', () => {
    const spyService = vi.spyOn(pokemonsService, 'getPokemonDetails')
    const pokemonName = 'pikachu'
    pokemonsService.getPokemonDetails(pokemonName)
    expect(spyService).toHaveBeenCalledOnce()
    expect(spyService).toHaveBeenCalledWith(pokemonName)
  })
})
