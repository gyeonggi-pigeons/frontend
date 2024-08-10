"use client";
import React from "react";
import { useRouter } from "next/navigation";
import SplashScreen from "./components/SplashScreen";

const Main: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <SplashScreen />
      <div className="w-full h-screen bg-gray-200 relative flex flex-col 2xs:px-8 xs:px-10 2sm:px-7 sm:px-12 tb:px-24 lg:px-32 xl:px-48 2xs:pt-20 xs:pt-24 pt-28 tb:pt-28 lg:pt-36 pb-8 items-center justify-center">
        <h1 className="text-4xl font-black text-black">Main</h1>

        <button
          onClick={() => router.push("/input")}
          className="w-full bg-[#ffa6a6] mt-12 sm:mt-24 tb:mt-28 lg:mt-44 2xs:py-3 py-4 tb:py-5 lg:py-6 2xs:text-[12px] xs:text-[14px] 2sm:text-[16px] sm:text-[16px] tb:text-[18px] lg:text-[24px] text-white rounded-2xl font-bold"
        >
          다음
        </button>
      </div>
    </>
  );
};

export default Main;
