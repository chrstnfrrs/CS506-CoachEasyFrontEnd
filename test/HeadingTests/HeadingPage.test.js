import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { shallowMount, createLocalVue} from '@vue/test-utils'

Vue.use(Vuetify)

import HeadingPage from '@/components/HeadingPage.vue'

describe('HeadingPage', () => {
  let state;
  let store;
  let wrapper;
  let localVue;
  let $router;

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)

    state = {
      loggedIn: true,
      userData: {"first_name": "firstName", "role": "COACH"}
    }

    $router = { query : {reset_token : "test"}, currentRoute : {name : "testRoute"}}

    store = new Vuex.Store({ state })
    wrapper = shallowMount(HeadingPage, 
      { store, localVue, propsData: 
        { name: 'testName', message: 'testMessage', status: 'testStatus' }, mocks: { $router }})
  })

  test('sets the correct default values', () => {
    expect(typeof HeadingPage.data).toBe('function')
    const defaultData = HeadingPage.data()
    
    expect(defaultData.role).toBe('')
    expect(defaultData.buttonPages).toMatchObject(['template','template-id'])
  })

  test('takes name as a prop', () => {
    expect(wrapper.props().name).toBe('testName')
  })

  test('takes message as a prop', () => {
    expect(wrapper.props().message).toBe('testMessage')
  })

  test('takes status as a prop', () => {
    expect(wrapper.props().status).toBe('testStatus')
  })

  test('takes status as a prop', () => {
    expect(wrapper.props().status).toBe('testStatus')
  })

  test('emits a sendRequest when save is called', () => {
    wrapper.vm.save()
    expect(wrapper.emitted().sendRequest).toBeTruthy()
    expect(wrapper.emitted().sendRequest.length).toBe(1)
  })

  test('emits a updateStatus when update status is called', () => {
    wrapper.vm.updateStatus()
    expect(wrapper.emitted().updateStatus).toBeTruthy()
    expect(wrapper.emitted().updateStatus.length).toBe(1)
  })

  test('checks if the user is a coach before adding buttons', () => {
    let route = $router.currentRoute.name;
    wrapper.setData({ buttonPages: ['template', 'template-id', route] })
    expect(wrapper.vm.hasButton()).toBeTruthy()
  })
})