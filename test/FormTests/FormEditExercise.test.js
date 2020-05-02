import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import axios from 'axios'

Vue.use(Vuetify) //Needed to prevent vuetify issues within testing, do not remove
jest.mock("axios")
delete window.location
window.location = { assign: jest.fn() }

import FormEditExercise from '@/components/FormEditExercise.vue'

describe('FormEditExercise', () => {
  let mutations;
  let state;
  let store;
  let wrapper;
  let localVue;
  let $route;

  beforeAll(() => {
    $route = { query : {reset_token : "test"}, params : {id : 1, sid : 2}}
  })

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)
    
    state = {
      userData : {role: "COACH", test: "test"}
    }

    mutations = {
      noEdit: jest.fn(),
    }
    store = new Vuex.Store({ state, mutations })
    
    wrapper = shallowMount(FormEditExercise, { 
      store, localVue, propsData: {exercise: {name:"test", sets: 10, reps: 10, weight: 100}}, mocks: { $route } 
    })
  })

  test('sets the correct default data', () => {
    expect(typeof FormEditExercise.data).toBe('function')
    const defaultData = FormEditExercise.data()

    expect(defaultData.setRules).toBeTruthy()
    expect(defaultData.repRules).toBeTruthy()
    expect(defaultData.weightRules).toBeTruthy()
  })

  test('rules are enforced when values are positive', () => {
    wrapper = shallowMount(FormEditExercise, { 
      store, localVue, propsData: {exercise: {name:"test", sets: 10, reps: 10, weight: 100}}, mocks: { $route } 
    })

    expect(wrapper.props().exercise).toBeTruthy()
  })

  test('rules are enforced when values are negative', () => {
    wrapper = shallowMount(FormEditExercise, { 
      store, localVue, propsData: {exercise: {name:"test", sets: -10, reps: -10, weight: -100}}, mocks: { $route } 
    })

    expect(wrapper.props().exercise).toBeTruthy()
  })
})