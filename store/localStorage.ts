import { StoreOptions } from 'vuex';
import { Expenses } from '~/api/shared/graphql';

export interface LocalStorageState {
  [x: string]: any;
  expenses: Expenses[];
}

const store: StoreOptions<LocalStorageState> = {
  state: () => ({
    expenses: [],
  }),
  actions: {
    setExpenses({ commit, state }, expenses) {
      commit('setExpenses', expenses);
    },
  },
  mutations: {
    setExpenses: (state, expenses) => state.expenses = expenses,
  },
};

export default store;
