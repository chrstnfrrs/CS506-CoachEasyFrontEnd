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

const localVue = createLocalVue()
localVue.use(Vuex)

const mutations = {
  setUserData: jest.fn(),
  logIn: jest.fn()
}

const store = new Vuex.Store({ mutations })

describe('FormLogin', () => {
  test('has a login Submit method', () => {
    expect(typeof FormLogin.methods.loginSubmit).toBe('function')
  })

  test('sets the correct default data', () => {
    expect(typeof FormLogin.data).toBe('function')
    const defaultData = FormLogin.data()
    expect(defaultData.show).toBe(false)
  })

  test('commits a setUserData mutation when the login button is clicked', async () => {
    const wrapper = mount(FormLogin, { store, localVue })

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
})