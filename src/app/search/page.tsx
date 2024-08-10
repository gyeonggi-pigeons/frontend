"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Search: React.FC = () => {
  const [menu, setMenu] = useState<string>("");
  const router = useRouter();

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
      router.push("/mamma");
    } catch (error) {
      console.error("Error submitting recommendation:", error);
      alert("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <div className="w-full h-screen bg-gray-200 relative flex flex-col 2xs:px-8 xs:px-10 2sm:px-7 sm:px-12 tb:px-24 lg:px-32 xl:px-48 2xs:pt-20 xs:pt-24 pt-28 tb:pt-28 lg:pt-36 pb-8 items-center justify-center">
        <h1 className="text-4xl font-black">SEARCH</h1>

        <div className="w-full flex flex-col pt-8">
          <label htmlFor="menu">이름</label>
          <input
            type="text"
            id="menu"
            value={menu}
            placeholder="메뉴를 10자 이내로 입력해주세요"
            onChange={handleMenuChange}
            className="tb:w-[32rem] lg:w-[32rem] mt-2 mb-8 p-2 text-black border border-gray-300 rounded-xl"
            required
          />
          <div>
            <h3>산모로서 먹어도 되는가?</h3>
          </div>
          <div>
            <p>현재 내 체중은 이렇습니다</p>
          </div>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-[#ffa6a6] mt-12 sm:mt-24 tb:mt-28 lg:mt-44 2xs:py-3 py-4 tb:py-5 lg:py-6 2xs:text-[12px] xs:text-[14px] 2sm:text-[16px] sm:text-[16px] tb:text-[18px] lg:text-[24px] text-white rounded-2xl font-bold"
      >
        다음
      </button>
    </>
  );
};

export default Search;
