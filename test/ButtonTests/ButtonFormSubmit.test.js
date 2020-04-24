import Vue from 'vue'
import Vuetify from 'vuetify'
import {shallowMount} from '@vue/test-utils'
import ButtonFormSubmit from '@/components/ButtonFormSubmit.vue'

Vue.use(Vuetify)

//A helper function that mounts the component
function getMountedComponent(Component, propsData) {
  return shallowMount(Component, {propsData})
}

describe('ButtonFormSubmit', () => {
  test('emits a submit event when clicked', () => {
    const wrapper = getMountedComponent(ButtonFormSubmit, { message: 'Exercise' })
    wrapper.trigger('click')
    expect(wrapper.emitted().submit).toBeTruthy()
    expect(wrapper.emitted().submit.length).toBe(1)
  })

  test('displays the provided message', () => {
    const wrapper = getMountedComponent(ButtonFormSubmit, { message: 'test' })
    expect(wrapper.text()).toBe("test")
  })
})