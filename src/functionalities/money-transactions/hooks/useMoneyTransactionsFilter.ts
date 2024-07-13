import { useEffect, useState } from "react";
import { useBetween } from "use-between";
import useCategoryState from "../../categories/hooks/useCategoryState";
import useMoneyAccounts from "../../money-account/hooks/useMoneyAccounts";
import { createFilterExpression } from "../money-helpers";

export type IMoneyTransactionsFilter = {
  accountId: string;
  startDate: number | null;
  endDate: number | null;
  // entityId: string;
  categoryId: string;
};
const useMoneyTransactionsFilter = () => {
  const [filterBy, setFilterBy] = useState({});
  const [startDate, setStartDate] = useState<number | null>(0);
  const [endDate, setEndDate] = useState<number | null>(0);

  const { selectedCategory } = useBetween(useCategoryState);
  const { selectedAccount } = useBetween(useMoneyAccounts);

  const [moneyTransactionFilter, setMoneyTransactionFilter] =
    useState<IMoneyTransactionsFilter>({
      accountId: "",
      startDate: 0,
      endDate: 0,
      categoryId: "",
    });

  const updateMoneyTransactionFilter = (value: IMoneyTransactionsFilter) => {
    const { accountId, startDate, endDate, categoryId } =
      moneyTransactionFilter;
    if (
      accountId !== value.accountId ||
      startDate !== value.startDate ||
      endDate !== value.endDate ||
      categoryId !== value.categoryId
    ) {
      debugger;
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
    }
  };
  const updateEndDate = (date: number | null) => {
    setEndDate(date);
    if (moneyTransactionFilter.endDate !== date) {
      updateMoneyTransactionFilter({
        ...moneyTransactionFilter,
        endDate: date,
      });
    }
  };

  useEffect(() => {
    if (!selectedCategory) {
      return;
    }
    debugger;
    if (!selectedCategory.parentId) {
      return updateMoneyTransactionFilter({
        ...moneyTransactionFilter,
        categoryId: "",
      });
    }
    updateMoneyTransactionFilter({
      ...moneyTransactionFilter,
      categoryId: selectedCategory._id,
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
  }, [selectedAccount]);

  useEffect(() => {
    debugger;
    const filterExpression = createFilterExpression(moneyTransactionFilter);
    setFilterBy(filterExpression);
  }, [moneyTransactionFilter]);

  return {
    filterBy,
    // setFilterBy,
    startDate,
    updateStartDate,
    endDate,
    updateEndDate,

    moneyTransactionFilter,
  };
};

export default useMoneyTransactionsFilter;
