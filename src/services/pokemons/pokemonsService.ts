import type { PokemonDetailsApiResponse, PokemonsListApiResponse } from '@/shared/types/api'
import axios from '@/plugins/axios/axios'

export default {
  getPokemons(limit: number, offset: number): Promise<PokemonsListApiResponse> {
    return axios.get('pokemon', {
      params: { limit, offset },
    })
  },

  getPokemonDetails(pokemonName: string): Promise<PokemonDetailsApiResponse> {
    return axios.get(`pokemon/${pokemonName}`)
  },
}
