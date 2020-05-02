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

import DashboardCard from '@/components/DashboardCard.vue'

describe('DashboardCard', () => {
  let wrapper;

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    wrapper = shallowMount(DashboardCard, { 
      localVue, 
      propsData: {type: ''},
    })
  })

  test('can set type to nextSession', () => {
    wrapper.setProps({type: 'nextSession'})
    expect(wrapper.vm.type).toBe('nextSession')
  })

  test('can set type to trainingPlan', () => {
    wrapper.setProps({type: 'trainingPlan'})
    expect(wrapper.vm.type).toBe('trainingPlan')
  })

  test('can set type to trainingHistory', () => {
    wrapper.setProps({type: 'trainingHistory'})
    expect(wrapper.vm.type).toBe('trainingHistory')
  })

})