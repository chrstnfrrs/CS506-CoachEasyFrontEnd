import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'

Vue.use(Vuetify) //Needed to prevent vuetify issues within testing, do not remove

import Login from '@/pages/login.vue'

describe('Login', () => {
  let wrapper;

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    wrapper = shallowMount(Login, { localVue })
  })

  test('has nothing to test', () => {
    expect(Login.data).toBeFalsy()
  })
})