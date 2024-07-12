export enum IMoneyTransactionType {
  INCOME = 1,
  EXPENSE = 2,
  TRANSFER = 3,
}
export interface IMoneyTransaction {
  _id?: string;
  date: number;
  category_id: string;
  parentIds: string[];
  description: string;
  amount: number;
  addedDate: number;
  type: IMoneyTransactionType;
  entityId: string;
  accountId: string;
}

export const moneyTransactionOptionTypes = [
  {
    icon: "pi pi-caret-right",
    value: IMoneyTransactionType.EXPENSE,
    label: "add",
  },
  {
    icon: "pi pi-caret-left",
    value: IMoneyTransactionType.INCOME,
    label: "Tranzactie de cheltuiala",
  },
  {
    icon: "pi pi-arrow-right-arrow-left",
    value: IMoneyTransactionType.TRANSFER,
    label: "Tranzactie de transfer",
  },
];
