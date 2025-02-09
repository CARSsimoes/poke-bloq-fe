import type { PokemonType } from './colors'

export interface IPokemon {
  name: string
  url: string
}

export interface IPokemonSprites {
  front_default: string
  back_default: string
}

export interface IPokemonTypes {
  slot: number
  type: {
    name: PokemonType
    url: string
  }
}

export interface IPokemonStat {
  base_stat: number
  stat: {
    name: string
  }
}

export interface BasePokemonStats {
  hp: number | undefined
  speed: number | undefined
  attack: number | undefined
  defense: number | undefined
  specialAttack: number | undefined
  specialDefense: number | undefined
}

export interface BasePokemonDetails {
  id: number
  name: string
  height: number
  weight: number
  types: IPokemonTypes[]
  caught: boolean
}

export interface IPokemonDetail extends BasePokemonDetails, BasePokemonStats {
  image: string
  timestamp: string
}
