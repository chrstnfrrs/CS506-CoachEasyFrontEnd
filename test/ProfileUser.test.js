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

import ProfileUser from '@/components/ProfileUser.vue'

describe('ProfileUser', () => {
  let wrapper;

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    wrapper = shallowMount(ProfileUser, { 
      localVue, 
      propsData: {user: {}, coach: false},
    })
  })

  test('getHeading works with approved users', () => {
    wrapper.setProps({user: {approved: true}})
    expect(wrapper.vm.getHeading()).toBe('Approved')
  })

  test('getHeading works with unapproved users', () => {
    wrapper.setProps({user: {approved: false}})
    expect(wrapper.vm.getHeading()).toBe('Potential')
  })

  test('getHeading works with users with a null approved status', () => {
    wrapper.setProps({user: {approved: null}})
    expect(wrapper.vm.getHeading()).toBe('Terminated')
  })

  test('getHeading works with a user with no approved status (undefined)', () => {
    wrapper.setProps({user: {}})
    expect(wrapper.vm.getHeading()).toBe('')
  })

  test('coach can be true', () => {
    wrapper.setProps({coach: true})
    expect(wrapper.vm.coach).toBe(true)
  })

  test('coach can be false', () => {
    wrapper.setProps({coach: false})
    expect(wrapper.vm.coach).toBe(false)
  })

})