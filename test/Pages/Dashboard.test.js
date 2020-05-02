import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'

Vue.use(Vuetify) //Needed to prevent vuetify issues within testing, do not remove

import Dashboard from '@/pages/dashboard.vue'

describe('Dashboard', () => {
  let wrapper;
  let state;
  let store;
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)
    
    state = {
      userData : {role: "COACH", test: "test"}
    }
    store = new Vuex.Store({ state})
    wrapper = shallowMount(Dashboard, { store, localVue })
  })

  test('sets the correct default data', () => {
    expect(typeof Dashboard.data).toBe('function')
    const defaultData = Dashboard.data()

    expect(defaultData.loading).toBe(true)
    expect(defaultData.loadingFailed).toBe(false)
    expect(defaultData.role).toBe('')
  })

  test('mounting the dashboard successfully initializes the role', async () => {
    expect(wrapper.vm.$data.role).toBe(state.userData.role)
    expect(wrapper.vm.$data.loading).toBe(false)
  })
})