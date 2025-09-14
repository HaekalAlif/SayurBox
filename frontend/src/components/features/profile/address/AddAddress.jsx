import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAddAddress } from "./AddAddress.hooks";
import BaseModal from "@/components/base/BaseModal";

const AddAddress = () => {
  const navigate = useNavigate();
  const {
    loading,
    error,
    isEdit,
    formData,
    handleInputChange,
    handleQuickNote,
    handleAddressTypeSelect,
    handleAddAddress,
  } = useAddAddress();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cek apakah ada data yang sudah diisi di form
  const isFormDirty = Object.values(formData).some(
    (value) => value !== "" && value !== null
  );

  const handleBackClick = () => {
    // Jika form sudah diisi, tampilkan modal. Jika tidak, langsung kembali.
    if (isFormDirty) {
      setIsModalOpen(true);
    } else {
      window.history.back();
    }
  };

  const handleConfirmExit = () => {
    setIsModalOpen(false);
    window.history.back();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await handleAddAddress({
      full_address: formData.location,
      recipient_name: formData.recipientName,
      phone: formData.recipientPhone,
      email: formData.recipientEmail,
      notes: formData.courierNote,
      address_label: formData.addressType,
    });
    if (res) {
      navigate("/profile/address");
    }
  };

  const quickNotes = [
    "WA setelah tiba",
    "Titip pos satpam",
    "Telp, jika sampai",
  ];

  const addressTypes = ["Rumah", "Apartment", "Kantor", "Kos"];

  return (
    <div className="min-h-screen bg-white mb-8">
      {/* Modal Konfirmasi Keluar */}
      <BaseModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmExit}
        title="Buang Perubahan?"
        description="Semua data yang sudah terisi akan dihapus"
        confirmText="Keluar"
        cancelText="Batal"
        confirmColor="bg-red-500 hover:bg-red-600"
        cancelColor="border-green-600 text-green-600 hover:bg-green-50"
      />

      {/* Header with Back Button */}
      <div className="top-0 h-0 bg-white z-10 pl-4">
        <button
          onClick={handleBackClick}
          className="relative top-10 left-12 cursor-pointer items-center w-14 h-14 text-lg text-green-600 border border-green rounded-full border-green-400 hover:scale-110 transition-transform"
        >
          <ChevronLeft className="w-10 h-10 ml-1" />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="max-w-5xl mx-auto p-6 space-y-6 mt-6">
          <div>
            <h1 className="text-2xl font-bold mb-6">
              {isEdit ? "Edit Alamat" : "Tambah Alamat Baru"}
            </h1>
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
                      alt="Map"
                    />
                  </div>
                </div>
              </div>

              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Masukkan alamat lengkap titik lokasi"
                className="mt-2 text-sm mb-6 font-small w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
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
                  type="button"
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
                  type="button"
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

          {/* Error Message */}
          {error && <div className="text-red-600 text-sm mb-2">{error}</div>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md text-md transition-colors mt-4 cursor-pointer"
            disabled={loading}
          >
            {loading
              ? "Menyimpan..."
              : isEdit
              ? "Simpan Perubahan"
              : "Lanjutkan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAddress;
