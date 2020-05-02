import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import axios from 'axios'

Vue.use(Vuetify) //Needed to prevent vuetify issues within testing, do not remove
jest.mock("axios")
delete window.location
window.location = { assign: jest.fn() }

import FormCreateTemplate from '@/components/FormCreateTemplate.vue'

describe('FormCreateTemplate', () => {
  let mutations;
  let state;
  let store;
  let wrapper;
  let localVue;
  let $route;

  beforeAll(() => {
    $route = { query : {reset_token : "test"}, params : {id : 1, sid : 2}}
  })

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)
    
    state = {
      userData : {role: "COACH", test: "test"}
    }

    mutations = {
      noEdit: jest.fn(),
    }
    store = new Vuex.Store({ state, mutations })
    
    wrapper = shallowMount(FormCreateTemplate, { 
      store, localVue, propsData: {template: {name: "Test Template", sessions: [{name: "oldName"}]}}, mocks: { $route } 
    })
  })

  test('sets the correct default data', () => {
    expect(typeof FormCreateTemplate.data).toBe('function')
    const defaultData = FormCreateTemplate.data()

    expect(defaultData.sessionCount).toBe(0)
    expect(defaultData.template).toMatchObject({})
    expect(defaultData.templateName).toBe('')
    expect(defaultData.creating).toBe(true)
  })

  test('addForm increments sessionCount', async () => {
    wrapper.vm.addForm()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.sessionCount).toBe(1)
  })

  test('createTemplate successfully creates a new template', async () => {
    wrapper.setData({template: {name: ''},templateName: "testName"})

    wrapper.vm.createTemplate()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.template.name).toBe("testName")
    expect(wrapper.vm.$data.creating).toBe(false)
  })

  test('getNameLength successfully gets the name length of the template', async () => {
    wrapper.setData({template: {name: ''},templateName: "testName"})
    expect(wrapper.vm.getNameLength()).toBe(true)
  })
})