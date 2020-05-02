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

import ListSessions from '@/components/ListSessions.vue'

describe('ListSessions', () => {
  let wrapper;

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    wrapper = shallowMount(ListSessions, { 
      localVue, 
      propsData: {session: {}},
    })
  })

  test('can set session to a session object', () => {
    wrapper.setProps({session: {id: 1, name: 'test'}})
    expect(wrapper.vm.session).toMatchObject({id:1, name:'test'})
  })
})