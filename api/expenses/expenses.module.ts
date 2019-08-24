import { Module } from '@nestjs/common';
import { ExpensesResolver } from './expenses.resolver';

@Module({
  providers: [
    ExpensesResolver,
  ],
})
export class ExpensesModule {}
