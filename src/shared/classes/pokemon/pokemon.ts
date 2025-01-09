import type { IPokemonDetail, IPokemonTypes } from '@/shared/types/pokemon'

class Pokemon {
  id: number
  name: string
  image: string
  height: number
  weight: number
  hp: number
  speed: number
  attack: number
  defense: number
  specialAttack: number
  specialDefense: number
  types: IPokemonTypes[]
  caught: boolean

  constructor(pokemon: IPokemonDetail) {
    this.id = pokemon.id
    this.name = pokemon.name
    this.image = pokemon.image
    this.height = pokemon.height
    this.weight = pokemon.weight
    this.hp = pokemon.hp
    this.speed = pokemon.speed
    this.attack = pokemon.attack
    this.defense = pokemon.defense
    this.specialAttack = pokemon.specialAttack
    this.specialDefense = pokemon.specialDefense
    this.types = pokemon.types
    this.caught = pokemon.caught || false
  }

  getFormattedHeight(): string {
    return `${this.height}m`
  }

  getFormattedWeight(): string {
    return `${this.weight}kg`
  }

  getTypeList(): IPokemonTypes[] {
    return this.types
  }

  isCaught(): string {
    return Boolean(this.caught) ? '' : '#7f8c8d'
  }
}

export default Pokemon
