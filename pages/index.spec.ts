import { shallowMount, mount } from '@vue/test-utils';
import page from './index.vue';
import getLocalVue from '~/test-utils/localVue';
import getContext from '~/test-utils/context';
import { Store } from 'vuex';
import VueRouter from 'vue-router';

describe('page index', () => {

  const getData = () => ([{
    id: 'fc7f8213',
    date: '2019-08-12T09:18:30Z',
    amount: 1324.00,
    merchant: 'vitales',
    currency: 'DKK',
    categoryName: 'Food',
    parentId: null,
    status: {
      stage: 'Submitted',
    },
    approved: true,
  }]);

  const getStore = (nodes: any[] = []) => {
    const onLoad = jest.fn();
    return {
      onLoad,
      store: new Store({
        modules: {
          LocalStorage: {
            namespaced: true,
            state: () => ({
              expenses: [],
            }),
            actions: {
              setExpenses: jest.fn(),
            },
          },
          expenses: {
            namespaced: true,
            state: () => ({
              nodes,
              limit: 10,
              page: 1,
              sortBy: null,
              sortByDescending: false,
            }),
            actions: {
              loadItems: onLoad,
              setPage: jest.fn(),
              toggleSortBy: jest.fn(),
            },
            getters: {
              sortedItems: () => [],
              total: () => 0,
            },
          },
        },
      }),
    };
  };

  const getRouter = (onPushCall) => {
    const onPush = jest.fn((path) => {
      onPushCall(path);
    });
    const RouterMock = jest.fn<VueRouter, any>().mockImplementation(() => ({
      push: onPush,
    } as any));
    return {
      onPush,
      router: new RouterMock(),
    };
  };

  test('should mounts properly', () => {
    const localVue = getLocalVue();
    const { store } = getStore();
    const wrapper = shallowMount(page, {
      localVue,
      store,
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('should renders properly with no data', () => {
    const localVue = getLocalVue();
    const { store } = getStore();
    const wrapper = mount(page, {
      localVue,
      store,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should renders properly with data', () => {
    const localVue = getLocalVue();
    const { store } = getStore(getData());
    const wrapper = mount(page, {
      localVue,
      store,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should call fetch', async () => {
    const localVue = getLocalVue();
    const { store, onLoad } = getStore();
    const wrapper = shallowMount(page, {
      localVue,
      store,
    });
    await wrapper.vm.$options.fetch!(getContext(store));
    expect(onLoad).toBeCalled();
  });

  // test('should open page node/1', async () => {
  //   const localVue = getLocalVue();
  //   const { store } = getStore(getData());
  //   let route;
  //   const { router, onPush } = getRouter(r => route = r);
  //   const wrapper = mount(page, {
  //     localVue,
  //     store,
  //     mocks: {
  //       $router: router,
  //     },
  //   });
  //   await wrapper.vm.$options.fetch!(getContext(store));
  //   const node = wrapper.find('tbody tr.lc-pointer');
  //   node.trigger('click');
  //   expect(onPush).toBeCalled();
  //   expect(route.path).toBe('/node/1');
  // });
});
