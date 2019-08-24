import { Resolver, Query, Args, ResolveProperty, Parent } from '@nestjs/graphql';
import { Expenses } from '../shared/graphql';
import expenses from './expenses.json.js';

@Resolver('Expenses')
export class ExpensesResolver {

  @Query()
  async expenses(): Promise<Expenses[]> {
    return expenses;
  }
}
