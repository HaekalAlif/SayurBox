import React, { useState } from "react";
import { ChevronRight, MapPin } from "lucide-react";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(0);

  const addressList = [
    {
      label: "Fulan bin fulana",
      phone: "+6289800859687",
      address: "Jl. Tugu Monas No.1, Gambir, Kecamatan Gambir, Kota Jakar....",
      type: "",
    },
    {
      label: "Fulan bin fulana",
      phone: "+6289800859687",
      address: "Jl. Tugu Monas No.1, Gambir, Kecamatan Gambir, Kota Jakar....",
      type: "Kantor",
    },
  ];

  const paths = {
    logo: "/",
    cart: "/cart",
    bill: "/orders",
    cart2: "/catalog",
    profile: "/profile",
    voucher: "/voucher",
    sayurpoin: "/sayur-poin",
    resep: "/recipe",
    pesanan: "/orders",
    keranjang: "/cart",
    sayurpanen: "/sayur-panen",
    logout: "/logout",
    alamat: "/profile/address",
  };

  // Fungsi untuk pindah halaman
  const goTo = (path) => {
    window.location.href = path;
  };

  return (
    <div className="w-full bg-white">
      {/* Header Utama */}
      <div className="container mx-auto px-2 py-2">
        <div className="flex items-center justify-between px-4">
          {/* Logo */}
          <div className="w-[25%] flex items-center space-x-3">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => goTo(paths.logo)}
            >
              <img
                src="/assets/header/sayurbox-logo.png"
                alt="Sayurbox Logo"
                className="h-18 w-auto object-contain"
              />
            </div>
          </div>
          {/* Search Bar */}
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
          {/* Ikon Kanan */}
          <div className="w-[50%] flex items-center space-x-10 justify-end">
            {/* Ikon Keranjang */}
            <div className="relative">
              <div
                className="w-14 h-14 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => goTo(paths.cart)}
              >
                <img src="/assets/header/cart.png" className="w-8" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">3</span>
              </div>
            </div>
            {/* Ikon Nota */}
            <div className="relative">
              <div
                className="w-14 h-14 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => goTo(paths.bill)}
              >
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
              <div
                className="w-14 h-14 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => goTo(paths.cart2)}
              >
                <img src="/assets/header/cart-2.png" className="w-8" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-xs text-gray-800 font-bold">$</span>
              </div>
            </div>
            {/* Ikon Profil */}
            <div
              className="w-18 h-18 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow cursor-pointer z-55"
              style={{ backgroundColor: "#E6B800" }}
              onClick={() => setShowProfile(true)}
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
          onClick={() => setShowAddress(true)}
        >
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-gray-600" />
            <span className="text-gray-800 font-medium truncate">
              Jl. Tugu Monas No.1, Gambir, Kecamatan Gambir, Kota Jakarta...
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
      {/* Popup Profile Modal */}
      {showProfile && (
        <div
          className="fixed inset-x-6 -inset-y-13 z-50 flex items-start justify-end"
          style={{ pointerEvents: "auto" }}
          onClick={() => setShowProfile(false)}
        >
          <div
            className="mt-24 mr-8 bg-white rounded-2xl shadow-xl p-8 flex gap-8 min-w-[520px] max-w-[600px] relative"
            style={{ border: "1.5px solid #E6E6E6" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="gap-6 flex flex-col w-full">
              <div className="flex gap-6">
                {/* Kiri: Card List */}
                <div className="flex flex-col gap-4 w-[260px]">
                  {/* Voucher */}
                  <div
                    className="flex items-center bg-white rounded-xl shadow border border-[#E6E6E6] px-4 py-3 cursor-pointer hover:shadow-lg transition"
                    onClick={() => goTo(paths.voucher)}
                  >
                    <img
                      src="/assets/profile/voucher.png"
                      className="w-12 h-12 mr-4"
                      alt="Voucher"
                    />
                    <div className="flex-1">
                      <div className="font-bold text-base text-[#BCA16A]">
                        Voucher
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-[#BCA16A]" />
                  </div>
                  {/* SayurPoin */}
                  <div
                    className="flex items-center bg-white rounded-xl shadow border border-[#E6E6E6] px-4 py-3 cursor-pointer hover:shadow-lg transition"
                    onClick={() => goTo(paths.sayurpoin)}
                  >
                    <img
                      src="/assets/profile/point.png"
                      className="w-12 h-12 mr-4"
                      alt="SayurPoin"
                    />
                    <div className="flex-1">
                      <div className="font-bold text-base text-[#BCA16A]">
                        SayurPoin
                      </div>
                      <div className="text-sm text-gray-700">Poin : 3000</div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-[#BCA16A]" />
                  </div>
                  {/* Resep */}
                  <div
                    className="flex items-center bg-white rounded-xl shadow border border-[#E6E6E6] px-4 py-3 cursor-pointer hover:shadow-lg transition"
                    onClick={() => goTo(paths.resep)}
                  >
                    <img
                      src="/assets/profile/recipe.png"
                      className="w-12 h-12 mr-4"
                      alt="Resep"
                    />
                    <div className="flex-1">
                      <div className="font-bold text-base text-[#BCA16A]">
                        Resep
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-[#BCA16A]" />
                  </div>
                </div>
                {/* Kanan: Profile Info & Menu */}
                <div className="flex flex-col justify-between py-2 flex-1">
                  <div>
                    <div className="font-bold text-2xl mb-4">Aji</div>

                    <div className="flex flex-col gap-2 text-base  font-medium">
                      <button
                        className="text-left cursor-pointer hover:underline"
                        onClick={() => goTo(paths.profile)}
                      >
                        Ubah Profil
                      </button>
                      <button
                        className="text-left cursor-pointer hover:underline"
                        onClick={() => goTo(paths.pesanan)}
                      >
                        Pesanan
                      </button>
                      <button
                        className="text-left cursor-pointer hover:underline"
                        onClick={() => goTo(paths.keranjang)}
                      >
                        Keranjang
                      </button>
                      <button className="text-left cursor-pointer hover:underline">
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* SayurPanen */}
              <div
                className="bg-[#F5FFCE] rounded-xl flex items-center justify-between px-4 py-3 border border-green-500 shadow cursor-pointer hover:shadow-lg transition"
                onClick={() => goTo(paths.sayurpanen)}
              >
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/profile/sayur-panen.png"
                    className="w-10 h-10"
                    alt="SayurPanen"
                  />
                  <div>
                    <div className="font-bold text-base text-[#059669]">
                      SayurPanen
                    </div>
                    <div className="text-sm text-gray-700">
                      +700xp lagi untuk naik level!
                    </div>
                    <div className="w-full bg-gray-200 rounded h-2 mt-2">
                      <div
                        className="h-2 rounded bg-green-500"
                        style={{ width: "40%" }}
                      ></div>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-[#059669]" />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Popup Address Modal */}
      {showAddress && (
        <div
          className="fixed inset-x-0 top-36 z-50 flex justify-start items-start"
          onClick={() => setShowAddress(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl mx-auto relative"
            style={{
              border: "1.5px solid #E6E6E6",
              marginLeft: "40px",
              marginTop: "20px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="font-bold text-lg text-gray-900">
                Pilih Alamat Pengiriman
              </div>
              <button
                className="text-green-700 font-semibold text-base"
                onClick={() => goTo(paths.alamat)}
              >
                Tambah Alamat
              </button>
            </div>
            <div className="flex flex-col gap-4 mb-6">
              {addressList.map((item, idx) => (
                <div
                  key={idx}
                  className={`border rounded-xl px-5 py-4 bg-white flex items-center justify-between cursor-pointer transition-all ${
                    selectedAddress === idx
                      ? "border-green-600 shadow bg-green-50"
                      : "border-[#E6E6E6]"
                  }`}
                  onClick={() => setSelectedAddress(idx)}
                >
                  <div>
                    <div className="flex gap-2 items-center mb-1">
                      {item.type && (
                        <span className="font-bold text-gray-700 text-base">
                          {item.type}
                        </span>
                      )}
                      <span className="font-bold text-black text-base">
                        {item.label}
                      </span>
                    </div>
                    <div className="text-gray-700 text-base mb-1">
                      {item.phone}
                    </div>
                    <div className="text-gray-700 text-sm">{item.address}</div>
                  </div>
                  {/* Radio Button ala ListPayment */}
                  <div className="flex items-center ml-4">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="address"
                        value={idx}
                        checked={selectedAddress === idx}
                        onChange={() => setSelectedAddress(idx)}
                        className="sr-only"
                      />
                      <div className="w-7 h-7 rounded-full border-[3px] border-green-600 flex items-center justify-center bg-white transition-all duration-200">
                        <div
                          className={`w-4 h-4 bg-green-600 rounded-full transition-all duration-200 ${
                            selectedAddress === idx ? "block" : "hidden"
                          }`}
                        ></div>
                      </div>
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="w-full bg-[#FFD42A] text-black font-semibold text-lg py-3 rounded-xl flex items-center justify-between gap-2 px-4 cursor-pointer hover:shadow-lg transition"
              onClick={() => goTo(paths.alamat)}
            >
              <span>Lihat Semua Alamat</span>
              <span>
                <ChevronRight className="w-6 h-6 text-black" />
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
