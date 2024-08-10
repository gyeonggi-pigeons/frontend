"use client";
import React, { useState } from "react";
import axios from "axios";
import preg from "../../../public/images/img-main-preg.png";
import searchIcon from "../../../public/images/icon-search.png";
import addIcon from "../../../public/images/icon-plus.png";
import CaloriesChart from "../components/CaloriesChart";
import BottomTabs from "../components/BottomTabs";

const Main: React.FC = () => {
  const [menuName, setMenuName] = useState<string>("");
  const [allMenus, setAllMenus] = useState<{ [key: string]: string }>({
    breakfast: "",
    lunch: "",
    dinner: "",
    snack: "",
  });
  const [calories, setCalories] = useState<{ [key: string]: string }>({});
  const [weightStatus, setWeightStatus] = useState<number>(10.19);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    } else {
      alert("메뉴 이름을 입력해주세요.");
    }
  };

  const handleImageUpload = async (
    mealType: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(mealType);
    setError(null);

    try {
      const calorieCount = await analyzeImage(file);
      setCalories((prevCalories) => ({
        ...prevCalories,
        [mealType]: calorieCount,
      }));
      setAllMenus((prevMenus) => ({
        ...prevMenus,
        [mealType]: `음식 (총 칼로리: ${calorieCount} kcal)`,
      }));
    } catch (err) {
      console.error("Error analyzing image:", err);
      setError("이미지 분석에 실패했습니다.");
    } finally {
      setLoading(null);
    }
  };

  const analyzeImage = async (file: File): Promise<string> => {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onloadend = async () => {
        const base64Image = reader.result?.toString().split(",")[1];

        try {
          const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
              model: "gpt-4o",
              messages: [
                {
                  role: "user",
                  content: [
                    {
                      type: "text",
                      text: "사진에 있는 모든 음식 이름의 총 칼로리를 1인분 기준으로 알려줘. 숫자 값만 반환해줘",
                    },
                    {
                      type: "image_url",
                      image_url: {
                        url: `data:image/jpeg;base64,${base64Image}`,
                        detail: "low",
                      },
                    },
                  ],
                },
              ],
              max_tokens: 100,
            },
            {
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
                "Content-Type": "application/json",
              },
            }
          );
          resolve(response.data.choices[0].message.content.trim());
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => {
        reject("Failed to read file.");
      };
      reader.readAsDataURL(file);
    });
  };

  const getTotalCalories = () => {
    const total = Object.values(calories)
      .map((cal) => parseFloat(cal))
      .reduce((acc, val) => acc + val, 0);
    return total.toFixed(1);
  };

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
        className="flex flex-row w-full h-full justify-between items-center px-4 py-6 bg-[#F5F5F5] border-none rounded-2xl"
      >
        <div className="flex flex-row justify-between gap-4 items-center">
          <h2 className="font-bold text-lg text-[#B3B3B3]">{timeline}</h2>
          <p className="text-sm text-black font-semibold">
            {cal ? `${cal} kcal` : ""}
          </p>
          {loading === id && <p>이미지 분석 중...</p>}
        </div>
        {cal.length < 1 && (
          <label className="flex flex-col items-center cursor-pointer mt-2">
            <img src={addIcon.src} alt="Add" className="w-8 h-8" />
            <input
              id={`upload-${id}`}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageUpload(id, e)}
            />
          </label>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="w-full min-h-screen bg-white">
        <div className="w-full bg-[#ECE0FF] relative flex flex-col 2xs:px-8 xs:px-6 2sm:px-6 px-8 2xs:pt-16 xs:pt-20 pt-20 pb-8">
          <div className="flex justify-end mb-4">
            <div className="flex max-w-fit text-sm bg-[#B390FD] text-white font-semibold leading-normal px-4 py-2 rounded-full">
              22 weeks and 4 days pregnant
            </div>
          </div>
          <h1 className="text-2xl text-black font-semibold leading-normal">
            Pigeon,
            <br />
            Your baby is growing up healthy
          </h1>
          {getWeightStatusText()}
          <div className="w-full flex flex-row pt-8 justify-between gap-4">
            <div className="flex flex-row gap-6">
              <div>
                <CaloriesChart totalCalories={parseFloat(getTotalCalories())} />
              </div>

              <div>
                <ul className="flex flex-col gap-3">
                  <li>
                    <p className="text-[#AFA2C5] font-medium text-sm">Goal</p>
                    <p className="text-[#0000008F] font-semibold text-base">
                      kcal
                    </p>
                  </li>
                  <li>
                    <p className="text-[#AFA2C5] font-medium text-sm">Eat</p>
                    <p className="text-[#0000008F] font-semibold text-base">
                      {getTotalCalories()}kcal
                    </p>
                  </li>
                  <li>
                    <p className="text-[#AFA2C5] font-medium text-sm">Left</p>
                    <p className="text-[#0000008F] font-semibold text-base">
                      kcal
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <img src={preg.src} alt="preg" className="w-[8.4rem] h-auto" />
            </div>
          </div>

          <div className="mt-10 w-full flex flex-col relative">
            <label htmlFor="name" className=""></label>
            <div className="relative w-full">
              <input
                type="text"
                id="searchname"
                value={menuName}
                placeholder="Can I eat this food?"
                onChange={handleMenuNameChange}
                className="mt-2 px-4 py-5 pl-4 text-black placeholder-[#B3B3B3] rounded-xl w-full relative flex items-center justify-center"
                required
              />
              <button
                onClick={handleManualSubmit}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 pt-2"
              >
                <img src={searchIcon.src} alt="Search" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white relative flex flex-col 2xs:px-8 xs:px-6 2sm:px-6 px-8 py-8">
          <h3 className="text-lg text-black items-end font-semibold leading-normal mb-4">
            A daily diet
          </h3>
          <div className="grid grid-cols-2 gap-4">
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
