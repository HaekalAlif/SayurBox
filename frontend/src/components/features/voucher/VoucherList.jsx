import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VoucherList = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    window.history.back();
  };

  // Generate 8 voucher items
  const vouchers = Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    title: "Diskon 10% hingga Rp50.000",
    transaction: "Voucher untuk 3 transaksi pertamamu!",
    saving: "Hemat s.d Rp.50.000",
    minPurchase: "Belanja minimal Rp200.000",
    expiry: "Berlaku sampai 31 Desember 2025",
  }));

  return (
    <div className="min-h-screen">
      {/* Header with Back Button */}
      <div className="top-0 bg-white z-10 pl-4">
        <button
          onClick={handleBackClick}
          className="relative top-12 left-6 cursor-pointer items-center w-14 h-14 text-lg text-green-600 border border-green rounded-full border-green-400 hover:scale-110 transition-transform"
        >
          <ChevronLeft className="w-10 h-10 ml-1" />
        </button>
      </div>
      <div className=" max-w-3xl mx-auto">
        <div className="text-2xl font-bold">
          <h1>Voucher Saya</h1>
        </div>

        <div
          className=" mt-6 mb-10 p-6 pr-[20%] shadow-xl rounded-xl "
          style={{ backgroundColor: "#F5FFCE" }}
        >
          {/* Exchange Points Button */}
          <button
            onClick={() => navigate("/sayur-poin")}
            className="w-[95%] flex items-center justify-between p-4 rounded-sm mb-4 transition-colors hover:opacity-90 border border-green-600 cursor-pointer"
            style={{ backgroundColor: "#B1E9AB" }}
          >
            <div className="flex items-center space-x-6 cursor-pointer">
              <img src="/assets/voucher/discount.png" className="w-8" />
              <span className="text-md font-semibold">
                Butuh Voucher? Tukarkan Poin!
              </span>
            </div>
            <ChevronRight size={32} style={{ color: "#0A4F17" }} />
          </button>

          {/* Voucher List */}
          <div className="space-y-3">
            {vouchers.map((voucher) => (
              <div
                key={voucher.id}
                className="h-38 flex items-center rounded-xl cursor-pointer bg-white pr-4"
              >
                {/* Voucher Icon */}
                <div
                  className="relative w-14 h-38 flex items-center justify-center rounded-l-2xl overflow-hidden"
                  style={{ backgroundColor: "#049624" }}
                >
                  <div className="absolute left-8 w-10 h-10 rounded-full bg-white"></div>
                </div>

                {/* Voucher Details */}
                <div className="flex-1 space-y-1 px-5">
                  <h3 className="text-lg font-bold">{voucher.title}</h3>
                  <div className="py-3">
                    <p className="text-sm font-semibold">
                      {voucher.minPurchase}
                    </p>
                    <p className="text-xs">{voucher.transaction}</p>
                    <p className="text-xs">{voucher.saving}</p>
                  </div>
                  <p className="text-xs font-semibold">{voucher.expiry}</p>
                </div>

                {/* Arrow Icon */}
                <ChevronRight size={48} className="text-green-800" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherList;
