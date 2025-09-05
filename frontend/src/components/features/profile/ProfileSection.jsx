import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileSection = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    window.history.back();
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const menuItems = [
    {
      title: "Daftar Alamat Saya",
      icon: "assets/profile/address.png",
      action: () => handleNavigate("/profile/address"),
    },
    {
      title: "Bantuan",
      icon: "assets/profile/help.png",
      action: () => handleNavigate("/faq"),
    },
    {
      title: "Kebijakan Privasi",
      icon: "assets/profile/policy.png",
    },
    {
      title: "Syarat & Ketentuan",
      icon: "assets/profile/terms.png",
    },
    {
      title: "Hapus Akun",
      icon: "assets/profile/setting.png",
    },
  ];

  return (
    <div className="min-h-screen relative bg-white">
      {/* Header with Back Button */}
      <div className="top-0 h-4 bg-white z-10 pl-4">
        <button
          onClick={handleBackClick}
          className="relative top-10 left-12 cursor-pointer items-center w-14 h-14 text-lg text-green-600 border border-green rounded-full border-green-400 hover:scale-110 transition-transform"
        >
          <ChevronLeft className="w-10 h-10 ml-1" />
        </button>
      </div>

      {/* Main Container */}
      <div className="flex items-center justify-center min-h-screen p-6 mb-8">
        <div className="w-full max-w-xl bg-white border-2 border-green-600 rounded-3xl p-10 shadow-lg">
          {/* Profile Header */}
          <div className="text-center flex mb-8">
            <img src="/assets/profile/user.png" className="w-16 h-16 " />
            <div className="text-left ml-4 ">
              <h2 className="text-xl font-bold mb-2">Aji</h2>
              <button
                onClick={() => handleNavigate("/profile/account")}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <img
                  src="assets/profile/edit-profile.png"
                  className="h-6 w-6"
                />
                <span className="text-sm underline font-medium">
                  Ubah Profil
                </span>
              </button>
            </div>
          </div>

          {/* Top Features */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div
              className="p-4 rounded-xl cursor-pointer border border-gray-200 shadow-md transition-shadow"
              onClick={() => handleNavigate("/voucher")}
            >
              <div className="flex items-center space-x-3 justify-between">
                <img src="/assets/profile/voucher.png" className="w-10 h-10" />
                <span className="font-medium -ml-12">Voucher</span>
                <ChevronRight size={24} className="text-[#906C4D]" />
              </div>
            </div>

            <div
              className="p-4 rounded-xl cursor-pointer border border-gray-200 shadow-md transition-shadow"
              onClick={() => handleNavigate("/sayur-poin")}
            >
              <div className="flex items-center space-x-3 justify-between">
                <img src="/assets/profile/point.png" className="w-10 h-10" />
                <div className="-ml-12 -mt-1 space-y-1">
                  <div className="font-medium">SayurPoin</div>
                  <div className="text-xs">Poin: 3000</div>
                </div>
                <ChevronRight size={24} className="text-[#906C4D]" />
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div
            className="p-4 rounded-xl cursor-pointer border border-gray-200 shadow-md transition-shadow mb-4 "
            onClick={() => handleNavigate("/sayur-panen")}
          >
            <div className="flex items-center space-x-3 mb-6 ">
              <img
                src="/assets/profile/xp.png"
                alt="Leaf"
                className="w-12 h-12"
              />
              <div className="flex-1 space-y-1">
                <div className="font-medium">SayurPanen</div>
                <div className="text-sm">+700xp lagi untuk naik level!</div>
              </div>
              <ChevronRight size={32} className="text-[#906C4D]" />
            </div>
            <div className="w-full bg-gray-300 rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: "25%",
                  backgroundColor: "#1F5E19",
                }}
              ></div>
            </div>
          </div>

          {/* Menu List */}
          <div className="space-y-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="w-full flex items-center justify-between p-4 hover:bg-green-50  transition-colors border-b border-green-300 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <img src={item.icon} alt={item.title} className="w-7" />
                  <span
                    className={`font-medium ${
                      item.textColor ? "text-red-500" : "text-gray-900"
                    }`}
                  >
                    {item.title}
                  </span>
                </div>
                <ChevronRight size={28} className="text-green-600" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
