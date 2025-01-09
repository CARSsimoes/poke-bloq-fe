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
    name: string
    url: string
  }
}

export interface IPokemonStats {
  hp: number
  speed: number
  attack: number
  defense: number
  specialAttack: number
  specialDefense: number
}

export interface BasePokemonDetails extends IPokemonStats {
  id: number
  name: string
  height: number
  weight: number
  types: IPokemonTypes[]
  caught: boolean
}

export interface IPokemonDetail extends BasePokemonDetails {
  image: string
}
