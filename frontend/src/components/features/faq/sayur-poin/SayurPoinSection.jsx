import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  ChevronRight,
} from "lucide-react";

const SayurPoinSection = () => {
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

  const faqItems = [
    {
      question: "Siapa yang bisa mendapatkan Sayurpoin?",
      answer:
        "Semua konsumen yang berbelanja di aplikasi dan website Sayurbox akan mendapatkan Sayurpoin. Kamu dapat melihat Sayurpoinmu dengan klik 'Sayurpoin' di halaman Beranda atau Akun ya.",
    },
    {
      question: "Bagaimana Sayurpoin bekerja?",
      answer:
        "Semakin banyak & sering kamu berbelanja di Sayurbox, kamu akan mendapatkan kesempatan untuk menukarkan poinmu dengan voucer belanja Sayurbox. Setiap kamu belanja sebesar Rp2.000, maka kamu akan mendapatkan 1 poin. Kumpulkan sebanyak-banyaknya dan jangan lupa tukarkan dengan voucher ya!",
    },
    {
      question: "Apakah Sayurpoin bisa diungkan?",
      answer:
        "Sayurpoin tidak bisa diuangkan ya Sayurfriends, tetapi bisa kamu tukarkan dengan voucher belanja Sayurbox.",
    },
    {
      question: "Berapa lama masa berlaku Sayurpoin?",
      answer:
        "Masa berlaku seluruh poinmu akan terhitung 90 hari dari transaksi terakhirmu. Jadi, masa berlaku Sayurpoin akan terus diperpanjang selama kamu terus belanja di Sayurbox.",
    },
    {
      question: "Kapan saya mendapatkan Sayurpoin?",
      answer:
        "Kamu akan mendapatkan Sayurpoin paling lambat 3×24 jam setelah transaksi belanjaanmu selesai.",
    },
    {
      question:
        "Apakah voucher hasil penukaran Sayurpoin bisa digunakan pengguna lain?",
      answer:
        "Voucher belanja hasil penukaran Sayurpoin hanya bisa digunakan oleh pengguna itu sendiri, tidak bisa dialihkan atau dihadiahkan untuk pengguna lain ya.",
    },
    {
      question: "Saya lupa menukar Sayurpoin dan masa berlakunya sudah habis?",
      answer:
        "Berarti sudah lebih dari 90 hari kamu tidak berbelanja di Sayurbox. Yuk belanja di Sayurbox dan kumpulkan poinnya! Jangan sampai lupa menukarkan poinmu dengan voucher ya.",
    },
  ];

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
          <div className="font-bold text-center text-2xl text-black mb-4">
            Seputar SayurPoin
          </div>

          {/* FAQ Illustration */}
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

          {/* FAQ Accordion */}
          <div className="space-y-0">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-gray-200">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-3 px-0 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-900 pr-4">
                    {item.question}
                  </span>
                  {expandedAccordions.includes(index) ? (
                    <ChevronUp
                      size={16}
                      className="text-gray-500 flex-shrink-0"
                    />
                  ) : (
                    <ChevronDown
                      size={16}
                      className="text-gray-500 flex-shrink-0"
                    />
                  )}
                </button>

                {expandedAccordions.includes(index) && (
                  <div className="pb-3 px-0">
                    <div className="text-sm text-gray-600 leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
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
                <span className="font-bold text-lg">Masih punya pertanyaan? Hubungi Kami</span>
              </div>
              <ChevronRight size={32} className="relative z-10" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SayurPoinSection;
