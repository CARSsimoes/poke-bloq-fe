import type { PokemonDetailsApiResponse, PokemonsListApiResponse } from '@/shared/types/api'
import axios from 'axios'

const API_BASE_URL = 'https://pokeapi.co/api/v2'

export default {
  getPokemons(limit: number, offset: number): Promise<PokemonsListApiResponse> {
    return axios.get(`${API_BASE_URL}/pokemon`, {
      params: { limit, offset },
    })
  },

  getPokemonDetails(url: string): Promise<PokemonDetailsApiResponse> {
    return axios.get(url)
  },
}
