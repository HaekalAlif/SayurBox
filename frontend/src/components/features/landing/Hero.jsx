import React from "react";

const Hero = () => {
  // Data kategori produk
  const kategoriItems = [
    {
      icon: "/src/assets/landing/kategori/sayur.png",
      label: "Sayur",
    },
    {
      icon: "/src/assets/landing/kategori/buah.png",
      label: "Buah",
    },
    {
      icon: "/src/assets/landing/kategori/protein.png",
      label: "Protein",
    },
    {
      icon: "/src/assets/landing/kategori/sembako.png",
      label: "Sembako",
    },
    {
      icon: "/src/assets/landing/kategori/bumbu.png",
      label: "Bumbu Dapur",
    },
  ];

  // Data tab list
  const tabItems = [
    {
      label: "Semua Kategori",
      icon: "/src/assets/landing/kategori/all.png",
    },
    {
      label: "Produk Terbaru",
      icon: "/src/assets/landing/kategori/new.png",
    },
    {
      label: "Ibu & Bayi",
      icon: "/src/assets/landing/kategori/baby.png",
    },
  ];

  return (
    <div className="py-8 px-4 md:px-8">
      <div className="max-w-screen-lg mx-auto space-y-8">
        {/* Hero Section - Banner Promo */}
        <section>
          <div className="w-full">
            <img
              src="/src/assets/landing/hero/banner-promo.png"
              alt="Transaksi Pertama Ditraktir 50rb"
              className="w-full h-auto object-contain rounded-xl shadow-md"
              onError={(e) => {
                // Fallback jika gambar tidak ditemukan
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          </div>
        </section>

        {/* Kategori Produk Section */}
        <section className="w-full bg-white py-8">
          <div className="w-full max-w-screen-xl mx-auto">
            <div className="w-full rounded-2xl border border-green-500 p-6 bg-white shadow-sm">
              {/* Title */}
              <h2 className="text-center text-2xl font-bold text-gray-800 mb-7">
                Kategori Produk
              </h2>

              {/* Kategori Grid */}
              <div className="grid grid-cols-3 md:grid-cols-5 gap-10 mb-6 px-12">
                {kategoriItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center space-y-2 "
                  >
                    {/* Kartu kategori */}
                    <div className="flex items-center justify-center w-28 bg-[rgba(212,228,150,0.25)] border border-[rgba(180,200,100,0.5)] rounded-xl py-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="w-16 h-20 flex items-center justify-center">
                        <img
                          src={item.icon}
                          alt={item.label}
                          className="w-18 h-18 object-contain"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      </div>
                    </div>

                    {/* Label kategori di bawah card */}
                    {item.label && (
                      <span className="text-sm text-gray-800 font-bold text-center">
                        {item.label}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Tab List */}
              <div className="grid grid-cols-3 gap-6 px-6 pt-4">
                {tabItems.map((tab, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 w-full bg-[rgba(212,228,150,0.25)] rounded-sm py-3 px-4 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="w-24 h-8 flex items-center justify-center">
                      <img
                        src={tab.icon}
                        alt={tab.label}
                        className="w-12 h-12 object-contain"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-800 font-bold">
                      {tab.label}
                    </span>
                    {tab.badge && (
                      <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full ml-2">
                        {tab.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              {/* Garis Bawah */}
              <div className="w-[95%] h-1 mx-auto mt-7 rounded-full overflow-hidden flex">
                {/* 40% hijau */}
                <div
                  className="h-full"
                  style={{ width: "40%", backgroundColor: "#049624" }}
                ></div>
                {/* 60% abu-abu */}
                <div className="h-full flex-1 bg-gray-300"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hero;
