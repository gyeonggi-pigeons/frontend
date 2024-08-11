"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import preg from "../../../public/images/img-main-preg2.png";
import searchIcon from "../../../public/images/icon-search.png";
import addIcon from "../../../public/images/icon-plus.png";
import CaloriesChart from "../components/CaloriesChart";
import BottomTabs from "../components/BottomTabs";
import { useEffect } from "react";
const Main: React.FC = () => {
  const router = useRouter();
  const [menuName, setMenuName] = useState<string>("");
  const [allMenus, setAllMenus] = useState<{ [key: string]: string }>({
    breakfast: "660",
    lunch: "700",
    dinner: "",
    snack: "",
  });
  const [calories, setCalories] = useState<{ [key: string]: string }>({
    breakfast: "",
    lunch: "",
    dinner: "",
    snack: "",
  });
  const [weightStatus, setWeightStatus] = useState<number>(-7.3);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [leftCalories, setLeftCalories] = useState<number>(0);

  useEffect(() => {
    axios.get("https://mom-ma.fly.dev/user-profile?token=1").then((res) => {
      setCalories({
        breakfast: res.data.breakfast_calories
          ? Math.floor(res.data.breakfast_calories).toString()
          : "",
        lunch: res.data.lunch_calories
          ? Math.floor(res.data.lunch_calories).toString()
          : "",
        dinner: res.data.dinner_calories
          ? Math.floor(res.data.dinner_calories).toString()
          : "",
        snack: res.data.snack_calories
          ? Math.floor(res.data.snack_calories).toString()
          : "",
      });
      setTotalCalories(Math.floor(res.data.today_total_calories));
      setLeftCalories(2340 - Math.floor(res.data.today_total_calories));
    });
  }, []);

  const handleMenuNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMenuName(e.target.value);
  };

  const handleManualSubmit = () => {
    if (menuName.trim() !== "") {
      setAllMenus((prevMenus) => ({
        ...prevMenus,
        [menuName.toLowerCase()]: menuName,
      }));
      setMenuName("");
      router.push("/searchmenu");
    } else {
      alert("메뉴 이름을 입력해주세요.");
    }
  };

  // const getTotalCalories = () => {
  //   const total = Object.values(calories)
  //     .map((cal) => parseFloat(cal))
  //     .reduce((acc, val) => acc + val, 0);
  //   return total.toFixed(1);
  // };

  const getWeightStatusText = () => {
    if (weightStatus < 0) {
      return (
        <p className="mt-2 text-[#3252F8] font-bold 2xs:text-xs xs:text-xs text-sm leading-normal">
          Standard weight {weightStatus} kg
        </p>
      );
    } else if (weightStatus >= 0 && weightStatus < 5) {
      return (
        <p className="mt-2 text-[#7739FA] font-bold 2xs:text-xs xs:text-xs text-sm leading-normal">
          Standard weight +{weightStatus} kg
        </p>
      );
    } else {
      return (
        <p className="mt-2 text-[#FA3973] font-bold 2xs:text-xs xs:text-xs text-sm leading-normal">
          Standard weight +{weightStatus} kg
        </p>
      );
    }
  };

  const renderCard = (id: string, timeline: string, cal: string) => {
    return (
      <div
        key={id}
        className="flex flex-row w-full h-full justify-between items-center px-4 py-4 bg-[#F5F5F5] border-none rounded-xl cursor-pointer"
        onClick={() => (id === "dinner" ? router.push("/dinner") : null)} // 저녁 식사 클릭 시 이동
      >
        <div className="flex flex-row justify-between gap-4 items-center">
          <h2 className="font-medium 2xs:text-sm xs:text-base 2sm:text-base text-lg text-[#B3B3B3]">
            {timeline}
          </h2>
          <p className="text-sm text-black font-semibold">
            {cal ? `${cal} kcal` : ""}
          </p>
          {loading === id && <p className="text-xs">loading...</p>}
        </div>
        {cal.length < 1 && (
          <label className="flex flex-col items-center cursor-pointer">
            <img
              src={addIcon.src}
              alt="Add"
              className="2xs:w-4 2xs:h-4 2sm:w-4 2sm:h-4 w-8 h-8"
            />
          </label>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="w-full min-h-screen bg-white web:pb-16 pb-10">
        <div className="w-full bg-[#ECE0FF] relative flex flex-col 2xs:px-8 xs:px-6 2sm:px-6 px-8 2xs:pt-16 xs:pt-20 pt-20 pb-8">
          <h1 className="text-2xl text-black font-semibold leading-normal">
            Pigeon,
            <br />
            {leftCalories
              ? "You have consumed enough calories"
              : "You need to eat more food"}
          </h1>
          {getWeightStatusText()}
          <div className="w-full flex flex-row pt-8 justify-between gap-4">
            <div className="flex flex-row xs:gap-4 2sm:gap-4 gap-6">
              <div>
                <CaloriesChart
                  totalCalories={parseFloat(totalCalories.toString())}
                />
              </div>

              <div>
                <ul className="flex flex-col gap-3">
                  <li>
                    <p className="text-[#AFA2C5] font-normal 2xs:text-[0.68rem] xs:text-[0.8rem] 2sm:text-[0.8rem] text-sm">
                      Goal
                    </p>
                    <p className="text-[#0000008F] font-semibold 2xs:text-xs xs:text-xs 2sm:text-xs text-base">
                      kcal
                    </p>
                  </li>
                  <li>
                    <p className="text-[#AFA2C5] font-normal  2xs:text-[0.68rem] xs:text-[0.8rem] 2sm:text-[0.8rem] text-sm">
                      Eat
                    </p>
                    <p className="text-[#0000008F] font-semibold 2xs:text-xs xs:text-xs 2sm:text-xs text-base">
                      0kcal
                    </p>
                  </li>
                  <li>
                    <p className="text-[#AFA2C5] font-normal 2xs:text-[0.68rem xs:text-[0.8rem]  2sm:text-[0.8rem] text-sm">
                      Left
                    </p>
                    <p className="text-[#0000008F] bg-[#A6AFFF6E] text-center px-1 py-1 rounded-xl font-bold 2xs:text-xs xs:text-xs 2sm:text-xs text-base">
                      kcal
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <img
                src={preg.src}
                alt="preg"
                className="absolute web:right-0 web:bottom-[4.4rem] web:w-[16.8rem] 2xs:right-4 2xs:bottom-[4.6rem] 2xs:w-[6.4rem] xs:right-4 xs:bottom-[4.6rem] xs:w-[7.2rem]  2sm:right-3 2sm:bottom-[4.6rem] 2sm:w-32 w-[8.4rem] h-auto"
              />
            </div>
          </div>

          <div className="web:pt-16 w-full flex flex-col relative">
            <label htmlFor="name" className=""></label>
            <div className="relative w-full">
              <input
                type="text"
                id="searchname"
                value={menuName}
                placeholder="Can I eat this food?"
                onChange={handleMenuNameChange}
                className="mt-2 px-4 py-4 pl-4 text-black placeholder-[#B3B3B3] rounded-xl w-full relative flex items-center justify-center"
                required
              />
              <button
                onClick={handleManualSubmit}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 pt-2"
              >
                <img
                  src={searchIcon.src}
                  alt="Search"
                  className="w-4 h-4 2sm:w-5 2sm:h-5"
                />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white relative flex flex-col 2xs:px-8 xs:px-6 2sm:px-6 px-8 pt-8 pb-16">
          <h3 className="text-lg text-black items-end font-semibold leading-normal mb-4">
            A daily diet
          </h3>
          <div className="grid grid-cols-2 2sm:gap-3 gap-4">
            {["breakfast", "lunch", "dinner", "snack"].map((meal) => (
              <div key={meal} className="flex flex-col items-center">
                {renderCard(
                  meal,
                  meal.charAt(0).toUpperCase() + meal.slice(1),
                  calories[meal] || ""
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomTabs />
    </>
  );
};

export default Main;
