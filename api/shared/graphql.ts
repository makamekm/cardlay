
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export interface Expenses {
    id: string;
    date?: string;
    amount?: number;
    merchant?: string;
    currency?: string;
    categoryName?: string;
    parentId?: string;
    status?: ExpensesStatus;
}

export interface ExpensesStatus {
    stage: string;
}

export interface IQuery {
    expenses(): Expenses[] | Promise<Expenses[]>;
}
