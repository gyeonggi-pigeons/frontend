"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import active1 from "../../../public/images/img-active-1.png";
import active2 from "../../../public/images/img-active-2.png";
import active3 from "../../../public/images/img-active-3.png";
import prev from "../../../public/images/icon-prev.png";

const Onboarding: React.FC = () => {
  const router = useRouter();
  const [age, setAge] = useState<number | string>("");
  const [height, setHeight] = useState<number | string>("");
  const [weight, setWeight] = useState<number | string>("");
  const [active, setActive] = useState<string>("");
  const [preg, setPreg] = useState<string>("");

  const [activeSectionVisible, setActiveSectionVisible] = useState(true);
  const [activeActiveVisible, setActiveActiveVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const handleActiveClick = () => {
    setActiveSectionVisible(false);
    setActiveActiveVisible(true);
  };

  const handleActiveSelect = () => {
    setActiveActiveVisible(false);
    setBottomSheetVisible(true);
  };

  const handleBottomSheetSelect = (selection: string) => {
    setActive(selection);
    setBottomSheetVisible(false);
    setActiveSectionVisible(true);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(e.target.value);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value);
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };

  const handleActiveChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value.length > 0) {
      setActive(e.target.value);
    }
  };

  const handlePregnancySelect = (state: string) => {
    if (preg !== state) {
      setPreg(state);
      handleActiveSelect();
    }
  };

  const handleSubmit = async () => {
    if (!age || !height || !weight || active.trim() === "") {
      alert("모든 내용을 입력해주세요.");
      return;
    }

    try {
      alert("완료되었습니다!");
      setAge("");
      setHeight("");
      setWeight("");
      setActive("");
      router.push("/onboarding/info");
    } catch (error) {
      console.error("Error submitting recommendation:", error);
      alert("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <div className="w-full min-h-screen bg-[#FEFFFE] relative flex flex-col 2xs:px-8 xs:px-6 2sm:px-6 px-8 2xs:pt-16 xs:pt-20 pt-20 pb-8 items-start justify-start">
        <div className="mb-4">
          <img
            src={prev.src}
            onClick={handleBack}
            alt=""
            className="w-[1.6rem] h-auto"
          />
        </div>
        <h1 className="text-2xl text-black font-semibold leading-normal">
          비둘기님 환영해요!
          <br />
          기본 정보를 입력해주세요.
        </h1>
        <p className="mt-2 text-[#757575] font-normal 2xs:text-xs xs:text-xs text-sm leading-normal">
          산모님에게 꼭 맞는 체중 관리를 설계해드릴게요.
        </p>

        <div className="mt-10 w-full flex flex-col relative">
          <div className="flex justify-between items-center gap-4 relative mb-4">
            <div className="relative w-full">
              <input
                type="number"
                id="age"
                value={age}
                onChange={handleAgeChange}
                className="w-full mt-2 px-2 pt-6 pb-3 pl-4 text-black rounded-xl border-none bg-[#F5F5F5]"
                required
              />
              <label
                htmlFor="age"
                className="absolute left-4 top-4 text-xs text-[#7D7D7D] transition-all duration-300"
              >
                나이
              </label>
              <span className="absolute right-4 bottom-3 text-xs text-[#B3B3B3]">
                세
              </span>
            </div>

            <div className="relative w-full">
              <input
                type="number"
                id="height"
                value={height}
                onChange={handleHeightChange}
                className="w-full mt-2 px-2 pt-6 pb-3 pl-4 text-black rounded-xl border-none bg-[#F5F5F5]"
                required
              />
              <label
                htmlFor="height"
                className="absolute left-4 top-4 text-xs text-[#7D7D7D] transition-all duration-300"
              >
                키
              </label>
              <span className="absolute right-4 bottom-3 text-xs text-[#B3B3B3]">
                cm
              </span>
            </div>
          </div>

          <div className="relative w-full mb-4">
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={handleWeightChange}
              className="w-full mt-2 px-2 pt-6 pb-3 pl-4 text-black rounded-xl border-none bg-[#F5F5F5]"
              required
            />
            <label
              htmlFor="weight"
              className="absolute left-4 top-4 text-xs text-[#7D7D7D] transition-all duration-300"
            >
              몸무게
            </label>
            <span className="absolute right-4 bottom-3 text-xs text-[#B3B3B3]">
              kg
            </span>
          </div>
          {activeSectionVisible && (
            <div className="active-section relative w-full mb-4">
              <input
                type="text"
                id="active"
                value={active}
                onClick={handleActiveClick}
                className="w-full mt-2 px-2 pt-6 pb-3 pl-4 text-black rounded-xl border-none bg-[#F5F5F5]"
                required
              />
              <label
                htmlFor="active"
                className="absolute left-4 top-4 text-xs text-[#7D7D7D] transition-all duration-300"
              >
                활동량
              </label>
              <span className="absolute right-4 bottom-3 text-xs text-[#B3B3B3]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="6"
                  viewBox="0 0 14 6"
                  fill="none"
                >
                  <path
                    d="M1 1L7 7L13 1"
                    stroke="#757575"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          )}
          {(activeActiveVisible || active !== "") && (
            <div className="active-active">
              <h3 className=" mt-4 2xs:mb-6 xs:mb-6 2sm:mb-6 mb-8 text-[#757575] font-normal text-xs leading-normal">
                현재 해당되는 상태
              </h3>
              <ul className="w-full flex flex-row 2xs:gap-6 xs:gap-5 2sm:gap-4 gap-8 justify-center items-center">
                <li
                  className={`2xs:w-[4.4rem] 2xs:h-[4.4rem] xs:w-20 xs:h-20 2sm:w-24 2sm:h-24 w-32 h-32 rounded-full flex flex-col gap-1 items-center justify-center ${
                    preg === "임신 준비중" ? "bg-[#EAE6FF]" : "bg-[#F5F5F5]"
                  }`}
                  onClick={() => handlePregnancySelect("임신 준비중")}
                >
                  <img
                    src={active1.src}
                    alt=""
                    className="2xs:w-[30vh] w-[32vh] h-auto py-4 rounded-md"
                  />
                  <p
                    className={`text-xs ${
                      preg === "임신 준비중"
                        ? "text-[#6047E7] font-bold"
                        : "text-[#B3B3B3] font-normal"
                    }`}
                  >
                    임신 준비중
                  </p>
                </li>
                <li
                  className={`2xs:w-[4.4rem] 2xs:h-[4.4rem] xs:w-20 xs:h-20 2sm:w-24 2sm:h-24 w-32 h-32 rounded-full flex flex-col gap-1 items-center justify-center ${
                    preg === "임신 중" ? "bg-[#EAE6FF]" : "bg-[#F5F5F5]"
                  }`}
                  onClick={() => handlePregnancySelect("임신 중")}
                >
                  <img
                    src={active2.src}
                    alt=""
                    className="2xs:w-[30vh] w-[32vh] h-auto py-4 rounded-md"
                  />
                  <p
                    className={`text-xs ${
                      preg === "임신 중"
                        ? "text-[#6047E7] font-bold"
                        : "text-[#B3B3B3] font-normal"
                    }`}
                  >
                    임신 중
                  </p>
                </li>
                <li
                  className={`2xs:w-[4.4rem] 2xs:h-[4.4rem] xs:w-20 xs:h-20 2sm:w-24 2sm:h-24 w-32 h-32 rounded-full flex flex-col gap-1 items-center justify-center ${
                    preg === "출산 이후" ? "bg-[#EAE6FF]" : "bg-[#F5F5F5]"
                  }`}
                  onClick={() => handlePregnancySelect("출산 이후")}
                >
                  <img
                    src={active3.src}
                    alt=""
                    className="2xs:w-[30vh] w-[32vh] h-auto py-4 rounded-md"
                  />
                  <p
                    className={`text-xs ${
                      preg === "출산 이후"
                        ? "text-[#6047E7] font-bold"
                        : "text-[#B3B3B3] font-normal"
                    }`}
                  >
                    출산 이후
                  </p>
                </li>
              </ul>
            </div>
          )}

          {bottomSheetVisible && (
            <div className="fixed inset-0 bg-black opacity-20 z-40"></div>
          )}
          {bottomSheetVisible && (
            <div className="fixed bottom-0 left-0 w-full 2xs:h-[52vh] xs:h-[54vh] 2sm:h-[50vh] web:h-[56vh] web:px-20 bg-white 2xs:px-12 xs:px-8 2sm:px-10 pt-4 pb-6 rounded-t-3xl shadow-lg z-50">
              <h3 className="my-6 text-[#1E1E1E] font-semibold text-sm web:text-base leading-normal">
                평소 나의 활동량을 선택해주세요.
              </h3>
              <ul className="flex flex-col gap-6 mt-4 web:gap-8 web:mt-6">
                <li
                  className="w-full h-auto text-base pt-2 pb-4 web:pb-6 text-[#1C1C1C] border-b border-[#EFEFEF]"
                  onClick={() => handleBottomSheetSelect("적음")}
                >
                  적음
                  <p className="mt-2 text-sm text-[#757575] leading-normal">
                    주로 집에서 생활하며 활동이 거의 없어요.
                  </p>
                </li>
                <li
                  className="w-full h-auto text-base pt-2 pb-4 web:pb-6 text-[#1C1C1C] border-b border-[#EFEFEF]"
                  onClick={() => handleBottomSheetSelect("보통")}
                >
                  보통
                  <p className="mt-2 text-sm text-[#757575] leading-normal">
                    직장에 출근하거나 주기적으로 외출해요.
                  </p>
                </li>
                <li
                  className="w-full h-auto text-base pt-2 pb-4 web:pb-6 text-[#1C1C1C] "
                  onClick={() => handleBottomSheetSelect("많음")}
                >
                  많음
                  <p className="mt-2 text-sm text-[#757575] leading-normal">
                    일주일에 3회 이상 정기적인 운동을 해요.
                  </p>
                </li>
              </ul>
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className={`w-full mt-28 py-4  text-white rounded-xl font-medium ${
            age && height && weight && active
              ? "bg-[#8A77F4]"
              : "bg-[#8A77F4] opacity-60 cursor-not-allowed"
          }`}
          disabled={!age || !height || !weight || !active}
        >
          다음
        </button>
      </div>
    </>
  );
};

export default Onboarding;
