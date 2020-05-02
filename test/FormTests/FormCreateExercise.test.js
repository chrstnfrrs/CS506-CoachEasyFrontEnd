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

  test('takes session as a prop', () => {
    let testSession = {
      name: 'TestSession',
      order: 1, coach_exercises: [],
    }
    wrapper = shallowMount(FormCreateExercise, {localVue, propsData: { session: testSession}})
    expect(wrapper.props().session).toBeTruthy()
  })

  test('takes allContent as a prop', () => {
    wrapper = shallowMount(FormCreateExercise, {localVue, propsData: { allContent: true }})
    expect(wrapper.props().allContent).toBe(true)
  })

  test('createExercise can create an exercise', () => {
    let session = {
      name: 'TestSession',
      order: 1, coach_exercises: [],
    }
    wrapper = shallowMount(FormCreateExercise, {localVue, propsData: { session: session }})
    wrapper.vm.createExercise()
    expect(wrapper.vm.$data.creating).toBe(false)
  })

  test('updateExercise can update an exercise when creating is true', async () => {
    let session = {
      name: 'TestSession',
      order: 1, coach_exercises: [],
    }

    wrapper = shallowMount(FormCreateExercise, {localVue, propsData: { session: session, allContent: true }})

    const createExerciseMock = jest.fn()
    wrapper.setMethods({createExercise: createExerciseMock})
    await wrapper.vm.$nextTick()

    wrapper.vm.updateExercise()
    await wrapper.vm.$nextTick()

    expect(createExerciseMock).toHaveBeenCalled()
    expect(createExerciseMock).toHaveBeenCalledTimes(1)
  })

  test('updateExercise can update an exercise when creating is false', async () => {
    let session = {
      name: 'TestSession',
      order: 1, coach_exercises: [{exercise_id: -1}],
    }

    wrapper = shallowMount(FormCreateExercise, {localVue, propsData: { session: session, allContent: true }})
    wrapper.setData({creating: false, index: 0, selectedExercise: {id: 1}})

    const createExerciseMock = jest.fn()
    wrapper.setMethods({createExercise: createExerciseMock})
    await wrapper.vm.$nextTick()

    wrapper.vm.updateExercise()
    await wrapper.vm.$nextTick()

    expect(createExerciseMock).toHaveBeenCalledTimes(0)
  })

  test('getExercises successfully gets exercises from the server', async () => {
    let session = {
      name: 'TestSession',
      order: 1, coach_exercises: [],
    }

    wrapper = shallowMount(FormCreateExercise, {localVue, propsData: { session: session, allContent: true }})

    const testData = {exercises: [1,2,3]}

    axios.get.mockResolvedValue({
      data : testData
    })

    wrapper.vm.getExercises()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.exerciseList).toMatchObject(testData.exercises)
  })

  test('getExercises successfully gets exercises from the server', async () => {
    let session = {
      name: 'TestSession',
      order: 1, coach_exercises: [],
    }

    wrapper = shallowMount(FormCreateExercise, {localVue, propsData: { session: session, allContent: true }})

    const error = { response : { status : 404 }}
    axios.get.mockRejectedValue(error)

    wrapper.vm.getExercises()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.error).toBe(true)
  })
})