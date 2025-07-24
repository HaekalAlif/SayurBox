import React, { useState } from "react";
import { ChevronLeft, MapPin } from "lucide-react";

const AddressDetails = () => {
  const handleBackClick = () => {
    window.history.back();
  };

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-white mb-8">
      {/* Header with Back Button */}
      <div className="top-0 h-0 bg-white z-10 pl-4">
        <button
          onClick={handleBackClick}
          className="relative top-10 left-12 cursor-pointer items-center w-14 h-14 text-lg text-green-600 border border-green rounded-full border-green-400 hover:scale-110 transition-transform"
        >
          <ChevronLeft className="w-10 h-10 ml-1" />
        </button>
      </div>

      <div className="max-w-5xl mx-auto p-6 space-y-6 mt-6">
        <div className="flex justify-between items-center">
          <div className="w-[30%]">
            <h1 className="text-3xl font-bold">Pilih Alamat Tujuan</h1>
          </div>
          <div className="w-[70%] relative pl-16">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari Alamat-mu!"
              className="w-full h-10 px-6 py-3 pr-12 bg-white border-2 focus:outline-none focus:border-green-400 transition-colors rounded-sm"
              style={{ borderColor: "#BEE4B4" }}
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full">
              <img src="/assets/header/search.png" className="w-8" />
            </button>
          </div>
        </div>

        {/* Map Section */}
        <div>
          <div className="h-full bg-[#CBEAE299] border border-gray-300 rounded-b-md">
            {/* Map placeholder with pin */}
            <div className="w-full h-full flex items-center justify-center">
              <div>
                <img
                  src="/assets/profile/address/maps-details.png"
                  className="w-full"
                />
              </div>
            </div>
            <div className="py-4 flex px-4">
              <img src="/assets/profile/address/pin-maps.png" alt="" />
              <div>
                <h1 className="font-semibold text-lg ">Gambir</h1>
                <p className="text-sm mt-1">
                  Monumen Nasional, Jalan Medan Merdeka Utara, RW 02, Gambir,
                  Jakarta Pusat, Daerah Khusus Ibukota Jakarta, Jawa, 10110,
                  Indonesia
                </p>
              </div>
            </div>
            <div>
              {/* Submit Button */}
              <button className="w-full py-5 text-xl font-bold bg-green-600 hover:bg-green-700 text-white px-6 text-md transition-colors rounded-b-md ">
                Lanjutkan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressDetails;
