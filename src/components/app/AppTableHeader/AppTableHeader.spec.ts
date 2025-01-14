import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import AppTableHeader from './AppTableHeader.vue'

describe('TableHeader.vue', () => {
  it('renders correct number of columns', () => {
    const columns = ['Name', 'Age', 'Country']
    const wrapper = mount(AppTableHeader, {
      props: {
        columns,
      },
    })

    const thElements = wrapper.findAll('th')
    expect(thElements.length).toBe(columns.length)
  })

  it('renders no columns when columns prop is an empty array', () => {
    const wrapper = mount(AppTableHeader, {
      props: {
        columns: [],
      },
    })

    const thElements = wrapper.findAll('th')
    expect(thElements.length).toBe(0)
  })
})
