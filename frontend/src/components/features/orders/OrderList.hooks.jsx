import { useEffect, useState } from "react";
import { getOrders, updateOrder } from "@/service/orders/order";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useOrderList = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) return;
    setLoading(true);
    getOrders()
      .then((res) => setOrders(res.data || []))
      .finally(() => setLoading(false));
  }, [user]);

  // Batalkan pesanan
  const handleCancelOrder = async (orderId) => {
    try {
      await updateOrder(orderId, { order_status: "CANCELLED" });
      // Refresh orders
      getOrders().then((res) => setOrders(res.data || []));
    } catch (err) {
      // Optional: handle error
    }
  };

  // Ubah metode pembayaran
  const handleChangePayment = (orderId) => {
    navigate(`/checkout/${orderId}`);
  };

  // Filter orders by status
  const filterOrders = (orders) => {
    if (selectedStatus === "semua") return orders;
    if (selectedStatus === "berlangsung")
      return orders.filter(
        (o) =>
          o.order_status === "PENDING" ||
          o.order_status === "PACKED" ||
          o.order_status === "SHIPPED" ||
          o.order_status === "DELIVERED"
      );
    if (selectedStatus === "berhasil")
      return orders.filter((o) => o.order_status === "COMPLETED");
    if (selectedStatus === "dibatalkan")
      return orders.filter((o) => o.order_status === "CANCELLED");
    return orders;
  };

  // Search filter
  const searchedOrders = filterOrders(orders).filter(
    (o) =>
      o.id.toString().includes(searchQuery) ||
      (o.items &&
        o.items.some((item) =>
          item.product?.name?.toLowerCase().includes(searchQuery.toLowerCase())
        ))
  );

  // Map API order to UI orderCard props
  const mapOrderToCard = (order) => {
    let status = "";
    let statusIcon = "payment";
    let statusIconColor = "#B0EBDD";
    let statusTextColor = "#1B3D35";
    let countdownTimer = null;
    let actions = [];

    switch (order.order_status) {
      case "PENDING":
        status = "Menunggu Konfirmasi Pembayaran";
        statusIcon = "payment";
        countdownTimer = {
          text: "Selesaikan sebelum :",
          time: "01:59:55",
          backgroundColor: "#FF0000",
          textColor: "#FFFFFF",
        };
        actions = [
          {
            text: "Batalkan Pesanan",
            backgroundColor: "#FF0000",
            textColor: "#FFFFFF",
            onClick: () => handleCancelOrder(order.id),
          },
          {
            text: "Ubah Metode Bayar",
            backgroundColor: "#1FAE2E",
            textColor: "#FFFFFF",
            onClick: () => handleChangePayment(order.id),
          },
        ];
        break;
      case "PACKED":
        status = "Pesanan Disiapkan";
        statusIcon = "prepare";
        countdownTimer = {
          text: "Estimasi jam tiba",
          time: order.delivery_slot || "-",
          textColor: "#000000",
        };
        break;
      case "SHIPPED":
        status = "Pesanan Dikirimkan";
        statusIcon = "send";
        countdownTimer = {
          text: "Estimasi jam tiba",
          time: order.delivery_slot || "-",
          textColor: "#000000",
        };
        actions = [
          {
            text: "Lacak Pesanan",
            backgroundColor: "#1FAE2E",
            textColor: "#FFFFFF",
            onClick: () => {}, // Implementasi tracking jika ada
          },
        ];
        break;
      case "DELIVERED":
        status = "Pesanan Tiba di Alamat";
        statusIcon = "arrived";
        countdownTimer = {
          text: "Tiba pada :",
          time: order.delivered_at
            ? new Date(order.delivered_at).toLocaleString("id-ID")
            : "-",
          textColor: "#000000",
        };
        actions = [
          {
            text: "Selesaikan Pesanan",
            backgroundColor: "#1FAE2E",
            textColor: "#FFFFFF",
            onClick: () => {}, // Implementasi jika ada
          },
        ];
        break;
      case "COMPLETED":
        status = "Pesanan Selesai";
        statusIcon = "arrived";
        countdownTimer = {
          text: "Selesai pada :",
          time: order.completed_at
            ? new Date(order.completed_at).toLocaleString("id-ID")
            : "-",
          textColor: "#000000",
        };
        actions = [
          {
            text: "Beli Lagi",
            backgroundColor: "#1FAE2E",
            textColor: "#FFFFFF",
            onClick: () => {}, // Implementasi jika ada
          },
        ];
        break;
      case "CANCELLED":
        status = "Pesanan Dibatalkan";
        statusIcon = "cancel";
        countdownTimer = {
          text: "Dibatalkan pada :",
          time: order.canceled_at
            ? new Date(order.canceled_at).toLocaleString("id-ID")
            : "-",
          textColor: "#000000",
        };
        actions = [
          {
            text: "Beli Lagi",
            backgroundColor: "#1FAE2E",
            textColor: "#FFFFFF",
            onClick: () => {}, // Implementasi jika ada
          },
        ];
        break;
      default:
        status = order.order_status;
        break;
    }

    const firstItem = order.items?.[0] || {};
    return {
      id: order.id,
      status,
      statusIcon,
      statusIconColor,
      statusTextColor,
      countdownTimer,
      orderItem: {
        image: firstItem.product?.images?.[0]
          ? `${import.meta.env.VITE_API_BASE_URL}/storage/${
              firstItem.product.images[0].image_url
            }`
          : "/assets/orders/product-image.png",
        title: firstItem.product?.name || "-",
        orderId: order.id,
        total: `Rp ${Number(order.final_amount).toLocaleString()}`,
        note:
          order.order_status === "PENDING"
            ? "Pesanan akan otomatis dibatalkan jika tidak menyelesaikan proses pembayaran sampai batas waktu yang sudah ditentukan"
            : undefined,
        noteBackgroundColor: "#F5F5F5",
        noteTextColor: "#333333",
        actions,
      },
      borderBottom: true,
      estimate:
        order.order_status === "PACKED" || order.order_status === "SHIPPED"
          ? {
              label: "Estimasi jam tiba",
              value: order.delivery_slot || "-",
              valueColor: "#000000",
            }
          : undefined,
    };
  };

  const inProcessOrders = searchedOrders
    .filter(
      (order) =>
        order.order_status === "PENDING" ||
        order.order_status === "PACKED" ||
        order.order_status === "SHIPPED" ||
        order.order_status === "DELIVERED"
    )
    .map(mapOrderToCard);

  const lastOrders = searchedOrders
    .filter(
      (order) =>
        order.order_status === "COMPLETED" || order.order_status === "CANCELLED"
    )
    .map(mapOrderToCard);

  return {
    loading,
    selectedStatus,
    setSelectedStatus,
    searchQuery,
    setSearchQuery,
    inProcessOrders,
    lastOrders,
  };
};
