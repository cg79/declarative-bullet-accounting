import React from 'react';
// import useCategoryState from '../hooks/useCategoryState';
// import { useBetween } from 'use-between';
import { ICategory } from '../category-type';

const useMoneyChartState = () => {
  // const { categories } = useBetween(useCategoryState);

  const createChartData = (categories: ICategory[]) => {
    debugger;
    return (categories || []).map((category: ICategory) => {
      return {
        label: category.label,
        data: 0,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      };
    });
  };

  return { createChartData };
};

export default useMoneyChartState;
