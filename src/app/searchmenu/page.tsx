"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import prev from "../../../public/images/icon-prev.png";
import searchIcon from "../../../public/images/icon-search.png";
import SearchCard from "../components/SearchCard";

const Searchmenu: React.FC = () => {
  const router = useRouter();
  const [menu, setMenu] = useState<string>("함박 스테이크");

  const handleMenuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 10) {
      setMenu(e.target.value);
    }
  };

  const handleSubmit = async () => {
    if (menu.trim() === "") {
      alert("메뉴를 입력해주세요.");
      return;
    }

    try {
      alert("완료되었습니다!");
      setMenu("");
      router.push("/");
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
      <div className="w-full min-h-screen bg-[#F6F4F9] relative flex flex-col ">
        <div className="w-full  bg-white flex flex-col 2xs:px-8 xs:px-6 2sm:px-6 px-8 2xs:pt-16 xs:pt-20 pt-20 pb-8">
          <div className="w-full flex flex-row justify-between gap-4 items-center">
            <img
              src={prev.src}
              onClick={handleBack}
              alt="prev"
              className="flex w-[1.6rem] h-[1.6rem]"
            />
            <label htmlFor="name" className=""></label>
            <div className="relative w-full">
              <input
                type="text"
                id="searchname"
                value={menu}
                placeholder=""
                onChange={handleMenuChange}
                className="mt-2 px-4 py-4 pl-4 text-[#1E1E1E] bg-[#F5F5F5] font-semibold rounded-xl w-full relative flex items-center justify-center"
                required
              />
              <button
                onClick={handleSubmit}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 pt-2"
              >
                <img
                  src={searchIcon.src}
                  alt="Search"
                  className="w-6 h-6 2sm:w-5 2sm:h-5"
                />
              </button>
            </div>
          </div>
        </div>
        <div className="w-full bg-[#F6F4F9] p-4">
          <SearchCard
            name="함박 스테이크"
            energy={200}
            info="가정식,1 serving (100g)"
            id={""}
          />
        </div>
      </div>
    </>
  );
};

export default Searchmenu;
