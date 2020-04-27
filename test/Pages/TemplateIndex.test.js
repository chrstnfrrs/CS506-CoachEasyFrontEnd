import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import axios from 'axios'

Vue.use(Vuetify) //Needed to prevent vuetify issues within testing, do not remove
jest.mock("axios")
delete window.location
window.location = { assign: jest.fn() }

import TemplateIndex from '@/pages/template/index.vue'

describe('TemplateIndex', () => {
  let mutations;
  let state;
  let store;
  let wrapper;
  let localVue;

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
  })

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)
    
    state = {
      userData : {test: "test"}
    }

    mutations = {
      noEdit: jest.fn(),
    }
    store = new Vuex.Store({ state, mutations })
    wrapper = shallowMount(TemplateIndex, { store, localVue })
  })

  test('sets the correct default data', () => {
    expect(typeof TemplateIndex.data).toBe('function')
    const defaultData = TemplateIndex.data()

    expect(defaultData.loading).toBe(true)
    expect(defaultData.error).toBe(false)
    expect(defaultData.status).toBe(false)
    expect(defaultData.submitTemplate).toMatchObject({name: '', sessions: []})
    expect(defaultData.deleteStatus).toBe(false)
    expect(defaultData.errorMessage).toBe('')
    expect(defaultData.templateList).toMatchObject([])
    expect(defaultData.user).toMatchObject({})
  })

  test('computes the deleteMessage correctly when the delete status is true', () => {
    wrapper.setData({ deleteStatus: true })
    expect(wrapper.vm.deleteMessage).toBe('Done')
  })

  test('computes the deleteMessage correctly when the delete status is false', () => {
    wrapper.setData({ deleteStatus: false })
    expect(wrapper.vm.deleteMessage).toBe('Edit')
  })

  test('setDelete updates the delete status correctly', () => {
    wrapper.vm.setDelete()
    expect(wrapper.vm.$data.deleteStatus).toBe(true)
    wrapper.vm.setDelete()
    expect(wrapper.vm.$data.deleteStatus).toBe(false)
  })

  test('createRequest works correctly', async () => {
    const testData = {
      "id": 27,
      "name": "Lean Program",
      "slug": "lean-program",
      "sessions": [
        {
          "id": 72,
          "name": "Day 1 - Back Day",
          "order": 1
        },
      ]
    }

    axios.post.mockResolvedValue({
      data : testData
    })

    const updateTemplateListMock = jest.fn()
    wrapper.setMethods({updateTemplateList: updateTemplateListMock})

    wrapper.vm.createRequest()
    await wrapper.vm.$nextTick()

    expect(updateTemplateListMock).toHaveBeenCalled()
    expect(updateTemplateListMock).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$data.status).toBe(true)
  })

  test('createRequest handles errors correctly', async () => {
    const error = { response : { status : 404 }}

    axios.post.mockRejectedValue({
      data : error
    })

    wrapper.vm.createRequest()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.error).toBe(true)
    expect(wrapper.vm.$data.status).toBe(true)
  })

  test('request calls createRequest when needed', async () => {
    const createRequestMock = jest.fn()
    wrapper.setMethods({createRequest: createRequestMock})
    wrapper.setData({ status: true })

    wrapper.vm.request()
    await wrapper.vm.$nextTick()

    expect(createRequestMock).toHaveBeenCalled()
    expect(createRequestMock).toHaveBeenCalledTimes(1)
  })

  test('request calls setDelete when needed', async () => {
    const setDeleteMock = jest.fn()
    wrapper.setMethods({setDelete: setDeleteMock})
    wrapper.setData({ status: false })

    wrapper.vm.request()
    await wrapper.vm.$nextTick()

    expect(setDeleteMock).toHaveBeenCalled()
    expect(setDeleteMock).toHaveBeenCalledTimes(1)
  })

  test('setStatus creates a new submission template and updates status', async () => {
    wrapper.vm.setStatus()
    await wrapper.vm.$nextTick()

    const submitTemplate = 
    {
      name: '',
      sessions: []
    }

    expect(wrapper.vm.$data.submitTemplate).toMatchObject(submitTemplate)
    expect(wrapper.vm.$data.status).toBe(true)
  })

  test('getUserTemplate successfully gets the template', async () => {
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

  test('updateTemplateList successfully gets the template from the server', async () => {
    const testData = {
      templates: [
        {
          "completed": false,
          "end_date": null,
          "id": 1,
          "name": "Soldier Program",
          "start_date": "04-08-2020",
          "user_id": 355,
          "active": false,
          "slug": "soldier-program-justin-kwik"
        }
      ]  
    }

    axios.get.mockResolvedValue({
      data : testData
    })

    wrapper.vm.updateTemplateList()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.templateList).toMatchObject(testData.templates)
    expect(wrapper.vm.$data.loading).toBe(false)
    expect(wrapper.vm.$data.error).toBe(false)
  })

  test('updateTemplateList handles errors appropriately', async () => {
    const error = { response : { status : 404 }}
    axios.get.mockRejectedValue(error)

    wrapper.vm.updateTemplateList()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.error).toBe(true)
    expect(wrapper.vm.$data.errorMessage).toBe("Unable to load content.")
    expect(wrapper.vm.$data.loading).toBe(false)
  })

  test('deleteTemplate successfully deletes templates from the server', async () => {
    const testData = {}

    axios.put.mockResolvedValue({
      data : testData
    })

    const updateTemplateListMock = jest.fn()
    wrapper.setMethods({updateTemplateList: updateTemplateListMock})

    wrapper.vm.deleteTemplate(1)
    await wrapper.vm.$nextTick()

    expect(updateTemplateListMock).toHaveBeenCalled()
    expect(updateTemplateListMock).toHaveBeenCalledTimes(1)
  })

  test('deleteTemplate handles errors appropriately', async () => {
    const error = { response : { status : 404 }}
    axios.put.mockRejectedValue(error)

    wrapper.vm.deleteTemplate(1)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.error).toBe(true)
    expect(wrapper.vm.$data.errorMessage).toBeTruthy()
  })
})