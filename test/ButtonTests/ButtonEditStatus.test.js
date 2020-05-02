import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import axios from 'axios'

Vue.use(Vuetify) //Needed to prevent vuetify issues within testing, do not remove
Vue.config.silent = true
jest.mock("axios")
delete window.location
window.location = { assign: jest.fn() }

import ButtonEditStatus from '@/components/ButtonEditStatus.vue'

describe('ButtonEditStatus', () => {
  let wrapper;

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    wrapper = shallowMount(ButtonEditStatus, { 
      localVue, 
    })
  })

  test('Nothing to test here', () => {
    expect(false).toBe(false)
  })
})