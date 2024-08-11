"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import HeadMeta from "./components/HeadMeta/HeadMeta";

const Main: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 20) {
      setName(e.target.value);
    }
  };

  const handleSubmit = async () => {
    if (name.trim() === "") {
      alert("Everything is requiredred");
      return;
    }

    try {
      setName("");
      router.push("/onboarding");
    } catch (error) {
      console.error("Error submitting name:", error);
      alert("Error submitting name");
    }
  };

  return (
    <>
      <HeadMeta />
      <div className="w-full h-screen bg-[#FEFFFE] relative flex flex-col 2xs:px-8 xs:px-6 2sm:px-6 px-8 2xs:pt-16 xs:pt-20 pt-20 pb-8 items-start justify-start">
        <h3 className="text-lg text-[#7B63FF] font-semibold leading-normal mb-2">
          Hello!
        </h3>
        <h1 className="text-2xl text-black font-semibold leading-normal">
          How can I call you?
        </h1>

        <div className="mt-10 w-full flex flex-col relative">
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Please enter your name"
            onChange={handleNameChange}
            className={`mt-2 px-2 pt-6 pb-3 pl-4 text-black placeholder-[#999999] rounded-xl relative
            ${
              name.length > 0
                ? "border border-[#1E1E1E]"
                : "bg-[#F5F5F5] placeholder-[#F5F5F5] border-none"
            }`}
            required
          />
          <label
            htmlFor="name"
            className="absolute left-4 top-2 px-1 pt-2 pb-3 transition-all duration-300 ease-in-out 
           text-xs  text-[#7D7D7D]"
          >
            Name
          </label>
          <p className="mt-2 text-[#B3B3B3] font-normal text-sm leading-normal text-center">
            You can enter up to 20 characters
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className={`w-full 2xs:mt-16 xs:mt-12 2sm:mt-12 mt-20 py-4  2xs:text-[12px] xs:text-[14px] 2sm:text-[16px] rounded-xl font-medium ${
            name.trim()
              ? "bg-[#8A77F4] text-white"
              : "bg-[#8A77F4] opacity-60 text-white cursor-not-allowed"
          }`}
          disabled={!name.trim()}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Main;
