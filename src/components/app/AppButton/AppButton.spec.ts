import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import AppButton from './AppButton.vue'

describe('YourButtonComponent.vue', () => {
  it('renders button with correct text', () => {
    const buttonText = 'Click Me'

    const wrapper = mount(AppButton, {
      props: {
        text: buttonText,
        action: vi.fn(),
      },
    })

    expect(wrapper.text()).toBe(buttonText)
  })

  it('calls action when the button is clicked', () => {
    const actionMock = vi.fn()

    const wrapper = mount(AppButton, {
      props: {
        text: 'Click Me',
        action: actionMock,
      },
    })

    wrapper.find('button').trigger('click')

    expect(actionMock).toHaveBeenCalledTimes(1)
  })
})
