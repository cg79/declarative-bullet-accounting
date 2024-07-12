import { ILoggedUser } from "../../_store/useIdentity";
import { IMoneyEntity } from "../money-entity/money-entity-type";

const CATEGORY_COLLECTION = (
  loggedUser: ILoggedUser,
  selectedMoneyEntity: IMoneyEntity | null
) => {
  return selectedMoneyEntity && selectedMoneyEntity._id
    ? `categories_${selectedMoneyEntity._id}`
    : `categories_${loggedUser.clientId || ""}`;
  // return `categories_${loggedUser.clientId || ""}`;
};

const SHORTCUT_ACTIONS = {
  ADD_NODE: "addNode",
  EDIT: "edit",
  DELETE: "delete",
  ARROW_DOWN: "arrowDown",
  ARROW_UP: "arrowUp",
  ARROW_LEFT: "arrowLeft",
  ARROW_RIGHT: "arrowRight",
  ICON: "icon",
  ADD_TRANSACTION: "add",
};

export { CATEGORY_COLLECTION, SHORTCUT_ACTIONS };
