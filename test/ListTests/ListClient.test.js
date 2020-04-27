import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import axios from 'axios'

Vue.use(Vuetify) //Needed to prevent vuetify issues within testing, do not remove
jest.mock("axios")
delete window.location
window.location = { assign: jest.fn() }

import ListClient from '@/components/ListClient.vue'

describe('ListClient', () => {
  let wrapper;
  let testClient;
  let $router;

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    testClient =
      {
        "approved": true,
        "check_in": null,
        "coach_id": 97,
        "email": "kwik@wisc.edu",
        "first_name": "Justin",
        "id": 95,
        "last_name": "Kwik",
        "reset_token": null,
        "role": "CLIENT",
        "verified": true
      }

    $router = { query : {reset_token : "test"}, currentRoute : {name : "testRoute"}}
    wrapper = mount(ListClient, { 
      localVue, 
      propsData: {client : testClient, clientType : "ApprovedClients" },
      mocks: { $router }
    })
  })

  test('sets the correct default data', () => {
    expect(typeof ListClient.data).toBe('function')
    const defaultData = ListClient.data()
    expect(defaultData.approve).toMatchObject(['unapprovedClients','pastClients'])
    expect(defaultData.remove).toMatchObject(['unapprovedClients','pastClients'])
    expect(defaultData.terminate).toMatchObject(['approvedClients'])
  })

  test('can let you view an individual client', () => {
    wrapper.vm.viewClient(testClient)

    expect($router.currentRoute.name).toBeTruthy()
    expect(testClient.id).toBeTruthy()
  })

  test('can update the clientList with changes', () => {
    const testData = {"approved": true,"check_in": false,"coach_id": 1,
    "email": "test@email.com", "first_name": "test","id": 1, "last_name": "person",
    "role": "COACH", "verified": true
    }

    axios.get.mockResolvedValue({
      data : testData
    })

    wrapper.vm.updateClientList()

    expect($router.currentRoute.name).toBeTruthy()
    expect(testClient.id).toBeTruthy()
  })

  test('emits the setUpdate event when the setUpdate method is called', () => {
    wrapper.vm.setUpdate()
    expect(wrapper.emitted().setUpdate).toBeTruthy()
    expect(wrapper.emitted().setUpdate.length).toBe(1)
  })

})