"use client";
import React from "react";

type CardProps = {
  id: string;
  menu: string;
};

const MammaCard: React.FC<CardProps> = ({ id, menu }) => {
  return (
    <div
      key={id}
      className="flex flex-col w-full h-full justify-between tb:px-3 lg:px-3 px-4 py-3 bg-[#8e81d3] border rounded-xl shadow-md"
    >
      <div>
        <h2 className="font-bold sm:text-base text-lg text-white">{menu}</h2>
        <p className="sm:text-sm text-sm text-white">이러이러한 영양정보</p>
      </div>
      <div className="2xs:mt-6 xs:mt-6 2sm:mt-6 sm:mt-5 mt-3 lg:mt-4 flex-end flex-col items-end">
        <p className="text-sm font-bold text-gray-200">저녁 식사</p>
      </div>
    </div>
  );
};

export default MammaCard;
