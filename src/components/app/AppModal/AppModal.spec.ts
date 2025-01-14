import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AppModal from './AppModal.vue'

describe('Modal.vue', () => {
  it('renders modal when isVisible is true', async () => {
    const wrapper = mount(AppModal, {
      props: {
        isVisible: true,
      },
    })

    expect(wrapper.find('.modal-overlay').exists()).toBe(true)
    expect(wrapper.find('.modal-content').exists()).toBe(true)
  })

  it('does not render modal when isVisible is false', async () => {
    const wrapper = mount(AppModal, {
      props: {
        isVisible: false,
      },
    })

    expect(wrapper.find('.modal-overlay').exists()).toBe(false)
    expect(wrapper.find('.modal-content').exists()).toBe(false)
  })

  it('emits "close" event when close button is clicked', async () => {
    const wrapper = mount(AppModal, {
      props: {
        isVisible: true,
      },
    })

    const closeButton = wrapper.find('.modal-close')
    await closeButton.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('close')
  })
})
