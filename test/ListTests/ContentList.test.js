import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import axios from 'axios'

Vue.use(Vuetify) //Needed to prevent vuetify issues within testing, do not remove
jest.mock("axios")
delete window.location
window.location = { assign: jest.fn() }

import ContentList from '@/components/ContentList.vue'

describe('ContentList', () => {
  let wrapper;
  let state, store, localVue

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)

    state = {
      userData : {role: "COACH", test: "test"}
    }

    store = new Vuex.Store({ state })

    wrapper = shallowMount(ContentList, { 
      store,
      localVue, 
      propsData: {clientList: [], clientType: "approvedClients"},
    })
  })

  test('shouldUpdate emits a shouldUpdate event', async () => {
    wrapper.vm.shouldUpdate()
    expect(wrapper.emitted().shouldUpdate).toBeTruthy()
    expect(wrapper.emitted().shouldUpdate.length).toBe(1)
  })

  test('sortList correctly sorts lists when the list is already in order', async () => {
    wrapper.setProps({clientList: [{first_name: 'A'}, {first_name: 'B'}, {first_name: 'C'}]})

    wrapper.vm.sortList()
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.clientList).toMatchObject([{first_name: 'A'}, {first_name: 'B'}, {first_name: 'C'}])
  })

  test('sortList correctly sorts lists when the list is not already in order', async () => {
    wrapper.setProps({clientList: [{first_name: 'B'},{first_name: 'A'}, {first_name: 'C'}]})

    wrapper.vm.sortList()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.clientList).toMatchObject([{first_name: 'A'}, {first_name: 'B'}, {first_name: 'C'}])
  })

  test('sortList correctly sorts lists when the list is full of equivalent values', async () => {
    wrapper.setProps({clientList: [{first_name: 'A'},{first_name: 'A'}, {first_name: 'A'}]})

    wrapper.vm.sortList()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.clientList).toMatchObject([{first_name: 'A'}, {first_name: 'A'}, {first_name: 'A'}])
  })
})