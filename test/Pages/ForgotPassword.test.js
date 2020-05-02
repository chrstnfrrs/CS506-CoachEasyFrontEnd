import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'

Vue.use(Vuetify) //Needed to prevent vuetify issues within testing, do not remove

import ForgotPassword from '@/pages/forgotPassword.vue'

describe('ForgotPassword', () => {
  let wrapper;

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    wrapper = shallowMount(ForgotPassword, { localVue })
  })

  test('has nothing to test', () => {
    expect(ForgotPassword.data).toBeFalsy()
  })
})