"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  ChartOptions,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const options: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
    title: {
      display: true,
      text: "Chart Title",
    },
  },
  scales: {
    x: {
      // type: "time",
      time: {
        unit: "day",
      },
    },
    y: {
      beginAtZero: true,
    },
  },
};

const Check: React.FC = () => {
  const router = useRouter();
  const [weight, setWeight] = useState<string>("");
  const [weightData, setWeightData] = useState<number[]>([50, 71, 63, 68, 57]);
  const [dates, setDates] = useState<string[]>([
    "2024-08-01",
    "2024-08-02",
    "2024-08-03",
    "2024-08-04",
    "2024-08-05",
  ]);

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };

  const handleAddWeight = () => {
    if (weight) {
      const newWeight = parseFloat(weight);
      const newDate = new Date().toISOString().split("T")[0];
      setWeightData([...weightData, newWeight]);
      setDates([...dates, newDate]);
      setWeight("");
    }
  };

  const data = {
    labels: dates,
    datasets: [
      {
        label: "체중",
        data: weightData,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
        tension: 0.1,
      },
    ],
  };

  return (
    <>
      <div className="w-full h-screen bg-gray-200 relative flex flex-col 2xs:px-8 xs:px-10 2sm:px-7 sm:px-12 tb:px-24 lg:px-32 xl:px-48 2xs:pt-20 xs:pt-24 pt-28 tb:pt-28 lg:pt-36 pb-8 items-center justify-center">
        <h1 className="text-4xl font-black text-black">
          당신의 이번주 변화를 보여드려요!
        </h1>

        <div className="w-full flex flex-col pt-8">
          <label htmlFor="age" className="text-black">
            체중 입력하실?
          </label>
          <input
            type="text"
            id="weight"
            value={weight}
            placeholder="체중을 입력해주세요"
            onChange={handleWeightChange}
            className="tb:w-[32rem] lg:w-[32rem] mt-2 mb-8 p-2 text-black border border-gray-300 rounded-xl"
          />
          <button onClick={handleAddWeight}>추가</button>
          <h3 className="mt-20 text-bold text-xl text-black">
            점선은 표준 그래프
          </h3>
          <p className="text-bold text-base">대충 그래프 ui</p>
          <p>대충 게이지 ui</p>
          <div className="chart">
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
      <button className="w-full bg-[#ffa6a6] mt-12 sm:mt-24 tb:mt-28 lg:mt-44 2xs:py-3 py-4 tb:py-5 lg:py-6 2xs:text-[12px] xs:text-[14px] 2sm:text-[16px] sm:text-[16px] tb:text-[18px] lg:text-[24px] text-white rounded-2xl font-bold">
        다음
      </button>
    </>
  );
};

export default Check;
