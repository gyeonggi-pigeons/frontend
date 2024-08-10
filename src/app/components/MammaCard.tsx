"use client";
import React from "react";

type CardProps = {
  id: string;
  timeline: string;
  cal: number;
};

const MammaCard: React.FC<CardProps> = ({ id, timeline, cal }) => {
  return (
    <div
      key={id}
      timeline={timeline}
      cal={cal}
      className="flex flex-col w-full h-full justify-between tb:px-3 lg:px-3 px-4 py-3 bg-[#F5F5F5] border rounded-xl shadow-md"
    >
      <div>
        <h2 className="font-bold  text-lg text-[#B3B3B3]">{timeline}</h2>
        <p className="text-sm text-black font-semibold">{cal}</p>
      </div>
    </div>
  );
};

export default MammaCard;
