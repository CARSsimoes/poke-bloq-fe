import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppNoData from './AppNoData.vue'

describe('AppNoData', () => {
  it('renders properly', () => {
    const wrapper = mount(AppNoData)
    expect(wrapper.text()).toContain('Go catch some pokemons!!!')
  })
})
