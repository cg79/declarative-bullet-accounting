import { ILoggedUser } from '../../../_store/useIdentity';
import { utils } from '../../../_utils/utils';
import { ICategory } from '../categories/category-type';
import {
  ACCOUNT_TYPE_VALUE,
  IMoneyAccount,
} from '../money-account/money-account-type';
import { IMoneyEntity } from '../money-entity/money-entity-type';
import {
  IMoneyAggregationFilter,
  IMoneyTransactionsFilter,
} from './hooks/useMoneyTransactionsFilter';
import {
  IMoneyTransaction,
  IMoneyTransactionType,
} from './money-transaction-type';

export type FilterOperator = {
  [key: string]: string;
};

const getDefaultMoneyTransaction = (
  category: ICategory | null,
  moneyEntity: IMoneyEntity | null,
  moneyAccounts: IMoneyAccount[],
  loggedUser: ILoggedUser | null
): IMoneyTransaction => {
  const cashAcount = moneyAccounts.find(
    (account) => account.account_type === ACCOUNT_TYPE_VALUE.CASH
  );
  return {
    amount: 0,
    description: '',
    category_id: category?._id || '',
    tdate: utils.dateToEpoch(new Date()),
    addedDate: 0,
    type: IMoneyTransactionType.EXPENSE,
    accountId: cashAcount?._id || '',
    userid: loggedUser?._id || '',
    entityId: moneyEntity?._id || '',
    difs: {},
    income: 0,
    expense: 0,
  };
};

const createMoneyTransactionsFilterExpression = (
  filter: IMoneyTransactionsFilter
) => {
  const { accountId, startDate, endDate, category_id, users } = filter;
  let expression = '';
  let needAND = false;

  if (category_id) {
    if (needAND) {
      expression += ' && ';
    }
    needAND = true;

    expression += ` category_id == ${category_id}`;
  }

  if (accountId) {
    if (needAND) {
      expression += ' && ';
    }
    needAND = true;
    expression += `accountId == ${accountId}`;
  }

  if (startDate) {
    if (needAND) {
      expression += ' && ';
    }
    needAND = true;

    expression += ` tdate >= ${startDate}`;
  }

  if (endDate) {
    if (needAND) {
      expression += ' && ';
    }
    needAND = true;
    expression += `tdate <= ${endDate}`;
  }

  if (users && users.length > 0) {
    if (needAND) {
      expression += ' && ';
    }
    needAND = true;
    expression += ` (userid == ${users
      .map((el) => el.userid)
      .join(' || userid == ')})`;
  }

  return expression ? { expression } : null;
};

const createMoneyAggregationFilterExpression = (
  filter: IMoneyAggregationFilter
) => {
  const { accountId, startDate, endDate } = filter;
  let expression = '';
  let needAND = false;

  if (accountId) {
    if (needAND) {
      expression += ' && ';
    }
    needAND = true;
    expression += `accountId == ${accountId}`;
  }

  if (startDate) {
    if (needAND) {
      expression += ' && ';
    }
    needAND = true;

    expression += ` tdate >= ${startDate}`;
  }

  if (endDate) {
    if (needAND) {
      expression += ' && ';
    }
    needAND = true;
    expression += ` && tdate <= ${endDate}`;
  }

  return expression ? { expression } : {};
};

const createFilterExpressionGeneric = (
  filter: IMoneyTransactionsFilter,
  operators: FilterOperator
) => {
  let expression = '';
  let needAND = false;
  let propsCount = 0;
  let operator = ' == ';
  let filterObject = {};
  for (const [key, value] of Object.entries(filter)) {
    console.log(`${key}: ${value}`);
    if (!value) {
      continue;
    }
    propsCount++;
    if (needAND) {
      expression += ' && ';
    }
    needAND = true;
    operator = operators[key] || ' == ';
    filterObject = { ...filterObject, [key]: value };
    expression += `${key} ${operator} ${value}`;
  }

  if (propsCount === 1) {
    return filterObject;
  }
  return expression ? { expression } : {};
};

export {
  getDefaultMoneyTransaction,
  createMoneyTransactionsFilterExpression,
  createMoneyAggregationFilterExpression,
  createFilterExpressionGeneric,
};
