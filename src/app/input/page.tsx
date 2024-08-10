"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Input: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [birth, setBirth] = useState<string>("");
  const router = useRouter();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 17) {
      setName(e.target.value);
    }
  };

  const handleBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 10) {
      setBirth(e.target.value);
    }
  };

  const handleSubmit = async () => {
    if (name.trim() === "" || birth.trim() === "") {
      alert("모든 내용을 입력해주세요.");
      return;
    }

    try {
      alert("완료되었습니다!");
      setName("");
      setBirth("");
      router.push("/mamma");
    } catch (error) {
      console.error("Error submitting recommendation:", error);
      alert("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <div className="w-full h-screen bg-gray-200 relative flex flex-col 2xs:px-8 xs:px-10 2sm:px-7 sm:px-12 tb:px-24 lg:px-32 xl:px-48 2xs:pt-20 xs:pt-24 pt-28 tb:pt-28 lg:pt-36 pb-8 items-center justify-center">
        <h1 className="text-4xl font-black text-black">INPUT</h1>

        <div className="w-full flex flex-col pt-8">
          <label htmlFor="age" className="text-black">
            이름
          </label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="이름을 입력해주세요"
            onChange={handleNameChange}
            className="tb:w-[32rem] lg:w-[32rem] mt-2 mb-8 p-2 text-black border border-gray-300 rounded-xl"
            required
          />
          <label htmlFor="birth" className="text-black">
            생년월일
          </label>
          <input
            type="text"
            id="birth"
            value={birth}
            placeholder="생년월일을 입력해주세요 (YYYYMMDD)"
            onChange={handleBirthChange}
            className="tb:w-[32rem] lg:w-[32rem] mt-2 p-2 text-black border border-gray-300 rounded-xl"
            required
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-[#ffa6a6] mt-12 sm:mt-24 tb:mt-28 lg:mt-44 2xs:py-3 py-4 tb:py-5 lg:py-6 2xs:text-[12px] xs:text-[14px] 2sm:text-[16px] sm:text-[16px] tb:text-[18px] lg:text-[24px] text-white rounded-2xl font-bold"
        >
          알아보기
        </button>
      </div>
    </>
  );
};

export default Input;
