import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrder } from "@/service/orders/order";

const PaymentSuccessSection = () => {
  const [timeLeft, setTimeLeft] = useState(7195); // 01:59:55 in seconds
  const [expandedAccordion, setExpandedAccordion] = useState(null);
  const [copied, setCopied] = useState(false);
  const [order, setOrder] = useState(null);

  const navigate = useNavigate();
  const { id: orderId } = useParams();

  useEffect(() => {
    if (!orderId) return;
    getOrder(orderId).then((res) => setOrder(res.data));
  }, [orderId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")} : ${minutes
      .toString()
      .padStart(2, "0")} : ${secs.toString().padStart(2, "0")}`;
  };

  const handleBackClick = () => {
    window.history.back();
  };

  const virtualAccount = "880428668688679676";
  const totalAmount = order
    ? `Rp ${Number(order.final_amount).toLocaleString()}`
    : "-";

  const handleCopyVA = async () => {
    try {
      await navigator.clipboard.writeText(virtualAccount);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const toggleAccordion = (index) => {
    setExpandedAccordion(expandedAccordion === index ? null : index);
  };

  const accordionItems = [
    {
      title: "Petunjuk Pembayaran Melalui ATM",
      content: `1. Masukkan kartu ATM BNI dan PIN Anda
2. Pilih menu "Menu Lainnya"
3. Pilih "Transfer"
4. Pilih "Virtual Account Billing"
5. Masukkan nomor Virtual Account: ${virtualAccount}
6. Konfirmasi pembayaran sebesar ${totalAmount}
7. Selesai, simpan struk sebagai bukti pembayaran`,
    },
    {
      title: "Petunjuk Pembayaran Melalui Mobile Banking",
      content: `1. Login ke aplikasi BNI Mobile Banking
2. Pilih menu "Transfer"
3. Pilih "Virtual Account Billing"
4. Masukkan nomor Virtual Account: ${virtualAccount}
5. Masukkan nominal pembayaran: ${totalAmount}
6. Konfirmasi detail transaksi
7. Masukkan PIN transaksi
8. Pembayaran berhasil, simpan bukti transaksi`,
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#F8FDF9", fontFamily: "Poppins, sans-serif" }}
    >
      <div className="relative px-8">
        {/* Back Button */}
        <div className=" pl-4">
          <button
            onClick={handleBackClick}
            className="relative top-13 left-6 cursor-pointer items-center w-14 h-14 text-lg text-green-600 border border-green rounded-full border-green-400 hover:scale-110 transition-transform"
          >
            <ChevronLeft className="w-10 h-10 ml-1" />
          </button>
        </div>

        {/* Main Container */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border-2 border-green-300 shadow-sm p-6 px-28 text-center mb-12">
          {/* Success Header */}
          <h1 className="text-2xl font-bold mb-6 mt-4">Pesanan Berhasil!</h1>

          {/* Success Illustration */}
          <div className="mb-8">
            <img
              src="/assets/payment/success-icon.png"
              alt="Success Image"
              className="w-full max-w-60 mx-auto"
            />
          </div>

          <p className="text-md mb-1 font-bold">
            Pesanan berhasil dibuat! Kami sedang mengonfirmasi pesanan Anda.
          </p>
          <p className="text-md font-bold mb-10">
            Anda bisa menutup halaman ini.
          </p>

          {/* Payment Details */}
          <div className="text-left mb-6">
            <h3 className="text-md font-medium mb-3">Batas Waktu Pembayaran</h3>

            <div className="text-lg font-bold mb-4">{formatTime(timeLeft)}</div>

            <div className="space-y-2">
              <p className="text-md ">Total Tagihan</p>
              <p className="text-lg font-semibold">{totalAmount}</p>

              <p className="text-sm  mt-3">ID Pesanan : {orderId}</p>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-green-700 opacity-30 border-4 rounded-lg mb-6" />

          <div className="text-left mb-6">
            <p className="text-md font-bold mb-2">Metode Pembayaran :</p>
            <p className="text-md font-bold mb-2">BNI Virtual Account</p>
          </div>

          {/* Payment Method */}
          <div className="mb-6 flex justify-center">
            <div className="border border-gray-400 w-120 rounded-xl p-4 flex flex-col items-center">
              <img
                src="/assets/payment/bni.png"
                alt="Logo BNI"
                className="h-6 mb-3"
              />

              <p className="text-sm text-gray-700 mb-2 text-center">
                Transfer ke Virtual Account BNI via TransferPay
              </p>

              <div className="rounded-lg mb-3">
                <span className="text-md font-semibold">{virtualAccount}</span>
              </div>

              <button
                onClick={handleCopyVA}
                className={`flex space-x-1 px-3 py-1 rounded-md text-sm cursor-pointer font-bold transition-all ${
                  copied ? "text-green-700" : "text-green-700 hover:bg-gray-200"
                }`}
              >
                <span>{copied ? "Tersalin!" : "Salin VA"}</span>
              </button>
            </div>
          </div>

          {/* Accordion Instructions */}
          <div className="space-y-3 mb-6">
            {accordionItems.map((item, index) => (
              <div key={index} className="border-b border-gray-400 ">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 cursor-pointer"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {item.title}
                  </span>
                  {expandedAccordion === index ? (
                    <ChevronUp size={16} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={16} className="text-gray-500" />
                  )}
                </button>

                {expandedAccordion === index && (
                  <div className="px-4 pb-4">
                    <div className="text-xs text-gray-600 whitespace-pre-line leading-relaxed">
                      {item.content}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Button */}
          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg text-base transition-all duration-200 cursor-pointer"
            onClick={() => navigate(`/order/${orderId}`)}
          >
            Lihat Order Saya
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessSection;
