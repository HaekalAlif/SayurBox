import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getCategories } from "@/service/categories/category";
import { useNavigate, useSearchParams } from "react-router-dom";

// Mapping slug ke judul dan subjudul
const categoryInfo = {
  "new-product": {
    title: "Produk Terbaru",
    subtitle: "Temukan produk terbaru dari Sayurbox",
  },
  "sayur": {
    title: "Sayur",
    subtitle: "Aneka sayuran segar pilihan",
  },
  "buah": {
    title: "Buah",
    subtitle: "Buah-buahan segar setiap hari",
  },
  "protein": {
    title: "Protein",
    subtitle: "Sumber protein terbaik untuk keluarga",
  },
  "sembako": {
    title: "Sembako",
    subtitle: "Kebutuhan pokok harian Anda",
  },
  "bumbu-dapur": {
    title: "Bumbu Dapur",
    subtitle: "Bumbu dapur lengkap untuk masakan lezat",
  },
  "susu-olahan": {
    title: "Susu & Olahan",
    subtitle: "Produk susu dan olahan berkualitas",
  },
  "ibu-bayi": {
    title: "Ibu & Bayi",
    subtitle: "Pilihan terbaik untuk ibu dan bayi",
  },
  "sarapan": {
    title: "Sarapan",
    subtitle: "Menu sarapan sehat dan praktis",
  },
  "makanan-ringan": {
    title: "Makanan Ringan",
    subtitle: "Cemilan enak untuk segala suasana",
  },
  "minuman-ringan": {
    title: "Minuman Ringan",
    subtitle: "Minuman segar pelepas dahaga",
  },
  "siap-saji": {
    title: "Siap Saji",
    subtitle: "Makanan siap saji praktis",
  },
  "kesehatan": {
    title: "Kesehatan",
    subtitle: "Produk kesehatan untuk keluarga",
  },
  "perawatan-diri": {
    title: "Perawatan Diri",
    subtitle: "Perawatan diri dan kecantikan",
  },
  "perawatan-rumah": {
    title: "Perawatan Rumah",
    subtitle: "Produk perawatan rumah tangga",
  },
  "perlengkapan-hewan": {
    title: "Perlengkapan Hewan",
    subtitle: "Kebutuhan hewan peliharaan",
  },
  "21-category": {
    title: "21+ Category",
    subtitle: "Produk khusus dewasa",
  },
};

const FilterSection = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Paling Relevan");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const filterOptions = ["Harga Termurah", "Harga Termahal", "Potongan Diskon"];
  const sortOptions = ["Semua", "Produk Terlaris"];

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (err) {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const categorySlug = searchParams.get("category");
    if (categorySlug) setSelectedCategorySlug(categorySlug);
  }, [searchParams]);

  const handleBackClick = () => {
    window.history.back();
  };

  const handleCategoryClick = (slug) => {
    setSelectedCategorySlug(slug);
    navigate(`/catalog?category=${slug}`);
  };

  const info =
    categoryInfo[selectedCategorySlug] || {
      title: "By Sayurbox",
      subtitle: "Sayur & Buah",
    };

  return (
    <div className="flex">
      {/* Header with Back Button */}
      <div className="my-6 ml-10 border-b border-gray-200">
        <div className="flex items-center mb-4">
          <button
            onClick={handleBackClick}
            className="w-12 h-12 rounded-full border border-green-400 text-green-600 flex items-center justify-center hover:bg-green-50 transition-all duration-200 mr-3 cursor-pointer"
          >
            <ChevronLeft size={32} />
          </button>
        </div>
      </div>
      <div className="w-60 bg-white min-h-screen ">
        {/* Category List */}
        <div className="mt-8 ml-2">
          <h1 className="text-2xl font-bold mb-6">{info.title}</h1>
          <div className="flex space-x-2">
            <ChevronRight className="w-5 h-5 mt-0.5 ml-2" />
            <h3 className="text-md font-bold mb-4">{info.subtitle}</h3>
          </div>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => handleCategoryClick(category.slug)}
                className={`w-full text-left py-2 px-3 rounded-md transition-colors cursor-pointer ${
                  selectedCategorySlug === category.slug
                    ? "text-green-700 font-bold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Section */}
        <div className="mt-6">
          <div className="flex space-x-2 ml-4 mb-2">
            <img src="assets/catalog/filter.png" className="w-6 h-6 mt-1" />
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