import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { shallowMount, createLocalVue, RouterLinkStub  } from '@vue/test-utils'
import axios from 'axios'

jest.mock("axios")
delete window.location
window.location = { assign: jest.fn() }
Vue.use(Vuetify)

import FormCreateExercise from '@/components/FormCreateExercise.vue'

describe('FormCreateExercise', () => {
  let state;
  let store;
  let wrapper;
  let localVue;
  let mutations;
  let exercises;

  beforeAll(() => {
    exercises = [{
      "category": "arms", 
      "id": 2, //exercise id
      "name": "bicep curls"
    }]

    let data = { exercises }

    axios.get.mockResolvedValue({data})
  })

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)
  })

  test('sets the correct default values', () => {
    expect(typeof FormCreateExercise.data).toBe('function')
    const defaultData = FormCreateExercise.data()
    
    expect(defaultData.exerciseName).toBe('')
    expect(defaultData.selectedExercise).toMatchObject({})
    expect(defaultData.exercise).toMatchObject({})
    expect(defaultData.index).toBe(0)
    expect(defaultData.creating).toBe(true)
    expect(defaultData.exerciseList).toMatchObject([])
    expect(defaultData.setRules).toBeTruthy()
    expect(defaultData.repRules).toBeTruthy()
    expect(defaultData.weightRules).toBeTruthy()
  })

  test('takes session as a prop', () => {
    let session = {
      name: 'TestSession',
      order: 1, coach_exercises: [],
    }

    wrapper = shallowMount(FormCreateExercise, {localVue, propsData: { session: session }})
    expect(wrapper.props().session).toMatchObject(session)
  })

  test('takes allContent as a prop', () => {
    wrapper = shallowMount(FormCreateExercise, {localVue, propsData: { allContent: true }})
    expect(wrapper.props().allContent).toBe(true)
  })

  // test('can create an exercise', () => {
  //   let session = {
  //     name: 'TestSession',
  //     order: 1, coach_exercises: [],
  //   }

  //   wrapper = shallowMount(FormCreateExercise, {localVue, propsData: { session: session, allContent: true }})
  //   expect(wrapper.props().allContent).toBe(true)
  // })

  test('executes getExercise when mounted', async () => {
    let session = {
      name: 'TestSession',
      order: 1, coach_exercises: [],
    }

    wrapper = shallowMount(FormCreateExercise, {localVue, propsData: { session: session, allContent: true }})
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.exerciseList).toMatchObject(exercises)
  })
})