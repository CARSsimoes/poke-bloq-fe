import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import LayoutViewsSwapper from './LayoutViewsSwapper.vue'
import LayoutType from '@/shared/layouts/layouts'
import PokemonsList from '@/components/pokemons/PokemonsList/PokemonsList.vue'
import PokemonsTable from '@/components/pokemons/PokemonsTable/PokemonsTable.vue'

vi.mock('@/components/pokemons/PokemonsList/PokemonsList.vue', () => ({
  default: { template: '<div class="pokemons-list" />' },
}))

vi.mock('@/components/pokemons/PokemonsTable/PokemonsTable.vue', () => ({
  default: { template: '<div class="pokemons-table" />' },
}))

const createWrapper = (layoutType = LayoutType.TABLE) => {
  return mount(LayoutViewsSwapper, {
    props: {
      layoutType,
    },
  })
}

describe('LayoutViewsSwapper -> ', () => {
  it('layoutType is TABLE by default and PokemonsTable is rendered', () => {
    const wrapper = createWrapper()
    expect(wrapper.findComponent(PokemonsTable)).toBeDefined()
  })

  it('layoutType is CARD and PokemonsTable is rendered', () => {
    const wrapper = createWrapper(LayoutType.CARD)
    expect(wrapper.findComponent(PokemonsList)).toBeDefined()
  })
})
