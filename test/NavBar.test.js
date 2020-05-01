import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { shallowMount, createLocalVue, RouterLinkStub  } from '@vue/test-utils'
import NavBar from '@/components/NavBar.vue'
import axios from 'axios'

jest.mock("axios")
delete window.location
window.location = { assign: jest.fn() }
Vue.use(Vuetify)

describe('NavBar', () => {
  let state;
  let store;
  let wrapper;
  let localVue;
  let mutations;

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)
  })

  test('sets the correct default values', () => {
    expect(typeof NavBar.data).toBe('function')
    const defaultData = NavBar.data()
    expect(defaultData.userName).toBe('')
    expect(defaultData.showMenu).toBe(false)
    expect(defaultData.error).toBe(false)
  })

  test('computes the loggedIn true status correctly', () => {
    state = {
      loggedIn: true,
      userData: {"first_name": "firstName", "role": "COACH"}
    }
    store = new Vuex.Store({ state })
    wrapper = shallowMount(NavBar, { store, localVue, stubs: {NuxtLink: RouterLinkStub}})
    expect(wrapper.vm.loggedIn).toBe(true)
  })

  test('computes the loggedIn false status correctly', () => {
    state = {
      loggedIn: false,
      userData: {"first_name": "firstName", "role": "COACH"}
    }
    store = new Vuex.Store({ state })
    wrapper = shallowMount(NavBar, { store, localVue, stubs: {NuxtLink: RouterLinkStub}})
    expect(wrapper.vm.loggedIn).toBe(false)
  })

  test('computes the role correctly', () => {
    state = {
      loggedIn: true,
      userData: {"first_name": "firstName", "role": "COACH"}
    }
    store = new Vuex.Store({ state })
    wrapper = shallowMount(NavBar, { store, localVue, stubs: {NuxtLink: RouterLinkStub}})
    expect(wrapper.vm.role).toBe('COACH')
  })

  test('computes the empty role correctly', () => {
    state = {
      loggedIn: true,
    }
    store = new Vuex.Store({ state })
    wrapper = shallowMount(NavBar, { store, localVue, stubs: {NuxtLink: RouterLinkStub}})
    expect(wrapper.vm.role).toBe('none')
  })

  test('computes the userName correctly', () => {
    state = {
      loggedIn: true,
      userData: {"first_name": "firstName", "role": "COACH"}
    }
    store = new Vuex.Store({ state })
    wrapper = shallowMount(NavBar, { store, localVue, stubs: {NuxtLink: RouterLinkStub}})
    expect(wrapper.vm.getUserName).toBe('firstName')
  })

  test('computes the empty userName correctly', () => {
    state = {
      loggedIn: true,
    }
    store = new Vuex.Store({ state })
    wrapper = shallowMount(NavBar, { store, localVue, stubs: {NuxtLink: RouterLinkStub}})
    expect(wrapper.vm.getUserName).toBe('')
  })

  test('logs out successfully', async () => {
    mutations = {
      logOut: jest.fn(),
    }
    store = new Vuex.Store({ mutations })
    wrapper = shallowMount(NavBar, { store, localVue, stubs: {NuxtLink: RouterLinkStub}})

    const testData = {}
    axios.get.mockResolvedValue({data : testData})


    wrapper.vm.logOut()
    await wrapper.vm.$nextTick()

    expect(mutations.logOut).toHaveBeenCalledTimes(1)
  })

  test('handles 400 errors when logging out', async () => {
    mutations = {
      logOut: jest.fn(),
    }
    store = new Vuex.Store({ mutations })
    wrapper = shallowMount(NavBar, { store, localVue, stubs: {NuxtLink: RouterLinkStub}})

    const error = { response : { status : 400 }}
    axios.get.mockRejectedValue(error)

    wrapper.vm.logOut()
    await wrapper.vm.$nextTick()

    expect(mutations.logOut).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$data.error).toBe(true)
  })

  test('handles all other errors when logging out', async () => {
    mutations = {
      logOut: jest.fn(),
    }
    store = new Vuex.Store({ mutations })
    wrapper = shallowMount(NavBar, { store, localVue, stubs: {NuxtLink: RouterLinkStub}})

    const error = { response : { status : 9999 }}
    axios.get.mockRejectedValue(error)

    wrapper.vm.logOut()
    await wrapper.vm.$nextTick()

    expect(mutations.logOut).toHaveBeenCalledTimes(0)
    expect(wrapper.vm.$data.error).toBe(true)
  })
})