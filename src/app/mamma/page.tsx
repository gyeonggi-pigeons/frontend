"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import MammaCard from "../components/MammaCard";

const Mamma: React.FC = () => {
  const router = useRouter();

  const [menuName, setMenuName] = useState<string>("");
  const [allMenus, setAllMenus] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleMenuNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMenuName(e.target.value);
  };

  const handleManualSubmit = () => {
    if (menuName.trim() !== "") {
      setAllMenus((prevMenus) => [...prevMenus, menuName]);
      setMenuName("");
    } else {
      alert("메뉴 이름을 입력해주세요.");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const result = await analyzeImage(file);
      setAllMenus((prevMenus) => [
        ...prevMenus,
        ...result.split(",").map((item) => item.trim()),
      ]);
    } catch (err) {
      console.error("Error analyzing image:", err);
      setError("이미지 분석에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const analyzeImage = async (file: File): Promise<string> => {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onloadend = async () => {
        const base64Image = reader.result?.toString().split(",")[1];

        try {
          const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
              model: "gpt-4o",
              messages: [
                {
                  role: "user",
                  content: [
                    {
                      type: "text",
                      text: "사진에 있는 모든 음식 이름을 재료를 제외하고 알려줘. 답변은 음식 이름만 쉼표로 구분하여 나열해줘.",
                    },
                    {
                      type: "image_url",
                      image_url: {
                        url: `data:image/jpeg;base64,${base64Image}`,
                        detail: "low",
                      },
                    },
                  ],
                },
              ],
              max_tokens: 100,
            },
            {
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
                "Content-Type": "application/json",
              },
            }
          );
          resolve(response.data.choices[0].message.content.trim());
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => {
        reject("Failed to read file.");
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="w-full h-screen bg-gray-200 relative flex flex-col 2xs:px-8 xs:px-10 2sm:px-7 sm:px-12 tb:px-24 lg:px-32 xl:px-48 2xs:pt-20 xs:pt-24 pt-28 tb:pt-28 lg:pt-36 pb-8 items-center justify-center">
      <h1 className="text-4xl font-black">당신의 맘마</h1>

      <div className="manual-input w-full px-8 flex flex-col">
        <label>직접 입력</label>
        <input
          type="text"
          value={menuName}
          onChange={handleMenuNameChange}
          placeholder="메뉴 이름을 입력하세요"
        />
        <button
          onClick={handleManualSubmit}
          className="flex w-full h-12 mt-8 bg-[#968ad3] rounded-lg text-white text-base font-medium text-center items-center justify-center mb-4"
        >
          메뉴 이름 제출
        </button>

        {/* 이미지 업로드 */}
        <div className="image-upload flex flex-col gap-5">
          <label>사진 선택</label>
          <input
            type="file"
            accept="image/*"
            capture={false}
            onChange={handleImageUpload}
          />
        </div>

        {loading && <p>이미지 분석 중...</p>}

        {error && <p>{error}</p>}

        {/* {allMenus.length > 0 && (
          <div className="results">
            <h3>검출된 메뉴 이름:</h3>
            <ul>
              {allMenus.map((menu, index) => (
                <li key={index}>{menu}</li>
              ))}
            </ul>
          </div>
        )} */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allMenus.map((menu, index) => (
            <MammaCard id={index.toString()} key={index} menu={menu} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mamma;
