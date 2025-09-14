import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const VoucherCheckoutList = () => {
  const handleBackClick = () => {
    window.history.back();
  };

  const handleExchangePoints = () => {
    console.log("Exchange points for voucher");
  };

  const handleVoucherClick = (voucherId) => {
    console.log("Voucher clicked:", voucherId);
  };

  const vouchers = Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    title: "Diskon 10% hingga Rp50.000",
    transaction: "Voucher untuk 3 transaksi pertamamu!",
    saving: "Hemat s.d Rp.50.000",
    minPurchase: "Belanja minimal Rp200.000",
    expiry: "Berlaku sampai 31 Desember 2025",
  }));

  return (
    <div
      className="min-h-screen w-full bg-pattern"
      style={{
        backgroundImage: `url("/bg-pattern-sayurbox.png")`,
        backgroundRepeat: "repeat",
        backgroundSize: "130px",
      }}
    >
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #16a34a;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #15803d;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #16a34a #f1f5f9;
        }
      `}</style>

      {/* Header with Back Button */}
      <div className="absolute top-0 mt-50 z-10 pl-4">
        <button
          onClick={handleBackClick}
          className="relative top-12 left-6 cursor-pointer items-center w-14 h-14 text-lg text-green-600 border border-green rounded-full border-green-400 hover:scale-110 transition-transform "
        >
          <ChevronLeft className="w-10 h-10 ml-1" />
        </button>
      </div>
      <div className=" max-w-3xl mx-auto pt-12">
        <div className="text-2xl font-bold">
          <h1>Voucher Saya</h1>
        </div>

        <div
          className=" mt-6 mb-10 px-8 py-8 pr-[20%] shadow-xl rounded-xl "
          style={{ backgroundColor: "#F5FFCE" }}
        >
          <div className="p-4 rounded-md mb-4 bg-[#906C4D] w-[95%]">
            <div>
              <span className="text-white text-xl font-bold">
                Punya Kode Voucher?
              </span>
            </div>
            <div className="mt-3">
              <input
                type="text"
                placeholder="Tulis kode voucher disini"
                className="w-full px-3 py-2 border border-black rounded-md focus:outline-none bg-white"
              />
            </div>
          </div>

          {/* Exchange Points Button */}
          <button
            onClick={handleExchangePoints}
            className="w-[95%] flex items-center justify-between p-4 rounded-sm mb-4 transition-colors hover:opacity-90 border border-green-600 cursor-pointer"
            style={{ backgroundColor: "#B1E9AB" }}
          >
            <div className="flex items-center space-x-6">
              <img src="/assets/voucher/discount.png" className="w-8" />
              <span className="text-md font-semibold">
                Butuh Voucher? Tukarkan Poin!
              </span>
            </div>
            <ChevronRight size={32} style={{ color: "#0A4F17" }} />
          </button>

          {/* Voucher List with Limited Height and Scroll */}
          <div
            className="space-y-3 overflow-y-auto custom-scrollbar w-[115%] pr-15"
            style={{ maxHeight: "490px" }}
          >
            {vouchers.map((voucher) => (
              <div
                key={voucher.id}
                onClick={() => handleVoucherClick(voucher.id)}
                className="h-38 flex items-center rounded-xl cursor-pointer bg-white pr-4 mr-4"
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

          {/* Pilih Voucher Button */}
          <div className="mt-6">
            <button
              className="w-[100%] bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-md text-lg transition-colors cursor-pointer"
              onClick={handleBackClick}
            >
              Pilih Voucher
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherCheckoutList;
