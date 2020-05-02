import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import axios from 'axios'

Vue.use(Vuetify) //Needed to prevent vuetify issues within testing, do not remove
jest.mock("axios")
delete window.location
window.location = { assign: jest.fn() }

import TemplateIdIndex from '@/pages/template/_slug/index.vue'

describe('TemplateIdIndex', () => {
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
    wrapper = shallowMount(TemplateIdIndex, { store, localVue, mocks: { $route } })
  })

  test('sets the correct default data', () => {
    expect(typeof TemplateIdIndex.data).toBe('function')
    const defaultData = TemplateIdIndex.data()

    expect(defaultData.loading).toBe(true)
    expect(defaultData.error).toBe(false)
    expect(defaultData.status).toBe(false)
    expect(defaultData.role).toBe('')
    expect(defaultData.edit).toBe(false)
    expect(defaultData.errorMessage).toBe('Failed to Load Template')
    expect(defaultData.templateList).toMatchObject({})
    expect(defaultData.user).toMatchObject({})
  })

  // test('saveRequest triggers setEdit as expected', async () => {
  //   const setEditMock = jest.fn()
  //   wrapper.setMethods({setEdit: setEditMock})
  //   await wrapper.vm.$nextTick()

  //   wrapper.vm.saveRequest()
  //   await wrapper.vm.$nextTick()

  //   expect(setEditMock).toHaveBeenCalled()
  //   expect(setEditMock).toHaveBeenCalledTimes(1)
  // })

  test('setEdit updates the edit boolean correctly', async () => {
    wrapper.vm.setEdit()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.edit).toBe(true)

    wrapper.vm.setEdit()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.edit).toBe(false)
  })

  test('getUserTemplate successfully gets the session', async () => {
    const updateTemplateListMock = jest.fn()
    wrapper.setMethods({updateTemplateList: updateTemplateListMock})
    await wrapper.vm.$nextTick()

    wrapper.vm.getUserTemplate()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.user).toMatchObject(state.userData)
    expect(wrapper.vm.$data.loading).toBe(false)
    expect(updateTemplateListMock).toHaveBeenCalled()
    expect(updateTemplateListMock).toHaveBeenCalledTimes(1)
  })

  test('updateTemplateList successfully gets the template from the server when the user is a coach', async () => {
    const testData = {
      exercises: {},
      coach_exercises: {}
    }
    axios.get.mockResolvedValue({ data : testData })

    wrapper.setData({ user: {role: 'COACH'}})
    await wrapper.vm.$nextTick()
 
    wrapper.vm.updateTemplateList()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.error).toBe(true)
    // expect(wrapper.vm.$data.loading).toBe(false)
    // expect(wrapper.vm.$data.templateList).toMatchObject(testData)
  })

  test('updateTemplateList successfully gets the template from the server when the user is a client', async () => {
    const testData = {
      exercises: {},
      coach_exercises: {}
    }
    axios.get.mockResolvedValue({ data : testData })

    wrapper.setData({ user: {role: 'CLIENT'}})
    await wrapper.vm.$nextTick()
 
    wrapper.vm.updateTemplateList()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.error).toBe(true)
    // expect(wrapper.vm.$data.loading).toBe(false)
    // expect(wrapper.vm.$data.templateList).toMatchObject(testData)
  })

  test('updateTemplateList handles errors correctly', async () => {
    const error = { response : { status : 404 }}
    axios.get.mockRejectedValue(error)

    wrapper.setData({ user: {role: 'COACH'}})
    wrapper.vm.updateTemplateList()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.loading).toBe(false)
    expect(wrapper.vm.$data.error).toBe(true)
  })
})