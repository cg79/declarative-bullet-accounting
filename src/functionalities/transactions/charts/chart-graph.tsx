import ChartDataLabels from "chartjs-plugin-datalabels";
import "react-dropdown/style.css";
import "react-datepicker/dist/react-datepicker.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { useBetween } from "use-between";
import { useTransactions } from "../hook/useTransactions";

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
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Charts",
    },
  },
};

export const ChartGraph = () => {
  // const [defaultOption, setDefaultOption] = useState(ddOptions[0]);

  const { chartData } = useBetween(useTransactions);

  return (
    <div>
      {chartData && (
        <Bar plugins={[ChartDataLabels]} options={options} data={chartData} />
      )}
    </div>
  );
};
