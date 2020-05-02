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

import FormEditSession from '@/components/FormEditSession.vue'

describe('FormEditSession', () => {
  let mutations;
  let state;
  let store;
  let wrapper;
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)
  })

  test('getSessionEditRole gets the userData from store when role is coach', async () => {
    state = {
      userData : {role: "COACH", test: "test"}
    }

    store = new Vuex.Store({ state })
    wrapper = shallowMount(FormEditSession, { 
      store, localVue, propsData: {session: {client_exercises: [], coach_exercises: []}} 
    })

    wrapper.vm.getSessionEditRole()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.role).toBe(state.userData.role)
  })

  test('getSessionEditRole gets the userData from store when role is client', async () => {
    state = {
      userData : {role: "CLIENT", test: "test"}
    }

    store = new Vuex.Store({ state })
    wrapper = shallowMount(FormEditSession, { 
      store, localVue, propsData: {session: {client_exercises: [], coach_exercises: []}} 
    })

    wrapper.vm.getSessionEditRole()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.role).toBe(state.userData.role)
  })

  test('mounting works when role is coach.', async () => {
    state = {
      userData : {role: "COACH", test: "test"}
    }

    store = new Vuex.Store({ state })
    wrapper = shallowMount(FormEditSession, { 
      store, localVue, propsData: {session: {client_exercises: [], coach_exercises: []},
      data: function() {
        return {
          role: 'COACH'
        }
      }} 
    })
    wrapper.setData({role: "COACH"})

    wrapper.vm.componentSetup()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.role).toBe(state.userData.role)
  })

  test('mounting works role is client.', async () => {
    state = {
      userData : {role: "CLIENT", test: "test"}
    }

    store = new Vuex.Store({ state })
    wrapper = shallowMount(FormEditSession, { 
      store, localVue, propsData: {session: {client_exercises: [], coach_exercises: []},
      data: function() {
        return {
          role: 'CLIENT'
        }
      }} 
    })
    wrapper.setData({role: "CLIENT"})

    wrapper.vm.componentSetup()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.role).toBe(state.userData.role)
  })

})