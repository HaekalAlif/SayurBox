import React from "react";
import { ChevronLeft } from "lucide-react";

const CategoryList = () => {
  // Data kategori
  const specialCategories = [
    {
      name: "By Sayurbox",
      icon: "assets/category/sayurbox.png",
      href: "/catalog",
    },
    {
      name: "Planto",
      icon: "assets/category/planto.png",
      href: "/catalog",
    },
    {
      name: "Bangga Lokal",
      icon: "assets/category/bangga-lokal.png",
      href: "/catalog",
    },
    {
      name: "Sayurbox Premium",
      icon: "assets/category/premium.png",
      href: "/catalog",
    },
  ];

  const allCategories = [
    {
      name: "New Product",
      icon: "assets/category/new-product.png",
      href: "/catalog?category=new-product",
    },
    {
      name: "Sayur",
      icon: "assets/category/sayur.png",
      href: "/catalog?category=sayur",
    },
    {
      name: "Buah",
      icon: "assets/category/buah.png",
      href: "/catalog?category=buah",
    },
    {
      name: "Protein",
      icon: "assets/category/protein.png",
      href: "/catalog?category=protein",
    },
    {
      name: "Sembako",
      icon: "assets/category/sembako.png",
      href: "/catalog?category=sembako",
    },
    {
      name: "Bumbu Dapur",
      icon: "assets/category/bumbu.png",
      href: "/catalog?category=bumbu-dapur",
    },
    {
      name: "Susu & Olahan",
      icon: "assets/category/susu.png",
      href: "/catalog?category=susu-olahan",
    },
    {
      name: "Ibu & Bayi",
      icon: "assets/category/ibu-bayi.png",
      href: "/catalog?category=ibu-bayi",
    },
    {
      name: "Sarapan",
      icon: "assets/category/sarapan.png",
      href: "/catalog?category=sarapan",
    },
    {
      name: "Makanan Ringan",
      icon: "assets/category/snack.png",
      href: "/catalog?category=makanan-ringan",
    },
    {
      name: "Minuman Ringan",
      icon: "assets/category/drink.png",
      href: "/catalog?category=minuman-ringan",
    },
    {
      name: "Siap Saji",
      icon: "assets/category/siap-saji.png",
      href: "/catalog?category=siap-saji",
    },
    {
      name: "Kesehatan",
      icon: "assets/category/kesehatan.png",
      href: "/catalog?category=kesehatan",
    },
    {
      name: "Perawatan Diri",
      icon: "assets/category/perawatan-diri.png",
      href: "/catalog?category=perawatan-diri",
    },
    {
      name: "Perawatan Rumah",
      icon: "assets/category/perawatan-rumah.png",
      href: "/catalog?category=perawatan-rumah",
    },
    {
      name: "Perlengkapan Hewan",
      icon: "assets/category/hewan.png",
      href: "/catalog?category=perlengkapan-hewan",
    },
    {
      name: "21+ Category",
      icon: "assets/category/kategori-dewasa.png",
      href: "/catalog?category=21-category",
    },
  ]; 

  const handleBackClick = () => {
    window.history.back();
  };

  // Category Card Component
  const CategoryCard = ({ category }) => (
    <a
      href={category.href}
      className="flex flex-col items-center justify-center group"
    >
      <div className="w-22 h-22 mb-4 flex items-center justify-center rounded-lg bg-[#F4F4E6] overflow-hidden border border-transparent group-hover:border-green-600 transition-all duration-200 cursor-pointer">
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
      <span className="text-sm font-semibold text-gray-800 text-center leading-tight group-hover:text-green-600 transition-colors duration-200">
        {category.name}
      </span>
    </a>
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
              <CategoryCard key={index} category={category} />
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
              <CategoryCard key={index} category={category} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CategoryList;
