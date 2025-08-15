import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  ChevronRight,
} from "lucide-react";

const MetodePembayaranSection = () => {
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
      question: "Apa saja metode pembayaran yang bisa digunakan?",
      answer:
        "Saat ini untuk metode pembayaran yang tersedia dan bisa dipakai di Sayurbox adalah:\nDompet Digital\nOVO Wallet\nGo-Pay Wallet\nShopeePay\nAstraPay\nBayar di Tempat/ SayurTunai (COD)\nTransfer Bank\nVA BCA/BRI/BNI/Permata/Mandiri\nMelalui JENIUS\nKartu Kredit (VISA/Master Card)\n\nJika ingin merubah metode pembayaran yang sudah dipilih, maka bisa menunggu 2 jam untuk muncul tombol otomatis 'Ubah Metode Pembayaran'",
    },
    {
      question: "Bagaimana cara melakukan pembayaran melalui virtual Account??",
      answer:
        "Virtual Account BCA *Melalui BCA Mobile\n\n1.    Buka BCA mobile, pilih menu “m-Transfer”\n2.    Pilih menu “BCA Virtual Account”\n3.    Masukkan nomor BCA Virtual Account dan klik “Send”\n4.    Cek nominal yang muncul\n5.    Masukkan PIN m-BCA\n6.    Transaksi Berhasil\n\n*Melalui myBCA\n1.    Buka myBCA, pilih menu “Transfer”\n2.    Pilih menu “Virtual Account”\n3.    Masukkan nomor BCA Virtual Account dan klik “Kirim”\n4.    Cek nominal yang muncul dan klik “Lanjut”\n5.    Konfirmasi detail transaksi dan klik “Lanjut”\n6.    Masukkan PIN myBCA\n7.    Transaksi Berhasil\n\n*Melalui ATM BCA\n1.    Masukkan Kartu ATM dan PIN ATM BCA\n2.    Pilih menu “Penarikan Tunai/Transaksi Lainnya”\n3.    Pilih menu “Transaksi Lainnya”\n4.    Pilih menu “Transfer”\n5.    Pilih menu “Ke Rek BCA Virtual Account”\n6.    Masukkan nomor BCA Virtual Account dan klik “Benar”\n7.    Cek detail transaksi dan pilih “Ya”\n8.    Transaksi selesai\n\n*Melalui KlikBCA\n1.    Login ke KlikBCA dan pilih menu “Transfer Dana”\n2.    Pilih menu “Transfer ke BCA Virtual Account”\n3.    Masukkan nomor BCA Virtual Account dan klik “Lanjutkan”\n4.    Masukkan respon KeyBCA Appli 1 dan klik “Kirim”\n5.    Transaksi Berhasil",
    },
    {
      question: "Berapa lama proses verifikasi pembayaran dilakukan??",
      answer:
        "Verifikasi pembayaran Dompet Digital, VA, dan CC berlangsung secara real time (saat itu juga terverifikasi), dengan batas waktu pembayaran sebagai berikut.\n- VA : 2 jam\n- Midtrans (CC dan Dompet Digital) : real time (saat itu juga)",
    },
    {
      question:
        "Saya sudah melakukan pembayaran tetapi status pesanan masih belum dibayar. Apa yang harus saya lakukan??",
      answer:
        "Jika pembayaran mengalami kendala, maka kakak bisa menghubungi customer service Sayurbox melalui Chat atau Email dengan melampirkan data:\n- Nomor Order\n- Foto bukti pembayaran yang menunjukan pembayaran ke Sayurbox / KREASI NOSTRA MANDIRI",
    },
    {
      question:
        "Pesanan sudah dibayar tetapi saya menerima konfirmasi pembatalan melalui email. Apa yang harus saya lakukan?",
      answer:
        "Pembatalan order terjadi dikarenakan adanya kesalahan sistem atau order belum dibayar dan melebihi batas waktu yang ditentukan.\nSilahkan menghubungi customer service Sayurbox melalui Chat atau Email untuk pengembalian dana yang diinginkan.",
    },
    {
      question:
        "Pesanan sudah dibayar menggunakan Gopay tetapi pesanan saya gagal dibuat. Apa yang harus saya lakukan?",
      answer:
        "Jika saldo GO-PAY kamu sudah terpotong namun kamu belum mendapatkan konfirmasi pemesanan setelah 2 x 24 jam, maka segera hubungi customer service Sayurbox melalui Chat atau Email untuk pengembalian dana yang diinginkan.",
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
            Metode Pembayaran
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

export default MetodePembayaranSection;
