"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartOptions,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const options: ChartOptions<"doughnut"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "right",
      labels: {
        boxWidth: 10,
        padding: 10,
      },
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          const label = context.label || "";
          const value = context.raw || 0;
          const total = context.chart.data.datasets[0].data.reduce(
            (a: number, b: number) => a + b,
            0
          );
          const percentage = ((value / total) * 100).toFixed(2);
          return `${label}: ${value} g (${percentage}%)`;
        },
      },
    },
  },
  elements: {
    arc: {
      borderWidth: 1,
    },
  },
  cutout: "80%",
};

interface NutChartProps {
  carbohydrates: number;
  protein: number;
  fat: number;
}

const NutChart: React.FC<NutChartProps> = ({ carbohydrates, protein, fat }) => {
  const data = {
    labels: ["Carbohydrates", "Protein", "Fat"],
    datasets: [
      {
        data: [carbohydrates, protein, fat],
        backgroundColor: ["#FFF", "#FFF2B6", "#B9C9FF"],
        hoverBackgroundColor: ["#FFF", "#FFF2B6", "#B9C9FF"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="w-full h-auto flex items-center justify-center">
      <Doughnut data={data} options={options} />
      {/* <p className="top-0 left-0">{energy}</p> */}
    </div>
  );
};

export default NutChart;
