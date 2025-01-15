import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import PokemonId from './PokemonId.vue'
import { createPinia, setActivePinia } from 'pinia'
import router from '@/router'

beforeEach(() => {
  const pinia = createPinia()
  setActivePinia(pinia)
})

describe('PokemonId.vue', () => {
  it('renders the Pokemon name correctly', () => {
    const wrapper = mount(PokemonId, {
      props: {
        name: 'Bulbasaur',
        image: 'bulbasaur.png',
        caught: false,
        id: 1,
      },
      global: {
        plugins: [router],
        stubs: {
          PokeballButton: true,
        },
      },
    })

    expect(wrapper.find('.pokemon-id__title').text()).toBe('Bulbasaur')
    expect(wrapper.find('.pokemon-id__img').attributes('src')).toBe('bulbasaur.png')
    expect(wrapper.find('.pokemon-id__img').attributes('alt')).toBe('Bulbasaur')
  })
})
