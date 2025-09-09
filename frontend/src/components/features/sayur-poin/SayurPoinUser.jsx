import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SayurPoinUser = () => {
  const [activeTab, setActiveTab] = useState("Semua");

  const navigate = useNavigate();

  const tabs = [
    { label: "Semua", active: activeTab === "Semua" },
    { label: "Voucher Belanja", active: activeTab === "Voucher Belanja" },
    {
      label: "Voucher Merchandise",
      active: activeTab === "Voucher Merchandise",
    },
  ];

  const voucherItems = [
    {
      image: "/assets/sayur-poin/voucher-30k.png",
      title: "Voucher Sayurbox Rp30.000",
      points: "3000 Poin",
      expiry: "Berlaku hingga 23 Juni 2025",
      bg: "bg-[#DCFCE7]",
    },
    {
      image: "/assets/sayur-poin/voucher-tumbler.png",
      title: "Voucher Tumbler - Sayurbox",
      points: "5000 Poin",
      expiry: "Berlaku hingga 23 Juni 2025",
      bg: "bg-[#E9FCEB]",
    },
  ];

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-white mb-12">
      {/* Header with Back Button */}
      <div className="top-0 bg-white z-10 pl-4">
        <button
          onClick={handleBackClick}
          className="relative top-12 left-6 cursor-pointer items-center w-14 h-14 text-lg text-green-600 border border-green rounded-full border-green-400 hover:scale-110 transition-transform"
        >
          <ChevronLeft className="w-10 h-10 ml-1" />
        </button>
      </div>

      {/* Main Container */}
      <div className="mx-auto w-full max-w-[480px] bg-white rounded-md shadow-md overflow-hidden">
        {/* Hero Section */}
        <div
          className="relative bg-[#166534] p-6 text-white text-left bg-cover bg-center py-12 pl-14"
          style={{
            backgroundImage: 'url("/assets/sayur-poin/bg-sayur-poin-user.png")',
          }}
        >
          <div>
            <div className="text-4xl font-bold mb-6">SayurPoin</div>
            <div className="text-4xl font-bold mb-6">13 Poin</div>
            <div className="text-sm font-semibold mb-4">
              Kadaluarsa 20 Juli 2025
            </div>
            <button
              className="bg-none text-white rounded-sm px-4 py-1 text-sm font-semibold border border-white cursor-pointer"
              onClick={() => navigate("/sayur-poin/detail")}
            >
              Lihat Selengkapnya
            </button>
          </div>
        </div>

        {/* Voucher Card */}
        <div className="px-10 py-4">
          <div
            className="flex items-center justify-between bg-white px-4 py-4 border border-gray-200 rounded-2xl cursor-pointer"
            onClick={() => navigate("/voucher")}
          >
            <div className="flex items-center">
              <img
                src="/assets/sayur-poin/voucher.png"
                alt="Voucher"
                className="w-6 h-6 mr-4"
              />
              <div>
                <div className="font-bold text-md">Voucher Saya</div>
                <div className="text-xs text-gray-500">
                  Kamu memiliki 6 voucher aktif
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="bg-green-600 text-white font-semibold rounded-full px-2 mr-2">
                6
              </span>
              <ChevronRight className="w-10 h-10" />
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-4">
            <span className="font-semibold text-md mr-2">Tukar Poin</span>

            <div className="flex gap-2 items-center bg-white py-4 ">
              {tabs.map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={`font-semibold px-4 py-2 rounded-full text-xs transition-colors cursor-pointer
                ${
                  tab.active
                    ? "bg-green-600 text-white"
                    : "bg-white text-green-800 border border-green-800"
                }
              `}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Voucher List */}
          <div className="flex flex-col gap-3 px-4 py-4">
            {voucherItems.map((item, idx) => (
              <div
                key={idx}
                className={`rounded-xl p-0 overflow-hidden flex flex-col border border-gray-200 shadow-md cursor-pointer`}
                style={{ maxWidth: 300, background: item.bg }}
              >
                <div className="w-full h-32">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full "
                  />
                </div>
                <div className="bg-white p-4 flex flex-col w-full">
                  <div className="flex justify-between items-center mb-1 w-full">
                    <span className="font-bold text-base text-xs">
                      {item.title}
                    </span>
                    <span className="font-bold text-[#166534] text-xs">
                      {item.points}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">{item.expiry}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SayurPoinUser;
