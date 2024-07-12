import { ILoggedUser } from "../../_store/useIdentity";

const MONEY_ENTITY_COLLECTION = (user: ILoggedUser) => {
  return `money_entity_${user?.clientId}`;
};
export { MONEY_ENTITY_COLLECTION };
