import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import AppLoading from './AppLoading.vue'

describe('AppLoading', () => {
  it('renders correctly and displays the loading message', () => {
    const wrapper = mount(AppLoading)

    const message = wrapper.find('.app-loading__message')
    expect(message.exists()).toBe(true)
    expect(message.text()).toBe('Loading, please wait...')

    const spinner = wrapper.find('.app-loading__spinner')
    expect(spinner.exists()).toBe(true)

    expect(wrapper.classes()).toContain('app-loading')
  })
})
