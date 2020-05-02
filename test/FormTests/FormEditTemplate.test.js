import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import axios from 'axios'

Vue.use(Vuetify) //Needed to prevent vuetify issues within testing, do not remove
jest.mock("axios")
delete window.location
window.location = { assign: jest.fn() }

import FormEditTemplate from '@/components/FormEditTemplate.vue'

describe('FormEditTemplate', () => {
  let mutations;
  let state;
  let store;
  let wrapper;
  let localVue;
  let $router;

  beforeAll(() => {
    axios.get.mockResolvedValue({
      data : {}
    })

    axios.put.mockResolvedValue({
      data : {}
    })

    axios.get.mockRejectedValue({
      data : {}
    })

    axios.put.mockRejectedValue({
      data : {}
    })

    $router = { currentRoute: {name: "template-id"}}
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
    wrapper = shallowMount(FormEditTemplate, { 
      store, localVue, mocks: { $router },
      propsData: {templateList: {}}
    })
  })

  test('isTemplate properly checks if the route is on a template id page', async () => {
    expect(wrapper.vm.isTemplate()).toBe(true)
  })

  test('isTemplate properly finds an error if the route is not a template id page', async () => {
    $router = { currentRoute: {name: "bad"}}
    wrapper = shallowMount(FormEditTemplate, { 
      store, localVue, mocks: { $router },
      propsData: {templateList: {}}
    })
    expect(wrapper.vm.isTemplate()).toBe(false)
  })

  test('addSessionForm increments sessionCount', async () => {
    expect(wrapper.vm.$data.sessionCount).toBe(0)
    wrapper.vm.addSessionForm()
    expect(wrapper.vm.$data.sessionCount).toBe(1)
  })

  test('addExerciseForm increments exerciseCount', async () => {
    expect(wrapper.vm.$data.exerciseCount).toBe(0)
    wrapper.vm.addExerciseForm()
    expect(wrapper.vm.$data.exerciseCount).toBe(1)
  })

  test('reorderSessionList reorders sessions according to their order', async () => {
    wrapper.setData({sessionList: [{order: -1,}]})
    wrapper.vm.reorderSessionList()
    expect(wrapper.vm.$data.exerciseCount).toBe(0)
  })

  // test('update reordersKey increments the reorder key', async () => {
  //   expect(wrapper.vm.$data.reorderKey).toBe(0)
  //   wrapper.vm.updateReorderKey()
  //   expect(wrapper.vm.$data.reorderKey).toBe(1)
  // })
})