import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import axios from 'axios'

Vue.use(Vuetify) //Needed to prevent vuetify issues within testing, do not remove
jest.mock("axios")
delete window.location
window.location = { assign: jest.fn() }

import ListCoachSessions from '@/components/ListCoachSessions.vue'

describe('ListCoachSessions', () => {
  let wrapper;
  let testClient;
  let $router;

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    $router = { query : {reset_token : "test"}, currentRoute : {name : "testRoute"}}
    wrapper = shallowMount(ListCoachSessions, { 
      localVue, 
      propsData: {template: {sessions:[1,2,3]}},
      mocks: { $router }
    })
  })

  test('updateSessionList updates the list of sessions', () => {
    wrapper.vm.updateSessionList()

    expect(wrapper.vm.$data.sessionList).toMatchObject([1,2,3])
    expect(wrapper.vm.$data.loading).toBe(false)
  })

  test('isCompleted returns yes if completed', () => {
    expect(wrapper.vm.isCompleted(true)).toBe("Yes")
  })

  test('isCompleted returns no if not completed', () => {
    expect(wrapper.vm.isCompleted(false)).toBe("No")
  })
})