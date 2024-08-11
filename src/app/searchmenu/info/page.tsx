"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import prev from "../../../../public/images/icon-prev.png";
import result from "../../../../public/images/img-result.png";

const Searchmenu: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <div className="w-full min-h-screen bg-[#white] relative flex flex-col ">
        <div className="w-full bg-white flex flex-col 2xs:px-8 xs:px-6 2sm:px-6 px-8 2xs:pt-16 xs:pt-20 pt-20 pb-8">
          <div className="w-full flex flex-row justify-start gap-4 items-center mb-6">
            <img
              src={prev.src}
              onClick={handleBack}
              alt="prev"
              className="flex w-[1.6rem] h-[1.6rem]"
            />
          </div>
          <div className="w-full flex flex-col gap-7">
            <div className="flex flex-row gap-5">
              <img
                src={result.src}
                alt="result"
                className="flex w-1/2 h-auto"
              />
              <div>
                <ul className="flex flex-col">
                  <li className="font-bold text-base text-[#1E1E1E]">
                    함박 스테이크
                  </li>
                  <li className="text-sm text-[#B3B3B3]">
                    가정식,1 serving (100g)
                  </li>
                  <li className="mt-10 text-lg font-semibold text-[#1E1E1E]">
                    200kcal
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full flex items-center justify-center pb-6">
              <ul className="flex flex-row gap-12 items-center">
                <li className="flex flex-col gap-1 text-center relative px-4">
                  <p className="text-xl font-medium text-[#1E1E1E]">300g</p>
                  <p className="text-sm text-[#B3B3B3]">Carbs</p>
                  <div className="absolute inset-y-0 right-[-1.4rem] w-px bg-[#3C3C432E]"></div>
                </li>
                <li className="flex flex-col gap-1 text-center relative px-4">
                  <p className="text-xl font-medium text-[#1E1E1E]">300g</p>
                  <p className="text-sm text-[#B3B3B3]">Protein</p>
                  <div className="absolute inset-y-0 right-[-1.4rem]  w-px bg-[#3C3C432E]"></div>
                </li>
                <li className="flex flex-col gap-1 text-center px-4">
                  <p className="text-xl font-medium text-[#1E1E1E]">500g</p>
                  <p className="text-sm text-[#B3B3B3]">Fat</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-[#F6F4F9] relative flex flex-col 2xs:px-8 xs:px-6 2sm:px-6 px-8 pt-10 pb-8">
          <h3 className="text-lg text-black items-end font-semibold leading-normal mb-4">
            Is it safe to eat during pregnancy?
          </h3>
          <div className="w-full p-4 bg-[#FFF9EA] rounded-xl">
            <h3 className="text-lg text-[#FA9804] items-end font-semibold leading-normal mb-2">
              Caution
            </h3>
            <p className="font-normal leading-normal">
              Caution is needed for those with gestational diabetes, like you.
              To prevent ketosis, it's recommended to have a snack with
              appropriate carbohydrates rather than protein before bedtime
              (e.g., Korean rice cake)
            </p>
          </div>
          <h3 className="text-lg text-black items-end font-semibold leading-normal mt-10 mb-2">
            How is it as a meal plan?
          </h3>
          <div className="w-full p-4 bg-[#ECFFF0] rounded-xl">
            <h3 className="text-lg text-[#00B628] items-end font-semibold leading-normal mb-4">
              Recommended
            </h3>
            <p className="font-normal leading-normal">
              Suitable for meeting today's remaining nutrients and calories.
              High in protein, helping to maintain satiety.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Searchmenu;
