import React from "react";
import { ChevronLeft } from "lucide-react";

const CategoryList = () => {
  // Data kategori
  const specialCategories = [
    {
      name: "By Sayurbox",
      icon: "/src/assets/category/sayurbox.png",
    },
    {
      name: "Planto",
      icon: "/src/assets/category/planto.png",
    },
    {
      name: "Bangga Lokal",
      icon: "/src/assets/category/bangga-lokal.png",
    },
    {
      name: "Sayurbox Premium",
      icon: "/src/assets/category/premium.png",
    },
  ];

  const allCategories = [
    { name: "New Product", icon: "/src/assets/category/new-product.png" },
    { name: "Sayur", icon: "/src/assets/category/sayur.png" },
    { name: "Buah", icon: "/src/assets/category/buah.png" },
    { name: "Protein", icon: "/src/assets/category/protein.png" },
    { name: "Sembako", icon: "/src/assets/category/sembako.png" },
    { name: "Bumbu Dapur", icon: "/src/assets/category/bumbu.png" },
    { name: "Susu & Olahan", icon: "/src/assets/category/susu.png" },
    { name: "Ibu & Bayi", icon: "/src/assets/category/ibu-bayi.png" },
    { name: "Sarapan", icon: "/src/assets/category/sarapan.png" },
    { name: "Makanan Ringan", icon: "/src/assets/category/snack.png" },
    { name: "Minuman Ringan", icon: "/src/assets/category/drink.png" },
    { name: "Siap Saji", icon: "/src/assets/category/siap-saji.png" },
    { name: "Kesehatan", icon: "/src/assets/category/kesehatan.png" },
    {
      name: "Perawatan Diri",
      icon: "/src/assets/category/perawatan-diri.png",
    },
    {
      name: "Perawatan Rumah",
      icon: "/src/assets/category/perawatan-rumah.png",
    },
    { name: "Perlengkapan Hewan", icon: "/src/assets/category/hewan.png" },
    {
      name: "21+ Category",
      icon: "/src/assets/category/kategori-dewasa.png",
    },
  ];

  const handleBackClick = () => {
    navigate(-1);
  };

  // Category Card Component
  const CategoryCard = ({ category, onClick }) => (
    <div className="flex flex-col items-center justify-center group">
      <div
        onClick={onClick}
        className="w-22 h-22 mb-4 flex items-center justify-center rounded-lg bg-[#F4F4E6] overflow-hidden border border-transparent group-hover:border-green-600 transition-all duration-200 cursor-pointer"
      >
        <img
          src={category.icon}
          alt={category.name}
          className="w-full h-full object-contain transform transition-transform duration-200 group-hover:translate-y-0.5 p-2 bg-[#F4F4E6]"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
      </div>

      {/* Teks kategori di bawah gambar */}
      <span className="text-sm font-semibold text-gray-800 text-center leading-tight group-hover:text-green-600 transition-colors duration-200">
        {category.name}
      </span>
    </div>
  );

  return (
    <div className="px-4">
      {/* Header with Back Button */}
      <div className="top-0 bg-white z-10 pl-6">
        <button
          onClick={handleBackClick}
          className="relative top-16 left-6 cursor-pointer items-center w-14 h-14 text-lg text-green-600 border border-green rounded-full border-green-400 hover:scale-110 transition-transform"
        >
          <ChevronLeft className="w-10 h-10 ml-1" />
        </button>
      </div>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Section 1: Spesial untuk kamu! */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Spesial untuk kamu!
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-42">
            {specialCategories.map((category, index) => (
              <CategoryCard
                key={index}
                category={category}
                onClick={() => handleCategoryClick(category.name)}
              />
            ))}
          </div>
        </section>

        {/* Section 2: Semua Kategori */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-8">
            Semua Kategori
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-44 gap-y-12 mb-16">
            {allCategories.map((category, index) => (
              <CategoryCard
                key={index}
                category={category}
                onClick={() => handleCategoryClick(category.name)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CategoryList;
