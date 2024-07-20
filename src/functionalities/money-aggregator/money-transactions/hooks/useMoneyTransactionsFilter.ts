import { useEffect, useState } from "react";
import { useBetween } from "use-between";
import useCategoryState from "../../categories/hooks/useCategoryState";
import useMoneyAccounts from "../../money-account/hooks/useMoneyAccounts";
import {
  createMoneyAggregationFilterExpression,
  createMoneyTransactionsFilterExpression,
} from "../money-helpers";

export type IMoneyAggregationFilter = {
  accountId: string;
  startDate: number | null;
  endDate: number | null;
};
export type IMoneyTransactionsFilter = IMoneyAggregationFilter & {
  category_id: string;
};

const useMoneyTransactionsFilter = () => {
  const [filterBy, setFilterBy] = useState({});
  const [aggregationFilterBy, setAggregationFilterBy] = useState({});
  const [startDate, setStartDate] = useState<number | null>(0);
  const [endDate, setEndDate] = useState<number | null>(0);

  const { selectedCategory } = useBetween(useCategoryState);
  const { selectedAccount } = useBetween(useMoneyAccounts);

  const [moneyTransactionFilter, setMoneyTransactionFilter] =
    useState<IMoneyTransactionsFilter>({
      accountId: "",
      startDate: null,
      endDate: null,
      category_id: "",
    });

  const [moneyAggregationFilter, setMoneyAggregationFilter] =
    useState<IMoneyAggregationFilter>({
      accountId: "",
      startDate: null,
      endDate: null,
    });

  const updateMoneyTransactionFilter = (value: IMoneyTransactionsFilter) => {
    const { accountId, startDate, endDate, category_id } =
      moneyTransactionFilter;
    if (
      accountId !== value.accountId ||
      startDate !== value.startDate ||
      endDate !== value.endDate ||
      category_id !== value.category_id
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
        category_id: "",
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
      accountId: selectedAccount._id || "",
    });

    setMoneyAggregationFilter({
      ...moneyAggregationFilter,
      accountId: selectedAccount._id || "",
    });
  }, [selectedAccount]);

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
  };
};

export default useMoneyTransactionsFilter;
