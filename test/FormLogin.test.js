import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import axios from 'axios'

Vue.use(Vuetify) //Needed to prevent vuetify issues within testing, do not remove
jest.mock("axios")
delete window.location
window.location = { assign: jest.fn() }

import FormLogin from '@/components/FormLogin.vue'

describe('FormLogin', () => {

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
    wrapper = mount(FormLogin, { store, localVue })
  })

  test('sets the correct default data', () => {
    expect(typeof FormLogin.data).toBe('function')
    const defaultData = FormLogin.data()
    expect(defaultData.email).toBe('')
    expect(defaultData.password).toBe('')
    expect(defaultData.show).toBe(false)
    expect(defaultData.loading).toBe(false)
  })

  test('commits a setUserData mutation when the login button is clicked', async () => {

    const testData = {"approved": true,"check_in": false,"coach_id": 1,
      "email": "test@email.com", "first_name": "test","id": 1, "last_name": "person",
      "role": "COACH", "verified": true
    }

    axios.post.mockResolvedValue({
      data : testData
    })

    wrapper.setData({ email: 'test@email.com' })
    wrapper.setData({ password: 'password' })

    wrapper.vm.loginSubmit()

    await wrapper.vm.$nextTick()

    expect(mutations.setUserData).toHaveBeenCalled()
    expect(mutations.logIn).toHaveBeenCalled()
  })

  test('throws an error if login fails', async () => {
    const error = {
      response : {
        status : 404
      }
    }

    axios.post.mockRejectedValue(error)

    wrapper.vm.loginSubmit()

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(mutations.setUserData).toHaveBeenCalledTimes(0)
    expect(mutations.logIn).toHaveBeenCalledTimes(0)
    expect(wrapper.vm.$data.error).toBe(true)
  })

  test('shows user friendly error message when error 404 occurs', async () => {
    const error = {
      response : {
        status : 404
      }
    }
    
    axios.post.mockRejectedValue(error)

    wrapper.vm.loginSubmit()

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.$data.errorMessage).toBeTruthy()
  })

  test('shows user friendly error message when error 406 occurs', async () => {
    const error = {
      response : {
        status : 406
      }
    }
    
    axios.post.mockRejectedValue(error)

    wrapper.vm.loginSubmit()

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.$data.errorMessage).toBeTruthy()
  })

  test('shows user friendly error message when error 500 occurs', async () => {
    const error = {
      response : {
        status : 500
      }
    }
    
    axios.post.mockRejectedValue(error)

    wrapper.vm.loginSubmit()

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.$data.errorMessage).toBeTruthy()
  })

  test('shows user friendly error message when an unknown error occurs', async () => {
    const error = {
      response : {
        status : 9999
      }
    }
    
    axios.post.mockRejectedValue(error)

    wrapper.vm.loginSubmit()

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.$data.errorMessage).toBeTruthy()
  })
})