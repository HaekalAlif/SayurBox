import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";

const ListPayment = () => {
  const [selectedPayment, setSelectedPayment] = useState("cod");

  const paymentSections = [
    {
      title: "Bayar di Tempat",
      cards: [
        {
          id: "cod",
          title: "SayurTunai (Bayar di tempat)",
          subtitle:
            "Bayar tunai & dapat mengembalikan produk yang tidak sesuai di tempat",
          icon: "assets/payment/sayur-tunai.png",
          highlight: true,
        },
      ],
    },
    {
      title: "Transfer Bank",
      cards: [
        {
          id: "bca_va",
          title: "BCA Virtual Account",
          subtitle: "Transfer ke rekening bank VA BCA.",
          icon: "assets/payment/bca.png",
        },
        {
          id: "mandiri_va",
          title: "Bank Mandiri Virtual Account",
          subtitle: "Bayar ke bank Mandiri Virtual TransferPay!",
          icon: "assets/payment/mandiri.png",
        },
        {
          id: "bni_va",
          title: "BNI Virtual Account",
          subtitle: "Bayar ke BNI virtual account TransferPay!",
          icon: "assets/payment/bni.png",
        },
        {
          id: "bri_va",
          title: "Bank BRI Virtual Account",
          subtitle: "Bayar ke BRI virtual account TransferPay!t",
          icon: "assets/payment/bri.png",
        },
        {
          id: "permata_va",
          title: "Permata Virtual Account",
          subtitle: "Bayar ke Permata virtual account TransferPay!",
          icon: "assets/payment/permata.png",
        },
        {
          id: "jenius",
          title: "Jenius",
          subtitle: "Bayar dengan menggunakan cashtag Jenius",
          icon: "assets/payment/jenius.png",
        },
      ],
    },
    {
      title: "Kartu Kredit",
      cards: [
        {
          id: "credit_card",
          title: "Kartu Kredit (Visa/MasterCard)",
          subtitle: "Anda akan diarahkan ke halaman pembayaran Midtrans",
          icon: "assets/payment/credit-card.png",
        },
      ],
    },
  ];

  const handlePaymentSelect = (paymentId) => {
    setSelectedPayment(paymentId);
  };

  const handleConfirm = () => {
    console.log("Selected payment method:", selectedPayment);
    // Handle confirmation logic here
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-white px-5 py-0">
      {/* Back Button */}
      <div className="bg-white z-10 pl-3">
        <button
          onClick={handleBackClick}
          className="relative top-13 left-6 cursor-pointer items-center w-14 h-14 text-lg text-green-600 border border-green rounded-full border-green-400 hover:scale-110 transition-transform"
        >
          <ChevronLeft className="w-10 h-10 ml-1" />
        </button>
      </div>

      <div className="max-w-3xl  mx-auto space-y-6 mb-16">
        {/* Header Section */}
        <div className="font-bold text-3xl text-black mb-6">
          Metode Pembayaran
        </div>
        {paymentSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {section.title}
            </h2>

            <div className="space-y-6">
              {section.cards.map((card) => (
                <div
                  key={card.id}
                  className={`p-4 border-2 rounded-sm  cursor-pointer transition-all duration-200 ${
                    selectedPayment === card.id
                      ? card.highlight
                        ? "border-green-500 bg-green-50"
                        : "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-gray-300 shadow-md"
                  } ${card.highlight ? "border-gray-200" : ""}`}
                  onClick={() => handlePaymentSelect(card.id)}
                >
                  <div className="flex items-center justify-between h-16 mr-2">
                    <div className="flex items-center space-x-10">
                      {/* Payment Icon */}
                      <div className="w-20 h-12 flex items-center justify-center">
                        <img
                          src={card.icon}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Payment Details */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-base">
                          {card.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {card.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Radio Button */}
                    <div className="flex items-center">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="payment_method"
                          value={card.id}
                          checked={selectedPayment === card.id}
                          onChange={() => handlePaymentSelect(card.id)}
                          className="sr-only"
                        />
                        <div className="w-6 h-6 rounded-full border-[3px] border-green-600 flex items-center justify-center bg-white transition-all duration-200">
                          <div
                            className={`w-3 h-3 bg-green-600 rounded-full transition-all duration-200 ${
                              selectedPayment === card.id ? "block" : "hidden"
                            }`}
                          ></div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Confirm Button */}
        <div className="pt-6">
          <button
            onClick={handleConfirm}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 shadow-sm"
          >
            Konfirmasi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListPayment;
