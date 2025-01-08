import type { IPokemon, IPokemonSprites, BasePokemonDetails } from '@/shared/types/pokemon'

export interface PokemonData {
  count: number
  next: string | null
  previous: string | null
  results: IPokemon[]
}

export interface PokemonsListApiResponse {
  data: PokemonData
  status: number
  statusText: string
}

export interface PokemonDetailsData extends BasePokemonDetails {
  sprites: IPokemonSprites
}

export interface PokemonDetailsApiResponse {
  data: PokemonDetailsData
  status: number
  statusText: string
}
