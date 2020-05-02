import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import axios from 'axios'

Vue.use(Vuetify) //Needed to prevent vuetify issues within testing, do not remove
jest.mock("axios")
delete window.location
window.location = { assign: jest.fn() }

import TemplateIdSid from '@/pages/template/_slug/_sSlug.vue'

describe('TemplateIdSid', () => {
  let mutations;
  let state;
  let store;
  let wrapper;
  let localVue;
  let $route;

  beforeAll(() => {
    axios.get.mockResolvedValue({
      data : {}
    })

    axios.put.mockResolvedValue({
      data : {}
    })

    axios.get.mockRejectedValue({
      data : {}
    })

    axios.put.mockRejectedValue({
      data : {}
    })

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
    wrapper = shallowMount(TemplateIdSid, { store, localVue, mocks: { $route } })
  })

  test('sets the correct default data', () => {
    expect(typeof TemplateIdSid.data).toBe('function')
    const defaultData = TemplateIdSid.data()

    expect(defaultData.loading).toBe(true)
    expect(defaultData.loadingFailed).toBe(false)
    expect(defaultData.error).toBe(false)
    expect(defaultData.errorMessage).toBe('')
    expect(defaultData.edit).toBe(false)
    expect(defaultData.exercises).toMatchObject([])
    expect(defaultData.session).toMatchObject({})
    expect(defaultData.user).toMatchObject({})
  })

  test('saveRequest triggers setEdit as expected', async () => {
    const setEditMock = jest.fn()
    wrapper.setMethods({setEdit: setEditMock})
    await wrapper.vm.$nextTick()

    const addNewExercisesMock = jest.fn()
    wrapper.setMethods({addNewExercises: addNewExercisesMock})
    await wrapper.vm.$nextTick()

    wrapper.vm.saveRequest()
    await wrapper.vm.$nextTick()

    expect(setEditMock).toHaveBeenCalled()
    expect(setEditMock).toHaveBeenCalledTimes(1)
  })

  test('setEdit updates the edit boolean correctly', async () => {
    wrapper.vm.setEdit()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.edit).toBe(true)

    wrapper.vm.setEdit()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.edit).toBe(false)
  })

  test('getUserSession successfully gets the session', async () => {
    const updateSessionMock = jest.fn()
    wrapper.setMethods({updateSession: updateSessionMock})
    await wrapper.vm.$nextTick()

    wrapper.vm.getUserSession()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.user).toMatchObject(state.userData)
    expect(wrapper.vm.$data.loading).toBe(false)
    expect(updateSessionMock).toHaveBeenCalled()
    expect(updateSessionMock).toHaveBeenCalledTimes(1)
  })

  test('updateSession successfully gets the session from the server when the user is a coach', async () => {
    const testData = {
      exercises: {},
      coach_exercises: {}
    }
    axios.get.mockResolvedValue({ data : testData })

    wrapper.setData({ user: {role: 'COACH'}})
    await wrapper.vm.$nextTick()
 
    wrapper.vm.updateSession()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.error).toBe(false)
    expect(wrapper.vm.$data.loading).toBe(false)
    expect(wrapper.vm.$data.session).toMatchObject(testData)
    expect(wrapper.vm.$data.exercises).toMatchObject(testData.coach_exercises)
  })

  test('updateSession successfully gets the session from the server when the user is a client', async () => {
    const testData = {
      exercises: {},
      coach_exercises: {}
    }
    axios.get.mockResolvedValue({ data : testData })

    wrapper.setData({ user: {role: 'CLIENT'}})
    await wrapper.vm.$nextTick()
 
    wrapper.vm.updateSession()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.error).toBe(false)
    expect(wrapper.vm.$data.loading).toBe(false)
    expect(wrapper.vm.$data.session).toMatchObject(testData)
    expect(wrapper.vm.$data.exercises).toMatchObject(testData.exercises)
  })

  test('updateSession handles errors correctly', async () => {
    const error = { response : { status : 404 }}
    axios.get.mockRejectedValue(error)

    wrapper.setData({ user: {role: 'COACH'}})
    wrapper.vm.updateSession()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.loading).toBe(false)
    expect(wrapper.vm.$data.error).toBe(true)
  })
})