import { mount } from '@vue/test-utils'
import AppBadgeList from '@/components/app/AppBadgeList/AppBadgeList.vue'
import { describe, it, expect } from 'vitest'
import AppBadge from '../AppBadge/AppBadge.vue'
import { mockTypes } from '@/mocks/pokemon'

describe('AppBadgeList.vue', () => {
  it('renders badges for each type', () => {
    const wrapper = mount(AppBadgeList, {
      props: {
        types: mockTypes,
      },
    })

    const badges = wrapper.findAllComponents(AppBadge)
    expect(badges).toHaveLength(mockTypes.length)
  })
})
