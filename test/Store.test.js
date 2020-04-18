import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import * as storeConfig from '@/store/index.js'
import { cloneDeep } from 'lodash'

describe('Store', () => {
  var store;

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    store = new Vuex.Store(cloneDeep(storeConfig))
  })
  
  test('Changes "loggedIn" value to true when logIn is called', () => {    
    expect(store.state.loggedIn).toBe(false)
    store.commit('logIn')
    expect(store.state.loggedIn).toBe(true)
  })

  test('Changes "loggedIn" value to false when logOut is called', () => {    
    expect(store.state.loggedIn).toBe(false)
    store.commit('logIn')
    expect(store.state.loggedIn).toBe(true)
    store.commit('logOut')
    expect(store.state.loggedIn).toBe(false)
  })

  test('Toggles "edit" value when editStatus is called', () => {    
    expect(store.state.edit).toBe(false)
    store.commit('editStatus')
    expect(store.state.edit).toBe(true)
    store.commit('editStatus')
    expect(store.state.edit).toBe(false)
  })

  test('Changes "edit" value to false when noEdit is called', () => {    
    expect(store.state.edit).toBe(false)
    store.commit('editStatus')
    expect(store.state.edit).toBe(true)
    store.commit('noEdit')
    expect(store.state.edit).toBe(false)
  })
  
  test('Changes "userData" value to given data when setUserData is called', () => {    
    expect(store.state.userData).toMatchObject({})
    const data = {
      "approved": true,
      "check_in": false,
      "coach_id": 1,
      "email": "test@email.com",
      "first_name": "test",
      "id": 1,
      "last_name": "person",
      "role": "COACH",
      "verified": true
    }
    store.commit('setUserData', data)
    expect(store.state.userData).toBe(data)
  })
})