import React from "react";
import { ChevronLeft } from "lucide-react";

const RecipeDetail = () => {
  const handleBackClick = () => {
    window.history.back();
  };

  const mainIngredients = [
    "1 ikat bayam",
    "1 bonggol jamur enoki, buang akarnya",
    "100 gr tahu sutra, potong dadu",
    "100 gr daging sapi cancing",
    "2 siung bawang putih, cincang",
    "1/4 butir bawang bombay, cincang",
    "Air secukupnya",
    "Minyak goreng secukupnya",
    "100 ml Kewpie Salad Dressing dengan Wijen Sangrai",
  ];

  const cookingSteps = [
    "Rebus bayam di air mendidih hingga sedikit layu. Angkat dan tiriskan ",
    "Ulangi hal yang sama dengan jamur enoki",
    "Panaskan minyak, tumis bawang putih dan bombay hingga harum. Masukan daging sapi cincang dan jamur, masak hingga matang",
    "Tambahkan bayam, tahu, dan salad dressing, aduk rata dan masak hingga harum.",
    "Ankat dan sajikan bersama bawang goreng",
  ];

  return (
    <div className="">
      {/* Header with Back Button */}
      <div className="top-0 bg-white z-10 pl-4">
        <button
          onClick={handleBackClick}
          className="relative top-16 left-6 cursor-pointer items-center w-14 h-14 text-lg text-green-600 border border-green rounded-full border-green-400 hover:scale-110 transition-transform"
        >
          <ChevronLeft className="w-10 h-10 ml-1" />
        </button>
      </div>
      <div className="px-6 max-w-5xl mx-auto bg-white min-h-screen">
        {/* Header Section */}
        <div className="font-bold text-3xl text-black mb-6">
          RASA - Resep Tumis Bayam dan Tahu
        </div>
        {/* Main Content Section */}
        <div className="gap-6">
          <div className="flex space-x-16">
            {/* Recipe Image */}
            <img
              src="/assets/recipe-detail/tumis-bayam.png"
              alt="Sayur Asem"
              className="w-120 object-cover h-auto col-span-1"
            />

            {/* Recipe Info */}
            <div className="w-full py-4 flex flex-col justify-between">
              {/* Bagian Atas */}
              <div className="flex items-center space-x-3">
                <img
                  src="/assets/recipe-detail/time.png"
                  alt="Time"
                  className="w-20 h-20"
                />
                <div className="flex flex-col space-y-4">
                  <span className="text-lg font-semibold">Waktu Pembuatan :</span>
                  <span className="text-2xl font-semibold">15 Menit</span>
                </div>
              </div>

              {/* Garis Pemisah */}
              <hr className="border-black border-2 my-4 w-[75%] " />

              {/* Bagian Bawah */}
              <div className="flex items-center space-x-3">
                <img
                  src="/assets/recipe-detail/portion.png"
                  alt="Portion"
                  className="w-20 h-20"
                />
                <div className="flex flex-col space-y-4">
                  <span className="text-lg font-semibold">Porsi :</span>
                  <span className="text-2xl font-semibold">1-2 Orang</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients Section */}
        <div className="mt-8 space-y-6">
          <button className="bg-green-100 text-sm text-left text-green-900 px-4 py-2 font-semibold rounded">
            Beli Bahannya di Sini :
          </button>

          <div>
            <ul className="list-disc list-inside text-sm space-y-1">
              {mainIngredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cooking Instructions Section */}
        <div className="mt-8 space-y-4">
          <button className="bg-green-100 text-sm text-left text-green-900 px-4 py-2 font-semibold rounded">
            Cara Membuat :
          </button>

          <ol className="list-decimal list-inside text-sm space-y-2">
            {cookingSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
