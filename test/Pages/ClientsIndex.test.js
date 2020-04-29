import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import axios from 'axios'

Vue.use(Vuetify) //Needed to prevent vuetify issues within testing, do not remove
Vue.config.silent = true;

jest.mock("axios")
delete window.location
window.location = { assign: jest.fn() }

import ClientsIndex from '@/pages/clients/index.vue'

describe('ClientsIndex', () => {
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

  beforeEach(async () => {
    localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.config.silent = true;
    
    state = {
      userData : {role: "COACH", test: "test"}
    }
    store = new Vuex.Store({ state })
    wrapper = shallowMount(ClientsIndex, { store, localVue})
  })

  test('sets the correct default data', async () => {
    expect(typeof ClientsIndex.data).toBe('function')
    const defaultData = ClientsIndex.data()

    await wrapper.vm.$nextTick()
    expect(defaultData.clientList).toMatchObject({})
    expect(defaultData.loading).toBe(true)
    expect(defaultData.error).toBe(false)
    expect(defaultData.errorMessage).toBeTruthy()
  })

  test('getHeader successfully gets the header', async () => {
    wrapper.vm.getHeader('approvedClients')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.loading).toBe(false)
  })

  test('updateClientList successfully updates the clientlist on the server', async () => {
    const testData = [{
      user: {name: "testUser"},
      coach_exercises: {}
    }]
    axios.get.mockResolvedValue({ data : testData })
 
    wrapper.vm.updateClientList()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.clientList).toMatchObject(testData)
    expect(wrapper.vm.$data.error).toBe(false)
    expect(wrapper.vm.$data.loading).toBe(false)
  })

  test('updateClientList handles errors correctly', async () => {
    const error = { response : { status : 404 }}
    axios.get.mockRejectedValue(error)

    wrapper.vm.updateClientList()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.loading).toBe(false)
    expect(wrapper.vm.$data.error).toBe(true)
  })
})