import { utils } from "../../_utils/utils";
import { ACCOUNT_TYPE_VALUE, IMoneyAccount } from "./money-account-type";

const getDefaultMoneyEntity = (): IMoneyAccount => {
  return {
    description: "",
    date: utils.dateToEpoch(new Date()),
    name: "",
    amount: 0,
    account_type: ACCOUNT_TYPE_VALUE.CASH,
    _id: "",
  };
};

export { getDefaultMoneyEntity };
