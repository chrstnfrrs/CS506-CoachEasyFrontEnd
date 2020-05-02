import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import axios from 'axios'

Vue.use(Vuetify) //Needed to prevent vuetify issues within testing, do not remove
jest.mock("axios")
delete window.location
window.location = { assign: jest.fn() }

import ListItem from '@/components/ListItem.vue'

describe('ListItem', () => {
  let wrapper;
  let testClient;
  let $route;
  let state, mutations, store

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    state = {
      userData : {role: "COACH", test: "test"}
    }

    mutations = {
      noEdit: jest.fn(),
    }
    store = new Vuex.Store({ state, mutations })

    $route = { params : {sSlug : "test"}}
    wrapper = shallowMount(ListItem, {
      store, 
      localVue, 
      propsData: {deleteStatus: false, items: {}, type: '', id: 2},
      mocks: { $route }
    })
  })

  test('isDisabled checks if the route is enabled or not', () => {
    expect(wrapper.vm.isDisabled).toBe($route.params.sSlug)
  })
})