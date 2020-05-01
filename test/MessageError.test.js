import Vue from 'vue'
import Vuetify from 'vuetify'
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import MessageError from '@/components/MessageError.vue'

Vue.use(Vuetify)
const localVue = createLocalVue()

//A helper function that mounts the component
function getMountedComponent(Component, propsData) {
  return shallowMount(Component, {propsData})
}

describe('MessageError', () => {
  let vuetify

  beforeAll(() => {
    vuetify = new Vuetify()
  })

  afterAll(() => {
    wrapper.destroy()
  })

  test('has no default value', () => {
    expect(getMountedComponent(MessageError, {}).text()).toBe('')
  })

  test('shows the provided message', () => {
    expect(getMountedComponent(MessageError, {message: 'test 1'}).text()).toBe('test 1')
  })

  test('updates the rendered message when wrapper.message updates', async () => {
    const wrapper = getMountedComponent(MessageError, { message: 'old error message' })
    wrapper.setProps({message: 'new error message'})

    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toBe('new error message')
  })
})