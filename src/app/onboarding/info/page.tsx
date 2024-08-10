"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Info: React.FC = () => {
  const router = useRouter();
  const [dday, setDday] = useState<string>("");
  const [births, setBirths] = useState<string>("");
  const [gestationalDiabetes, setGestationalDiabetes] = useState<string>("");

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const handleBirthsClick = () => {
    setBottomSheetVisible(true);
  };

  const handleBottomSheetSelect = (selection: string) => {
    setBirths(selection);
    setBottomSheetVisible(false);
  };

  const handleDdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDday(e.target.value);
  };

  const handleGestationalDiabetesChange = (value: string) => {
    setGestationalDiabetes(value);
  };

  const handleSubmit = async () => {
    if (!dday || births.trim() === "" || gestationalDiabetes === "") {
      alert("모든 내용을 입력해주세요.");
      return;
    }

    try {
      alert("완료되었습니다!");
      setDday("");
      setBirths("");
      setGestationalDiabetes("");
      router.push("/");
    } catch (error) {
      console.error("Error submitting recommendation:", error);
      alert("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <div className="w-full h-screen bg-[#FEFFFE] relative flex flex-col 2xs:px-8 xs:px-10 2sm:px-7 sm:px-12 tb:px-24 lg:px-32 xl:px-48 2xs:pt-20 xs:pt-24 pt-24 tb:pt-28 lg:pt-36 pb-8 items-start justify-start">
        <h3 className="text-xl text-[#7B63FF] font-semibold">안녕하세요!</h3>
        <h1 className="text-2xl text-black font-semibold leading-normal">
          현재 임신 중이시네요!
          <br />
          추가 정보를 입력해주세요.
        </h1>
        <p className="mt-2 text-[#757575] font-normal text-sm leading-normal">
          더욱 안전하고 정확한 계획을 세워드려요.
        </p>

        <div className="mt-10 w-full flex flex-col gap-4 relative">
          <div className="relative w-full">
            <input
              type="date"
              id="dday"
              value={dday}
              onChange={handleDdayChange}
              className="w-full mt-2 px-2 pt-6 pb-3 pl-4 text-black rounded-xl border-none bg-[#F5F5F5]"
              required
            />
            <label
              htmlFor="dday"
              className="absolute left-4 top-4 text-xs text-[#7D7D7D] transition-all duration-300"
            >
              출산 예정일
            </label>
          </div>

          <div className="relative w-full mb-4">
            <input
              type="text"
              id="births"
              value={births}
              onClick={handleBirthsClick}
              className="w-full mt-2 px-2 pt-6 pb-3 pl-4 text-black rounded-xl border-none bg-[#F5F5F5]"
              readOnly
              required
            />
            <label
              htmlFor="births"
              className="absolute left-4 top-4 text-xs text-[#7D7D7D] transition-all duration-300"
            >
              단태아, 다태아
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

          {bottomSheetVisible && (
            <div className="fixed inset-0 bg-black opacity-20 z-40"></div>
          )}
          {bottomSheetVisible && (
            <div className="fixed bottom-0 left-0 w-full h-[48vh] bg-white px-4 pt-4 pb-6 rounded-t-3xl shadow-lg z-50">
              <h3 className="my-6 text-[#1E1E1E] font-medium text-sm leading-normal">
                해당하는 항목을 선택해주세요
              </h3>
              <ul className="flex flex-col gap-6 mt-4 ">
                <li
                  className="w-full h-auto text-base pt-2 pb-4 text-[#1C1C1C] border-b border-[#EFEFEF]"
                  onClick={() => handleBottomSheetSelect("단태아")}
                >
                  단태아
                </li>
                <li
                  className="w-full h-auto text-base pt-2 pb-4 text-[#1C1C1C] border-b border-[#EFEFEF]"
                  onClick={() => handleBottomSheetSelect("쌍둥이")}
                >
                  쌍둥이
                </li>
                <li
                  className="w-full h-auto text-base pt-2 pb-4 text-[#1C1C1C] border-b border-[#EFEFEF]"
                  onClick={() => handleBottomSheetSelect("세쌍둥이")}
                >
                  세쌍둥이
                </li>
                <li
                  className="w-full h-auto text-base pt-2 pb-4 text-[#1C1C1C] "
                  onClick={() => handleBottomSheetSelect("네쌍둥이 이상")}
                >
                  네쌍둥이 이상
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="mt-8 w-full flex flex-col items-start">
          <h3 className="text-[#757575] font-normal text-xs leading-normal mb-2">
            임당 진단 여부
          </h3>
          <div className="w-full flex flex-row gap-4">
            <button
              onClick={() => handleGestationalDiabetesChange("네")}
              className={`w-full py-2 rounded-lg ${
                gestationalDiabetes === "네"
                  ? "bg-[#EAE6FF] text-[#4331A4]"
                  : "bg-[#F5F5F5] text-[#B3B3B3]"
              }`}
            >
              네
            </button>
            <button
              onClick={() => handleGestationalDiabetesChange("아니요")}
              className={`w-full py-2 rounded-lg ${
                gestationalDiabetes === "아니요"
                  ? "bg-[#EAE6FF] text-[#4331A4]"
                  : "bg-[#F5F5F5] text-[#B3B3B3]"
              }`}
            >
              아니요
            </button>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className={`w-full mt-28 py-4 tb:py-5 lg:py-6 text-white rounded-xl font-medium ${
            dday && births && gestationalDiabetes
              ? "bg-[#8A77F4]"
              : "bg-[#8A77F4] opacity-60 cursor-not-allowed"
          }`}
          disabled={!dday || !births || !gestationalDiabetes}
        >
          시작하기
        </button>
      </div>
    </>
  );
};

export default Info;
