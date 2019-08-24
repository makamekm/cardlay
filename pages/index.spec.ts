import { shallowMount, mount } from '@vue/test-utils';
import page from './index.vue';
import getLocalVue from '~/test-utils/localVue';
import getContext from '~/test-utils/context';

describe('page index', () => {
  test('should mounts properly', () => {
    const localVue = getLocalVue();
    const wrapper = shallowMount(page, {
      localVue,
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('should renders properly with no data', () => {
    const localVue = getLocalVue();
    const wrapper = mount(page, {
      localVue,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
