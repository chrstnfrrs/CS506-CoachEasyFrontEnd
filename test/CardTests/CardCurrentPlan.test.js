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

import CardCurrentPlan from '@/components/CardCurrentPlan.vue'

describe('CardCurrentPlan', () => {
  let wrapper;

  beforeAll(() => {
    axios.get.mockRejectedValue({
      data : {}
    })
  })

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    wrapper = shallowMount(CardCurrentPlan, { 
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

  test('getCurrentTemplate gets the currently assigned template', async () => {
    axios.get.mockResolvedValue({
      data : {}
    })

    wrapper.vm.getCurrentTemplate()
    await wrapper.vm.$nextTick()
  
    expect(wrapper.vm.$data.template).toMatchObject({})
    expect(wrapper.vm.$data.cardLoaded).toBe(true)
  })

  test('getCurrentTemplate handles errors', async () => {
    axios.get.mockRejectedValue({
      data : {}
    })

    wrapper.vm.getCurrentTemplate()
    await wrapper.vm.$nextTick()
  
    expect(wrapper.vm.$data.error).toBe(true)
  })
})