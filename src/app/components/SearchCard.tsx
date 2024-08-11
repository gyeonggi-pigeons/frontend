"use client";
import React from "react";
import { useRouter } from "next/navigation";

type CardProps = {
  id: string;
  name: string;
  info: string;
  energy: number;
};

const SearchCard: React.FC<CardProps> = ({ id, name, info, energy }) => {
  const router = useRouter();

  const handleSelect = () => {
    router.push("/searchmenu/info");
  };
  return (
    <div
      key={id}
      onClick={handleSelect}
      className="flex flex-row flex-shrink-0 w-full h-full justify-between items-center p-5 bg-white border-none rounded-xl"
    >
      <div className="flex flex-col gap-2">
        <h2 className="font-bold sm:text-base text-lg text-[#1E1E1E]">
          {name}
        </h2>
        <p className="text-sm text-[#B3B3B3]">{info}</p>
      </div>
      <p className="text-2xl font-semibold text-[#1E1E1E]">{energy}kcal</p>
    </div>
  );
};

export default SearchCard;
