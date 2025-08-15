import React, { useState } from "react";
import {
  ChevronLeft, 
  ChevronRight,
} from "lucide-react";

const KetersediaanProdukSection = () => {
  const [expandedAccordions, setExpandedAccordions] = useState([]);

  const handleBackClick = () => {
    window.history.back();
  };

  const toggleAccordion = (index) => {
    setExpandedAccordions((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleContactUs = () => {
    console.log("Contact us clicked");
  };

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="bg-white z-10 pl-3">
        <button
          onClick={handleBackClick}
          className="relative top-13 left-6 cursor-pointer items-center w-14 h-14 text-lg text-green-600 border border-green rounded-full border-green-400 hover:scale-110 transition-transform"
        >
          <ChevronLeft className="w-10 h-10 ml-1" />
        </button>
      </div>

      {/* Main Container */}
      <div className="flex items-center justify-center min-h-screen p-4 mb-6">
        <div className="w-full max-w-2xl bg-white border border-green-700 rounded-2xl p-4 shadow-sm">
          {/* Header Section */}
          <div className="font-bold text-center text-2xl text-black">
            Seputar
          </div>
          <div className="font-bold text-center text-2xl text-black mb-4">
            Ketersediaan Produk
          </div>

          {/* Illustration */}
          <div className="mb-4">
            <img
              src="/assets/faq/illustration.png"
              alt="FAQ illustration"
              className="w-full max-h-64 object-contain"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>

          {/* Static Paragraphs */}
          <div className="flex items-center justify-center">
            <div className="text-sm text-gray-700 leading-relaxed space-y-4 text-justify max-w-md mb-4">
              <p>
                Ketersediaan produk di Sayurbox bergantung pada hasil panen dari
                petani serta ketersediaan dari supplier kami.
              </p>
              <p>
                Kami berusaha untuk selalu menyediakan produk segar dan
                berkualitas tinggi. Jika produk yang kamu cari sedang tidak
                tersedia, kamu bisa memantau ketersediaannya secara berkala
                melalui aplikasi/website Sayurbox, atau mencoba produk
                alternatif yang kami tawarkan.
              </p>
              <p>
                Kami berkomitmen untuk terus bekerja sama dengan petani dan
                supplier guna memastikan produk yang tersedia selalu dalam
                kondisi terbaik. Terima kasih atas dukungan dan kepercayaan
                kamu!
              </p>
            </div>
          </div>

          {/* Contact Button */}
          <div className="mt-6">
            <button
              onClick={handleContactUs}
              className="w-full text-white font-semibold text-sm py-2 pr-8 pl-4 rounded-md flex items-center justify-between transition-colors relative overflow-hidden cursor-pointer"
              style={{
                backgroundImage: 'url("/assets/faq/bg-button.png")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="flex items-center space-x-3 relative z-10">
                <img
                  src="/assets/faq/faq-button.png"
                  alt="Contact icon"
                  className="w-14 h-12"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <span className="font-bold text-lg">
                  Masih punya pertanyaan? Hubungi Kami
                </span>
              </div>
              <ChevronRight size={32} className="relative z-10" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KetersediaanProdukSection;
