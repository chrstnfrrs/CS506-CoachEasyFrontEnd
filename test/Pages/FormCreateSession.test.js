import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import axios from 'axios'

Vue.use(Vuetify) //Needed to prevent vuetify issues within testing, do not remove
jest.mock("axios")
delete window.location
window.location = { assign: jest.fn() }

import FormCreateSession from '@/components/FormCreateSession.vue'

describe('FormCreateSession', () => {
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
    
    wrapper = shallowMount(FormCreateSession, { 
      store, localVue, propsData: {template: {name: "Test Template", sessions: [{name: "oldName"}]}}, mocks: { $route } 
    })
  })

  test('sets the correct default data', () => {
    expect(typeof FormCreateSession.data).toBe('function')
    const defaultData = FormCreateSession.data()

    expect(defaultData.exerciseCount).toBe(0)
    expect(defaultData.session).toMatchObject({})
    expect(defaultData.sessionName).toBe('')
    expect(defaultData.index).toBe(0)
    expect(defaultData.order).toBe(0)
    expect(defaultData.creating).toBe(true)
    expect(defaultData.deleteStatus).toBe(false)
  })

  test('addForm emits the newForm event', async () => {
    wrapper.vm.addForm()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted().newForm).toBeTruthy()
    expect(wrapper.emitted().newForm.length).toBe(1)
  })

  test('addExerciseForm increments the exercise count', async () => {
    wrapper.vm.addExcerciseForm()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.exerciseCount).toBe(1)
  })

  test('createSession successfully creates a new session', async () => {
    wrapper.vm.createSession()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.creating).toBe(false)
  })

  test('createSession successfully creates a new session', async () => {
    wrapper.vm.createSession()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.creating).toBe(false)
  })

  test('updateSession successfully updates a session when creating is true', async () => {
    const createSessionMock = jest.fn()
    wrapper.setMethods({createSession: createSessionMock})
    await wrapper.vm.$nextTick()

    wrapper.setData({creating: true})

    wrapper.vm.updateSession()
    await wrapper.vm.$nextTick()

    expect(createSessionMock).toHaveBeenCalled()
    expect(createSessionMock).toHaveBeenCalledTimes(1)
  })

  test('updateSession successfully updates a session when creating is false', async () => {
    const createSessionMock = jest.fn()
    wrapper.setMethods({createSession: createSessionMock})
    await wrapper.vm.$nextTick()

    wrapper.setData({creating: false, index: 0})

    wrapper.vm.updateSession()
    await wrapper.vm.$nextTick()

    expect(createSessionMock).toHaveBeenCalledTimes(0)
  })

 
})