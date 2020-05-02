import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import axios from 'axios'

Vue.use(Vuetify) //Needed to prevent vuetify issues within testing, do not remove
jest.mock("axios")
delete window.location
window.location = { assign: jest.fn() }

import FormAssignTemplate from '@/components/FormAssignTemplate.vue'

describe('FormAssignTemplate', () => {
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
    wrapper = shallowMount(FormAssignTemplate, { store, localVue, propsData: {templates: []}, mocks: { $route } })
  })

  test('sets the correct default data', () => {
    expect(typeof FormAssignTemplate.data).toBe('function')
    const defaultData = FormAssignTemplate.data()

    expect(defaultData.sessionCount).toBe(0)
    expect(defaultData.templateName).toBe('')
    expect(defaultData.template).toMatchObject({})
    expect(defaultData.creating).toBe(true)
    expect(defaultData.assigning).toBe(false)
    expect(defaultData.selectedTemplate).toBe('Select Template')
  })

  test('addForm updates the sessionCount', async () => {
    wrapper.vm.addForm()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.sessionCount).toBe(1)
  })

  test('createTemplate updates the template name', async () => {
    wrapper.setData({ templateName: 'testName', template: {} })
    wrapper.vm.createTemplate()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.template.name).toBe('testName')
    expect(wrapper.vm.$data.creating).toBe(false)
  })

  test('getNameLength correctly returns if the templateName length is greater than 0', async () => {
    wrapper.setData({ templateName: 'testName'})
    expect(wrapper.vm.getNameLength()).toBe(true)
  })

  test('selectTemplate selects templates as expected', async () => {
    const testTemplate = {name: 'template2'}
    wrapper.setData({ templateList: [{name: 'template1'},testTemplate,{name: 'template3'}]})
    wrapper.vm.selectTemplate('template2')

    expect(wrapper.vm.$data.template).toMatchObject([testTemplate])
  })
})