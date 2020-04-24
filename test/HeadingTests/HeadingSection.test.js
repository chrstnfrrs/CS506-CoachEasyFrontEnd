import Vue from 'vue'
import Vuetify from 'vuetify'
import { shallowMount} from '@vue/test-utils'
import HeadingSection from '@/components/HeadingSection.vue'

Vue.use(Vuetify)

//A helper function that mounts the component
function getMountedComponent(Component, propsData) {
  return shallowMount(Component, {propsData})
}

describe('HeadingSection', () => {
  let vuetify

  beforeAll(() => {
    vuetify = new Vuetify()
  })

  afterAll(() => {
    wrapper.destroy()
  })

  test('has no default value', () => {
    expect(getMountedComponent(HeadingSection, {}).text()).toBe('')
  })

  test('shows the provided message', () => {
    expect(getMountedComponent(HeadingSection, {text: 'test'}).text()).toBe('test')
  })

  test('updates the rendered message when wrapper.name updates', async () => {
    const wrapper = getMountedComponent(HeadingSection, { text: 'old test' })
    wrapper.setProps({text: 'new test'})

    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toBe('new test')
  })
})