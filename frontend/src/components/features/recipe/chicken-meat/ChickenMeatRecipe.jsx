import React, { useState } from "react";
import { ChevronLeft, Search, ChevronUp, ChevronDown } from "lucide-react";

const ChickenMeatRecipe = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleBackClick = () => {
    window.history.back();
  };

  const recipeItems = [
    {
      image: "assets/recipe/chicken-meat/swike-ayam.png",
    },
    {
      image: "assets/recipe/chicken-meat/kolak-ayam.png",
    },
    {
      image: "assets/recipe/chicken-meat/ayam-katsu.png",
    },
    {
      image: "assets/recipe/chicken-meat/tumis-ayam.png",
    },
    {
      image: "assets/recipe/chicken-meat/ayam-tangsuyuk.png",
    },
    {
      image: "assets/recipe/chicken-meat/ayam-bumbu-kuning.png",
    },
    {
      image: "assets/recipe/chicken-meat/chicken-steak.png",
    },
    {
      image: "assets/recipe/chicken-meat/korean-chicken.png",
    },
  ];

  return (
    <div className="min-h-screen bg-white mb-6">
      {/* Header with Back Button */}
      <div className="top-0 bg-white z-10 pl-4">
        <button
          onClick={handleBackClick}
          className="relative top-12 left-6 cursor-pointer items-center w-14 h-14 text-lg text-green-600 border border-green rounded-full border-green-400 hover:scale-110 transition-transform"
        >
          <ChevronLeft className="w-10 h-10 ml-1" />
        </button>
      </div>
      <div>
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-2xl font-bold">
            <h1>RASA - Daging Ayam </h1>
          </div>
          <div className="bg-[#FFC7C5] h-278   rounded-sm px-20 items-center">
            <div className="flex justify-center items-center ">
              <img
                src="assets/recipe/chicken-meat/daging-ayam.png"
                className="w-120 py-6 object-contain rounded-lg ml-2 mb-4"
              />
            </div>

            {/* Kategori Resep */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-x-4 gap-y-28">
                {recipeItems.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-lg h-32 cursor-pointer transition-all duration-200 justify-between hover:translate-y-1"
                  >
                    <div className="flex justify-between">
                      <div className="w-full h-full rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChickenMeatRecipe;
