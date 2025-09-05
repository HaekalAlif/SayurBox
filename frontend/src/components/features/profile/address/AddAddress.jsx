import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddAddress = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    courierNote: "",
    recipientName: "",
    recipientPhone: "",
    recipientEmail: "",
    addressType: "",
  });

  const handleBackClick = () => {
    window.history.back();
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleQuickNote = (note) => {
    setFormData((prev) => ({
      ...prev,
      courierNote: prev.courierNote + (prev.courierNote ? ", " : "") + note,
    }));
  };

  const handleAddressTypeSelect = (type) => {
    setFormData((prev) => ({
      ...prev,
      addressType: type,
    }));
  };

  const handleSubmit = () => {
    console.log("Form data:", formData);
  };

  const quickNotes = [
    "WA setelah tiba",
    "Titip pos satpam",
    "Telp, jika sampai",
  ];

  const addressTypes = ["Rumah", "Apartment", "Kantor", "Kos"];

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
        <div>
          <h1 className="text-2xl font-bold mb-6">Daftar Alamat Saya</h1>
        </div>
        {/* Map Section */}
        <div>
          <h3 className="text-md font-semibold text-gray-900 mb-3">
            <span className="text-red-500">*</span>Titik Lokasi
          </h3>

          <div className="p-3 h-full border border-gray-400 rounded-sm">
            <div className="h-40 bg-gray-100 border border-gray-300 overflow-hidden">
              {/* Map placeholder with pin */}
              <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                <div>
                  <img
                    src="/assets/profile/address/maps.png"
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Pindahkan p ke luar dari overflow-hidden */}
            <p className="mt-2 text-sm mb-6 font-small">
              Monumen Nasional, Jalan Medan Merdeka Utara, RW 02, Gambir,
              Jakarta Pusat, Daerah Khusus Ibukota Jakarta, Jawa 10110,
              Indonesia
            </p>
          </div>
        </div>

        {/* Courier Note */}
        <div>
          <label className="block text-sm font-medium  mb-2">
            Catatan Untuk Kurir (Opsional)
          </label>
          <textarea
            value={formData.courierNote}
            onChange={(e) => handleInputChange("courierNote", e.target.value)}
            placeholder="Contoh: Pastikan Lokasi/Lobby/Unit Apartment, Titip pos satpam, Telp jika sampai."
            className="w-full p-3 h-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            rows={3}
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {quickNotes.map((note, index) => (
              <button
                key={index}
                onClick={() => handleQuickNote(note)}
                className="px-4 py-2 border border-green-500 rounded-md text-sm text-green-600 font-semibold transition-colors"
              >
                {note}
              </button>
            ))}
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              <span className="text-red-500">*</span>Nama Penerima
            </label>
            <input
              type="text"
              value={formData.recipientName}
              onChange={(e) =>
                handleInputChange("recipientName", e.target.value)
              }
              placeholder="Masukkan nama penerima"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              <span className="text-red-500">*</span>No. Telp Penerima
            </label>
            <input
              type="tel"
              value={formData.recipientPhone}
              onChange={(e) =>
                handleInputChange("recipientPhone", e.target.value)
              }
              placeholder="Masukkan nomor telepon penerima yang dapat dihubungi"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              <span className="text-red-500">*</span>E-Mail Penerima
            </label>
            <input
              type="email"
              value={formData.recipientEmail}
              onChange={(e) =>
                handleInputChange("recipientEmail", e.target.value)
              }
              placeholder="Masukkan email penerima"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
            />
          </div>
        </div>

        {/* Address Type */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Simpan Alamat Sebagai (Opsional)
          </label>
          <input
            type="text"
            value={formData.addressType}
            onChange={(e) => handleInputChange("addressType", e.target.value)}
            placeholder="Contoh: Rumah/Toko/Apartment"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 mb-3 text-sm text-gray-600"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-[75%]">
            {addressTypes.map((type, index) => (
              <button
                key={index}
                onClick={() => handleAddressTypeSelect(type)}
                className={`px-4 py-2 border border-green-500 text-gray-700 rounded-md text-sm text-green-600 font-semibold transition-colors cursor-pointer ${
                  formData.addressType === type
                    ? "bg-green-600 text-white"
                    : "text-gray-700 hover:bg-green-50"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md text-md transition-colors mt-4 cursor-pointer"
          onClick={() => navigate("/profile/address")}
        >
          Lanjutkan
        </button>
      </div>
    </div>
  );
};

export default AddAddress;
