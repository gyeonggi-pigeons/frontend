"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BottomTabs from "../components/BottomTabs";
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
      display: false,
      // position: "top",
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
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
  const [weightData, setWeightData] = useState<number[]>([
    48, 57, 63, 68, 57, 59, 62, 58, 65,
  ]);
  const [dates, setDates] = useState<string[]>([
    "2024-08-01",
    "2024-08-02",
    "2024-08-03",
    "2024-08-04",
    "2024-08-05",
    "2024-08-06",
    "2024-08-07",
    "2024-08-08",
    "2024-08-09",
  ]);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const handleInputClick = () => {
    setBottomSheetVisible(true);
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };

  const handleAddWeight = () => {
    if (weight) {
      const newWeight = parseFloat(weight);
      const newDate = new Date().toISOString().split("T")[0];
      setWeightData([...weightData, newWeight]);
      setDates([...dates, newDate]);
      // setWeight("");
      setBottomSheetVisible(false);
    }
  };

  const data = {
    labels: dates,
    datasets: [
      {
        label: "체중",
        data: weightData,
        borderColor: "#8658E7",
        backgroundColor: "#8658E7",
        fill: true,
        tension: 0.1,
      },
      {
        label: "표준 몸무게",
        data: [50, 54, 54, 56, 58, 54, 60, 63, 61, 64], // 표준 몸무게 데이터
        borderColor: "#CDCADB",
        borderDash: [5, 5],
        backgroundColor: "#CDCADB",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  return (
    <>
      <div className="w-full min-h-screen bg-white">
        <div className="w-full bg-[#ECE0FF] relative flex flex-col 2xs:px-8 xs:px-6 2sm:px-6 px-8 2xs:pt-16 xs:pt-20 pt-20 pb-8">
          <div className="flex justify-between items-center mb-8">
            <div className="text-xl font-semibold text-black">2024.08</div>
            <div className="flex max-w-fit text-sm bg-[#B390FD] text-white font-semibold leading-normal px-4 py-2 rounded-full">
              22 weeks and 4 days pregnant
            </div>
          </div>

          <div className="w-full flex flex-col p-8 bg-white rounded-3xl">
            <h1 className="text-xl text-black font-semibold leading-normal">
              +0.1 kg from last week
            </h1>
            <h3 className="text-bold text-base text-[#757575]">
              Mid-pregnancy, +0.3-0.5 kg/week
            </h3>
            <div className="chart mt-16">
              <Line data={data} options={options} />
            </div>
          </div>
          <button
            onClick={handleInputClick}
            className="w-full 2xs:mt-16 xs:mt-12 2sm:mt-12 mt-20 py-4 2xs:text-[12px] xs:text-[14px] 2sm:text-[16px] rounded-xl font-medium bg-[#8A77F4] text-white"
          >
            Enter today&apos;s weight
          </button>
        </div>
        <div className="bg-white relative flex flex-col 2xs:px-8 xs:px-6 2sm:px-6 px-8 py-8">
          {weight === "" ? (
            <>
              <h3 className="text-lg text-black items-end font-semibold leading-normal mb-4">
                Weight gain rate appropriate 👍
              </h3>
              <p className="text-xs text-[#757575] font-normal leading-normal">
                During pregnancy, it&apos;s natural for your weight to increase
                due to the rise in
                <span className="text-xs text-[#7B63FF] font-bold leading-normal">
                  blood volume and the expansion of breast tissue.
                </span>
              </p>
            </>
          ) : (
            <>
              <h3 className="text-lg text-black items-end font-semibold leading-normal mb-4">
                Weight gain rate increased rapidly 📈
              </h3>
              <p className="text-xs text-[#757575] font-normal leading-normal">
                Don&apos;t worry! During the second trimester, a rapid weight
                increase can occur due to{" "}
                <span className="text-xs text-[#7B63FF] font-bold leading-normal">
                  increased blood volume and preparation for breastfeeding.
                </span>
                However, if this continues, it might be a sign of gestational
                diabetes, so be sure to consult your doctor.
              </p>
            </>
          )}
        </div>
      </div>
      <BottomTabs />

      {bottomSheetVisible && (
        <div className="fixed inset-0 bg-black opacity-20 z-40"></div>
      )}
      {bottomSheetVisible && (
        <div className="fixed bottom-0 left-0 w-full 2xs:h-[48vh] xs:h-[56vh] 2sm:h-[50vh] web:h-[56vh] web:px-20 bg-white 2xs:px-12 xs:px-8 2sm:px-10 pt-4 pb-6 rounded-t-3xl shadow-lg z-50">
          <h3 className="my-6 text-[#1E1E1E] font-semibold text-sm web:text-base leading-normal">
            Please enter today&apos;s weight
          </h3>

          <div className="w-full flex flex-col pt-8">
            <div className="flex gap-2 items-center justify-center pt-8">
              <input
                type="text"
                id="weight"
                value={weight}
                placeholder="0.00"
                onChange={handleWeightChange}
                className={`w-24 text-4xl placeholder-[#D7D7D7] mt-2 mb-8 p-2 border-none ${
                  weight ? "text-black" : "text-[#D7D7D7]"
                }`}
              />
              <p
                className={`text-4xl mt-2 mb-8 p-2 border-none ${
                  weight ? "text-black" : "text-[#D7D7D7]"
                }`}
              >
                kg
              </p>
            </div>

            <button
              onClick={handleAddWeight}
              className={`w-full mt-28 py-4  text-white rounded-xl font-medium ${
                weight
                  ? "bg-[#8A77F4]"
                  : "bg-[#8A77F4] opacity-60 cursor-not-allowed"
              }`}
              disabled={!weight}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Check;
