import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppBadge from './AppBadge.vue'
import { pokemonTypes } from '@/shared/types/colors'

describe('AppBadge', () => {
  it('renders the badge with the correct name', () => {
    const wrapper = mount(AppBadge, {
      props: {
        name: pokemonTypes[0],
      },
    })

    expect(wrapper.text()).toBe('normal')
  })
})
