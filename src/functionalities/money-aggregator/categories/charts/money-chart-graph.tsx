import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'react-dropdown/style.css';
import 'react-datepicker/dist/react-datepicker.css';
import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

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
import { useEffect, useState } from 'react';
import useMoneyTransactionsFilter from '../../money-transactions/hooks/useMoneyTransactionsFilter';

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
  entityId,
  filterBy,
  aggregateCategories,
}: {
  categories: ICategory[] | null;
  entityId: string | undefined;
  filterBy: {
    expression: string;
  } | null;
  aggregateCategories: AggregateCategory;
}) => {
  const { createChartData, getAllIncomesExpenses } = useMoneyChartState();
  // const { callAggregateAmountByCategory } = useMoneyTransactionsFilter();

  // const [aggregateCategories, setAggregateCategories] = useState<any>(null);
  const [barChart, setBarChart] = useState<any>(null);

  useEffect(() => {
    debugger;
    // callAggregateAmountByCategory(entityId, filterBy)?.then((val) => {
    //   setAggregateCategories(val);
    // });
  }, []);

  useEffect(() => {
    if (!aggregateCategories) {
      return;
    }
    const incomeExpense = getAllIncomesExpenses(
      categories,
      aggregateCategories
    );

    const chartOptions = {
      chart: {
        type: 'column',
      },

      title: {
        text: 'Corn vs wheat estimated production for 2023',
        align: 'left',
      },
      // subtitle: {
      //   text:
      //     'Source: <a target="_blank" ' +
      //     'href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>',
      //   align: 'left',
      // },
      xAxis: {
        categories: categories?.map((el) => el.label),
        crosshair: true,
        accessibility: {
          description: 'Countries',
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: '1000 metric tons (MT)',
        },
      },
      tooltip: {
        valueSuffix: ' (1000 MT)',
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
          colorByPoint: true,
        },
      },
      colors: categories?.map((el) => el.color),
      series: [
        {
          name: 'Income',
          data: incomeExpense.incomes,
          // color: 'red',
        },
        {
          name: 'Expense',
          data: incomeExpense.expenses,
          // color: 'green',
        },
      ],
    };

    setBarChart(chartOptions);
  }, [aggregateCategories]);

  return (
    <div>
      {barChart && (
        <HighchartsReact highcharts={Highcharts} options={barChart} />
      )}

      {/* <Bar plugins={[ChartDataLabels]} options={options} data={data} /> */}
    </div>
  );
};

export default MoneyChartGraph;
