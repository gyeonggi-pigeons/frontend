"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import prev from "../../../../public/images/icon-prev.png";

const Info: React.FC = () => {
  const router = useRouter();
  const [dday, setDday] = useState<string>("2024-08-11");
  const [births, setBirths] = useState<string>("");
  const [gestationalDiabetes, setGestationalDiabetes] = useState<string>("");

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const handleBirthsClick = () => {
    setBottomSheetVisible(true);
  };

  const handleBottomSheetSelect = (selection: string) => {
    setBirths(selection);
    setBottomSheetVisible(false);
  };

  const handleDdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDday(e.target.value);
  };

  const handleGestationalDiabetesChange = (value: string) => {
    setGestationalDiabetes(value);
  };

  const handleSubmit = async () => {
    if (!dday || births.trim() === "" || gestationalDiabetes === "") {
      alert("Everything is requiredred");
      return;
    }

    try {
      setDday("");
      setBirths("");
      setGestationalDiabetes("");
      router.push("/");
    } catch (error) {
      console.error("Error submitting recommendation:", error);
      alert("Error submitting elements");
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <div className="w-full min-h-screen bg-[#FEFFFE] relative flex flex-col 2xs:px-8 xs:px-6 2sm:px-6 px-8 2xs:pt-16 xs:pt-20 pt-20 pb-8 items-start justify-start">
        <div className="mb-4">
          <img
            src={prev.src}
            onClick={handleBack}
            alt=""
            className="w-[1.6rem] h-auto"
          />
        </div>
        <h1 className="text-2xl text-black font-semibold leading-normal">
          You're currently pregnant!
          <br />
          Please enter more information.
        </h1>
        <p className="mt-2 text-[#757575] font-normal 2xs:text-xs xs:text-xs text-sm leading-normal">
          Please enter more information.
        </p>

        <div className="mt-10 w-full flex flex-col gap-4 relative">
          <div className="relative w-full">
            <input
              type="date"
              id="dday"
              value={dday}
              onChange={handleDdayChange}
              className="w-full mt-2 px-2 pt-6 pb-3 pl-4 text-black rounded-xl border-none bg-[#F5F5F5]"
              required
            />
            <label
              htmlFor="dday"
              className="absolute left-4 top-4 text-xs text-[#7D7D7D] transition-all duration-300"
            >
              Due date
            </label>
          </div>

          <div className="relative w-full mb-4">
            <input
              type="text"
              id="births"
              value={births}
              onClick={handleBirthsClick}
              className="w-full mt-2 px-2 pt-6 pb-3 pl-4 text-black rounded-xl border-none bg-[#F5F5F5]"
              readOnly
              required
            />
            <label
              htmlFor="births"
              className="absolute left-4 top-4 text-xs text-[#7D7D7D] transition-all duration-300"
            >
              Single birth, Twin birth
            </label>
            <span className="absolute right-4 bottom-3 text-xs text-[#B3B3B3]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="6"
                viewBox="0 0 14 6"
                fill="none"
              >
                <path
                  d="M1 1L7 7L13 1"
                  stroke="#757575"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>

          {bottomSheetVisible && (
            <div className="fixed inset-0 bg-black opacity-20 z-40"></div>
          )}
          {bottomSheetVisible && (
            <div className="fixed bottom-0 left-0 w-full 2xs:h-[48vh] xs:h-[56vh] 2sm:h-[50vh] web:h-[56vh] web:px-20 bg-white 2xs:px-12 xs:px-8 2sm:px-10 pt-4 pb-6 rounded-t-3xl shadow-lg z-50">
              <h3 className="my-6 text-[#1E1E1E] font-semibold text-sm web:text-base leading-normal">
                Please select the appropriate item
              </h3>
              <ul className="flex flex-col gap-6 mt-4 web:gap-8 web:mt-6">
                <li
                  className="w-full h-auto text-base pt-2 pb-4 web:pb-6 text-[#1C1C1C] border-b border-[#EFEFEF]"
                  onClick={() => handleBottomSheetSelect("A single baby")}
                >
                  A single baby
                </li>
                <li
                  className="w-full h-auto text-base pt-2 pb-4 web:pb-6 text-[#1C1C1C] border-b border-[#EFEFEF]"
                  onClick={() => handleBottomSheetSelect("Twins")}
                >
                  Twins
                </li>
                <li
                  className="w-full h-auto text-base pt-2 pb-4 web:pb-6 text-[#1C1C1C] border-b border-[#EFEFEF]"
                  onClick={() => handleBottomSheetSelect("Triplet")}
                >
                  Triplet
                </li>
                <li
                  className="w-full h-auto text-base pt-2 pb-4 web:pb-6 text-[#1C1C1C] "
                  onClick={() =>
                    handleBottomSheetSelect("More than four twins")
                  }
                >
                  More than four twins
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="mt-4 w-full flex flex-col items-start">
          <h3 className="text-[#757575] font-normal text-xs leading-normal mb-2">
            Diagnosis of gestational diabetes
          </h3>
          <div className="w-full flex flex-row gap-4">
            <button
              onClick={() => handleGestationalDiabetesChange("Yes")}
              className={`w-full py-4 rounded-lg ${
                gestationalDiabetes === "Yes"
                  ? "bg-[#EAE6FF] text-[#4331A4]"
                  : "bg-[#F5F5F5] text-[#B3B3B3]"
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => handleGestationalDiabetesChange("No")}
              className={`w-full py-4 rounded-lg ${
                gestationalDiabetes === "No"
                  ? "bg-[#EAE6FF] text-[#4331A4]"
                  : "bg-[#F5F5F5] text-[#B3B3B3]"
              }`}
            >
              No
            </button>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className={`w-full web:mt-32 mt-28 py-4 tb:py-5 lg:py-6 text-white rounded-xl font-medium ${
            dday && births && gestationalDiabetes
              ? "bg-[#8A77F4]"
              : "bg-[#8A77F4] opacity-60 cursor-not-allowed"
          }`}
          disabled={!dday || !births || !gestationalDiabetes}
        >
          Start
        </button>
      </div>
    </>
  );
};

export default Info;
