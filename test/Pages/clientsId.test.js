import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import axios from 'axios'

Vue.use(Vuetify) //Needed to prevent vuetify issues within testing, do not remove
jest.mock("axios")
delete window.location
window.location = { assign: jest.fn() }

import ClientsId from '@/pages/clients/_id.vue'

describe('ClientsId', () => {
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
    wrapper = shallowMount(ClientsId, { store, localVue, mocks: { $route } })
  })

  test('sets the correct default data', () => {
    expect(typeof ClientsId.data).toBe('function')
    const defaultData = ClientsId.data()

    expect(defaultData.client).toMatchObject({})
    expect(defaultData.loading).toBe(true)
    expect(defaultData.error).toBe(false)
    expect(defaultData.errorMessage).toBe('')
    expect(defaultData.submitTemplate).toMatchObject({name: '', sessions: []})
    expect(defaultData.templateList).toBe(undefined)
    expect(defaultData.user).toBe(undefined)
  })

  test('getUserClientsId successfully gets the user and tries to find the client id', async () => {
    const findClientMock = jest.fn()
    wrapper.setMethods({findClient: findClientMock})
    await wrapper.vm.$nextTick()

    wrapper.vm.getUserClientsId()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.user).toMatchObject(state.userData)
    expect(findClientMock).toHaveBeenCalled()
    expect(findClientMock).toHaveBeenCalledTimes(1)
  })

    test('findClient successfully gets the client id', async () => {
    const testData = {
      user: {name: "testUser"},
      coach_exercises: {}
    }
    axios.get.mockResolvedValue({ data : testData })

    const updateTemplateListMock = jest.fn()
    wrapper.setMethods({updateTemplateList: updateTemplateListMock})
    await wrapper.vm.$nextTick()
 
    wrapper.vm.findClient()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.client).toMatchObject(testData.user)
    expect(updateTemplateListMock).toHaveBeenCalled()
    expect(updateTemplateListMock).toHaveBeenCalledTimes(1)
  })

  test('findClient handles errors correctly', async () => {
    const error = { response : { status : 404 }}
    axios.get.mockRejectedValue(error)

    wrapper.vm.findClient()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.loading).toBe(false)
    expect(wrapper.vm.$data.error).toBe(true)
    expect(wrapper.vm.$data.errorMessage).toBeTruthy()
  })
 
  test('updateTemplateList successfully gets the template from the server when the user is a coach', async () => {
    const testData = {
      exercises: {},
      coach_exercises: {},
      templates: [{test: "testString"}]
    }
    axios.get.mockResolvedValue({ data : testData })

    wrapper.setData({ user: {role: 'COACH'}})
    await wrapper.vm.$nextTick()
 
    wrapper.vm.updateTemplateList()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.error).toBe(false)
    expect(wrapper.vm.$data.loading).toBe(false)
    expect(wrapper.vm.$data.templateList).toMatchObject(testData.templates)
  })

  test('updateTemplateList successfully gets the template from the server when the user is a client', async () => {
    const testData = {
      exercises: {},
      coach_exercises: {},
      templates: [{test: "testString"}]
    }
    axios.get.mockResolvedValue({ data : testData })

    wrapper.setData({ user: {role: 'CLIENT'}})
    await wrapper.vm.$nextTick()
 
    wrapper.vm.updateTemplateList()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.error).toBe(false)
    expect(wrapper.vm.$data.loading).toBe(false)
    expect(wrapper.vm.$data.templateList).toMatchObject(testData.templates)
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
    expect(wrapper.vm.$data.errorMessage).toBeTruthy()
  })
})