import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronUp,
  CreditCard,
  BookOpen,
  Truck,
  Home,
  Check,
  XCircle,
  X,
} from "lucide-react";
import { useAdminOrderDetail } from "./OrderDetail.hooks";
import SayurboxLoading from "@/components/base/SayurBoxLoading";

const statusSteps = [
  { label: "PENDING", icon: CreditCard },
  { label: "PACKED", icon: BookOpen },
  { label: "SHIPPED", icon: Truck },
  { label: "DELIVERED", icon: Home },
  { label: "COMPLETED", icon: Check },
];

const getStepStatus = (orderStatus) => {
  if (orderStatus === "CANCELLED") return "CANCELLED";
  const idx = statusSteps.findIndex((s) => s.label === orderStatus);
  return idx === -1 ? 0 : idx;
};

const SERVICE_FEE = 7500;

const OrderDetail = () => {
  const {
    order,
    loading,
    error,
    statusOptions,
    newStatus,
    setNewStatus,
    handleUpdateStatus,
    handleBackClick,
  } = useAdminOrderDetail();

  const [updating, setUpdating] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ ...toast, show: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message, type = "success") => {
    setToast({
      show: true,
      message,
      type,
    });
  };

  if (loading || !order) {
    return <SayurboxLoading />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md">
          <h2 className="text-lg font-semibold mb-2">Error</h2>
          <p>{error}</p>
          <button
            onClick={handleBackClick}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const stepStatus = getStepStatus(order.order_status);

  const subtotal = Number(order.total_amount) || 0;
  const shippingFee = Number(order.shipping_fee) || 0;
  const serviceFee = SERVICE_FEE;
  const totalTagihan = subtotal + shippingFee + serviceFee;

  const priceSummary = [
    {
      label: "Subtotal",
      amount: `Rp${subtotal.toLocaleString()}`,
    },
    {
      label: "Biaya Pengiriman",
      amount: `Rp${shippingFee.toLocaleString()}`,
    },
    {
      label: "Biaya Layanan",
      amount: `Rp${serviceFee.toLocaleString()}`,
    },
    {
      label: "Total Tagihan",
      amount: `Rp${totalTagihan.toLocaleString()}`,
      bold: true,
    },
  ];

  const items = order.items || [];

  const StatusDropdown = () => (
    <div className="relative w-64">
      <select
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 bg-white shadow font-semibold cursor-pointer
          ${
            newStatus === "CANCELLED"
              ? "border-red-400 focus:ring-red-500 text-red-700"
              : "border-green-300 focus:ring-green-500 text-green-700"
          }
        `}
        style={{ appearance: "none" }}
        disabled={updating}
      >
        {statusOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <span
        className={`absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none
          ${newStatus === "CANCELLED" ? "text-red-600" : "text-green-600"}`}
      >
        <ChevronUp size={20} />
      </span>
    </div>
  );

  const onUpdateStatus = async () => {
    if (updating) return;

    setUpdating(true);
    try {
      const success = await handleUpdateStatus();
      if (success) {
        showToast("Status pesanan berhasil diperbarui", "success");
      } else {
        showToast("Gagal memperbarui status pesanan", "error");
      }
    } catch (err) {
      console.error("Error in update handler:", err);
      showToast("Terjadi kesalahan saat memperbarui status", "error");
    } finally {
      setUpdating(false);
    }
  };

  const ProgressStepper = () => (
    <div className="mb-8 px-20">
      <div className="flex items-center">
        {statusSteps.map((step, index) => {
          if (order.order_status === "CANCELLED") {
            return (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index === 0
                        ? "bg-red-600 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {index === 0 ? (
                      <XCircle size={20} />
                    ) : (
                      <step.icon size={20} />
                    )}
                  </div>
                </div>
                {index < statusSteps.length - 1 && (
                  <div className="flex-1 h-1 bg-gray-300"></div>
                )}
              </React.Fragment>
            );
          }
          return (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index <= stepStatus
                      ? "bg-green-600 text-white shadow-lg"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  <step.icon size={20} />
                </div>
              </div>
              {index < statusSteps.length - 1 && (
                <div className="flex-1 h-1 bg-gray-300"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg flex items-center justify-between ${
            toast.type === "error" ? "bg-red-600" : "bg-green-600"
          } text-white`}
        >
          <span>{toast.message}</span>
          <button
            onClick={() => setToast({ ...toast, show: false })}
            className="ml-4 text-white hover:text-gray-200 focus:outline-none"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Back Button */}
      <div className="bg-white z-10 pl-3">
        <button
          onClick={handleBackClick}
          className="relative top-13 left-6 cursor-pointer items-center w-14 h-14 text-lg text-green-600 border border-green rounded-full border-green-400 hover:scale-110 transition-transform shadow"
        >
          <ChevronLeft className="w-10 h-10 ml-1" />
        </button>
      </div>
      <div className="max-w-4xl mx-auto mb-12">
        <div className="font-bold text-center text-3xl text-green-800 mb-8 tracking-tight">
          Detail Order (Admin)
        </div>
        <div className="px-10 bg-white rounded-2xl border shadow-xl relative overflow-hidden pb-10">
          <div className="px-4 space-y-6 relative z-10">
            {/* Status Section */}
            <div className="bg-white rounded-b-2xl shadow-sm py-6 px-10 relative z-10">
              <p
                className={`text-lg font-semibold mb-2 ${
                  order.order_status === "CANCELLED"
                    ? "text-red-700"
                    : "text-green-700"
                }`}
              >
                {order.order_status === "CANCELLED"
                  ? "Pesanan Dibatalkan"
                  : order.order_status === "PENDING"
                  ? "Menunggu Pembayaran"
                  : order.order_status === "PACKED"
                  ? "Pesanan Dikemas"
                  : order.order_status === "SHIPPED"
                  ? "Pesanan Dikirim"
                  : order.order_status === "DELIVERED"
                  ? "Pesanan Diterima"
                  : order.order_status === "COMPLETED"
                  ? "Pesanan Selesai"
                  : order.order_status}
              </p>
              <p
                className={`text-md mb-6 ${
                  order.order_status === "CANCELLED"
                    ? "text-red-700"
                    : "text-gray-700"
                }`}
              >
                Estimasi jam tiba:{" "}
                <span className="font-bold">{order.delivery_slot || "-"}</span>
              </p>
              <ProgressStepper />
              <hr className="my-4 border-gray-200 border-2" />
              {/* Status Change (Admin) */}
              <div className="flex items-center space-x-4 mt-6">
                <label
                  className={`font-semibold ${
                    newStatus === "CANCELLED"
                      ? "text-red-700"
                      : "text-green-700"
                  }`}
                >
                  Ubah Status:
                </label>
                <StatusDropdown />
                <button
                  onClick={onUpdateStatus}
                  disabled={updating}
                  className={`px-5 py-2 rounded-lg font-semibold shadow transition-all cursor-pointer flex items-center justify-center ${
                    newStatus === "CANCELLED"
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-green-600 text-white hover:bg-green-700"
                  } ${updating ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  {updating ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 01-8 8z"
                        />
                      </svg>
                      Updating...
                    </span>
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </div>
            {/* Order Details */}
            <div className="bg-white rounded-xl px-6 py-6 shadow">
              <h3 className="text-lg font-semibold mb-4 text-green-700">
                Rincian Pesanan
              </h3>
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 mb-4">
                  <img
                    src={
                      item.product?.images?.[0]
                        ? `${import.meta.env.VITE_API_BASE_URL}/storage/${
                            item.product.images[0].image_url
                          }`
                        : "/assets/orders/product-image.png"
                    }
                    alt={item.product?.name}
                    className="w-20 h-20 object-cover rounded-lg shadow"
                    onError={(e) => {
                      e.target.src = "/assets/orders/product-image.png";
                    }}
                  />
                  <div>
                    <p className="text-md font-bold text-gray-800">
                      {item.product?.name}
                    </p>
                    <p className="text-md mt-2 text-gray-600">
                      {item.product?.name} {item.quantity} {item.product?.unit}
                    </p>
                  </div>
                  <div className="font-bold text-xl ml-auto text-green-700">
                    x{item.quantity}
                  </div>
                </div>
              ))}
            </div>
            {/* Total Shopping */}
            <div className="bg-white rounded-xl px-6 py-6 shadow">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg mb-3 text-green-700">
                  Total : <strong>Rp. {totalTagihan.toLocaleString()}</strong>
                </h3>
                <ChevronUp size={24} className="text-green-700" />
              </div>
              <div className="space-y-3">
                {priceSummary.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className={`text-md ${item.bold ? "font-bold" : ""}`}>
                      {item.label}
                    </span>
                    <span className={`text-md ${item.bold ? "font-bold" : ""}`}>
                      {item.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
