import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  ChevronRight,
} from "lucide-react";

const SayurPanenSection = () => {
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
      question: "Apa itu SayurPanen?",
      answer:
        "Sayurpanen adalah program loyalitas terbaru dari Sayurbox. Sebagai member Sayurpanen, kamu bisa mengumpulkan XP, dan naik level yang lebih tinggi. Keuntungan yang didapat pun akan semakin menarik dan berbeda di tiap levelnya!\n\nSayurpanen adalah Program Loyalty dari Sayurbox untuk seluruh customer Sayurbox.",
    },
    {
      question: "Apa itu XP?",
      answer:
        "XP adalah kepanjangan dari Experience Points, yang akan kamu dapatkan setiap belanja di Sayurbox.",
    },
    {
      question: "Bagaimana cara mendapatkan XP?",
      answer:
        "Untuk mendapatkan XP, kamu bisa berbelanja di Sayurbox. Setiap pembelian Rp1.000, maka kamu akan mendapatkan 1 XP.",
    },
    {
      question: "Apa keuntungan dari setiap level dari SayurPanen?",
      answer:
        "Setiap level dari SayurPanen memiliki keuntungan yang berbeda-beda. Semakin tinggi levelnya, semakin banyak keuntungan yang didapatkan. Keuntungan tersebut bisa berupa diskon, akses ke produk eksklusif, dan lainnya.",
    },
    {
      question: "Apa perbedaan SayurPoin & XP",
      answer:
        "Sayurpoin dan XP akan diperoleh setiap kali Sayurfriend berhasil melakukan pembelian.\n\nSayurpoin berguna untuk ditukarkan dengan hadiah menarik yang telah tersedia. Jumlah Sayurpoin yang dimiiki tidak akan menentukan level dari Sayurfriend.\n\nSedangkan XP berguna untuk menentukan Level dari Sayurfriend.",
    },
    {
      question: "Bagaimana cara naik level",
      answer:
        "Setiap melakukan transaksi, anda akan mendapatkan sejumlah XP. Level dapat ditingkatkan jika pengguna sudah memenuhi target XP untuk naik level. \n\nJumlah transaksi dan Total Pembayaran akan dihitung setelah pesanan diterima dan transaksi selesai. Anda akan memiliki waktu 90 hari untuk mencapai level berikutnya, ketika berhasil naik level, periode waktu 90 hari akan dimulai kembali.\n\nBenih : 0 XP\nBunga :  750 XP (+750 XP dari level benih)\nBuah : 2.550 XP (+1800 XP dari level bunga)\nPanen : 5.550 XP (+3000 XP dari level buah)",
    },
    {
      question: "Apa level saya dapat turun?",
      answer:
        "Level dapat turun apabila jumlah XP yang dikumpulkan pada periode 3 bulan sebelumnya kurang dari minimum XP untuk mencapai level tersebut. Contoh: Pengguna A pada bulan Januari 2023 sudah mencapai level membership Bunga dengan mengumpulkan total 750 XP. Pada bulan April 2023 akan dilakukan perhitungan kembali.\n\nJika selama periode Januari - Maret 2023, pengguna tidak mencapai 750 XP, maka Membership Pengguna A akan turun menjadi Benih. Jika XP sudah mencapai minimal 750 XP maka Pengguna A akan tetap bertahan di level Bunga. Sedangkan jika XP yang dikumpulkan mencapai 1800 XP maka Pengguna A akan otomatis menjadi level Buah.\n\nCatatan: Masing-masing Membership hanya dapat mengalami penurunan maksimal 1 level, semisal: Level Panen hanya dapat mengalami penurunan ke Buah, tidak dapat langsung turun ke Bunga atau Benih.",
    },
    {
      question: "info kadaluarsa SayurPoin?",
      answer:
        "Sayurpoin dapat kadaluarsa jika: \n - Sayurfriend tidak berbelanja selama 90 hari berturut turut \nSayurpoin tidak digunakan dalam kurun waktu 1 tahun, terhitung dari waktu sayurpoin itu diperoleh \n - Contoh: Sayurfriend mendapatkan 300 Sayurpoin selama April 2023. Apabila tidak digunakan, maka 300 Sayurpoin tersebut akan kadaluarsa di April 2024. Saat menukarkan Sayurpoin, Sayurpoin yang akan digunakan terlebih dahulu adalah Sayurpoin yang memiliki masa kadaluarsa paling dekat.",
    },
    {
      question: "info kadaluarsa XP",
      answer:
        "Ketika Sayurfriend turun level atau bertahan di level yang sama, maka XP akan diulang sesuai titik awal level tersebut. \n - Contoh Turun Level: Pada akhir periode, Sayurfriend telah berada di level Buah dan sudah mengumpulkan 1,000 XP. Namun karena tidak mencapai target, maka Sayurfriend akan turun ke level Bunga dan mulai kembali dengan 0 XP. \n - Contoh Bertahan Level: Pada akhir periode, Sayurfriend telah berada di level Buah dan sudah mengumpulkan 2,000 XP. Karena Sayurfriend sudah mencapai target untuk bertahan di level Buah, maka periode akan diulang kembali dan Sayurfriend akan mulai kembali dengan 0 XP di level tersebut.",
    },
  ];

  return (
    <div
      className="min-h-screen w-full bg-pattern"
      style={{
        backgroundImage: `url("/bg-pattern-sayurbox.png")`,
        backgroundRepeat: "repeat",
        backgroundSize: "130px",
      }}
    >
      {/* Back Button */}
      <div className="absolute z-10 pl-3">
        <button
          onClick={handleBackClick}
          className="relative top-13 left-6 cursor-pointer items-center w-14 h-14 text-lg text-green-600 border border-green rounded-full border-green-400 hover:scale-110 transition-transform"
        >
          <ChevronLeft className="w-10 h-10 ml-1" />
        </button>
      </div>

      {/* Main Container */}
      <div className="flex items-center justify-center min-h-screen p-4 mb-6 pt-12">
        <div className="w-full max-w-2xl bg-white border border-green-700 rounded-2xl p-4 shadow-sm">
          {/* Header Section */}
          <div className="font-bold text-center text-2xl text-black mb-4">
            Seputar SayurPanen
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
                    <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
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

export default SayurPanenSection;
