export enum IMoneyTransactionType {
  INCOME = 1,
  EXPENSE = 2,
  TRANSFER = 3,
}

export enum IMoneyTransactionTypeIcons {
  INCOME = 'pi pi-caret-left',
  EXPENSE = 'pi pi-caret-right',
  TRANSFER = 'pi pi-arrow-right-arrow-left',
}
export interface IMoneyTransaction {
  _id?: string;
  tdate: number;
  category_id: string;
  description: string;
  amount: number;
  income: number;
  expense: number;
  addedDate: number;
  type: IMoneyTransactionType;
  accountId: string;
  accountAmount?: number;
  userid: string;
  entityId?: string;
  difs?: any;
  username?: string;
  touserid?: string;
  touseraccountid?: string;
}

export const moneyTransactionOptionTypes = [
  {
    icon: 'pi pi-caret-right',
    value: IMoneyTransactionType.EXPENSE,
    label: 'Expense',
  },
  {
    icon: 'pi pi-caret-left',
    value: IMoneyTransactionType.INCOME,
    label: 'Income',
  },
  {
    icon: 'pi pi-arrow-right-arrow-left',
    value: IMoneyTransactionType.TRANSFER,
    label: 'Transfer',
  },
];

export type IMoneyFilterBy = {
  expression: string;
} | null;
