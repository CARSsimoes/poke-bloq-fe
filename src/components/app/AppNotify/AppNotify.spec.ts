import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import AppNotify from './AppNotify.vue'

describe('AppNotify', () => {
  it('renders correctly and disappears after 2 seconds', async () => {
    const message = 'This is a notification'
    const color = 'red'

    const wrapper = mount(AppNotify, {
      props: {
        message,
        color,
      },
    })

    expect(wrapper.isVisible()).toBe(true)
    expect(wrapper.classes()).toContain('app-notify')
    expect(wrapper.element.style.backgroundColor).toBe(color)

    const notificationMessage = wrapper.find('.app-notify__message')
    expect(notificationMessage.exists()).toBe(true)
    expect(notificationMessage.text()).toBe(message)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    await wrapper.vm.$nextTick()

    expect(wrapper.isVisible()).toBe(false)
  })
})
