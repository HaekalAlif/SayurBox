import React, { useState } from "react";
import { ChevronLeft, Calendar, Edit, Upload } from "lucide-react";

const AccountSection = () => {
  const [selectedGender, setSelectedGender] = useState("male");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    birthDate: "2002-04-09",
    email: "dummy@gmail.com",
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

  const handleSaveData = () => {
    console.log("Saving data:", formData);
  };

  return (
    <div className="min-h-screen bg-white relative mb-12">
      {/* Header with Back Button */}
      <div className="top-0 h-0 bg-white z-10 pl-4">
        <button
          onClick={handleBackClick}
          className="relative top-10 left-12 cursor-pointer items-center w-14 h-14 text-lg text-green-600 border border-green rounded-full border-green-400 hover:scale-110 transition-transform"
        >
          <ChevronLeft className="w-10 h-10 ml-1" />
        </button>
      </div>

      {/* Main Container */}
      <div className="border border-green-500 bg-gray-50 rounded-xl p-6 mt-10 mx-auto px-16 py-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side - Photo Upload */}
          <div className="shadow-md flex w-[60%] flex-col bg-white max-w-70 items-center p-4 rounded-lg">
            <img
              src="/assets/profile/account-image.png"
              alt="User avatar"
              className="w-48 h-48 object-cover rounded-lg border border-gray-200"
            />
            <button className="mt-4 px-6 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors w-[80%] font-semibold flex justify-center space-x-2 mb-3 cursor-pointer">
              <span>Pilih Foto</span>
            </button>
            <p className="text-xs text-gray-500 mt-2 max-w-xs text-left">
              Maks. file foto berukuran 5 Mb, <br />
              dengan ekstensi yang diperbolehkan <br />
              berupa: JPG, JPEG, PNG
            </p>
          </div>

          {/* Right Side - Form */}
          <div className="space-y-6 -ml-32">
            {/* Data Pribadi Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Data Pribadi
              </h3>

              <div className="space-y-4">
                {/* Nama */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="text-red-500">* </span>Nama
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan Nama Lengkap"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none  text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                {/* No. Handphone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    No. Handphone
                  </label>
                  <input
                    type="tel"
                    placeholder="Masukkan Nomor Handphone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-3 py-2 text-sm  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tanggal Lahir
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) =>
                        handleInputChange("birthDate", e.target.value)
                      }
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      style={{
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        position: "relative",
                        zIndex: 10,
                        backgroundColor: "white",
                      }}
                    />
                    {/* Icon Tanggal */}
                    <img
                      src="/assets/profile/date.png"
                      alt="icon tanggal"
                      className="h-6 w-6 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none z-20"
                    />
                  </div>
                </div>

                {/* Jenis Kelamin */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jenis Kelamin
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative inline-block">
                      {selectedGender === "male" && (
                        <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-5 h-5 flex items-center justify-center z-10">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}

                      <button
                        onClick={() => setSelectedGender("male")}
                        className={`p-3 border-2 rounded-lg flex items-center space-x-3 transition-colors w-full cursor-pointer ${
                          selectedGender === "male"
                            ? "border-green-500"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <img
                          src="/assets/profile/man.png"
                          alt="Male"
                          className="w-10 h-10"
                        />
                        <span className="font-medium">Laki - Laki</span>
                      </button>
                    </div>

                    <div className="relative inline-block">
                      {selectedGender === "female" && (
                        <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-5 h-5 flex items-center justify-center z-10">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}

                      <button
                        onClick={() => setSelectedGender("female")}
                        className={`p-3 border-2 rounded-lg flex items-center space-x-3 transition-colors w-full cursor-pointer ${
                          selectedGender === "female"
                            ? "border-green-500"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <img
                          src="/assets/profile/woman.png"
                          alt="Female"
                          className="w-10 h-10"
                        />
                        <span className="font-medium">Perempuan</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New Full Width Section */}
        <div className="mt-8 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Side */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Akun yang terhubung
              </h3>

              {/* Google */}
              <div>
                <div className="flex space-x-3">
                  <img src="/assets/profile/google.png" className="w-12 h-12" />
                  <div className="items-center space-x-2 mb-1">
                    <label className="text-sm font-medium text-gray-700">
                      Google
                    </label>

                    <div className="flex items-center justify-between bg-gray-50 rounded-md">
                      <span className="text-gray-900 text-xs">Hubungkan</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Facebook */}
              <div>
                <div className="flex space-x-3">
                  <img
                    src="/assets/profile/facebook.png"
                    className="w-12 h-12"
                  />
                  <div className="items-center space-x-2 mb-1">
                    <label className="text-sm font-medium text-gray-700">
                      Facebook
                    </label>

                    <div className="flex items-center justify-between bg-gray-50 rounded-md">
                      <span className="text-gray-900 text-xs">Terhubung</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form Fields */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Informasi Akun
              </h3>

              {/* Email */}
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-1">
                  <label className="text-sm font-medium text-gray-700">
                    E-Mail
                  </label>
                  <span className="text-green-600 font-medium text-sm">
                    Terverifikasi
                  </span>
                </div>
                <div className="flex items-center justify-between bg-gray-50 rounded-md ">
                  <span className="text-gray-900 text-xs">
                    {formData.email}
                  </span>
                  <Edit
                    size={20}
                    className=" cursor-pointer hover:text-gray-600"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kata Sandi
                </label>
                <div className="flex items-center justify-between bg-gray-50 rounded-md">
                  <span className="text-gray-900 text-xs">********</span>
                  <Edit
                    size={20}
                    className="cursor-pointer hover:text-gray-600"
                  />
                </div>
              </div>
            </div>
            {/* Save Button */}
            <div className="flex items-center justify-center ml-12 mt-12">
              <button
                onClick={handleSaveData}
                className="w-full max-w-xs h-12 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors cursor-pointer"
              >
                Simpan Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSection;
