import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia } from 'pinia'
import { setActivePinia } from 'pinia'
import PokemonCard from './PokemonCard.vue'
import router from '@/router'

vi.mock('@/stores/pokemons/usePokemonsStore', () => ({
  usePokemonsStore: vi.fn().mockReturnValue({
    getTypeListById: () => [
      { slot: 1, type: { name: 'grass', url: 'grass_url' } },
      { slot: 2, type: { name: 'poison', url: 'poison_url' } },
    ],
  }),
}))

const createWrapper = () => {
  return mount(PokemonCard, {
    props: {
      pokemon: {
        id: 1,
        name: 'Bulbasaur',
        image: 'bulbasaur.png',
        caught: false,
        types: [
          { slot: 1, type: { name: 'grass', url: 'grass_url' } },
          { slot: 2, type: { name: 'poison', url: 'poison_url' } },
        ],
        timestamp: '',
        height: 0,
        weight: 0,
        hp: undefined,
        speed: undefined,
        attack: undefined,
        defense: undefined,
        specialAttack: undefined,
        specialDefense: undefined,
      },
      isSelected: false,
    },
    global: {
      plugins: [createPinia(), router],
    },
  })
}

describe('PokemonCard.vue', () => {
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
  })

  it('renders Pokemon name correctly', () => {
    const wrapper = createWrapper()
    const pokemonName = wrapper.find('.pokemon-id__title')
    expect(pokemonName.text()).toBe('Bulbasaur')
  })

  it('renders Pokemon image correctly', () => {
    const wrapper = createWrapper()
    const pokemonImage = wrapper.find('.pokemon-id__img')
    expect(pokemonImage.attributes('src')).toBe('bulbasaur.png')
  })

  it('passes correct props to PokemonId component', () => {
    const wrapper = createWrapper()
    const pokemonId = wrapper.findComponent({ name: 'PokemonId' })
    expect(pokemonId.props()).toEqual({
      name: 'Bulbasaur',
      image: 'bulbasaur.png',
      caught: false,
      id: 1,
    })
  })

  it('applies dynamic classes based on props', async () => {
    const wrapper = createWrapper()

    expect(wrapper.classes()).toContain('pokemon-card')
    expect(wrapper.classes()).not.toContain('pokemon-card--caught')
    expect(wrapper.classes()).not.toContain('pokemon-card--selected')

    await wrapper.setProps({
      pokemon: {
        id: 1,
        name: 'Bulbasaur',
        image: 'bulbasaur.png',
        caught: true,
        types: [
          {
            type: {
              name: 'grass',
              url: '',
            },
            slot: 0,
          },
          {
            type: {
              name: 'poison',
              url: '',
            },
            slot: 0,
          },
        ],
        timestamp: '12345',
        height: 0,
        weight: 0,
        hp: undefined,
        speed: undefined,
        attack: undefined,
        defense: undefined,
        specialAttack: undefined,
        specialDefense: undefined,
      },
      isSelected: true,
    })

    expect(wrapper.classes()).toContain('pokemon-card--caught')
    expect(wrapper.classes()).toContain('pokemon-card--selected')
    expect(wrapper.classes()).toContain('pokemon-card--has-timestamp')
  })
})
