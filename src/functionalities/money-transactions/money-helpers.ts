import { utils } from "../../_utils/utils";
import { ICategory } from "../categories/category-type";
import {
  ACCOUNT_TYPE_VALUE,
  IMoneyAccount,
} from "../money-account/money-account-type";
import { IMoneyEntity } from "../money-entity/money-entity-type";
import {
  IMoneyTransaction,
  IMoneyTransactionType,
} from "./money-transaction-type";

const getDefaultMoneyTransaction = (
  category: ICategory | null,
  moneyEntity: IMoneyEntity | null,
  moneyAccounts: IMoneyAccount[]
): IMoneyTransaction => {
  const cashAcount = moneyAccounts.find(
    (account) => account.account_type === ACCOUNT_TYPE_VALUE.CASH
  );
  return {
    amount: 0,
    description: "",
    category_id: category?._id || "",
    parentIds: category?.parentIds || [],
    date: utils.dateToEpoch(new Date()),
    addedDate: 0,
    type: IMoneyTransactionType.EXPENSE,
    entityId: moneyEntity?._id || "",
    accountId: cashAcount?._id || "",
  };
};

export { getDefaultMoneyTransaction };
