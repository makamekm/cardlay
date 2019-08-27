<template>
  <div>
    <div class="hero is-primary p-b-6 p-t-6 p-l-7 p-r-7 on-appear-slide-down on-delay-0">
      <div class="has-text-weight-bold is-size-5" style="letter-spacing: 1px">
        Expenses
      </div>
    </div>

    <div class="table-container on-appear-slide-up on-delay-1">
      <table class="table is-striped is-fullwidth">
        <thead>
          <tr class="on-appear-scale-left on-delay-3">
            <th>Date</th>
            <th class="interactable" @click="onToggleSortBy('merchant')">
              <div class="columns is-mobile is-vcentered">
                <div class="column">
                  Merchant
                </div>
                <div class="column is-narrow font-size-0">
                  <i :class="{
                    'i is-size-6': true,
                    'sort': sortBy !== 'merchant',
                    'sort-up': sortBy === 'merchant' && !sortByDescending,
                    'sort-down': sortBy === 'merchant' && sortByDescending
                  }"></i>
                </div>
              </div>
            </th>
            <th class="interactable" @click="onToggleSortBy('categoryName')">
              <div class="columns is-mobile is-vcentered">
                <div class="column">
                  Category
                </div>
                <div class="column is-narrow font-size-0">
                  <i :class="{
                    'i is-size-6': true,
                    'sort': sortBy !== 'categoryName',
                    'sort-up': sortBy === 'categoryName' && !sortByDescending,
                    'sort-down': sortBy === 'categoryName' && sortByDescending
                  }"></i>
                </div>
              </div>
            </th>
            <th class="interactable" @click="onToggleSortBy('amount')">
              <div class="columns is-mobile is-vcentered is-variable is-3">
                <div class="column has-text-right">
                  Amount
                </div>
                <div class="column is-narrow font-size-0">
                  <i :class="{
                    'i is-size-6': true,
                    'sort': sortBy !== 'amount',
                    'sort-up': sortBy === 'amount' && !sortByDescending,
                    'sort-down': sortBy === 'amount' && sortByDescending
                  }"></i>
                </div>
              </div>
            </th>
            <th class="has-text-right">Valuta</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            :class="'on-appear-scale-left on-delay-' + (index < 10 ? (index + 1) : 11)"
            v-for="(item, index) in data"
            v-bind:key="item.id">
              <td>{{parseDate(item.date)}}</td>
              <td class="p-t-2 p-b-2 p-r-2 p-l-2">
                <div class="columns is-mobile is-vcentered is-gapless">
                  <div class="column is-narrow">
                    <merchant-icon class="p-l-4 p-r-4" :value="getAltValue(item, 'merchant')"/>
                  </div>
                  <div class="column">
                    <inline-edit-text
                      :value="getAltValue(item, 'merchant')"
                      @change="setValue(item, 'merchant', $event)"/>
                  </div>
                </div>
              </td>
              <td class="p-t-2 p-b-2 p-r-2 p-l-2">
                <inline-edit-select
                  placeholder="Select Category"
                  :value="getAltValue(item, 'categoryName')"
                  @change="setValue(item, 'categoryName', $event.key)"
                  :items="[
                    {key: 'Transport', label: 'Transport'},
                    {key: 'Food', label: 'Food'},
                    {key: 'Car Rental', label: 'Car Rental'},
                    {key: 'Petrol & Services', label: 'Petrol & Services'},
                    {key: 'Hotel & Accomodation', label: 'Hotel & Accomodation'},
                    {key: 'Parking', label: 'Parking'},
                  ]"
                />
              </td>
              <td class="has-text-right"><b>{{item.amount}}</b></td>
              <td class="has-text-right is-uppercase"><b>{{item.currency}}</b></td>
              <td>
                <toggle-box
                  placeholder-true="Approve"
                  placeholder-false="Decline"
                  :value="getAltValue(item, 'approved')"
                  @change="setValue(item, 'approved', $event)"
                />
              </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="6" class="p-t-8 p-b-8 has-text-centered">
              <div class="columns is-mobile is-centered on-appear-slide-up on-delay-4">
                <div class="column is-one-third">
                  <b-pagination
                    :total="total"
                    :current="page"
                    @change="onChangePage($event)"
                    icon-pack="fa"
                    :per-page="limit"
                    aria-next-label="Next page"
                    aria-previous-label="Previous page"
                    aria-page-label="Page"
                    aria-current-label="Current page">
                  </b-pagination>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import InlineEditText from '../components/inline-edit-text.vue';
import InlineEditSelect from '../components/inline-edit-select.vue';
import ToggleBox from '../components/toggle-box.vue';
import MerchantIcon from '../components/merchant-icon.vue';
import { Component, Vue, Prop, Inject } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const ExpensesStore = namespace('expenses');
const LocalStorage = namespace('localStorage');

@Component({
  components: {
    InlineEditText,
    InlineEditSelect,
    ToggleBox,
    MerchantIcon,
  },
  fetch: async props => props.store.dispatch('expenses/loadItems'),
})
export default class extends Vue {
  @ExpensesStore.Getter('sortedItems') data;
  @ExpensesStore.Getter('total') total;
  @ExpensesStore.State('limit') limit;
  @ExpensesStore.State('page') page;
  @ExpensesStore.State('sortBy') sortBy;
  @ExpensesStore.State('sortByDescending') sortByDescending;
  @ExpensesStore.Action('setPage') onChangePage;
  @ExpensesStore.Action('toggleSortBy') onToggleSortBy;
  @LocalStorage.State('expenses') expenses;
  @LocalStorage.Action('setExpenses') setExpenses;

  getAltValue(item, key: string) {
    const rowEdited = this.expenses.find(r => r.id === item.id);
    return rowEdited && rowEdited[key] !== undefined ? rowEdited[key] : item[key];
  }

  setValue(item, key: string, value) {
    let expenses = this.expenses.map(r => r);
    let rowEdited = this.expenses.find(r => r.id === item.id);
    if (!rowEdited) {
      rowEdited = { id: item.id };
      expenses.push(rowEdited);
    } else {
      rowEdited = { ...rowEdited };
    }
    rowEdited[key] = value;
    expenses = expenses.map(r => r.id === rowEdited.id ? rowEdited : r);
    this.setExpenses(expenses);
  }

  standartTwoDigits(str: string) {
    return str.length < 2 ? ('0' + str) : str;
  }

  parseDate(dateStr: string) {
    const date = new Date(Date.parse(dateStr));
    return `${this.standartTwoDigits(String(date.getDate() + 1))}`
      + `/${this.standartTwoDigits(String(date.getMonth() + 1))}`
      + `/${this.standartTwoDigits(String(date.getFullYear()))}`;
  }
}
</script>

<style lang="scss">
  table {
    table-layout: auto;
  }

  th, td {
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: middle;

    &:nth-child(1) {
      min-width: 10rem;
    }

    &:nth-child(2) {
      min-width: 20rem;
    }

    &:nth-child(3) {
      min-width: 10rem;
    }

    &:nth-child(4) {
      min-width: 9rem;
    }

    &:nth-child(5) {
      min-width: 6rem;
    }

    &:nth-child(6) {
      min-width: 10rem;
    }
  }
</style>