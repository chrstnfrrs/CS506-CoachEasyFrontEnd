import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import axios from 'axios'

Vue.use(Vuetify) //Needed to prevent vuetify issues within testing, do not remove
jest.mock("axios")
delete window.location
window.location = { assign: jest.fn() }

import FormChangePassword from '@/components/FormChangePassword.vue'

describe('FormChangePassword', () => {
  let state;
  let mutations;
  let store;
  let wrapper;

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    state = {
      userData : {
        email : "test@email.com"
      }
    }

    mutations = {
      setUserData: jest.fn(),
      logIn: jest.fn()
    }
    store = new Vuex.Store({ state, mutations })
    wrapper = mount(FormChangePassword, { store, localVue })
  })

  test('sets the correct default data', () => {
    expect(typeof FormChangePassword.data).toBe('function')
    const defaultData = FormChangePassword.data()
    expect(defaultData.oldPassword).toBe('')
    expect(defaultData.newPassword).toBe('')
    expect(defaultData.confirmPassword).toBe('')
    expect(defaultData.errorMessage).toBe('')
    expect(defaultData.show1).toBe(false)
    expect(defaultData.show2).toBe(false)
    expect(defaultData.show3).toBe(false)
    expect(defaultData.error).toBe(false)
  })

  test('does not have an error if things go smoothly', async () => {
    const testData = {"approved": true,"check_in": false,"coach_id": 1,
      "email": "test@email.com", "first_name": "test","id": 1, "last_name": "person",
      "role": "COACH", "verified": true
    }

    axios.put.mockResolvedValue({
      data : testData
    })

    wrapper.setData({ newPassword: 'test' })
    wrapper.setData({ confirmPassword: 'test' })

    wrapper.vm.changePassword()

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.error).toBe(false)
  })

  test('has an error if the change password request fails', async () => {    
    const error = { response : { status : 400 }}
    axios.put.mockRejectedValue(error)

    wrapper.setData({ newPassword: 'test' })
    wrapper.setData({ confirmPassword: 'test' })

    wrapper.vm.changePassword()

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.error).toBe(true)
  })

  test('throws an error if newPassword does not equal confirm password', async () => {
    wrapper.vm.changePassword()

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.error).toBe(true)
  })

  test('shows user friendly error message when error 400 occurs', async () => {
    const error = { response : { status : 400 }}
    axios.put.mockRejectedValue(error)

    wrapper.setData({ newPassword: 'test' })
    wrapper.setData({ confirmPassword: 'test' })

    wrapper.vm.changePassword()

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.$data.errorMessage).toBeTruthy()
  })

  test('shows user friendly error message when error 406 occurs', async () => {
    wrapper.setData({ newPassword: 'test' })
    wrapper.setData({ confirmPassword: 'test' })

    const error = { response : { status : 406 }}
    axios.put.mockRejectedValue(error)

    wrapper.vm.changePassword()

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.$data.errorMessage).toBeTruthy()
  })

  test('shows user friendly error message when error 500 occurs', async () => {
    wrapper.setData({ newPassword: 'test' })
    wrapper.setData({ confirmPassword: 'test' })

    const error = { response : { status : 500 }}
    axios.put.mockRejectedValue(error)

    wrapper.vm.changePassword()

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.$data.errorMessage).toBeTruthy()
  })

  test('shows user friendly error message when an unknown error occurs', async () => {
    const error = { response : { status : 99999 }}
    axios.put.mockRejectedValue(error)

    wrapper.setData({ newPassword: 'test' })
    wrapper.setData({ confirmPassword: 'test' })
    wrapper.vm.changePassword()

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.$data.errorMessage).toBeTruthy()
  })
})