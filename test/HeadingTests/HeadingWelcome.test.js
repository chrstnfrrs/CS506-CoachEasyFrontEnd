import Vue from 'vue'
import Vuetify from 'vuetify'
import {shallowMount} from '@vue/test-utils'
import HeadingWelcome from '@/components/HeadingWelcome.vue'

Vue.use(Vuetify)

//A helper function that mounts the component
function getMountedComponent(Component, propsData) {
  return shallowMount(Component, {propsData})
}

describe('HeadingWelcome', () => {
  test('has no default value', () => {
    expect(getMountedComponent(HeadingWelcome, {}).text()).toBe('Welcome,')
  })

  test('shows the provided message', () => {
    expect(getMountedComponent(HeadingWelcome, {name: 'Friend'}).text()).toBe('Welcome, Friend')
  })

  test('updates the rendered message when wrapper.name updates', async () => {
    const wrapper = getMountedComponent(HeadingWelcome, { name: 'old name' })
    wrapper.setProps({name: 'new name'})

    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toBe('Welcome, new name')
  })
})