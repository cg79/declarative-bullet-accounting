import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { ddOptions } from "../functionalities/transactions/constants/dd-options";

const useFilters = () => {
  const [filters, setFilters] = useState<any>(ddOptions);
  const [showFilters, setShowFilters] = React.useState<boolean>(false);
  const [startDate, setStartDate] = React.useState<number | null>(null);
  const [endDate, setEndDate] = React.useState<number | null>(null);
  const [expression, setExpression] = React.useState<string>("");
  const [include, setInclude] = useState(true);
  const [checkedFilters, setCheckedFilters] = useState<any>([]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const toggleFilter = (el: any) => {
    const updatedFilters = filters.map((filter) => {
      if (filter.value === el.value) {
        return {
          ...filter,
          checked: !filter.checked,
        };
      }
      return filter;
    });
    setFilters(updatedFilters);
  };

  const deselectFilter = (el: any) => {
    const updatedFilters = filters.map((filter) => {
      if (filter.value === el.value) {
        return {
          ...filter,
          checked: false,
        };
      }
      return filter;
    });
    setFilters(updatedFilters);
  };

  const composeExpression = useCallback(() => {
    const includeOrExclude = include ? "==" : "!=";
    let expressionValue = filters
      .filter((el) => el["checked"])
      .map(
        (el) =>
          `trace.accountingRequest.operationid${includeOrExclude}` +
          parseInt(el.value)
      )
      .join(" || ");

    const newStartDate = startDate;

    const newEndDate = endDate;

    if (newStartDate || newEndDate) {
      expressionValue += expressionValue ? " && " : "";
      if (newStartDate) {
        expressionValue +=
          "(trace.accountingRequest.dataTranzactie >= " + newStartDate + ")";
        if (newEndDate) {
          expressionValue +=
            " && (trace.accountingRequest.dataTranzactie <= " +
            newEndDate +
            ")";
        }
      } else {
        expressionValue +=
          "(trace.accountingRequest.dataTranzactie <= " + newEndDate + ")";
      }
    }
    // if (expressionValue) {
    setExpression(expressionValue);
    // onFilterChange && onFilterChange(expressionValue);
    // }
  }, [endDate, filters, startDate, include]);

  useEffect(() => {
    composeExpression();
  }, [filters, startDate, endDate, composeExpression]);

  useEffect(() => {
    const tempCheckedFilters = filters.filter((el) => el["checked"]);
    setCheckedFilters(tempCheckedFilters);
  }, [filters]);

  const togleInclude = () => {
    setInclude((prev) => !prev);
  };

  const deleteAllSelectedFilters = () => {
    const updatedFilters = filters.map((filter) => {
      return {
        ...filter,
        checked: false,
      };
    });
    setFilters(updatedFilters);
    setStartDate(null);
    setEndDate(null);
    setExpression("");
  };

  return {
    showFilters,
    setShowFilters,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    expression,
    setExpression,
    filters,
    toggleFilters,
    toggleFilter,
    deselectFilter,
    include,
    togleInclude,
    checkedFilters,
    deleteAllSelectedFilters,
  };
};

export default useFilters;
