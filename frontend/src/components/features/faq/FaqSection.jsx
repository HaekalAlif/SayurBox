import React, { useState } from "react";
import { ChevronLeft, ChevronDown, ChevronUp } from "lucide-react";

const FaqSection = () => {
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

  const topicItems = [
    { icon: "/assets/faq/sayur-panen.png", label: "Sayurpanen" },
    { icon: "/assets/faq/sayur-poin.png", label: "SayurPoin" },
    { icon: "/assets/faq/product.png", label: "Ketersediaan Produk" },
    { icon: "/assets/faq/payment.png", label: "Pembayaran" },
    { icon: "/assets/faq/shipping.png", label: "Pengiriman" },
    { icon: "/assets/faq/refund.png", label: "Pengembalian \nDana" },
    { icon: "/assets/faq/voucher.png", label: "Voucher & \nPromo" },
    { icon: "/assets/faq/etc.png", label: "Lain-lain" },
  ];

  const faqItems = [
    {
      question: "Apakah saya bisa pesan untuk pengiriman hari ini?",
      answer:
        "Tentu! Kamu bisa melakukan pemesanan untuk pengiriman hari ini dengan layanan Instant Delivery atau Sameday Delivery\n\nCoverage Area Sameday Delivery\nDengan layanan Sameday Delivery, kamu dapat memilih slot pengiriman di hari yang sama. Berikut adalah slot dan area yang kami cover: \n1. Slot Pengiriman 14:00 - 17:00 WIB\nPemesanan maksimal dapat dilakukan sebelum pukul 10:00 WIB.\nArea yang dicover : \n- Kembangan\n- Pondok Kopi\n- Kramat\n- Bogor\n2. Slot Pengiriman 19:00 - 22:00 WIB\nPemesanan maksimal dapat dilakukan sebelum pukul 10:00 WIB.\nArea yang dicover : \n- Cibitung\n- Kembangan\n- Bintaro\n- Karawaci\n- Pondok Kopi\n- Pejaten\n- Kramat\n- Cibubur\n- Depok\n- Bogor\nCoverage Area Instant Delivery\nUntuk kamu yang berada di sekitar Jakarta Selatan (dalam radius 9 KM dari Hub Fatmawati) dan Jakarta Barat (dalam radius 8 KM dari Hub Meruya), layanan Instant Delivery bisa jadi pilihan terbaik jika kamu butuh pengiriman lebih cepat! Estimasi waktu pengiriman adalah 1-2 jam setelah pembayaran terverifikasi.",
    },
    {
      question: "Apakah saya dapat menghubungi kurir secara langsung?",
      answer:
        "Saat ini, informasi nomor kurir belum tersedia di aplikasi. Namun, kamu tetap bisa memantau status pengiriman langsung melalui aplikasi Sayurbox. Jika ada hal yang ingin dikonfirmasi lebih lanjut, tim Customer Service kami siap membantu melalui WhatsApp atau email. \nKami siap membantu dengan senang hati.",
    },
    {
      question: "Bagaimana cara mengecek Status Pengiriman?",
      answer:
        "Kamu bisa cek status pengiriman langsung melalui aplikasi atau website Sayurbox. Caranya mudah: \nBuka aplikasi atau website Sayurbox \nPilih menu 'Pesanan' \nKlik pesanan yang sedang diproses \nPilih 'Lacak Pengiriman' untuk melihat update lokasi \nKalau pesanan sudah diterima, kamu bisa klik 'Lihat Bukti Pengiriman' untuk melihat dokumentasinya \nStatus pesanan terkini dapat kamu lihat di halaman tersebut. Kamu juga bisa cek status pesananmu di halaman Beranda ya!",
    },
    {
      question:
        "Bagaimana cara mengecek syarat dan ketentuan (SAK) penggunaan dari voucher saya?",
      answer:
        "Untuk mengetahui syarat dan ketentuan dari voucher yang kamu miliki, kamu bisa ikuti langkah-langkah berikut: \nMasuk ke akun Sayurbox kamu \nMasuk menu 'Akun' di pojok kanan atas \nPilih 'Voucher Aktif' \nKamu juga bisa langsung klik ikon Voucher di bagian kanan atas layar \nSetelah itu, pilih voucher yang ingin kamu gunakan, dan detail syarat serta ketentuannya akan langsung terlihat di sana.\n\nJangan lupa dicek dulu ya, supaya vouchernya bisa dipakai sesuai ketentuannya. Selamat belanja!",
    },
    {
      question: "Berapa lama estimasi waktu pengiriman?",
      answer:
        "Estimasi waktu pengiriman akan mengikuti slot pengiriman yang kamu pilih saat checkout. Tim Sayurbox akan memproses pesanan secepat mungkin agar bisa segera kamu terima. Berikut ini pilihan slot pengiriman berdasarkan area:\n\nJABODETABEK\nNextday Delivery\nKamu bisa memilih salah satu dari slot berikut:\nDini Hari – ETA 05:00–08:00 WIB\nPagi Hari – ETA 09:00–12:00 WIB\nSore Hari – ETA 14:00–17:00 WIB Malam Hari – ETA 19:00–22:00 WIB\nSameday Delivery\nPilihan slot pengiriman di hari yang sama:\nSameday 1 – ETA 14:00–17:00 WIB\nSameday 2 – ETA 19:00–22:00 WIB \n\nSurabaya \nNextday Delivery\nDini Hari – ETA 06:00–10:00 WIB\nPagi Hari – ETA 10:00–13:00 WIB\nMalam Hari – ETA 17:00–21:00 WIB\nSameday Delivery\nSameday – ETA 17:00–21:00 WIB \nMalang \nNextday Delivery\nPagi Hari – ETA 06:00–09:00 WIB\nMalam Hari – ETA 17:00–20:00 WIB\nSameday Delivery\nSameday – ETA 17:00–20:00 WIB\n\nUntuk memastikan pesanan kamu diproses sesuai slot yang sudah dipilih, jangan lupa selesaikan pembayaran sebelum batas waktu yang ditentukan, ya. Selamat berbelanja di Sayurbox!",
    },
  ];

  const contactOptions = [
    {
      icon: "/assets/faq/whatsapp.png",
      label: "WhatsApp",
      value: "+62 821 8787 0070",
      backgroundColor: "#F5FFCE",
    },
    {
      icon: "/assets/faq/email.png",
      label: "E-Mail",
      value: "support@sayurbox.com",
      backgroundColor: "#F5FFCE",
    },
  ];

  return (
    <div className="min-h-screen p-10">
      {/* Back Button */}
      <div className="bg-white z-10 absolute">
        <button
          onClick={handleBackClick}
          className="relative left-6 cursor-pointer items-center w-14 h-14 text-lg text-green-600 border border-green rounded-full border-green-400 hover:scale-110 transition-transform"
        >
          <ChevronLeft className="w-10 h-10 ml-1" />
        </button>
      </div>
      <div className="bg-gray-100 max-w-4xl p-4 rounded-lg mx-auto shadow-lg">
        <span className="text-2xl font-bold flex justify-center py-2">
          Pusat Bantuan SayurBox
        </span>
        {/* Main Container */}
        <div className="max-w-2xl mx-auto p-4 space-y-4">
          {/* Topic Selection Card */}
          <div className="bg-white rounded-xl px-4 py-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-6 px-2">
              Pilih Topik Sesuai kendalamu
            </h2>
            <div className="grid grid-cols-5 gap-x-3 gap-y-7">
              {topicItems.map((item, index) => (
                <div className="">
                  <div
                    key={index}
                    className="flex flex-col bg-[#F4F4E6] border items-center p-2 rounded-lg cursor-pointer transition-colors mx-4 mb-3 hover:border-green-500 group"
                  >
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="w-14 h-14 group-hover:translate-y-0.5 transition-transform"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                  <span className="text-xs font-semibold flex justify-center whitespace-pre-line text-center">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Card */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">
              Yang Sering Ditanyakan
            </h2>
            <div className="space-y-0 px-2">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full py-4 px-0 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
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
                      <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                        {item.answer}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Hubungi Sayurbox</h2>
            <div className="grid grid-cols-2 gap-3">
              {contactOptions.map((option, index) => (
                <div
                  key={index}
                  className="flex p-4 rounded-lg cursor-pointer hover:opacity-90 transition-opacity gap-4 border border-green-300"
                  style={{ backgroundColor: option.backgroundColor }}
                >
                  <div className="flex justify-center items-center">
                    <img
                      src={option.icon}
                      alt={option.label}
                      className="w-10 h-10"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-medium text-gray-900">
                        {option.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 font-medium">
                      {option.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Consumer Protection Service */}
          <div className="bg-white rounded-xl p-4 shadow-sm p-2">
            <h3 className="text-lg font-bold text-black mb-2">
              Layanan Pengaduan Konsumen
            </h3>
            <div className="text-sm  text-black leading-6 mb-2 font-medium">
              <p>
                Direktorat Jenderal Perlindungan Konsumen dan Tata Tertib Niaga
              </p>
              <p>Kementerian Perdagangan RI</p>
              <p>Nomor WhatsApp Ditjen PKTN: +62 853 1111 1010</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
