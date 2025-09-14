import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CreditCard,
  BookOpen,
  Truck,
  Home,
  Check,
  Copy,
} from "lucide-react";
import { useOrderDetailSection } from "./OrderDetailSection.hooks";
import { useAuth } from "@/context/AuthContext";
import { getAddresses } from "@/service/addresses/address";
import SayurboxLoading from "@/components/base/SayurBoxLoading";
import BaseModal from "@/components/base/BaseModal";

const statusSteps = [
  { label: "PENDING", icon: CreditCard },
  { label: "PACKED", icon: BookOpen },
  { label: "SHIPPED", icon: Truck },
  { label: "DELIVERED", icon: Home },
  { label: "COMPLETED", icon: Check },
];

const getStepStatus = (orderStatus) => {
  if (orderStatus === "CANCEL" || orderStatus === "CANCELLED") return "CANCEL";
  const idx = statusSteps.findIndex((s) => s.label === orderStatus);
  return idx === -1 ? 0 : idx;
};

const SERVICE_FEE = 7500;

const OrderDetailSection = () => {
  const {
    order,
    loading,
    handleBackClick,
    handleCancelOrder,
    handlePayment,
    handleCopyOrderId,
  } = useOrderDetailSection();
  const { user } = useAuth();

  // Toast state
  const [toast, setToast] = useState({
    show: false,
    message: "",
    error: false,
  });

  // Tracking modal state
  const [showTrackingModal, setShowTrackingModal] = useState(false);

  // Cancel modal state
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  // Address state
  const [addressList, setAddressList] = useState([]);
  const [selectedAddressIdx, setSelectedAddressIdx] = useState(0);

  useEffect(() => {
    if (!user?.id) return;
    getAddresses()
      .then((res) => {
        setAddressList(res.data || []);
      })
      .catch(() => setAddressList([]));
  }, [user]);

  // Pilih alamat default dari order/addressList
  let address = null;
  if (Array.isArray(order?.address) && order.address.length > 0) {
    address = order.address.find((a) => a.is_default === 1) || order.address[0];
  } else if (order?.address && typeof order.address === "object") {
    address = order.address;
  } else if (addressList.length > 0) {
    address = addressList.find((a) => a.is_default === 1) || addressList[0];
  } else if (
    user?.address &&
    Array.isArray(user.address) &&
    user.address.length > 0
  ) {
    address = user.address.find((a) => a.is_default === 1) || user.address[0];
  } else if (user?.address && typeof user.address === "object") {
    address = user.address;
  } else {
    address = {
      recipient_name: user?.name || "-",
      phone: user?.phone || "-",
      full_address: user?.address || "-",
      notes: "-",
      address_label: "",
    };
  }

  // Toast handler
  const showToast = (message, error = false) => {
    setToast({ show: true, message, error });
    setTimeout(
      () => setToast({ show: false, message: "", error: false }),
      2000
    );
  };

  // Override handleTrackShipment to use modal
  const handleTrackShipmentToast = () => {
    setShowTrackingModal(true);
  };

  // Handle cancel order with confirmation
  const handleCancelWithConfirmation = () => {
    setShowCancelModal(true);
  };

  // Confirm cancel order
  const handleConfirmCancel = async () => {
    setIsCancelling(true);
    try {
      await handleCancelOrder();
      showToast("Pesanan berhasil dibatalkan", false);
    } catch (error) {
      showToast("Gagal membatalkan pesanan", true);
    } finally {
      setIsCancelling(false);
      setShowCancelModal(false);
    }
  };

  if (loading || !order) {
    return <SayurboxLoading />;
  }

  const stepStatus = getStepStatus(order.order_status);

  // FE calculation for total
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

  const totalDisplay = `Rp. ${totalTagihan.toLocaleString()}`;

  const orderDetails = [
    { label: "Id Pesanan", value: order.id },
    {
      label: "Metode Pembayaran",
      value: order.payment_method || "BNI Virtual Account",
    },
    {
      label: "Tanggal Transaksi",
      value: new Date(order.created_at).toLocaleString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ];

  const items = order.items || [];
  const showActionButtons = order.order_status === "PENDING";

  // Stepper warna merah jika CANCEL/CANCELLED, UI lain tetap
  const ProgressStepper = () => (
    <div className="mb-8 px-20">
      <div className="flex items-center">
        {statusSteps.map((step, index) => {
          if (
            order.order_status === "CANCEL" ||
            order.order_status === "CANCELLED"
          ) {
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
                      <CreditCard size={20} />
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
                      ? "bg-green-600 text-white"
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
    <div
      className="min-h-screen w-full bg-pattern"
      style={{
        backgroundImage: `url("/bg-pattern-sayurbox.png")`,
        backgroundRepeat: "repeat",
        backgroundSize: "130px",
      }}
    >
      {/* Modal Konfirmasi Batalkan Pesanan */}
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

      {/* Tracking Modal */}
      {showTrackingModal && (
        <div
          className="fixed inset-0 z-50 flex bg-gray-100/70  items-center justify-center p-4 "
          onClick={() => setShowTrackingModal(false)}
        >
          <div
            className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-bold">
                  {order.order_status === "CANCELLED" ||
                  order.order_status === "CANCEL"
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
                </h3>
                <p className="text-gray-600 mb-6">
                  Estimasi jam tiba:{" "}
                  <span className="font-medium">
                    {order.delivery_slot || "Besok 14.00 - 17.00"}
                  </span>
                </p>

                {/* Horizontal Progress Bar - seperti di gambar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between relative">
                    {/* Line connecting icons */}
                    <div
                      className="absolute h-1 bg-green-600 left-0 right-0 top-1/2 transform -translate-y-1/2 z-0"
                      style={{
                        width:
                          order.order_status === "CANCELLED" ||
                          order.order_status === "CANCEL"
                            ? "0%"
                            : order.order_status === "PENDING"
                            ? "0%"
                            : order.order_status === "PACKED"
                            ? "25%"
                            : order.order_status === "SHIPPED"
                            ? "50%"
                            : order.order_status === "DELIVERED"
                            ? "75%"
                            : order.order_status === "COMPLETED"
                            ? "100%"
                            : "0%",
                      }}
                    ></div>
                    <div className="absolute h-1 bg-gray-200 left-0 right-0 top-1/2 transform -translate-y-1/2 z-0"></div>

                    {/* Icons */}
                    <div
                      className={`z-10 flex flex-col items-center justify-center ${
                        ["CANCELLED", "CANCEL"].includes(order.order_status)
                          ? "text-red-600"
                          : [
                              "PACKED",
                              "SHIPPED",
                              "DELIVERED",
                              "COMPLETED",
                            ].includes(order.order_status)
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          ["CANCELLED", "CANCEL"].includes(order.order_status)
                            ? "bg-red-600 text-white"
                            : [
                                "PACKED",
                                "SHIPPED",
                                "DELIVERED",
                                "COMPLETED",
                              ].includes(order.order_status)
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        <CreditCard className="w-6 h-6" />
                      </div>
                    </div>

                    <div
                      className={`z-10 flex flex-col items-center justify-center ${
                        [
                          "PACKED",
                          "SHIPPED",
                          "DELIVERED",
                          "COMPLETED",
                        ].includes(order.order_status)
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          [
                            "PACKED",
                            "SHIPPED",
                            "DELIVERED",
                            "COMPLETED",
                          ].includes(order.order_status)
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        <BookOpen className="w-6 h-6" />
                      </div>
                    </div>

                    <div
                      className={`z-10 flex flex-col items-center justify-center ${
                        ["SHIPPED", "DELIVERED", "COMPLETED"].includes(
                          order.order_status
                        )
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          ["SHIPPED", "DELIVERED", "COMPLETED"].includes(
                            order.order_status
                          )
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        <Truck className="w-6 h-6" />
                      </div>
                    </div>

                    <div
                      className={`z-10 flex flex-col items-center justify-center ${
                        ["DELIVERED", "COMPLETED"].includes(order.order_status)
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          ["DELIVERED", "COMPLETED"].includes(
                            order.order_status
                          )
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        <Home className="w-6 h-6" />
                      </div>
                    </div>

                    <div
                      className={`z-10 flex flex-col items-center justify-center ${
                        ["COMPLETED"].includes(order.order_status)
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          ["COMPLETED"].includes(order.order_status)
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        <Check className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-t border-gray-200 my-6" />
              </div>

              {/* Timeline Detail - Dibawah horizontal progress */}
              <div className="space-y-6">
                {order.order_status === "COMPLETED" && (
                  <div className="flex">
                    <div className="mr-4">
                      <div className="w-4 h-4 rounded-full bg-green-600 mt-1.5"></div>
                    </div>
                    <div className="flex-1">
                      <div className="justify-between mb-1">
                        <div className="text-gray-500 text-sm">
                          Jumat, 7 April 2025 - 15:23 WIB
                        </div>
                        <h3 className="font-semibold">
                          Pesanan Telah Selesai! Selamat Menikmati
                        </h3>
                      </div>
                    </div>
                  </div>
                )}

                {["DELIVERED", "COMPLETED"].includes(order.order_status) && (
                  <div className="flex">
                    <div className="mr-4">
                      <div className="w-4 h-4 rounded-full bg-green-600 mt-1.5"></div>
                    </div>
                    <div className="flex-1">
                      <div className="justify-between mb-1">
                        <div className="text-gray-500 text-sm">
                          Jumat, 7 April 2025 - 15:20 WIB
                        </div>
                        <h3 className="font-semibold">
                          Pesanan Tiba di Alamat Tujuan
                        </h3>
                      </div>
                    </div>
                  </div>
                )}

                {["DELIVERED", "COMPLETED"].includes(order.order_status) && (
                  <div className="flex">
                    <div className="mr-4">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          ["DELIVERED", "COMPLETED"].includes(
                            order.order_status
                          )
                            ? "bg-green-600"
                            : "bg-gray-300"
                        } mt-1.5`}
                      ></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h3
                          className={`font-semibold ${
                            ["DELIVERED", "COMPLETED"].includes(
                              order.order_status
                            )
                              ? "text-black"
                              : "text-gray-500"
                          }`}
                        >
                          <div className="text-gray-500 text-sm">
                            Jumat, 7 April 2025 - 13:30 WIB
                          </div>
                          Kurir Sedang Mengantarkan Pesanan
                        </h3>
                      </div>
                    </div>
                  </div>
                )}

                {["SHIPPED", "DELIVERED", "COMPLETED"].includes(
                  order.order_status
                ) && (
                  <div className="flex">
                    <div className="mr-4">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          ["SHIPPED", "DELIVERED", "COMPLETED"].includes(
                            order.order_status
                          )
                            ? "bg-green-600"
                            : "bg-gray-300"
                        } mt-1.5`}
                      ></div>
                    </div>
                    <div className="flex-1">
                      <div className="justify-between mb-1">
                        <div className="text-gray-500 text-sm">
                          Jumat, 7 April 2025 - 13:00 WIB
                        </div>
                        <h3
                          className={`font-semibold ${
                            ["SHIPPED", "DELIVERED", "COMPLETED"].includes(
                              order.order_status
                            )
                              ? "text-black"
                              : "text-gray-500"
                          }`}
                        >
                          Menunggu Pesanan Diambil Kurir
                        </h3>
                      </div>
                    </div>
                  </div>
                )}

                {["PACKED", "SHIPPED", "DELIVERED", "COMPLETED"].includes(
                  order.order_status
                ) && (
                  <div className="flex">
                    <div className="mr-4">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          [
                            "PACKED",
                            "SHIPPED",
                            "DELIVERED",
                            "COMPLETED",
                          ].includes(order.order_status)
                            ? "bg-green-600"
                            : "bg-gray-300"
                        } mt-1.5`}
                      ></div>
                    </div>
                    <div className="flex-1">
                      <div className="justify-between mb-1">
                        <div className="text-gray-500 text-sm">
                          Kamis, 6 April 2025 - 10:17 WIB
                        </div>
                        <h3
                          className={`font-semibold ${
                            [
                              "PACKED",
                              "SHIPPED",
                              "DELIVERED",
                              "COMPLETED",
                            ].includes(order.order_status)
                              ? "text-black-700"
                              : "text-gray-500"
                          }`}
                        >
                          Pesanan Sedang Disiapkan
                        </h3>
                      </div>
                    </div>
                  </div>
                )}

                {["CANCELLED"].includes(order.order_status) && (
                  <div className="flex">
                    <div className="mr-4">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          ["CANCELLED"].includes(order.order_status)
                            ? "bg-red-600"
                            : "bg-gray-300"
                        } mt-1.5`}
                      ></div>
                    </div>
                    <div className="flex-1">
                      <div className="justify-between mb-1">
                        <div className="text-gray-500 text-sm">
                          Kamis, 6 April 2025 - 10:17 WIB
                        </div>
                        <h3
                          className={`font-semibold ${
                            ["CANCELLED"].includes(order.order_status)
                              ? "text-black"
                              : "text-gray-500"
                          }`}
                        >
                          Pesanan Dibatalkan
                        </h3>
                      </div>
                    </div>
                  </div>
                )}

                {order.order_status !== "CANCELLED" && (
                  <div className="flex">
                    <div className="mr-4">
                      <div
                        className={`w-4 h-4 rounded-full mt-1.5 ${
                          order.order_status === "PENDING"
                            ? "bg-yellow-500"
                            : "bg-green-600"
                        }`}
                      ></div>
                    </div>
                    <div className="flex-1">
                      <div className="justify-between mb-1">
                        <div className="text-gray-500 text-sm">
                          Kamis, 6 April 2025 - 10:17 WIB
                        </div>
                        <h3 className="font-semibold">
                          {order.order_status === "PENDING"
                            ? "Menunggu Pembayaran"
                            : "Pembayaran Berhasil"}
                        </h3>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="absolute top-0 mt-50 z-10 pl-3">
        <button
          onClick={handleBackClick}
          className="relative top-13 left-6 cursor-pointer items-center w-14 h-14 text-lg text-green-600 border border-green rounded-full border-green-400 hover:scale-110 transition-transform bg-white"
        >
          <ChevronLeft className="w-10 h-10 ml-1" />
        </button>
      </div>
      {/* Main Content */}
      <div className="max-w-4xl mx-auto pt-12 mb-12">
        {/* Header Section */}
        <div className="font-bold text-center text-3xl text-black mb-8 rounded-t-xl py-4">
          Detail Pesanan
        </div>
        <div className="px-32 bg-[#F5FFCE] rounded-2xl border shadow-lg relative overflow-hidden pb-10">
          <div className="absolute w-400 h-300 bg-[#049624] rounded-full -top-110 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"></div>
          <div className="px-4 space-y-4 relative z-10">
            {/* Status Section */}
            <div className="bg-white rounded-b-2xl shadow-sm py-4 px-10 relative z-10">
              <p className="text-md font-medium mb-2">
                {order.order_status === "CANCEL" ||
                order.order_status === "CANCELLED"
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
              <p className="text-md mb-6">
                Estimasi jam tiba:{" "}
                <span className="font-bold">{order.delivery_slot || "-"}</span>
              </p>
              <ProgressStepper />
              <hr className="my-4 border-gray-200 border-2" />
              <button
                onClick={handleTrackShipmentToast}
                className="flex items-center justify-center space-x-2 w-full py-2 text-green-700 rounded-full hover:text-green-500 cursor-pointer transition-colors font-semibold"
              >
                <span>Lacak Pengiriman</span>
                <ChevronRight size={18} className="mt-1" />
              </button>
            </div>
            {/* Order Details */}
            <div className="bg-white rounded-xl px-6 py-4">
              <h3 className="text-md font-semibold mb-3">Rincian Pesanan</h3>
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 mb-2">
                  <img
                    src={
                      item.product?.images?.[0]
                        ? `${import.meta.env.VITE_API_BASE_URL}/storage/${
                            item.product.images[0].image_url
                          }`
                        : "/assets/orders/product-image.png"
                    }
                    alt={item.product?.name}
                    className="w-20 h-20 object-cover"
                  />
                  <div>
                    <p className="text-md font-bold">{item.product?.name}</p>
                    <p className="text-md mt-2">
                      {item.product?.name} {item.quantity} {item.product?.unit}
                    </p>
                  </div>
                  <div className="font-bold text-xl ml-auto">
                    x{item.quantity}
                  </div>
                </div>
              ))}
              {items[0] && (
                <h3 className="font-medium">
                  Harga :{" "}
                  <span className="line-through">
                    Rp.{" "}
                    {Number(
                      items[0].product?.original_price ||
                        items[0].product?.price
                    ).toLocaleString()}
                  </span>{" "}
                  <strong>
                    Rp.{Number(items[0].product?.price).toLocaleString()}
                  </strong>
                </h3>
              )}
            </div>
            {/* Shipping Address */}
            <div className="bg-white rounded-xl py-4 px-6">
              <h3 className="font-medium mb-3">Alamat Pengiriman</h3>
              <p className="flex gap-x-4 mb-2 items-center">
                <span className="font-semibold">{address.recipient_name}</span>
                <span>{address.phone}</span>
                {address.address_label && (
                  <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-bold">
                    {address.address_label}
                  </span>
                )}
              </p>
              <p className="text-xs mb-2">{address.full_address}</p>
              <p className="text-xs mb-2">
                Catatan: {address.notes || address.note || "-"}
              </p>
            </div>
            {/* Total Shopping */}
            <div className="bg-white rounded-xl px-6 py-4">
              <div className="flex justify-between">
                <h3 className="font-semibold text-md mb-3">
                  Total : <strong>{totalDisplay}</strong>
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
            <div
              className={`
                bg-gradient-to-b 
                ${
                  order.order_status === "CANCELLED" ||
                  order.order_status === "CANCEL"
                    ? "from-white via-white/0 to-[#F559594D] from-0% via-40% to-100%"
                    : "from-white via-white/0 to-[#B1E9AB4D] from-0% via-40% to-100%"
                } 
                rounded-xl p-3 overflow-hidden relative
              `}
            >
              <div
                className="absolute z-0 w-[1000px] h-[800px] rounded-full left-1/2 top-140 transform -translate-x-1/2 -translate-y-1/2 skew-x-10"
                style={{
                  backgroundColor:
                    order.order_status === "CANCELLED" ||
                    order.order_status === "CANCEL"
                      ? "#F55959"
                      : "#B1E9AB",
                }}
              ></div>
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
                        alt="Stars"
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
                  <img src="/assets/order-detail/conffeti.png" alt="Confetti" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {showActionButtons && (
              <div className="flex justify-between space-x-4 mt-12">
                <button
                  onClick={handleCancelWithConfirmation}
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
            )}
          </div>
        </div>
      </div>
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-20 right-4 z-50 px-4 py-3 rounded-md shadow-lg ${
            toast.error ? "bg-red-600" : "bg-green-600"
          } text-white`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default OrderDetailSection;
