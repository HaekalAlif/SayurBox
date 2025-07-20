import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FilterSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("Protein");
  const [selectedFilter, setSelectedFilter] = useState("Paling Relevan");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const categories = [
    "Protein",
    "Paket Masak",
    "Sayuran Siap Saji",
    "Jus Segar",
    "Bumbu Masak Praktis",
    "Makanan & Minuman Ringan",
    "Kebutuhan Dapur",
    "Pelengkap Makanan",
  ];

  const filterOptions = ["Harga Termurah", "Harga Termahal", "Potongan Diskon"];

  const sortOptions = ["Semua", "Produk Terlaris"];

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="flex">
      {/* Header with Back Button */}
      <div className="my-6 ml-10 border-b border-gray-200">
        <div className="flex items-center mb-4">
          <button
            onClick={handleBackClick}
            className="w-12 h-12 rounded-full border border-green-400 text-green-600 flex items-center justify-center hover:bg-green-50 transition-all duration-200 mr-3"
          >
            <ChevronLeft size={32} />
          </button>
        </div>
      </div>
      <div className="w-60 bg-white min-h-screen ">
        {/* Category List */}
        <div className="mt-8">
          <h1 className="text-2xl font-bold mb-6">By Sayurbox</h1>
          <div className="flex space-x-2">
            <ChevronRight className="w-5 h-5 mt-0.5 ml-2" />
            <h3 className="text-md font-bold mb-4">Sayur & Buah</h3>
          </div>
          <div className="space-y-2">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-left py-2 px-3 rounded-md transition-colors cursor-pointer ${
                  selectedCategory === category
                    ? "text-green-700 font-bold"
                    : index === 0
                    ? "text-gray-900 hover:bg-gray-50"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Section */}
        <div className="mt-6">
          <div className="flex space-x-2 ml-4 mb-2">
            <img
              src="/src/assets/catalog/filter.png"
              className="w-6 h-6 mt-1"
            />
            <h3 className="text-xl font-bold mb-4">Filter</h3>
          </div>
          <div className="flex space-x-2">
            <ChevronRight className="w-5 h-5 mt-0.5 ml-2" />
            <h3 className="text-md font-bold mb-4">Paling Relevan</h3>
          </div>
          <div className="space-y-2">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`w-full text-left py-2 px-3 rounded-md transition-colors cursor-pointer ${
                  selectedFilter === filter
                    ? "text-green-700 font-bold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div className="py-6">
          <h3 className="text-3xl font-bold mb-8">Harga</h3>
          <div className="space-y-3">
            <div>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Harga Minimum"
                className="w-full h-14 px-6 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Harga Maksimum"
                className="w-full h-14 px-6 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
