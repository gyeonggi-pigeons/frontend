"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SplashScreen from "./components/SplashScreen";

const Main: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 5) {
      setName(e.target.value);
    }
  };

  const handleSubmit = async () => {
    if (name.trim() === "") {
      alert("모든 내용을 입력해주세요.");
      return;
    }

    try {
      alert("완료되었습니다!");
      setName("");
      router.push("/onboarding");
    } catch (error) {
      console.error("Error submitting recommendation:", error);
      alert("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <SplashScreen />
      <div className="w-full h-screen bg-[#FEFFFE] relative flex flex-col 2xs:px-8 xs:px-10 2sm:px-7 sm:px-12 tb:px-24 lg:px-32 xl:px-48 2xs:pt-20 xs:pt-24 pt-24 tb:pt-28 lg:pt-36 pb-8 items-start justify-start">
        <h3 className="text-xl text-[#7B63FF] font-semibold">안녕하세요!</h3>
        <h1 className="text-2xl text-black font-semibold leading-normal">
          소중한 산모님을
          <br />
          어떻게 불러드리면 될까요?
        </h1>

        <div className="mt-10 w-full flex flex-col relative">
          <input
            type="text"
            id="name"
            value={name}
            placeholder="산모님의 이름을 입력해주세요"
            onChange={handleNameChange}
            className={`tb:w-[32rem] lg:w-[32rem] mt-2 px-2 pt-6 pb-3 pl-4 text-black placeholder-[#999999] rounded-xl relative
            ${
              name.length > 0
                ? "border border-[#1E1E1E]"
                : "bg-[#F5F5F5] placeholder-[#F5F5F5] border-none"
            }`}
            required
          />
          <label
            htmlFor="name"
            className="absolute left-4 top-2 px-1 pt-2 pb-3 transition-all duration-300 ease-in-out 
           text-xs text-[#7D7D7D]"
          >
            이름
          </label>
          <p className="mt-2 text-[#B3B3B3] font-normal text-sm leading-normal text-center">
            최대 5자까지 입력 가능해요
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className={`w-full mt-12 sm:mt-16 tb:mt-28 lg:mt-44 2xs:py-3 py-4 tb:py-5 lg:py-6 2xs:text-[12px] xs:text-[14px] 2sm:text-[16px] sm:text-[16px] tb:text-[18px] lg:text-[24px] rounded-xl font-medium ${
            name.trim()
              ? "bg-[#8A77F4] text-white"
              : "bg-[#8A77F4] opacity-60 text-white cursor-not-allowed"
          }`}
          disabled={!name.trim()}
        >
          다음
        </button>
      </div>
    </>
  );
};

export default Main;
