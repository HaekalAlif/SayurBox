import React, { useState } from "react";
import {
  Search,
  ShoppingCart,
  FileText,
  CreditCard,
  User,
  ChevronRight,
  MapPin,
} from "lucide-react";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full bg-white">
      {/* Header Utama */}
      <div className="container mx-auto px-2 py-2">
        <div className="flex items-center justify-between px-4">
          {/* Logo - 25% */}
          <div className="w-[25%] flex items-center space-x-3">
            <div className="flex items-center">
              <img
                src="/assets/header/sayurbox-logo.png"
                alt="Sayurbox Logo"
                className="h-18 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            </div>
          </div>

          {/* Search Bar - 40% */}
          <div className="w-[90%]">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari produknya disini!"
                className="w-full h-10 px-6 py-3 pr-12 border-2 focus:outline-none focus:border-green-400 transition-colors rounded-md"
                style={{ borderColor: "#BEE4B4" }}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full">
                <img src="/assets/header/search.png" className="w-8" />
              </button>
            </div>
          </div>

          {/* Ikon Kanan - 35% */}
          <div className="w-[50%] flex items-center space-x-10 justify-end">
            {/* Ikon Keranjang */}
            <div className="relative">
              <div className="w-14 h-14 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center cursor-pointer">
                <img src="/assets/header/cart.png" className="w-8" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">3</span>
              </div>
            </div>

            {/* Ikon Nota */}
            <div className="relative">
              <div className="w-14 h-14 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center cursor-pointer">
                <img src="/assets/header/bill.png" className="w-8" />
              </div>
              <div
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(45deg, #FFD42A, #4ADE80)",
                }}
              >
                <span className="text-xs text-white font-bold">!</span>
              </div>
            </div>

            {/* Ikon Keranjang 2 */}
            <div className="relative">
              <div className="w-14 h-14 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center cursor-pointer">
                <img src="/assets/header/cart-2.png" className="w-8" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-xs text-gray-800 font-bold">$</span>
              </div>
            </div>

            {/* Ikon Profil */}
            <div
              className="w-18 h-18 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow cursor-pointer"
              style={{ backgroundColor: "#E6B800" }}
            >
              <img src="/assets/header/profile.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      {/* Alamat Pengiriman */}
      <div className="container mx-auto px-10 pb-3">
        <div className="text-sm font-bold text-gray-700 mb-2">Dikirim ke :</div>
        <div
          className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:shadow-sm transition-shadow max-w-xl"
          style={{ backgroundColor: "#FFD42A" }}
        >
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-gray-600" />
            <span className="text-gray-800 font-medium truncate">
              Jl. Raya Serpong No. 123, Tangerang Selatan, Banten 15310
            </span>
          </div>
          <ChevronRight className="w-5 h-5 text-green-600 flex-shrink-0" />
        </div>
      </div>

      {/* Garis Bawah */}
      <div
        className="w-[95%] h-1 mx-auto"
        style={{ backgroundColor: "#BEE4B4" }}
      ></div>
    </div>
  );
};

export default Header;
