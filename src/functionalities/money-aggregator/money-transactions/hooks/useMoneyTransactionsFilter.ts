import { useEffect, useState } from 'react';
import useCategoryState from '../../categories/hooks/useCategoryState';
import useMoneyAccounts from '../../money-account/hooks/useMoneyAccounts';
import {
  createMoneyAggregationFilterExpression,
  createMoneyTransactionsFilterExpression,
} from '../money-helpers';
import { useBetween } from '../../../../hooks/useBetween';
import { EntityUser } from '../../../user/types';
import useApi from '../../../../hooks/useApi';
import useIdentity from '../../../../_store/useIdentity';
import { IMoneyFilterBy } from '../money-transaction-type';

export type IMoneyAggregationFilter = {
  accountId: string;
  startDate: number | null;
  endDate: number | null;
  users: EntityUser[];
};
export type IMoneyTransactionsFilter = IMoneyAggregationFilter & {
  category_id: string;
};

const useMoneyTransactionsFilter = () => {
  const { loggedUser } = useBetween(useIdentity);
  const { executeMethodFromModule } = useApi();
  const { selectedCategory } = useBetween(useCategoryState);
  const { selectedAccount } = useBetween(useMoneyAccounts);

  const [filterBy, setFilterBy] = useState<IMoneyFilterBy>(null);
  const [aggregationFilterBy, setAggregationFilterBy] = useState({});
  const [startDate, setStartDate] = useState<number | null>(0);
  const [endDate, setEndDate] = useState<number | null>(0);
  const [selectedUsers, setSelectedUsers] = useState<EntityUser[]>([]);

  const [moneyTransactionFilter, setMoneyTransactionFilter] =
    useState<IMoneyTransactionsFilter>({
      accountId: '',
      startDate: null,
      endDate: null,
      category_id: '',
      users: [],
    });

  const [moneyAggregationFilter, setMoneyAggregationFilter] =
    useState<IMoneyAggregationFilter>({
      accountId: '',
      startDate: null,
      endDate: null,
      users: [],
    });

  const twoArraysContainsTheSameElements = (
    arr1: EntityUser[],
    arr2: EntityUser[]
  ) => {
    if (arr1.length !== arr2.length) {
      return false;
    }

    arr1.forEach((el) => {
      if (!arr2.find((a2) => a2._id === el._id)) {
        return false;
      }
    });

    return true;
  };

  const updateMoneyTransactionFilter = (value: IMoneyTransactionsFilter) => {
    const { accountId, startDate, endDate, category_id, users } =
      moneyTransactionFilter;

    const needUpdate = !twoArraysContainsTheSameElements(
      selectedUsers,
      moneyTransactionFilter.users
    );

    if (
      accountId !== value.accountId ||
      startDate !== value.startDate ||
      endDate !== value.endDate ||
      category_id !== value.category_id ||
      needUpdate
    ) {
      setMoneyTransactionFilter(value);
    }
  };

  const updateStartDate = (date: number | null) => {
    setStartDate(date);
    if (moneyTransactionFilter.startDate !== date) {
      updateMoneyTransactionFilter({
        ...moneyTransactionFilter,
        startDate: date,
      });

      setMoneyAggregationFilter({
        ...moneyAggregationFilter,
        startDate: date,
      });
    }
  };
  const updateEndDate = (date: number | null) => {
    setEndDate(date);
    if (moneyTransactionFilter.endDate !== date) {
      updateMoneyTransactionFilter({
        ...moneyTransactionFilter,
        endDate: date,
      });

      setMoneyAggregationFilter({
        ...moneyAggregationFilter,
        endDate: date,
      });
    }
  };

  useEffect(() => {
    if (!selectedCategory) {
      return;
    }
    if (!selectedCategory.parentId) {
      return updateMoneyTransactionFilter({
        ...moneyTransactionFilter,
        category_id: '',
      });
    }
    updateMoneyTransactionFilter({
      ...moneyTransactionFilter,
      category_id: selectedCategory._id,
    });
  }, [selectedCategory]);

  useEffect(() => {
    if (!selectedAccount) {
      return;
    }
    if (moneyTransactionFilter.accountId === selectedAccount._id) {
      return;
    }

    updateMoneyTransactionFilter({
      ...moneyTransactionFilter,
      accountId: selectedAccount._id || '',
    });

    setMoneyAggregationFilter({
      ...moneyAggregationFilter,
      accountId: selectedAccount._id || '',
    });
  }, [selectedAccount]);

  useEffect(() => {
    if (!selectedUsers) {
      return;
    }

    updateMoneyTransactionFilter({
      ...moneyTransactionFilter,
      users: selectedUsers,
    });
  }, [selectedUsers]);

  useEffect(() => {
    const filterExpression = createMoneyTransactionsFilterExpression(
      moneyTransactionFilter
    );
    setFilterBy(filterExpression);
  }, [moneyTransactionFilter]);

  // const callAggregateAmountByCategory = (
  //   entityId: string | undefined,
  //   filterBy: IMoneyFilterBy
  // ) => {
  //   if (!loggedUser) {
  //     return Promise.resolve({
  //       success: false,
  //       message: 'Nu sunteti autentificat',
  //     });
  //   }
  //   const body: any = {};
  //   if (entityId) {
  //     body.entityId = entityId;
  //   }
  //   if (filterBy) {
  //     body.filterBy = filterBy;
  //   }
  //   executeMethodFromModule({
  //     method: 'aggregateAmountByCategory',
  //     moduleName: 'accounting',

  //     body,
  //   }).then((response) => {
  //     if (!response.success) {
  //       return null;
  //     }
  //     return response.data;
  //   });
  // };

  return {
    filterBy,
    aggregationFilterBy,
    // setFilterBy,
    startDate,
    updateStartDate,
    endDate,
    updateEndDate,

    // moneyTransactionFilter,

    setSelectedUsers,
    // callAggregateAmountByCategory,
  };
};

export default useMoneyTransactionsFilter;
