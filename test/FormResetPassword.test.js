import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import axios from 'axios'

Vue.use(Vuetify) //Needed to prevent vuetify issues within testing, do not remove
jest.mock("axios")
delete window.location
window.location = { assign: jest.fn() }

import FormResetPassword from '@/components/FormResetPassword.vue'

describe('FormResetPassword', () => {

  let mutations;
  let store;
  let wrapper;
  let $route;
  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    
    mutations = {
      setUserData: jest.fn(),
      logIn: jest.fn()
    }
    store = new Vuex.Store({ mutations })
    $route = { query : {reset_token : "test"}}
    wrapper = mount(FormResetPassword, { store, localVue, mocks: { $route }})
  })

  test('sets the correct default data', () => {
    expect(typeof FormResetPassword.data).toBe('function')
    const defaultData = FormResetPassword.data()
    expect(defaultData.password).toBe('')
    expect(defaultData.newPassword).toBe('')
    expect(defaultData.showPassword).toBe(false)
    expect(defaultData.showNewPassword).toBe(false)
    expect(defaultData.error).toBe(false)
  })

  test('has no errors under perfect conditions', async () => {
    const testData = {"approved": true,"check_in": false,"coach_id": 1,
      "email": "test@email.com", "first_name": "test","id": 1, "last_name": "person",
      "role": "COACH", "verified": true
    }
    axios.post.mockResolvedValue({
      data : testData
    })

    wrapper.vm.resetPassword()

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.error).toBe(false)
  })

  test('throws an error if resetPassword fails', async () => {
    const error = { response : { status : 400 }}

    axios.post.mockRejectedValue(error)

    wrapper.vm.resetPassword()

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.error).toBe(true)
  })

  test('shows user friendly error message when error 400 occurs', async () => {
    const error = { response : { status : 400 }}
    axios.post.mockRejectedValue(error)

    wrapper.vm.resetPassword()

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.$data.errorMessage).toBeTruthy()
  })

  test('shows user friendly error message when error 404 occurs', async () => {
    const error = { response : { status : 404 }}
    
    axios.post.mockRejectedValue(error)

    wrapper.vm.resetPassword()

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.$data.errorMessage).toBeTruthy()
  })

  test('shows user friendly error message when an unknown error occurs', async () => {
    const error = { response : { status : 99999 }}
    axios.post.mockRejectedValue(error)

    wrapper.vm.resetPassword()

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.$data.errorMessage).toBeTruthy()
  })
})