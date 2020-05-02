import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import axios from 'axios'

Vue.use(Vuetify) //Needed to prevent vuetify issues within testing, do not remove
Vue.config.silent = true
jest.mock("axios")
delete window.location
window.location = { assign: jest.fn() }

import ViewClientExercise from '@/components/ViewClientExercise.vue'

describe('ViewClientExercise', () => {
  let wrapper;

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    wrapper = shallowMount(ViewClientExercise, { 
      localVue, 
      propsData: {exercise: {name: "testName", sets: 10, reps: 100, weight: 1000}},
    })
  })

  test('can take an exercise property', () => {
    expect(wrapper.vm.exercise).toMatchObject({name: "testName", sets: 10, reps: 100, weight: 1000})
  })

})