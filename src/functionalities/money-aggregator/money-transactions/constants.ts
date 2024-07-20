import { ILoggedUser } from "../../../_store/useIdentity";
import { IMoneyEntity } from "../money-entity/money-entity-type";

const MONEY_TRANSACTIONS_COLLECTION = (
  user: ILoggedUser,
  selectedMoneyEntity: IMoneyEntity | null
) => {
  return selectedMoneyEntity && selectedMoneyEntity._id
    ? `money_transactions_${selectedMoneyEntity._id}`
    : `money_transactions_${user?.clientId}`;
};
export { MONEY_TRANSACTIONS_COLLECTION };
