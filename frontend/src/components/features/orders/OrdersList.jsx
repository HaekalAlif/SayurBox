import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useOrderList } from "./OrderList.hooks";
import { useNavigate } from "react-router-dom";
import BaseModal from "@/components/base/BaseModal";
import SayurboxLoading from "@/components/base/SayurBoxLoading";

const OrdersList = () => {
  const {
    loading,
    selectedStatus,
    setSelectedStatus,
    searchQuery,
    setSearchQuery,
    inProcessOrders,
    lastOrders,
    cancelOrder,
  } = useOrderList();

  const navigate = useNavigate();

  // Modal state
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);

  // Function to handle order cancellation
  const handleConfirmCancel = async () => {
    if (!cancelOrderId) return;

    setIsCancelling(true);
    try {
      await cancelOrder(cancelOrderId);
      // Success, modal will close
    } catch (error) {
      console.error("Failed to cancel order:", error);
      // Error handling if needed
    } finally {
      setIsCancelling(false);
      setShowCancelModal(false);
      setCancelOrderId(null);
    }
  };

  const handleBackClick = () => {
    window.history.back();
  };

  const statusButtons = [
    { id: "semua", label: "Semua" },
    { id: "berlangsung", label: "Berlangsung" },
    { id: "berhasil", label: "Berhasil" },
    { id: "dibatalkan", label: "Dibatalkan" },
  ];

  const OrderCard = ({ order }) => (
    <div
      className={`bg-white rounded-lg p-4 mb-3 shadow-md cursor-pointer ${
        order.borderBottom ? "border-b-2 border-gray-200" : ""
      }`}
      onClick={() => navigate(`/order/${order.id}`)}
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
      {order.orderItem.actions && (
        <div className="flex space-x-3">
          {order.orderItem.actions.map((action, idx) => (
            <button
              key={idx}
              className="px-4 py-2 rounded-md font-semibold text-xs transition-colors flex-1 cursor-pointer"
              style={{
                backgroundColor: action.backgroundColor,
                color: action.textColor,
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (action.type === "cancel") {
                  setCancelOrderId(order.id);
                  setShowCancelModal(true);
                } else if (action.onClick) {
                  action.onClick();
                }
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
    <div
      className="min-h-screen w-full bg-pattern"
      style={{
        backgroundImage: `url("bg-pattern-sayurbox.png")`,
        backgroundRepeat: "repeat",
        backgroundSize: "130px",
      }}
    >
      {/* Modal Konfirmasi Batalkan - Dengan loading state */}
      <BaseModal
        open={showCancelModal}
        onClose={() => !isCancelling && setShowCancelModal(false)}
        title="Batalkan Pesanan"
        description="Apakah Anda yakin ingin membatalkan pesanan ini? Tindakan ini tidak dapat dibatalkan."
        confirmText={isCancelling ? "Memproses..." : "Batalkan"}
        cancelText="Kembali"
        onConfirm={handleConfirmCancel}
        confirmColor="bg-red-600 hover:bg-red-700"
        cancelColor="border-green-600 text-green-600 hover:bg-green-50"
        disabled={isCancelling}
      />

      {/* Back Button */}
      <div className="bg-white z-10 pl-3">
        <button
          onClick={handleBackClick}
          className="absolute top-13 left-6 cursor-pointer items-center mt-46 w-14 h-14 text-lg text-green-600 border border-green rounded-full border-green-400 hover:scale-110 transition-transform"
        >
          <ChevronLeft className="w-10 h-10 ml-1" />
        </button>
      </div>
      <div className="min-h-screen items-center flex justify-center mx-auto mb-8 pt-12 pb-12">
        {/* Main Content */}
        <div className="max-w-4xl">
          <div className="flex flex-col border-2 shadow-md rounded-xl bg-white p-6 mx-auto">
            {/* Title inside card */}
            <h1 className="text-2xl font-bold text-center mb-6">
              Daftar Pesanan
            </h1>
            <div className="flex flex-col md:flex-row">
              {/* Left Panel */}
              <div className="w-full md:w-[40%] p-4 space-y-6 border rounded-md shadow-md mb-4 md:mb-0 md:mr-4">
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
                      <img
                        src="/assets/header/search.png"
                        className="w-8"
                        alt="Search"
                      />
                    </button>
                  </div>
                </div>
                {/* Status Buttons */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Status Pesanan
                  </h3>
                  <div className="space-y-2 w-full md:w-[70%]">
                    {statusButtons.map((status) => (
                      <button
                        key={status.id}
                        onClick={() => setSelectedStatus(status.id)}
                        className={`w-full py-2 px-4 rounded-full text-sm font-medium transition-colors cursor-pointer ${
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
              <div className="w-full md:w-[60%] px-0 md:px-4 space-y-6">
                {/* SayurFresh Info Card */}
                <div
                  className="p-4 rounded-sm"
                  style={{ backgroundColor: "#CBEAE2" }}
                >
                  <div className="mb-4 rounded-sm flex">
                    <div className="flex items-center space-x-3">
                      <img src="/assets/orders/xp.png" alt="XP" />
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
                      {loading ? (
                        <SayurboxLoading />
                      ) : inProcessOrders.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          Tidak ada pesanan dalam proses.
                        </div>
                      ) : (
                        inProcessOrders.map((order) => (
                          <OrderCard key={order.id} order={order} />
                        ))
                      )}
                    </div>
                  </div>
                  {/* Last Orders */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Terakhir Dipesan
                    </h3>
                    <div>
                      {loading ? (
                        <SayurboxLoading />
                      ) : lastOrders.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          Tidak ada riwayat pesanan.
                        </div>
                      ) : (
                        lastOrders.map((order) => (
                          <OrderCard key={order.id} order={order} />
                        ))
                      )}
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
