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

import * as S from "./styles";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Chart({ chartData }: any) {
  return (
    <S.ChartWrapper>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Grafico de ativos",
            },
            legend: {
              display: false,
              position: "bottom",
            },
          },
        }}
      />
    </S.ChartWrapper>
  );
}
