import { utils } from "../../../_utils/utils";
import { ICategory } from "../categories/category-type";
import { IMoneyEntity } from "./money-entity-type";

const getDefaultMoneyEntity = (): IMoneyEntity => {
  return {
    description: "",
    date: utils.dateToEpoch(new Date()),
    name: "",
  };
};

export { getDefaultMoneyEntity };
