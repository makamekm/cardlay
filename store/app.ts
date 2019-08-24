import { StoreOptions } from 'vuex';
import * as debounce from 'debounce';

export interface AppState {
  [x: string]: any;
  isLoading: boolean;
}

const store: StoreOptions<AppState> = {
  state: () => ({
    isLoading: false,
  }),
  actions: {
    setLoading: debounce(({ commit, rootState }, isLoading) => {
      commit('setLoading', isLoading);
    }, 600),
  },
  mutations: {
    setLoading: (state, isLoading) => state.isLoading = isLoading,
  },
};

export default store;
