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

import ViewSession from '@/components/ViewSession.vue'

describe('ViewSession', () => {
  let wrapper;
  let testClient;
  let $router;
  let state, store, localVue

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)

    state = {
      userData : {role: "COACH", test: "test"}
    }

    store = new Vuex.Store({ state })

    $router = { query : {reset_token : "test"}, currentRoute : {name : "testRoute"}}
    wrapper = shallowMount(ViewSession, { 
      store,
      localVue, 
      propsData: {session: {training_entries: [{trained: true}], coach_exercises: []}},
      mocks: { $router }
    })
  })

  test('updateExerciseList works when the user is a coach', async () => {
    wrapper.vm.updateExerciseList()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.loading).toBe(false)
  })

  test('updateExerciseList works when the user is a client - broken', async () => {
    // state = {
    //   userData : {role: "CLIENT", test: "test"}
    // }

    // store = new Vuex.Store({ state })

    // $router = { query : {reset_token : "test"}, currentRoute : {name : "testRoute"}}
    // wrapper = shallowMount(ViewSession, { 
    //   store,
    //   localVue, 
    //   propsData: {session: {}},
    //   mocks: { $router }
    // })

    wrapper.vm.updateExerciseList()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.loading).toBe(false)
  })

  // test('can update the clientList with changes', () => {
  //   const testData = {"approved": true,"check_in": false,"coach_id": 1,
  //   "email": "test@email.com", "first_name": "test","id": 1, "last_name": "person",
  //   "role": "COACH", "verified": true
  //   }

  //   axios.get.mockResolvedValue({
  //     data : testData
  //   })

  //   wrapper.vm.updateClientList()

  //   expect($router.currentRoute.name).toBeTruthy()
  //   expect(testClient.id).toBeTruthy()
  // })

  // test('emits the setUpdate event when the setUpdate method is called', () => {
  //   wrapper.vm.setUpdate()
  //   expect(wrapper.emitted().setUpdate).toBeTruthy()
  //   expect(wrapper.emitted().setUpdate.length).toBe(1)
  // })

  // test('changeClient changes the client we are looking at', async () => {
  //   const testData = {}
  //   axios.put.mockResolvedValue({ data : testData })

    // const updateClientListMock = jest.fn()
    // wrapper.setMethods({updateClientList: updateClientListMock})
    // await wrapper.vm.$nextTick()

    // wrapper.vm.changeClient({id: 1})
    // await wrapper.vm.$nextTick()
    // expect(updateClientListMock).toHaveBeenCalled()
    // expect(updateClientListMock).toHaveBeenCalledTimes(1)
  // })

  // test('deleteClient deletes a client from the list', async () => {
  //   const testData = {}
  //   axios.delete.mockResolvedValue({ data : testData })

  //   const updateClientListMock = jest.fn()
  //   wrapper.setMethods({updateClientList: updateClientListMock})
  //   await wrapper.vm.$nextTick()

  //   wrapper.vm.deleteClient({id: 1})
  //   await wrapper.vm.$nextTick()
  //   expect(updateClientListMock).toHaveBeenCalled()
  //   expect(updateClientListMock).toHaveBeenCalledTimes(1)
  // })

})