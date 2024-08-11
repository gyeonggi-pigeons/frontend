"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import NutChart from "../components/NutChart";

const Dinner: React.FC = () => {
  const router = useRouter();
  const [nutritionData, setNutritionData] = useState({
    total_carbohydrates: 19,
    total_protein: 30,
    total_fat: 20,
    total_energy: 19,
  });
  const [menu, setMenu] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [food_items, setFoodItems] = useState<string[]>([]);

  useEffect(() => {
    const fetchDinnerData = async () => {
      try {
        const response = await axios.get(
          "https://mom-ma.fly.dev/user-food-per-time?token=1&date=2024-08-11&time=D"
        );
        const {
          food_items,
          total_carbohydrates,
          total_protein,
          total_fat,
          total_energy,
        } = response.data;
        setNutritionData({
          total_carbohydrates,
          total_protein,
          total_fat,
          total_energy,
        });
        setFoodItems(food_items);
      } catch (error) {
        console.error("Error fetching dinner data:", error);
      }
    };

    fetchDinnerData();
  }, []);

  const handleImageSelect = async (imageSource: string) => {
    setSelectedImage(imageSource);
    setIsAnalyzing(true);
    // open galery
    const file = document.createElement("input");
    file.type = "file";
    file.accept = "image/*";
    file.click();
    file.onchange = async (e) => {
      console.log(e);
      const f = file.files?.[0];
      if (f?.type == "image/jpeg" || f?.type == "image/png") {
        // create a new form-data
        const formData = new FormData();
        formData.append("image", f);
        formData.append("time", "D");
        formData.append("date", "2024-08-11");
        try {
          const response = await axios.post(
            "http://mom-ma.fly.dev/image-upload?token=1",
            formData
          );
          // const {
          //   total_carbohydrates,
          //   total_protein,
          //   total_fat,
          //   total_energy,
          // } = response.data;
          // setNutritionData({
          //   total_carbohydrates,
          //   total_protein,
          //   total_fat,
          //   total_energy,
          // });
          window.location.reload();
          setIsAnalyzing(false);
        } catch (error) {
          console.error("Error analyzing image:", error);
          setIsAnalyzing(false);
        }
      }
    };
    setTimeout(() => {
      // Simulate an API call to analyze the image
      axios
        .post("http://mom-ma.fly.dev/image-upload", { image: imageSource })
        .then((response) => {
          // const {
          //   total_carbohydrates,
          //   total_protein,
          //   total_fat,
          //   total_energy,
          // } = response.data;
          // setNutritionData({
          //   total_carbohydrates,
          //   total_protein,
          //   total_fat,
          //   total_energy,
          // });
          // refresh the page
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error analyzing image:", error);
        })
        .finally(() => {
          setIsAnalyzing(false);
        });
    }, 2000);
  };

  const openCamera = () => {
    handleImageSelect("camera-image-source");
  };

  const openGallery = () => {
    handleImageSelect("gallery-image-source");
  };

  const handleSave = () => {
    router.push(`/mainmore?dinnerCalories=${nutritionData.total_energy}`);
  };

  const handleRemoveElement = async (id: string) => {
    console.log(id);
    await axios.delete(`https://mom-ma.fly.dev/user-food/${id}`);
    const newFoodItems = food_items.filter((food) => food.id != id);
    setFoodItems(newFoodItems);
  };

  return (
    <>
      <div className="w-full min-h-screen bg-white">
        <div className="w-full bg-white web:pb-16 pb-10 flex flex-col items-center">
          <div className="w-full bg-[#DAE4FF] relative flex flex-col 2xs:px-8 xs:px-6 2sm:px-6 px-8 2xs:pt-16 xs:pt-20 pt-20 pb-8">
            <div className="w-full flex flex-row justify-between">
              <button
                onClick={handleSave}
                className=" text-black text-xl font-bold"
              >
                X
              </button>
              <h1 className="text-lg text-[#8792B0] font-semibold leading-normal">
                August 15th Breakfast
              </h1>
            </div>
            <div className="w-full flex web:px-16">
              <NutChart
                carbohydrates={nutritionData.total_carbohydrates}
                protein={nutritionData.total_protein}
                fat={nutritionData.total_fat}
              />
              <div className="absolute web:top-[17.4rem] web:left-[13rem]">
                <div className="flex flex-col items-center justify-center">
                  <p className="text-3xl text-black font-bold">
                    {nutritionData.total_energy}
                  </p>
                  <span className="text-sm text-[#949DB5] font-normal">
                    kcal
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-row py-6 gap-6 justify-between items-center">
              <button
                onClick={openCamera}
                className="w-full h-auto  py-5 text-[#8792B0] bg-white rounded-full"
              >
                Add via Photo
              </button>
              <button
                onClick={openGallery}
                className="w-full h-auto py-5 text-[#8792B0] bg-white rounded-full"
              >
                Add Manually
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col pt-8 gap-4">
            <div className="bg-white relative flex flex-col 2xs:px-8 xs:px-6 2sm:px-6 px-8 pt-8 pb-16">
              <h3 className="text-lg text-black items-end font-semibold leading-normal mb-4">
                A daily diet
              </h3>
              <div className="w-full flex items-center justify-center flex-col">
                {food_items.map((food, index) => (
                  <div
                    key={index}
                    className="w-full flex flex-row justify-between items-center px-4 py-4 border-[1px] border-black rounded-xl cursor-pointer text-black"
                  >
                    <div className="flex flex-col justify-between gap-4 items-left">
                      <h2 className="font-medium text-lg text-black">
                        {food.food.food_name}
                      </h2>
                      <h3>
                        {food.serving} serving ({food.food.food_weight}
                        {food.food.food_weight_type})
                      </h3>
                    </div>
                    <div className="flex flex-row gap-4">
                      <h2>
                        {Math.floor(
                          (food.food.energy * food.food.food_weight) /
                            food.food.nutrition_content_standard
                        )}
                        kcal
                      </h2>
                      <button onClick={() => handleRemoveElement(food.id)}>
                        X
                      </button>
                    </div>
                  </div>
                ))}
                {!food_items.length && (
                  <p className="text-[#8792B0] font-semibold text-base">
                    No meal recorded yet
                  </p>
                )}

                {selectedImage && (
                  <div className="w-full mt-4 flex justify-center">
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="max-w-xs rounded-md"
                    />
                  </div>
                )}

                {isAnalyzing && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white px-4 py-2 rounded">
                      <p>Analyzing...</p>
                    </div>
                  </div>
                )}
              </div>
              <button
                className="w-full  mt-28 py-4  text-white rounded-xl font-medium bg-[#8A77F4]"
                onClick={() => {
                  window.location.href = "/mainmore";
                }}
              >
                Meal recorded
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dinner;
