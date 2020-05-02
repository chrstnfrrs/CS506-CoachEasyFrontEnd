import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'

Vue.use(Vuetify) //Needed to prevent vuetify issues within testing, do not remove

import ResetPassword from '@/pages/ResetPassword.vue'

describe('ResetPassword', () => {
  let wrapper;

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    wrapper = shallowMount(ResetPassword, { localVue })
  })

  test('has nothing to test', () => {
    expect(ResetPassword.data).toBeFalsy()
  })
})