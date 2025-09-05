import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  ChevronUp,
  CreditCard,
  BookOpen,
  Truck,
  Home,
  Check,
  Copy,
} from "lucide-react";

const OrderDetailSection = () => {
  const handleBackClick = () => {
    window.history.back();
  };

  const handleTrackShipment = () => {
    console.log("Track shipment clicked");
  };

  const handleCancelOrder = () => {
    console.log("Cancel order clicked");
  };

  const handlePayment = () => {
    console.log("Payment clicked");
  };

  const handleCopyOrderId = async () => {
    try {
      await navigator.clipboard.writeText(orderDetails[0].value);
      alert("ID Pesanan berhasil disalin!");
    } catch (err) {
      console.error("Gagal menyalin: ", err);
    }
  };

  const progressSteps = [
    {
      label: "Payment",
      icon: CreditCard,
      status: "completed",
    },
    {
      label: "Order",
      icon: BookOpen,
      status: "upcoming",
    },
    {
      label: "Shipping",
      icon: Truck,
      status: "upcoming",
    },
    {
      label: "Address",
      icon: Home,
      status: "upcoming",
    },
    {
      label: "Confirmation",
      icon: Check,
      status: "upcoming",
    },
  ];

  const priceSummary = [
    { label: "Subtotal", amount: "Rp12.900" },
    { label: "Biaya Pengiriman", amount: "Rp15.000" },
    { label: "Biaya Layanan", amount: "-Rp4.475" },
    { label: "Total Tagihan", amount: "Rp24.525" },
  ];

  const orderDetails = [
    { label: "Id Pesanan", value: "#DH-WGFNCPMJHUT-NR" },
    { label: "Metode Pembayaran", value: "BNI Virtual Account" },
    { label: "Tanggal Transaksi", value: "Kamis, 6 Februari 2025 - 15:00 WIB" },
  ];

  const ProgressStepper = () => (
    <div className="mb-8 px-20">
      <div className="flex items-center">
        {progressSteps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step.status === "completed"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                <step.icon size={20} />
              </div>
            </div>
            {index < progressSteps.length - 1 && (
              <div className="flex-1 h-1 bg-gray-300"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

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
      {/* Main Content */}
      <div className="max-w-4xl mx-auto mb-12">
        {/* Header Section */}
        <div className="font-bold text-center text-3xl text-black mb-8">
          Detail Pesanan
        </div>
        <div className="px-32 bg-[#F5FFCE] rounded-2xl border shadow-lg relative overflow-hidden pb-10">
          <div className="absolute w-400 h-300 bg-[#049624] rounded-full -top-110 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"></div>
          <div className="px-4 space-y-4 relative z-10">
            {/* Status Section */}
            <div className="bg-white rounded-b-2xl shadow-sm py-4 px-10 relative z-10">
              <p className="text-md font-medium mb-2">Menunggu Pembayaran</p>
              <p className="text-md mb-6">
                Estimasi jam tiba:{" "}
                <span className="font-bold">Besok 14.00 - 17.00</span>
              </p>

              {/* Progress Tracker */}
              <ProgressStepper />

              <hr className="my-4 border-gray-200 border-2" />

              <button
                onClick={handleTrackShipment}
                className="flex items-center justify-center space-x-2 w-full py-2 text-green-700 rounded-full hover:text-green-500 cursor-pointer transition-colors font-semibold"
              >
                <span>Lacak Pengiriman</span>
                <ChevronRight size={18} className="mt-1" />
              </button>
            </div>

            {/* Order Details */}
            <div className="bg-white rounded-xl px-6 py-4">
              <h3 className="text-md font-semibold mb-3">Rincian Pesanan</h3>
              <div className="flex items-center space-x-3 mb-2">
                <img
                  src="/assets/orders/product-image.png"
                  alt="Alpukat Mentega"
                  className="w-20 h-20 object-cover"
                />
                <div>
                  <p className="text-md font-bold">Alpukat Mentega</p>
                  <p className="text-md mt-2">Alpukat Mentega 1 pcs</p>
                </div>
                <div className="font-bold text-xl ml-auto">x1</div>
              </div>
              <h3 className="font-medium">
                Harga : <span className="line-through">Rp. 15.625</span>{" "}
                <strong>Rp.2.500</strong>
              </h3>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-xl py-4 px-6">
              <h3 className="font-medium mb-3">Alamat Pengiriman</h3>
              <p className="flex space-x-2 mb-2">
                <span className="font-semibold">Fulan bin Fulana</span>
                <span> +6282565406837</span>
              </p>
              <p className="text-xs mb-6">
                Monumen Nasional, Jalan Medan Merdeka Utara, RW 02, Gambir,
                Jakarta Pusat, Daerah Khusus Ibukota Jakarta, Jawa, 10110,
                Indonesia
              </p>
              <p className="text-md">
                Catatan: WA setelah tiba, Titip Pos Satpam
              </p>
            </div>

            {/* Total Shopping */}
            <div className="bg-white rounded-xl px-6 py-4">
              <div className="flex justify-between">
                <h3 className="font-semibold text-md mb-3">
                  Total : <strong>Rp. 24.525 </strong>
                </h3>
                <ChevronUp size={24} />
              </div>
              <div className="space-y-3">
                {priceSummary.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className={`text-sm ${item.bold ? "font-bold" : ""}`}>
                      {item.label}
                    </span>
                    <span className={`text-sm ${item.bold ? "font-bold" : ""}`}>
                      {item.amount}
                    </span>
                  </div>
                ))}
              </div>
              <hr className="my-5" />
              <div className="space-y-3">
                {orderDetails.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span
                      className={`text-sm ${item.bold ? "font-bold" : ""} `}
                    >
                      {item.label}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-sm ${item.bold ? "font-bold" : ""}`}
                      >
                        {item.value}
                      </span>
                      {index === 0 && (
                        <button
                          onClick={handleCopyOrderId}
                          className="text-green-800 hover:text-green-600 transition-colors"
                        >
                          <Copy size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SayurPoin & SayurVoucher */}
            <div className="bg-gradient-to-b from-white via-white/0 to-[#B1E9AB4D] from-0% via-40% to-100% rounded-xl p-3 overflow-hidden relative">
              <div className="absolute z-0 w-[1000px] h-[800px] bg-[#B1E9AB] rounded-full left-1/2 top-140 transform -translate-x-1/2 -translate-y-1/2 skew-x-10"></div>
              <div className="flex justify-between items-center px-6 relative z-10">
                <div className="space-y-12 py-6">
                  <div>
                    <h3 className="font-semibold mb-2 text-lg ">
                      SayurPoin & SayurVoucher
                    </h3>
                    <p className="text-md mb-3">
                      Poin & XP akan didapat setelah proses pembayaran selesai
                    </p>
                  </div>

                  <div className="bg-white flex items-center justify-between rounded-lg px-4">
                    <div>
                      <img
                        src="/assets/order-detail/stars.png"
                        className="w-12"
                      />
                    </div>
                    <div className="flex flex-col p-2">
                      <span className="text-sm font-bold">Poin</span>
                      <span className="text-sm font-bold text-green-800">
                        +9
                      </span>
                    </div>
                    <div className="flex flex-col p-2">
                      <span className="text-sm font-bold">XP</span>
                      <span className="text-sm font-bold text-green-800">
                        +18
                      </span>
                    </div>
                    <div className="flex flex-col p-2">
                      <span className="text-sm font-bold">Status</span>
                      <span className="text-sm font-bold text-[#906C4D]">
                        Diproses
                      </span>
                    </div>
                  </div>
                </div>
                <div className="">
                  <img src="/assets/order-detail/conffeti.png" alt="" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between space-x-4 mt-12">
              <button
                onClick={handleCancelOrder}
                className="flex-1 bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors cursor-pointer"
              >
                Batalkan Pesanan
              </button>
              <button
                onClick={handlePayment}
                className="flex-1 bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors cursor-pointer"
              >
                Bayar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailSection;
