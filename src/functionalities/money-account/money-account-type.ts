enum ACCOUNT_TYPE_VALUE {
  CASH = 1,
  DEBIT = 2,
  CREDIT = 3,
  ECONOMY = 4,
}
const ACCOUNT_TYPES = [
  { value: ACCOUNT_TYPE_VALUE.CASH, label: "Cash" },
  { value: ACCOUNT_TYPE_VALUE.DEBIT, label: "Debit" },
  { value: ACCOUNT_TYPE_VALUE.CREDIT, label: "Credit" },
  { value: ACCOUNT_TYPE_VALUE.ECONOMY, label: "Economy" },
];

// export type IMoneyAccountType =
//   | "card"
//   | "cash"
//   | "credit_card"
//   | "credit"
//   | "other";
export interface IMoneyAccount {
  _id?: string;
  date: number;
  name: string;
  amount: number;
  account_type: ACCOUNT_TYPE_VALUE;
  description: string;
}
export { ACCOUNT_TYPES, ACCOUNT_TYPE_VALUE };
