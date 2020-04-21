import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import axios from 'axios'

Vue.use(Vuetify) //Needed to prevent vuetify issues within testing, do not remove
jest.mock("axios")
delete window.location
window.location = { assign: jest.fn() }

import FormForgotPassword from '@/components/FormForgotPassword.vue'

describe('FormForgotPassword', () => {

  let mutations;
  let store;
  let wrapper;

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    
    mutations = {
      setUserData: jest.fn(),
      logIn: jest.fn()
    }
    store = new Vuex.Store({ mutations })
    wrapper = mount(FormForgotPassword, { store, localVue })
  })

  test('sets the correct default data', () => {
    expect(typeof FormForgotPassword.data).toBe('function')
    const defaultData = FormForgotPassword.data()
    expect(defaultData.email).toBe('')
    expect(defaultData.errorMessage).toBe('')
    expect(defaultData.error).toBe(false)
  })

  test('has no errors under perfect conditions', async () => {
    const testData = {}
    axios.get.mockResolvedValue({
      data : testData
    })

    wrapper.setData({ email: 'test@email.com' })

    wrapper.vm.forgotPassword()

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.error).toBe(false)
  })

  test('throws an error if forgotPassword fails', async () => {
    const error = { response : { status : 404 }}

    axios.get.mockRejectedValue(error)

    wrapper.vm.forgotPassword()

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.error).toBe(true)
  })

  test('shows user friendly error message when error 400 occurs', async () => {
    const error = { response : { status : 400 }}
    
    axios.get.mockRejectedValue(error)

    wrapper.vm.forgotPassword()

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.$data.errorMessage).toBeTruthy()
  })

  test('shows user friendly error message when error 406 occurs', async () => {
    const error = { response : { status : 406 }}
    
    axios.get.mockRejectedValue(error)

    wrapper.vm.forgotPassword()

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.$data.errorMessage).toBeTruthy()
  })

  test('shows user friendly error message when an unknown error occurs', async () => {
    const error = { response : { status : 99999 }}
    
    axios.get.mockRejectedValue(error)

    wrapper.vm.forgotPassword()

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.$data.errorMessage).toBeTruthy()
  })
})