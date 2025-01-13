import type { PokemonDetailsData } from '@/shared/types/api'
import type { IPokemonDetail } from '@/shared/types/pokemon'

export const mockPokemonDetailsData1: PokemonDetailsData = {
  name: 'Pikachu',
  id: 25,
  height: 0.4,
  weight: 60,
  stats: [
    { base_stat: 35, stat: { name: 'hp' } },
    { base_stat: 55, stat: { name: 'attack' } },
    { base_stat: 40, stat: { name: 'defense' } },
    { base_stat: 50, stat: { name: 'special-attack' } },
    { base_stat: 50, stat: { name: 'special-defense' } },
    { base_stat: 90, stat: { name: 'speed' } },
  ],
  types: [{ slot: 1, type: { name: 'electric', url: 'fake_url' } }],
  sprites: {
    front_default: 'pikachu_image_url',
    back_default: 'back_url',
  },
}

export const mockIPokemonDetail1 = ({ caught = true }: { caught: boolean }): IPokemonDetail => {
  return {
    name: 'Pikachu',
    id: 25,
    height: 0.4,
    weight: 60.0,
    hp: 35,
    attack: 55,
    defense: 40,
    specialAttack: 50,
    specialDefense: 50,
    speed: 90,
    types: [
      {
        slot: 1,
        type: {
          name: 'electric',
          url: 'fake_url',
        },
      },
    ],
    image: 'pikachu_image_url',
    caught,
    timestamp: '',
  }
}

export const mockIPokemonDetail2: IPokemonDetail = {
  name: 'Bulbasaur',
  id: 1,
  height: 0.7,
  weight: 6.9,
  hp: 45,
  attack: 49,
  defense: 49,
  specialAttack: 65,
  specialDefense: 65,
  speed: 45,
  types: [
    {
      slot: 1,
      type: {
        name: 'grass',
        url: 'fake_url_grass',
      },
    },
    {
      slot: 2,
      type: {
        name: 'poison',
        url: 'fake_url_poison',
      },
    },
  ],
  image: 'bulbasaur_image_url',
  caught: true,
  timestamp: '2025-01-12 15:50',
}
