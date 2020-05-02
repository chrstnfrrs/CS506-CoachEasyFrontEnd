import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import axios from 'axios'

Vue.use(Vuetify) //Needed to prevent vuetify issues within testing, do not remove
jest.mock("axios")
delete window.location
window.location = { assign: jest.fn() }

import ViewDashboard from '@/components/ViewDashboard.vue'

describe('ViewDashboard', () => {
  let wrapper;
  let testClient;
  let $router;

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    $router = { query : {reset_token : "test"}, currentRoute : {name : "testRoute"}}
    wrapper = shallowMount(ViewDashboard, { 
      localVue, 
      propsData: {type: 'COACH'},
      mocks: { $router }
    })
  })

  test('setList sets the card list based on the type', async () => {
    wrapper.vm.setList()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.cardList).toMatchObject(wrapper.vm.$data.coachList)
  })

  test('setList sets the card list based on the type', async () => {
    wrapper.setProps({type: 'CLIENT'})

    wrapper.vm.setList()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.cardList).toMatchObject(wrapper.vm.$data.clientList)
  })
})