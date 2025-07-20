import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Edit3,
  Gift,
  CreditCard,
  Tag,
} from "lucide-react";

const PaymentSection = () => {
  const [selectedDeliverySlot, setSelectedDeliverySlot] = useState("slot_1");
  const [useCustomPackaging, setUseCustomPackaging] = useState(false);
  const [isGift, setIsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cod");

  const deliverySlots = [
    {
      id: "slot_1",
      label: "Slot Dini Hari",
      timeRange: "05:00 - 08:00 WIB",
      price: 2500,
      estimatedDelivery: "Estimasi tiba pada 05:00 - 08:00 WIB",
      realPrice: 5000,
    },
    {
      id: "slot_2",
      label: "Slot Pagi Hari",
      timeRange: "09:00 - 12:00 WIB",
      price: 2500,
      estimatedDelivery: "Estimasi tiba pada 09:00 - 12:00 WIB",
      realPrice: 5000,
    },
    {
      id: "slot_3",
      label: "Slot Siang Hari",
      timeRange: "13:00 - 17:00 WIB",
      price: 2500,
      estimatedDelivery: "Estimasi tiba pada 13:00 - 17:00 WIB",
      realPrice: 5000,
    },
    {
      id: "slot_4",
      label: "Slot Malam Hari",
      timeRange: "18:00 - 22:00 WIB",
      price: 2500,
      estimatedDelivery: "Estimasi tiba pada 18:00 - 22:00 WIB",
      realPrice: 5000,
    },
  ];

  const orderItems = [
    {
      id: 1,
      productName: "Alpukat Mentega",
      image: "assets/products/produk-1.png",
      price: 15625,
      unit: "1 Pcs",
      discount: 300,
      finalPrice: 2500,
      quantity: 1,
      badge: {
        text: "Asli",
        color: "#FF3B30",
      },
    },
  ];

  const paymentMethods = [
    {
      id: "cod",
      label: "Sayur/Tunai (Bayar di tempat)",
      description:
        "Bayar tunai & dapat mengembalikan produk yang tidak sesuai di tempat",
      icon: "assets/payment/sayur-tunai.png",
    },
    {
      id: "bni",
      label: "BNI Virtual Account",
      description: "Bayar ke BNI Virtual Account Transferpay!",
      icon: "assets/payment/bni.png",
    },
  ];

  const subtotal = 12900;
  const productDiscount = -700;
  const deliveryFee = 15000;
  const packagingFee = useCustomPackaging ? 5000 : 0;
  const reservationFee = 2500;
  const selectedSlotDiscount =
    deliverySlots.find((slot) => slot.id === selectedDeliverySlot)?.discount ||
    0;
  const totalPayment =
    subtotal +
    productDiscount +
    deliveryFee +
    packagingFee +
    reservationFee -
    selectedSlotDiscount;

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="bg-white z-10 pl-4">
        <button
          onClick={handleBackClick}
          className="relative top-13 left-6 cursor-pointer items-center w-14 h-14 text-lg text-green-600 border border-green rounded-full border-green-400 hover:scale-110 transition-transform"
        >
          <ChevronLeft className="w-10 h-10 ml-1" />
        </button>
      </div>

      {/* Header Section */}
      <div className="font-bold text-3xl text-black pl-34 mb-6">Checkout</div>

      {/* 2 Column Layout */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Column - 60% */}
          <div className="lg:col-span-3 space-y-6 mb-8">
            {/* Alamat Pengiriman */}
            <div>
              <div className="flex justify-between items-center mb-2 pl-1 pr-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Alamat Pengiriman
                </h2>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center cursor-pointer font-bold text-green-700 hover:text-green-900 text-sm">
                    Ganti Alamat
                  </button>
                  <ChevronRight
                    size={20}
                    className="text-green-700 font-bold mt-0.5"
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 border-2">
                <div className="flex p-2 space-y-3 space-x-4">
                  <div>
                    <img
                      src="assets/payment/maps.png"
                      className="w-20 h-18 rounded-md"
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex gap-x-6">
                        <p className="font-semibold text-gray-900">
                          Fulan bin Fulana
                        </p>
                        <p className="text-gray-600">+6281234567897</p>
                      </div>
                      <p className="text-gray-600 mt-2 text-sm">
                        Jl. Melati no.45 RT 3 RW 6, Kelurahan Suka Maju, Kec.
                        Sukaraja, Jakarta Selatan, DKI Jakarta, Indonesia
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-t-2 border-green-300 pt-3">
                  <p className="text-sm font-bold text-gray-600">
                    Catatan untuk kurir :
                  </p>
                  <div className="flex justify-between">
                    <input
                      type="text"
                      placeholder="-"
                      className="w-full mt-2 p-2 rounded-md text-sm font-bold focus:outline-none focus:ring-2 focus:ring-green-500 mr-4 "
                    />
                    <div className="px-4 py-2 mt-2 mr-5 rounded-lg border border-transparent border-2 hover:border-green-600 hover:bg-green-100 transition-colors cursor-pointer">
                      <button className="text-sm font-semibold text-green-700">
                        Ubah
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pilih Waktu Pengiriman */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Pilih Waktu Pengiriman
              </h2>
              <div className="py-2 px-4 bg-white gap-x-5 rounded-lg flex border border-gray-100 mb-3">
                <img
                  src="assets/payment/calendar.png"
                  alt="Calendar"
                  className="w-10"
                />
                <div className="flex my-auto gap-x-4">
                  <p className="text-gray-800 font-sm ">Pengiriman :</p>
                  <p className="text-black font-medium ">
                    Jumat 1 Februari 2025
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                {deliverySlots.map((slot) => (
                  <div
                    key={slot.id}
                    className={`p-4 border-2 rounded-sm cursor-pointer transition-all ${
                      selectedDeliverySlot === slot.id
                        ? "border-none bg-[#B1E9AB]"
                        : "border-green-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedDeliverySlot(slot.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-8">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="delivery"
                              value={slot.id}
                              checked={selectedDeliverySlot === slot.id}
                              onChange={() => setSelectedDeliverySlot(slot.id)}
                              className="sr-only"
                            />
                            <div className="w-6 h-6 rounded-full border-[3px] border-green-800 flex items-center bg-white justify-center transition-all duration-200">
                              <div
                                className={`w-3 h-3 bg-green-800 rounded-full transition-all duration-200 ${
                                  selectedDeliverySlot === slot.id
                                    ? "block"
                                    : "hidden"
                                }`}
                              ></div>
                            </div>
                          </label>

                          <div>
                            <p className="font-semibold text-gray-900">
                              {slot.label}
                            </p>
                            <p className="text-md text-gray-800 mt-1">
                              {slot.estimatedDelivery}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          Rp. {slot.price.toLocaleString()}
                        </p>

                        <p className="text-lg text-green-600">
                          <span className="text-gray-400 line-through ">
                            Rp. {slot.realPrice.toLocaleString()}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-x-2">
              <p className="font-semibold text-lg text-gray-900">
                Ganti Kemasan
              </p>
              <img
                src="assets/payment/information.png"
                className="w-5 h-5 mt-1"
              />
            </div>

            {/* Ganti Kemasan */}
            <div className="bg-white border border-green-300 rounded-sm px-4 py-2 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <label className="relative w-10 h-10 inline-block">
                    <input
                      type="checkbox"
                      checked={useCustomPackaging}
                      onChange={(e) => setUseCustomPackaging(e.target.checked)}
                      className="custom-checkbox w-6 h-6 ml-2 mt-2.5 appearance-none rounded border-2 border-green-700 bg-white checked:bg-green-700 checked:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                    />
                  </label>

                  <img
                    src="assets/payment/box.png"
                    className="w-14 h-14 mt-1"
                  />
                  <div>
                    <p className="text-md font-semibold text-black">Kardus</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <span className="font-bold text-gray-900 text-md">
                    Rp. 5.000
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    Rp.8.000
                  </span>
                </div>
              </div>
            </div>

            {/* Rincian Pesanan */}

            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Rincian Pesanan
            </h2>
            <div
              className=" rounded-sm p-6 shadow-sm"
              style={{ backgroundColor: "#B1E9AB" }}
            >
              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-8  px-2"
                  >
                    <div className="w-22 h-22 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-24 h-24 object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold text-gray-900">
                          {item.productName}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600">{item.unit}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="font-semibold text-gray-900">
                          Rp. {item.finalPrice.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          Rp. {item.price.toLocaleString()}
                        </span>
                        <span className="text-xs font-bold bg-red-500 text-white px-2 py-0.5 rounded">
                          84%
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 font-bold text-2xl">
                      x{item.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Kirim sebagai hadiah */}
            <div className="bg-white rounded-lg p-6 border border-green-300">
              <div className="flex items-center  space-x-3 mb-4 pb-6 border-b border-green-500 ">
                <img
                  src="assets/payment/gift.png"
                  className="w-14 h-14
                "
                />
                <div className="flex justify-between items-center w-full pl-4">
                  <div className="justify-between">
                    <p className="font-semibold text-gray-900">
                      Kirim sebagai hadiah?
                    </p>
                    <p className="text-sm text-gray-600">
                      Kamu bisa tulis sendiri kartu ucapan yang kamu inginkan!
                    </p>
                  </div>
                  <label className="inline-flex items-center justify-center w-7 h-7 border-2 border-green-600 rounded-md cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isGift}
                      onChange={(e) => setIsGift(e.target.checked)}
                      className="appearance-none w-full h-full checked:bg-green-600 checked:border-green-600 rounded-md relative"
                    />
                    {isGift && (
                      <svg
                        className="absolute w-4 h-4 text-white pointer-events-none"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </label>
                </div>
              </div>
              <textarea
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                placeholder="Tambahkan catatan disini..."
                maxLength={200}
                className="w-full h-32 p-3 bg-gray-200 border border-gray-200 rounded-sm text-sm resize-none"
                rows={3}
              />
              <p className="text-xs text-gray-800 text-right">0/500 karakter</p>
            </div>
          </div>

          {/* Right Column - 40% */}
          <div className="lg:col-span-2 space-y-6">
            {/* Metode Pembayaran */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Metode Pembayaran
                </h2>
                <h2 className="text-lg font-bold text-green-800 mb-4 cursor-pointer">
                  Lihat Semua
                </h2>
              </div>
              <div className="space-y-3 mb-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedPaymentMethod === method.id
                        ? "border-green-500 "
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <img src={method.icon} className="w-14 h-5 " />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">
                          {method.label}
                        </p>
                        <p className="text-sm text-gray-600">
                          {method.description}
                        </p>
                      </div>

                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="delivery"
                          checked={selectedPaymentMethod === method.id}
                          onChange={() => setSelectedPaymentMethod(method.id)}
                          className="sr-only"
                        />
                        <div className="w-6 h-6 rounded-full border-[3px] border-green-800 flex items-center bg-white justify-center transition-all duration-200">
                          <div
                            className={`w-3 h-3 bg-green-800 rounded-full transition-all duration-200 ${
                              selectedPaymentMethod === method.id
                                ? "block"
                                : "hidden"
                            }`}
                          ></div>
                        </div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-sm bg-[#B1E9AB] flex border-2 border-green-700 p-4 mb-6">
                <div className="basis-[10%] flex-shrink-0 flex items-center">
                  <img src="assets/payment/voucher.png" className="w-9" />
                </div>
                <div className="basis-[70%] flex items-center font-bold text-lg pl-6">
                  <span>Pakai Voucher-mu!</span>
                </div>
                <div className="basis-[20%] flex items-center justify-end">
                  <ChevronRight className="text-green-700 font-bold mt-0.5 w-10 " />
                </div>
              </div>

              <hr className="my-4 border border-green-700" />

              {/* Rincian Pembayaran */}
              <div className="bg-white py-1 ">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Rincian Pembayaran
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-md">
                    <span className="font-medium">Subtotal (1 Produk)</span>
                    <span className="font-medium">
                      Rp. {subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex space-x-2">
                      <img src="assets/payment/discount.png" />
                      <span>Diskon Produk</span>
                    </div>
                    <span className="font-medium text-green-700">
                      - Rp. {Math.abs(productDiscount).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <span className="font-medium ">Biaya Pengiriman</span>
                      <p className="text-xs mt-2">
                        Tambah Rp. 85.000 untuk mendapatkan GRATIS ONGKIR
                      </p>
                    </div>
                    <span className="font-medium">
                      Rp. {deliveryFee.toLocaleString()}
                    </span>
                  </div>
                  {selectedSlotDiscount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Diskon Pengiriman</span>
                      <span className="font-medium text-green-600">
                        -Rp. {selectedSlotDiscount.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="pt-3">
                    <p className="font-medium text-gray-900 mb-2">
                      Biaya Lainnya
                    </p>
                    <div className="flex justify-between text-sm items-start">
                      <div className="flex items-start space-x-12">
                        <span className="text-gray-600">Biaya Kemasan</span>
                        <img
                          src="assets/payment/information.png"
                          className="w-5 h-5"
                        />
                      </div>
                      <div className="flex space-x-2 items-center">
                        <p>
                          <span className="text-gray-400 line-through ">
                            Rp. 5.000
                          </span>
                        </p>
                        <span className="font-bold">
                          Rp. {reservationFee.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm items-start mt-2 mb-6">
                      <div className="flex items-start space-x-12">
                        <span className="text-gray-600">Biaya Reservasi</span>
                        <img
                          src="assets/payment/information.png"
                          className="w-5 h-5"
                        />
                      </div>
                      <div className="flex space-x-2 items-center">
                        <p>
                          <span className="text-gray-400 line-through ">
                            Rp. 5.000
                          </span>
                        </p>
                        <span className="font-bold">
                          Rp. {reservationFee.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-green-700 pt-5 flex justify-between">
                    <span className="text-lg font-bold text-gray-900 ">
                      Total Pembayaran
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      Rp. {totalPayment.toLocaleString()}
                    </span>
                  </div>
                </div>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-semibold text-lg mt-6 transition-all duration-200">
                  Bayar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
