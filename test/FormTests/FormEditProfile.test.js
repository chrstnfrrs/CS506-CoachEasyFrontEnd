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

import FormEditProfile from '@/components/FormEditProfile.vue'

describe('FormEditProfile', () => {
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
      setUserData: jest.fn(),
      editStatus: jest.fn()
    }
    store = new Vuex.Store({ state, mutations })
    wrapper = shallowMount(FormEditProfile, { 
      store, localVue, propsData: {user: {first_name: "firstName", last_name: "lastName", email: "testEmail@email.com"}}, mocks: { $route } 
    })
    wrapper.setData({user: {first_name: "firstName", last_name: "lastName", email: "testEmail@email.com"}})
  })

  test('resetVariables resets important variables', async () => {
    wrapper.setData({ submitted: true, success: true, error: true})

    wrapper.vm.resetVariables()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.submitted).toBe(true)
    expect(wrapper.vm.$data.success).toBe(true)
    expect(wrapper.vm.$data.error).toBe(true)
  })

  test('editProfile updates the profile on the server', async () => {
    const testData = {user: {}}
    axios.put.mockResolvedValue({ data : testData })

    wrapper.vm.editProfile()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.submitted).toBe(true)
    expect(wrapper.vm.$data.success).toBe(true)
  })

  test('editProfile handles errors well', async () => {
    const error = { response : { status : 404 }}
    axios.put.mockRejectedValue(error)

    wrapper.vm.editProfile()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.error).toBe(false)
  })

  test('editProfile can handle a non null first name', async () => {
    const error = { response : { status : 404 }}
    axios.put.mockRejectedValue(error)

    wrapper.setData({firstName: 'firstName'})
    wrapper.vm.editProfile()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.submitted).toBe(false)
  })

  test('editProfile can handle a non null last name', async () => {
    const error = { response : { status : 404 }}
    axios.put.mockRejectedValue(error)

    wrapper.setData({lastName: 'lastName'})
    wrapper.vm.editProfile()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.submitted).toBe(false)
  })

  test('editProfile can handle a non null email', async () => {
    const error = { response : { status : 404 }}
    axios.put.mockRejectedValue(error)

    wrapper.setData({email: 'email@email.com'})
    wrapper.vm.editProfile()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.submitted).toBe(false)
  })
})