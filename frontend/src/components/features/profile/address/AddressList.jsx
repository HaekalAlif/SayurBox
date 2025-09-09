import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAddressList } from "./AddressList.hooks";
import BaseModal from "@/components/base/BaseModal";
import SayurboxLoading from "@/components/base/SayurboxLoading";

const AddressList = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const navigate = useNavigate();

  const {
    addresses,
    loading,
    error,
    selectedAddress,
    setSelectedAddress,
    handleSetDefaultAddress,
    handleDeleteAddress,
    handleEditAddress,
  } = useAddressList();

  const handleBackClick = () => {
    window.history.back();
  };

  // Show modal before delete
  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setModalLoading(true);
    await handleDeleteAddress(deleteId);
    setModalLoading(false);
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  // Pilih alamat dan set default di backend
  const handleChooseAddress = async () => {
    const address = addresses[selectedAddress];
    if (address) {
      await handleSetDefaultAddress(address.id);
    }
  };

  const AddressCard = ({ address, index, isSelected }) => (
    <div
      className={`relative rounded-lg p-4 cursor-pointer transition-all ${
        isSelected
          ? "border-2 border-green-600"
          : "border border-gray-300 hover:border-gray-400"
      }`}
      onClick={() => setSelectedAddress(index)}
    >
      <div>
        <h3 className="font-semibold mb-1">
          {address.recipient_name || address.name}
        </h3>
        <p className="text-sm mb-2">{address.phone}</p>
        <p className="text-sm mb-4 max-w-[90%]">
          {address.full_address || address.address}
        </p>
        <div className="absolute top-1/2 -mt-6 right-4 transform -translate-y-1/2">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              name="address"
              checked={isSelected}
              onChange={() => setSelectedAddress(index)}
              className="sr-only"
            />
            <div className="w-7 h-7 rounded-full border-2 border-green-600 flex items-center justify-center bg-white transition-all duration-200">
              <div
                className={`w-3.5 h-3.5 bg-green-600 rounded-full transition-all duration-200 ${
                  isSelected ? "block" : "hidden"
                }`}
              ></div>
            </div>
          </label>
        </div>
        <hr className="mb-3 border border-green-600 w-full" />
        <div className="flex justify-end space-x-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              confirmDelete(address.id);
            }}
            className="flex items-center space-x-1 text-red-600 font-semibold hover:text-red-700 text-md cursor-pointer"
          >
            <span>Hapus Alamat</span>
          </button>
          <button
            onClick={async (e) => {
              e.stopPropagation();
              navigate(`/profile/address/address-details/${address.id}`);
            }}
            className="flex items-center space-x-1 text-green-500 font-semibold hover:text-green-700 text-md"
          >
            <span>Edit Alamat</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white px-4 relative min-h-screen mb-14">
      {/* Modal Konfirmasi Hapus */}
      <BaseModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Hapus Alamat?"
        description="Konfirmasi bahwa alamat Anda saat ini akan dihapus"
        confirmText={modalLoading ? "Menghapus..." : "Ya"}
        cancelText="Kembali"
        onConfirm={handleConfirmDelete}
        confirmColor="bg-red-500 hover:bg-red-600"
        cancelColor="border-green-600 text-green-600 hover:bg-green-50"
      />

      {/* Header with Back Button */}
      <div className="top-0 h-0 bg-white z-10 pl-4">
        <button
          onClick={handleBackClick}
          className="relative top-15 left-12 cursor-pointer items-center w-14 h-14 text-lg text-green-600 border border-green rounded-full border-green-400 hover:scale-110 transition-transform"
        >
          <ChevronLeft className="w-10 h-10 ml-1" />
        </button>
      </div>

      {/* Main Container */}
      <div className="border-2 border-yellow-400 rounded-xl bg-white p-6 mt-16 mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-6">
          Daftar Alamat Saya
        </h1>

        <div className="flex flex-col md:flex-row gap-4 space-x-12 px-4">
          {/* Left Side - Action Buttons */}
          <div className="flex flex-col gap-4 w-full md:w-1/4">
            <button
              className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold transition-colors cursor-pointer"
              onClick={handleChooseAddress}
            >
              Pilih Alamat
            </button>
            <button
              className="border border-green-600 text-green-600 py-3 rounded-md font-semibold hover:bg-green-50 transition-colors cursor-pointer"
              onClick={() => navigate("/profile/address/address-details")}
            >
              Tambah Alamat
            </button>
          </div>

          {/* Right Side - Address Cards */}
          <div className="flex flex-col gap-3 w-full md:w-3/4">
            {loading ? (
              <SayurboxLoading />
            ) : error ? (
              <div className="text-center text-red-600">{error}</div>
            ) : addresses.length === 0 ? (
              <div className="text-center text-gray-500">Belum ada alamat.</div>
            ) : (
              addresses.map((address, index) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  index={index}
                  isSelected={selectedAddress === index}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressList;
