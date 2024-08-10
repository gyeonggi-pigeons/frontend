"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const options: ChartOptions<"bar"> = {
  responsive: true,
  scales: {
    x: {
      display: true,
    },
    y: {
      beginAtZero: true,
      ticks: {
        callback: function (value: number) {
          return value + " kcal";
        },
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          return context.dataset.label + ": " + context.raw + " kcal";
        },
      },
    },
  },
};

interface CaloriesChartProps {
  totalCalories: number;
}

const CaloriesChart: React.FC<CaloriesChartProps> = ({ totalCalories }) => {
  const data = {
    labels: ["Today"],
    datasets: [
      {
        label: "Calories",
        data: [totalCalories],
        backgroundColor: "none",
        borderColor: "#7D42F5",
        borderWidth: 1,
        barThickness: 6,
      },
    ],
  };

  return (
    <div className="w-40 h-auto">
      <Bar data={data} options={options} />
    </div>
  );
};

export default CaloriesChart;
