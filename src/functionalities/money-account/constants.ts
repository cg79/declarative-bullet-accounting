import { ILoggedUser } from "../../_store/useIdentity";

const MONEY_ACCOUNT_COLLECTION = (user: ILoggedUser) => {
  return `money_account_${user?.clientId}`;
};

export { MONEY_ACCOUNT_COLLECTION };
