import { ILoggedUser } from "../../_store/useIdentity";
import { utils } from "../../_utils/utils";
import { ACCOUNT_TYPE_VALUE, IMoneyAccount } from "./money-account-type";

const getDefaultMoneyEntity = (
  loggedUser: ILoggedUser | null
): IMoneyAccount => {
  return {
    description: "",
    date: utils.dateToEpoch(new Date()),
    name: "",
    amount: 0,
    account_type: ACCOUNT_TYPE_VALUE.CASH,
    _id: "",
    userid: loggedUser?._id || "",
    nick: loggedUser?.nick || "",
  };
};

export { getDefaultMoneyEntity };
