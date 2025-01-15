import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AppToggle from './AppToggle.vue'

describe('AppToggle.vue', () => {
  it('renders both options correctly', () => {
    const wrapper = mount(AppToggle, {
      props: {
        option1: 'Option 1',
        option2: 'Option 2',
        toggleMethod: vi.fn(),
      },
    })

    expect(wrapper.text()).toContain('Option 1')
    expect(wrapper.text()).toContain('Option 2')
  })

  it('calls toggleMethod when clicked', async () => {
    const toggleMethodMock = vi.fn()
    const wrapper = mount(AppToggle, {
      props: {
        option1: 'Option 1',
        option2: 'Option 2',
        toggleMethod: toggleMethodMock,
      },
    })

    await wrapper.find('input[type="checkbox"]').trigger('click')

    expect(toggleMethodMock).toHaveBeenCalled()
  })
})
