import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'

Vue.use(Vuetify) //Needed to prevent vuetify issues within testing, do not remove

import ChangePassword from '@/pages/changePassword.vue'

describe('ChangePassword', () => {
  let wrapper;

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    wrapper = shallowMount(ChangePassword, { localVue })
  })

  test('has nothing to test', () => {
    expect(ChangePassword.data).toBeFalsy()
  })
})