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

import CardTrainingHistory from '@/components/CardTrainingHistory.vue'

describe('CardNextSession', () => {
  let wrapper;

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    wrapper = shallowMount(CardTrainingHistory, { 
      localVue, 
      propsData: {cardType: 'test'},
    })
  })

  test('can set cardLoaded to false', () => {
    wrapper.setData({cardLoaded: false})
    expect(wrapper.vm.$data.cardLoaded).toBe(false)
  })

  test('can set cardLoaded to true', () => {
    wrapper.setData({cardLoaded: true})
    expect(wrapper.vm.$data.cardLoaded).toBe(true)
  })
})