import Vue from 'vue'
import Vuetify from 'vuetify'
import {shallowMount} from '@vue/test-utils'
import ButtonHeading from '@/components/ButtonHeading.vue'

Vue.use(Vuetify)

//A helper function that mounts the component
function getMountedComponent(Component, propsData) {
  return shallowMount(Component, {propsData})
}

describe('ButtonHeading', () => {
  test('emits a sendRequest event when the message is Create', () => {
    const wrapper = getMountedComponent(ButtonHeading, { message: 'Create' })
    wrapper.trigger('click')
    expect(wrapper.emitted().sendRequest).toBeTruthy()
    expect(wrapper.emitted().sendRequest.length).toBe(1)
  })

  test('emits a sendRequest event when the message is Edit', () => {
    const wrapper = getMountedComponent(ButtonHeading, { message: 'Edit' })
    wrapper.trigger('click')
    expect(wrapper.emitted().sendRequest).toBeTruthy()
    expect(wrapper.emitted().sendRequest.length).toBe(1)
  })

  test('emits a sendRequest event when the message is Done', () => {
    const wrapper = getMountedComponent(ButtonHeading, { message: 'Done' })
    wrapper.trigger('click')
    expect(wrapper.emitted().sendRequest).toBeTruthy()
    expect(wrapper.emitted().sendRequest.length).toBe(1)
  })

  test('emits a sendRequest event when the message is Save', () => {
    const wrapper = getMountedComponent(ButtonHeading, { message: 'Save' })
    wrapper.trigger('click')
    expect(wrapper.emitted().sendRequest).toBeTruthy()
    expect(wrapper.emitted().sendRequest.length).toBe(1)
  })

  test('emits a setStatus event when the message is set to anything else', () => {
    const wrapper = getMountedComponent(ButtonHeading, { type: '' })
    wrapper.trigger('click')
    expect(wrapper.emitted().setStatus).toBeTruthy()
    expect(wrapper.emitted().setStatus.length).toBe(1)
  })
})