import { useEffect, useState } from 'react';
import useCategoryState from '../../categories/hooks/useCategoryState';
import useMoneyAccounts from '../../money-account/hooks/useMoneyAccounts';
import {
  createMoneyAggregationFilterExpression,
  createMoneyTransactionsFilterExpression,
} from '../money-helpers';
import { IEntityInvitation } from '../../entity-invitations/entity-invitation-type';
import { useBetween } from 'src/hooks/useBetween';

export type IMoneyAggregationFilter = {
  accountId: string;
  startDate: number | null;
  endDate: number | null;
  users: IEntityInvitation[];
};
export type IMoneyTransactionsFilter = IMoneyAggregationFilter & {
  category_id: string;
};

const useMoneyTransactionsFilter = () => {
  const [filterBy, setFilterBy] = useState({});
  const [aggregationFilterBy, setAggregationFilterBy] = useState({});
  const [startDate, setStartDate] = useState<number | null>(0);
  const [endDate, setEndDate] = useState<number | null>(0);
  const [selectedUsers, setSelectedUsers] = useState<IEntityInvitation[]>([]);

  const { selectedCategory } = useBetween(useCategoryState);
  const { selectedAccount } = useBetween(useMoneyAccounts);

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
    arr1: IEntityInvitation[],
    arr2: IEntityInvitation[]
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
    debugger;
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

  useEffect(() => {
    const filterExpression = createMoneyAggregationFilterExpression(
      moneyTransactionFilter
    );
    setAggregationFilterBy(filterExpression);
  }, [moneyAggregationFilter]);

  return {
    filterBy,
    // setFilterBy,
    startDate,
    updateStartDate,
    endDate,
    updateEndDate,

    // moneyTransactionFilter,
    aggregationFilterBy,
    setSelectedUsers,
  };
};

export default useMoneyTransactionsFilter;
