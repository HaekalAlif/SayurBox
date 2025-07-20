import React, { useState } from "react";
import { ChevronLeft, Search, ChevronUp, ChevronDown } from "lucide-react";

const BeefRecipe = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleBackClick = () => {
    window.history.back();
  };

  const recipeItems = [
    {
      image: "assets/recipe/beef/krengsengan.png",
    },
    {
      image: "assets/recipe/beef/tumis-sapi.png",
    },
    {
      image: "assets/recipe/beef/bbq.png",
    },
    {
      image: "assets/recipe/beef/slice-beef.png",
    },
    {
      image: "assets/recipe/beef/oseng-mercon.png",
    },
    {
      image: "assets/recipe/beef/tofu-daging.png",
    },
    {
      image: "assets/recipe/beef/soto-betawi.png",
    },
    {
      image: "assets/recipe/beef/scotch-eeg.png",
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
            <h1>RASA - Daging Sapi </h1>
          </div>
          <div className="bg-[#FFE887] h-278   rounded-sm px-20 items-center">
            <div className="flex justify-center items-center ">
              <img
                src="assets/recipe/beef/daging-sapi.png"
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

export default BeefRecipe;
