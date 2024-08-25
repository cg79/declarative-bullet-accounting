import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'react-dropdown/style.css';
import 'react-datepicker/dist/react-datepicker.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import useMoneyChartState from './useMoneyChartState';
import { useBetween } from 'use-between';
import useCategoryState from '../hooks/useCategoryState';
import { AggregateCategory, ICategory } from '../category-type';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Charts',
    },
  },
};

const MoneyChartGraph = ({
  categories,
  aggregateCategories,
}: {
  categories: ICategory[];
  aggregateCategories: AggregateCategory;
}) => {
  const { createChartData } = useMoneyChartState();

  const datasets: any = createChartData(categories, aggregateCategories);

  const data = {
    labels: categories.map((category: ICategory) => category.label),
    datasets,
  };

  return (
    <div>
      <Bar plugins={[ChartDataLabels]} options={options} data={data} />
    </div>
  );
};

export default MoneyChartGraph;
