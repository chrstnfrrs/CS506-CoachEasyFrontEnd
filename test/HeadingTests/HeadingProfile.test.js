import Vue from 'vue'
import Vuetify from 'vuetify'
import { shallowMount} from '@vue/test-utils'
import HeadingProfile from '@/components/HeadingProfile.vue'

Vue.use(Vuetify)

//A helper function that mounts the component
function getMountedComponent(Component, propsData) {
  return shallowMount(Component, {propsData})
}

describe('HeadingProfile', () => {
  let vuetify
  let wrapper;

  beforeAll(() => {
    vuetify = new Vuetify()
  })

  afterAll(() => {
    wrapper.destroy()
  })

  test('has no default value', () => {
    wrapper = getMountedComponent(HeadingProfile, {name : ''})
    expect(wrapper.props().name).toBe('')
  })

  test('shows the provided message', () => {
    wrapper = getMountedComponent(HeadingProfile, {name : 'test'})
    expect(wrapper.props().name).toBe('test')
  })

  test('updates the rendered message when wrapper.name updates', async () => {
    const wrapper = getMountedComponent(HeadingProfile, { name: 'old test' })
    wrapper.setProps({name: 'new test'})

    await wrapper.vm.$nextTick()
    expect(wrapper.props().name).toBe('new test')
  })
})