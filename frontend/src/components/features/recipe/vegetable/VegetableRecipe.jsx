import React from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VegetableRecipe = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    window.history.back();
  };

  const recipeItems = [
    {
      image: "assets/recipe/vegetable/tumis-bayam.png",
    },
    {
      image: "assets/recipe/vegetable/tumis-pakcoy.png",
    },
    {
      image: "assets/recipe/vegetable/sup-kimlo.png",
    },
    {
      image: "assets/recipe/vegetable/cah-buncis.png",
    },
    {
      image: "assets/recipe/vegetable/pecel.png",
    },
    {
      image: "assets/recipe/vegetable/sup-kacang.png",
    },
    {
      image: "assets/recipe/vegetable/oseng-tempe.png",
    },
    {
      image: "assets/recipe/vegetable/sayur-lodeh.png",
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
            <h1>RASA - Sayur </h1>
          </div>
          <div className="bg-[#B1E9AB] h-248 rounded-sm px-20 items-center">
            <div className="flex justify-center items-center ">
              <img
                src="assets/recipe/vegetable/sayur.png"
                className="w-120 py-6 object-contain rounded-lg ml-2 mb-4"
              />
            </div>

            {/* Kategori Resep */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-x-4 gap-y-20">
                {recipeItems.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-lg h-32 cursor-pointer transition-all duration-200 justify-between hover:translate-y-1"
                    onClick={() => navigate("/recipe/detail")}
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

export default VegetableRecipe;
