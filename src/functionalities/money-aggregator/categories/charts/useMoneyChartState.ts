import React from 'react';
// import useCategoryState from '../hooks/useCategoryState';
// import { useBetween } from 'use-between';
import { AggregateCategory, ICategory } from '../category-type';

const useMoneyChartState = () => {
  // const { categories } = useBetween(useCategoryState);

  const getIncomeExpense = (
    category: ICategory,
    aggregateCategories: AggregateCategory
  ): { income: number; expense: number } => {
    const agCat = aggregateCategories[category._id];
    if (!agCat) {
      return { income: 0, expense: 0 };
    }
    // return [agCat.income, agCat.expense];
    return { income: agCat.income, expense: agCat.expense };
  };

  const getAllIncomesExpenses = (
    categories: ICategory[] | null,
    aggregateCategories
  ) => {
    const incomes: number[] = [];
    const expenses: number[] = [];

    categories?.forEach((category) => {
      const ie = getIncomeExpense(category, aggregateCategories);
      incomes.push(ie.income);
      expenses.push(ie.expense);
    });

    debugger;
    return {
      incomes,
      expenses,
    };
  };

  const createChartData = (
    categories: ICategory[] | null,
    aggregateCategories: AggregateCategory
  ) => {
    const incomeexpense = getAllIncomesExpenses(
      categories,
      aggregateCategories
    );
    return (categories || []).map((category: ICategory) => {
      return {
        label: category.label,
        data: [incomeexpense.incomes, incomeexpense.expenses],
        backgroundColor: category.color || 'rgba(0,0,0, 0.5)',
      };
    });
  };

  const createColumnSeries = (
    categories: ICategory[] | null,
    aggregateCategories: AggregateCategory
  ) => {
    return (categories || []).map((category: ICategory) => {
      return {
        label: category.label,
        data: getIncomeExpense(category, aggregateCategories),
        backgroundColor: category.color || 'rgba(0,0,0, 0.5)',
      };
    });
  };

  return { createChartData, createColumnSeries, getAllIncomesExpenses };
};

export default useMoneyChartState;
