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
import { ICategory } from '../category-type';

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

const MoneyChartGraph = ({ categories }: { categories: ICategory[] }) => {
  // const { categories } = useBetween(useCategoryState);

  const { createChartData } = useMoneyChartState();

  const chartData: any = createChartData(categories);
  debugger;
  return (
    <div>
      {JSON.stringify(chartData)}
      {/* {chartData && chartData.length > 0 && (
        <Bar plugins={[ChartDataLabels]} options={options} data={chartData} />
      )} */}
    </div>
  );
};

export default MoneyChartGraph;
