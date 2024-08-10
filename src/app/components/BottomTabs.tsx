"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import homeIcon from "../../../public/images/icon-home.png";
import homeIconActive from "../../../public/images/icon-home-active.png";
import pieIcon from "../../../public/images/icon-pie.png";
import pieIconActive from "../../../public/images/icon-pie-active.png";
import userIcon from "../../../public/images/icon-user.png";

interface TabProps {
  icon: any;
  iconActive: any;
  label: string;
  route: string;
}

const tabs: TabProps[] = [
  { icon: homeIcon, iconActive: homeIconActive, label: "Home", route: "/" },
  {
    icon: pieIcon,
    iconActive: pieIconActive,
    label: "Search",
    route: "/check",
  },
  {
    icon: userIcon,
    iconActive: userIcon,
    label: "Profile",
    route: "/profile",
  },
];

const BottomTabs: React.FC = () => {
  const router = useRouter();
  const currentPath = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around items-center py-2">
        {tabs.map((tab) => (
          <div
            key={tab.label}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => router.push(tab.route)}
          >
            <Image
              src={currentPath === tab.route ? tab.iconActive : tab.icon}
              alt={tab.label}
              className="w-6 h-6"
            />
            <span
              className={`text-xs font-semibold ${
                currentPath === tab.route ? "text-[#7D66FF]" : "text-[#888]"
              }`}
            >
              {tab.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomTabs;
