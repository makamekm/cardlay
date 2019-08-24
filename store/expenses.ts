import { StoreOptions } from 'vuex';
import Sifter from 'sifter';
import { Expenses } from '~/api/shared/graphql';

export interface ExpensesState {
  [x: string]: any;
  items: Expenses[];
  search: string;
  sortBy: string;
  sortByDescending: boolean;
  page: number;
  limit: number;
}

const store: StoreOptions<ExpensesState> = {
  state: () => ({
    items: [],
    search: '',
    sortBy: null,
    sortByDescending: false,
    page: 1,
    limit: 10,
  }),
  getters: {
    sortedItems: state => {
      const sifter = new Sifter(state.items);
      const offset = (state.page - 1) * state.limit;
      return sifter.search(state.search, {
        fields: ['merchant', 'currency', 'categoryName', 'amount', 'date'],
        sort: [
          {
            field: state.sortBy, direction: state.sortByDescending ? 'desc' : 'asc',
          },
        ],
      }).items.map(i => state.items[i.id]).slice(offset, state.limit + offset);
    },
    total: state => {
      const sifter = new Sifter(state.items);
      return sifter.search(state.search, {
        fields: ['merchant', 'currency', 'categoryName', 'amount', 'date'],
        sort: [
          {
            field: state.sortBy, direction: state.sortByDescending ? 'desc' : 'asc',
          },
        ],
      }).items.map(i => state.items[i.id]).length;
    },
  },
  actions: {
    setPage({ commit, state }, page) {
      commit('setPage', page);
    },
    toggleSortBy({ commit, state }, sortBy) {
      if (state.sortBy === sortBy && state.sortByDescending === false) {
        commit('setSortByDescending', !state.sortByDescending);
      } else if (state.sortBy === sortBy) {
        commit('setSortBy', null);
        commit('setSortByDescending', false);
      } else {
        commit('setSortBy', sortBy);
        commit('setSortByDescending', false);
      }
    },
    setSortByDescending({ commit, state }, sortByDescending) {
      commit('setSortByDescending', sortByDescending);
    },
    async loadItems({ commit, rootState }) {
      const { data: {data: {expenses}} } = await this.$axios.post(`/graphql`, {
        query: `{
          expenses {
            id
            date
            amount
            merchant
            currency
            categoryName
            parentId
            status {
              stage
            }
          }
        }`,
      });
      commit('setItems', expenses.map(e => ({
        ...e,
        approved: e.status.stage === 'Submitted',
      })));
    },
  },
  mutations: {
    setItems: (state, items) => state.items = items,
    setPage: (state, page) => state.page = page,
    setSortBy: (state, sortBy) => state.sortBy = sortBy,
    setSortByDescending: (state, value) => state.sortByDescending = value,
  },
};

export default store;
