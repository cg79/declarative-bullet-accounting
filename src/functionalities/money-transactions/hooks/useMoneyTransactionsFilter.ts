import { useState } from "react";

const useMoneyTransactionsFilter = () => {
  const [filterBy, setFilterBy] = useState({});
  const [startDate, setStartDate] = useState<number | null>(0);
  const [endDate, setEndDate] = useState<number | null>(0);

  const updateStartDate = (date: number | null) => {
    setStartDate(date);
  };
  const updateEndDate = (date: number | null) => {
    setEndDate(date);
  };

  return {
    filterBy,
    setFilterBy,
    startDate,
    updateStartDate,
    endDate,
    updateEndDate,
  };
};

export default useMoneyTransactionsFilter;
