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

import nextSession from '@/pages/nextSession.vue'

describe('nextSession', () => {
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
      userData : {id: 1, role: "COACH", test: "test"}
    }

    store = new Vuex.Store({ state })
    wrapper = shallowMount(nextSession, { store, localVue })
  })

  test('getSessionEditRole successfully gets the id of the current user', async () => {
    const getNextSessionMock = jest.fn()
    wrapper.setMethods({getNextSession: getNextSessionMock})
    await wrapper.vm.$nextTick()

    wrapper.vm.getSessionEditRole()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.id).toBe(store.state.userData.id)
    expect(getNextSessionMock).toHaveBeenCalled()
    expect(getNextSessionMock).toHaveBeenCalledTimes(1)
  })

  test('getNextSession updates the session correctly', async () => {
    const testData = {}

    axios.get.mockResolvedValue({ data : testData })

    wrapper.vm.getNextSession(1)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.session).toMatchObject(testData)
    expect(wrapper.vm.$data.loading).toBe(false)
  })

  test('getNextSession handles errors well', async () => {
    const testData = {}

    axios.get.mockRejectedValue({ data : testData })

    wrapper.vm.getNextSession(1)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.loading).toBe(false)
  })

  // test('setEdit updates the edit boolean correctly', async () => {
  //   wrapper.vm.setEdit()
  //   await wrapper.vm.$nextTick()
  //   expect(wrapper.vm.$data.edit).toBe(true)

  //   wrapper.vm.setEdit()
  //   await wrapper.vm.$nextTick()
  //   expect(wrapper.vm.$data.edit).toBe(false)
  // })

  // test('getUserTemplate successfully gets the session', async () => {
  //   const updateTemplateListMock = jest.fn()
  //   wrapper.setMethods({updateTemplateList: updateTemplateListMock})
  //   await wrapper.vm.$nextTick()

  //   wrapper.vm.getUserTemplate()
  //   await wrapper.vm.$nextTick()

  //   expect(wrapper.vm.$data.user).toMatchObject(state.userData)
  //   expect(wrapper.vm.$data.loading).toBe(false)
  //   expect(updateTemplateListMock).toHaveBeenCalled()
  //   expect(updateTemplateListMock).toHaveBeenCalledTimes(1)
  // })

  // test('updateTemplateList successfully gets the template from the server when the user is a coach', async () => {
  //   const testData = {
  //     exercises: {},
  //     coach_exercises: {}
  //   }
  //   axios.get.mockResolvedValue({ data : testData })

  //   wrapper.setData({ user: {role: 'COACH'}})
  //   await wrapper.vm.$nextTick()
 
  //   wrapper.vm.updateTemplateList()
  //   await wrapper.vm.$nextTick()
  //   await wrapper.vm.$nextTick()
  //   await wrapper.vm.$nextTick()

  //   expect(wrapper.vm.$data.error).toBe(false)
  //   expect(wrapper.vm.$data.loading).toBe(false)
  //   expect(wrapper.vm.$data.templateList).toMatchObject(testData)
  // })

  // test('updateTemplateList successfully gets the template from the server when the user is a client', async () => {
  //   const testData = {
  //     exercises: {},
  //     coach_exercises: {}
  //   }
  //   axios.get.mockResolvedValue({ data : testData })

  //   wrapper.setData({ user: {role: 'CLIENT'}})
  //   await wrapper.vm.$nextTick()
 
  //   wrapper.vm.updateTemplateList()
  //   await wrapper.vm.$nextTick()
  //   await wrapper.vm.$nextTick()

  //   expect(wrapper.vm.$data.error).toBe(false)
  //   expect(wrapper.vm.$data.loading).toBe(false)
  //   expect(wrapper.vm.$data.templateList).toMatchObject(testData)
  // })

  // test('updateTemplateList handles errors correctly', async () => {
  //   const error = { response : { status : 404 }}
  //   axios.get.mockRejectedValue(error)

  //   wrapper.setData({ user: {role: 'COACH'}})
  //   wrapper.vm.updateTemplateList()
  //   await wrapper.vm.$nextTick()
  //   await wrapper.vm.$nextTick()

  //   expect(wrapper.vm.$data.loading).toBe(false)
  //   expect(wrapper.vm.$data.error).toBe(true)
  // })
})