import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import axios from 'axios'

Vue.use(Vuetify) //Needed to prevent vuetify issues within testing, do not remove
Vue.config.silent = true;

jest.mock("axios")
delete window.location
window.location = { assign: jest.fn() }

import Profile from '@/pages/profile.vue'

describe('Profile', () => {
  let state;
  let store;
  let wrapper;
  let localVue;

  beforeEach(async () => {
    localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.config.silent = true;
    
    state = {
      userData : {role: "COACH", test: "test"},
      edit: true
    }
    store = new Vuex.Store({ state })
    wrapper = shallowMount(Profile, { store, localVue})
  })

  test('sets the correct default data', async () => {
    expect(typeof Profile.data).toBe('function')
    const defaultData = Profile.data()

    expect(defaultData.user).toMatchObject({})
    expect(defaultData.loading).toBe(true)
    // expect(defaultData.loadingFailed).toBe(false)
    expect(defaultData.error).toBe(false)
  })

  test('getUser successfully gets the user from the store', async () => {
    wrapper.vm.getUser()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.user).toMatchObject(state.userData)
    expect(wrapper.vm.$data.loading).toBe(false)
  })

  test('edit successfully gets the edit status from the store', async () => {
    expect(wrapper.vm.edit).toBe(state.edit)
  })

  test('created successfully calls getUser', async () => {
    const getUser = jest.fn()
    wrapper = shallowMount(Profile, { store, localVue, methods: { getUser }})

    expect(getUser).toHaveBeenCalled()
    expect(getUser).toHaveBeenCalledTimes(1)
  })
})