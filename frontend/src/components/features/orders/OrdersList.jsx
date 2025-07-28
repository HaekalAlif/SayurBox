import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Search, Star } from "lucide-react";

const OrdersList = () => {
  const [selectedStatus, setSelectedStatus] = useState("belum");
  const [searchQuery, setSearchQuery] = useState("");

  const handleBackClick = () => {
    window.history.back();
  };

  const statusButtons = [
    { id: "semua", label: "Semua", active: true },
    { id: "berlangsung", label: "Berlangsung", active: false },
    { id: "berhasil", label: "Berhasil", active: false },
    { id: "dibatalkan", label: "Dibatalkan", active: false },
  ];

  const inProcessOrders = [
    {
      id: 1,
      status: "Menunggu Konfirmasi Pembayaran",
      statusIcon: "payment",
      statusIconColor: "#B0EBDD",
      statusTextColor: "#1B3D35",
      countdownTimer: {
        text: "Selesaikan sebelum :",
        time: "01:59:55",
        backgroundColor: "#FF0000",
        textColor: "#FFFFFF",
      },
      orderItem: {
        image: "/assets/orders/product-image.png",
        title: "Alpukat Mentega",
        orderId: "#DH-W6FNCPMUJHUT-NR",
        total: "Rp 24.525",
        note: "Pesanan akan otomatis dibatalkan jika tidak menyelesaikan proses pembayaran sampai batas waktu yang sudah ditentukan",
        noteBackgroundColor: "#F5F5F5",
        noteTextColor: "#333333",
        actions: [
          {
            text: "Batalkan Pesanan",
            backgroundColor: "#FF0000",
            textColor: "#FFFFFF",
          },
          {
            text: "Ubah Metode Bayar",
            backgroundColor: "#1FAE2E",
            textColor: "#FFFFFF",
          },
        ],
      },
      borderBottom: true,
    },
    {
      id: 2,
      status: "Pesanan Disiapkan",
      statusIcon: "prepare",
      statusIconColor: "#B0EBDD",
      statusTextColor: "#1B3D35",
      countdownTimer: {
        text: "Estimasi jam tiba",
        time: "Besok 14:00 - 17:00",
        textColor: "#000000",
      },
      orderItem: {
        image: "/assets/orders/product-image.png",
        title: "Alpukat Mentega",
        orderId: "#DH-W6FNCPMUJHUT-NR",
        total: "Rp 24.525",
      },
      borderBottom: true,
    },
    {
      id: 3,
      status: "Pesanan Dikirimkan",
      statusIcon: "send",
      statusIconColor: "#B0EBDD",
      statusTextColor: "#1B3D35",
      countdownTimer: {
        text: "Estimasi jam tiba",
        time: "Besok 14:00 - 17:00",
        textColor: "#000000",
      },
      orderItem: {
        image: "/assets/orders/product-image.png",
        title: "Alpukat Mentega",
        orderId: "#DH-W6FNCPMUJHUT-NR",
        total: "Rp 24.525",
        actions: [
          {
            text: "Lacak Pesanan",
            backgroundColor: "#1FAE2E",
            textColor: "#FFFFFF",
          },
        ],
      },
      borderBottom: true,
    },
    {
      id: 4,
      status: "Pesanan Tiba di Alamat",
      statusIcon: "arrived",
      statusIconColor: "#B0EBDD",
      statusTextColor: "#1B3D35",
      countdownTimer: {
        text: "Tiba pada :",
        time: "Jumat, 7 April 2025 17:00 WIB",
        textColor: "#000000",
      },
      orderItem: {
        image: "/assets/orders/product-image.png",
        title: "Alpukat Mentega",
        orderId: "#DH-W6FNCPMUJHUT-NR",
        total: "Rp 24.525",
        actions: [
          {
            text: "Selesaikan Pesanan",
            backgroundColor: "#1FAE2E",
            textColor: "#FFFFFF",
          },
        ],
      },
      borderBottom: true,
    },
  ];

  const lastOrders = [
    {
      id: 5,
      status: "Pesanan Selesai",
      statusIcon: "arrived",
      statusIconColor: "#B0EBDD",
      statusTextColor: "#1B3D35",
      countdownTimer: {
        text: "Selesai pada :",
        time: "Jumat, 5 April 2025 16:30 WIB",
        textColor: "#000000",
      },
      orderItem: {
        image: "/assets/orders/product-image.png",
        title: "Alpukat Mentega",
        orderId: "#DH-W6FNCPMUJHUT-AA",
        total: "Rp 24.525",
        actions: [
          {
            text: "Beli Lagi",
            backgroundColor: "#1FAE2E",
            textColor: "#FFFFFF",
          },
        ],
      },
      borderBottom: true,
    },
    {
      id: 6,
      status: "Pesanan Dibatalkan",
      statusIcon: "cancel",
      statusIconColor: "#B0EBDD",
      statusTextColor: "#1B3D35",
      countdownTimer: {
        text: "Dibatalkan pada :",
        time: "4 April 2025",
        textColor: "#000000",
      },
      orderItem: {
        image: "/assets/orders/product-image.png",
        title: "Tomat Segar",
        orderId: "#DH-W6FNCPMUJHUT-BB",
        total: "Rp 18.000",
        actions: [
          {
            text: "Beli Lagi",
            backgroundColor: "#1FAE2E",
            textColor: "#FFFFFF",
          },
        ],
      },
      borderBottom: true,
    },
  ];

  const OrderCard = ({ order }) => (
    <div
      className={`bg-white rounded-lg p-4 mb-3 shadow-md ${
        order.borderBottom ? "border-b-2 border-gray-200" : ""
      }`}
    >
      <div className="flex">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: order.statusIconColor }}
        >
          <img
            src={`/assets/orders/${order.statusIcon}.png`}
            alt="Status Icon"
            className="w-12 h-12"
          />
        </div>
        <div className="px-4">
          <div className="items-center space-x-3">
            <h3
              className="text-sm font-semibold"
              style={{ color: order.statusTextColor }}
            >
              {order.status}
            </h3>
          </div>

          <div className="flex mt-2 w-50">
            {/* Countdown Timer */}
            {order.countdownTimer && (
              <div className=" flex items-center space-x-2">
                <p className="text-xs text-gray-600 ">
                  {order.countdownTimer.text}
                </p>
                <div
                  className="inline-block px-3 py-0.5 rounded-xl text-xs font-bold"
                  style={{
                    backgroundColor: order.countdownTimer.backgroundColor,
                    color: order.countdownTimer.textColor,
                  }}
                >
                  {order.countdownTimer.time}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="right mt-2 ml-auto">
          <ChevronRight size={32} />
        </div>
      </div>

      <hr className="my-4" />

      {/* Estimate */}
      {order.estimate && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">{order.estimate.label}</p>
          <p
            className="text-base font-semibold"
            style={{ color: order.estimate.valueColor }}
          >
            {order.estimate.value}
          </p>
        </div>
      )}

      {/* Order Item */}
      <div className="mb-4">
        <div className="flex items-start space-x-4 mb-2">
          <img
            src={order.orderItem.image}
            alt={order.orderItem.title}
            className="w-16 h-16 object-cover"
          />
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1">
              {order.orderItem.title}
            </h4>
            <p className="text-xs b-1">ID Pesanan {order.orderItem.orderId}</p>
          </div>
        </div>
        <p className="text-xs ">
          Total Belanja : <strong>{order.orderItem.total}</strong>
        </p>
      </div>

      {/* Note */}
      {order.orderItem.note && (
        <div
          className="p-3 rounded-md mb-4 text-xs"
          style={{
            backgroundColor: order.orderItem.noteBackgroundColor,
            color: order.orderItem.noteTextColor,
          }}
        >
          {order.orderItem.note}
        </div>
      )}

      {/* Actions */}
      {order.orderItem.actions && (
        <div className="flex space-x-3">
          {order.orderItem.actions.map((action) => (
            <button
              key={action.id}
              className="px-4 py-2 rounded-md font-semibold text-xs transition-colors flex-1 cursor-pointer"
              style={{
                backgroundColor: action.backgroundColor,
                color: action.textColor,
              }}
            >
              {action.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="">
      {/* Back Button */}
      <div className="bg-white z-10 pl-3">
        <button
          onClick={handleBackClick}
          className="relative top-13 left-6 cursor-pointer items-center w-14 h-14 text-lg text-green-600 border border-green rounded-full border-green-400 hover:scale-110 transition-transform"
        >
          <ChevronLeft className="w-10 h-10 ml-1" />
        </button>
      </div>
      <div className="min-h-screen items-center flex justify-center mx-auto mb-8">
        {/* Main Content */}
        <div className="max-w-4xl">
          <div className=" flex flex-col border-2 shadow-md rounded-xl bg-white p-6 mx-auto ">
            {/* Title inside card */}
            <h1 className="text-2xl font-bold text-center mb-6">
              Daftar Pesanan
            </h1>

            <div className="flex">
              {/* Left Panel */}
              <div className="w-[40%] p-4 space-y-6 border max-h-80 rounded-md shadow-md">
                {/* Search Input */}
                <div className="w-full">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Lacak pesananmu!"
                      className="w-full h-10 px-6 py-3 pr-12 border-2 focus:outline-none focus:border-green-400 transition-colors rounded-md"
                      style={{ borderColor: "#BEE4B4" }}
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full">
                      <img src="/assets/header/search.png" className="w-8" />
                    </button>
                  </div>
                </div>

                {/* Status Buttons */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Status Pesanan
                  </h3>
                  <div className="space-y-2 w-[70%]">
                    {statusButtons.map((status) => (
                      <button
                        key={status.id}
                        onClick={() => setSelectedStatus(status.id)}
                        className={`w-full py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                          selectedStatus === status.id
                            ? "bg-green-600 text-white"
                            : "border border-green-600 text-green-600 hover:bg-green-50"
                        }`}
                      >
                        {status.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Panel */}
              <div className="w-[60%] px-4 space-y-6 ">
                {/* SayurFresh Info Card */}
                <div
                  className="p-4 rounded-sm"
                  style={{ backgroundColor: "#CBEAE2" }}
                >
                  <div className="mb-4 rounded-sm flex">
                    <div className="flex items-center space-x-3">
                      <img src="/assets/orders/xp.png" alt="" />
                      <div>
                        <h3 className="font-bold">SayurPanen - Level Benih</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex bg-white rounded-md">
                    <div className="w-[90%]">
                      <span className="text-green-600 text-sm font-semibold">
                        Kumpulkan +750xp lagi untuk naik level!
                      </span>
                      <div className="mt-4 w-full bg-gray-300 rounded-full h-1">
                        <div
                          className="h-1 rounded-full bg-green-800 transition-all duration-300"
                          style={{ width: "30%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-[10%]">
                      <ChevronRight size={32} className="ml-3" />
                    </div>
                  </div>
                </div>

                <div
                  className="p-4 rounded-sm"
                  style={{ backgroundColor: "#F5FFCE" }}
                >
                  {/* In Process Orders */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Dalam Proses</h3>
                    <div>
                      {inProcessOrders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                      ))}
                    </div>
                  </div>

                  {/* Last Orders */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Terakhir Dipesan
                    </h3>
                    <div>
                      {lastOrders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersList;
