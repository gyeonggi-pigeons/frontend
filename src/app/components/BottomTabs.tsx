"use client";
import React from "react";
import { useRouter } from "next/navigation";
import searchIcon from "../../../public/images/icon-search.png";

interface TabProps {
  icon: string;
  label: string;
  route: string;
}

const tabs: TabProps[] = [
  { icon: "../../../public/images/icon-search.png", label: "Home", route: "/" },
  {
    icon: "../../../public/images/icon-search.png",
    label: "Search",
    route: "/check",
  },
  {
    icon: "../../../public/images/icon-search.png",
    label: "Profile",
    route: "/profile",
  },
];

const BottomTabs: React.FC = () => {
  const router = useRouter();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around items-center py-2">
        {tabs.map((tab) => (
          <div
            key={tab.label}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => router.push(tab.route)}
          >
            <img src={tab.icon} alt={tab.label} className="w-6 h-6" />
            <span className="text-xs text-gray-600">{tab.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomTabs;
