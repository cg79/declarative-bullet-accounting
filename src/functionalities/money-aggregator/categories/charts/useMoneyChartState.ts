import React from 'react';
// import useCategoryState from '../hooks/useCategoryState';
// import { useBetween } from 'use-between';
import { AggregateCategory, ICategory } from '../category-type';

const useMoneyChartState = () => {
  // const { categories } = useBetween(useCategoryState);

  const getIncomeExpense = (
    category: ICategory,
    aggregateCategories: AggregateCategory
  ) => {
    const agCat = aggregateCategories[category._id];
    if (!agCat) {
      return [0, 0];
    }
    return [agCat.income, agCat.expense];
  };
  const createChartData = (
    categories: ICategory[],
    aggregateCategories: AggregateCategory
  ) => {
    debugger;
    return (categories || []).map((category: ICategory) => {
      return {
        label: category.label,
        data: getIncomeExpense(category, aggregateCategories),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      };
    });
  };

  return { createChartData };
};

export default useMoneyChartState;
