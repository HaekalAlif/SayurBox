import React from "react";
import { Search } from "lucide-react";

const ExploreMore = () => {
  const handleExploreClick = () => {
    console.log("Explore more clicked");
  };

  return (
    <div className="flex justify-center py-6 mb-4">
      <button
        onClick={handleExploreClick}
        className="flex items-center gap-3 w-[60%] h-20 py-3 rounded-sm font-bold text-base cursor-pointer border-none shadow-none transition-all duration-200 hover:shadow-md overflow-hidden"
        style={{
          backgroundColor: "#B1E9AB",
          color: "#1B4D1A",
        }}
      >
        <div
          className="flex items-center -ml-4 justify-center w-36 h-32 rounded-full"
          style={{ backgroundColor: "#4CAF50" }}
        >
          <Search size={50} className="text-white ml-2" />
        </div>
        <div className="flex justify-center items-center w-full h-full">
          <p className="text-green-800 font-bold text-4xl">
            Lihat Menu Menarik Lainnya di Sini!
          </p>
        </div>
      </button>
    </div>
  );
};

export default ExploreMore;
