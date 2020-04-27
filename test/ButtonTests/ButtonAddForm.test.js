import Vue from 'vue'
import Vuetify from 'vuetify'
import {shallowMount} from '@vue/test-utils'
import ButtonAddForm from '@/components/ButtonAddForm.vue'

Vue.use(Vuetify)

//A helper function that mounts the component
function getMountedComponent(Component, propsData) {
  return shallowMount(Component, {propsData})
}

describe('ButtonAddForm', () => {
  test('emits a new exercise form when the type is exercise', () => {
    const wrapper = getMountedComponent(ButtonAddForm, { type: 'Exercise' })
    wrapper.trigger('click')
    expect(wrapper.emitted().newExerciseForm).toBeTruthy()
    expect(wrapper.emitted().newExerciseForm.length).toBe(1)
  })

  test('emits a new general form when the type is not exercise', () => {
    const wrapper = getMountedComponent(ButtonAddForm, { type: '' })
    wrapper.trigger('click')
    expect(wrapper.emitted().newExerciseForm).toBeFalsy()
    expect(wrapper.emitted().newForm).toBeTruthy()
    expect(wrapper.emitted().newForm.length).toBe(1)
  })
})