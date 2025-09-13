import { useEffect, useState } from "react";
import { getOrder, updateOrder } from "@/service/orders/order";
import { useParams, useNavigate } from "react-router-dom";

export const useOrderDetailSection = () => {
  const { id: orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!orderId) return;
    setLoading(true);
    getOrder(orderId)
      .then((res) => setOrder(res.data))
      .finally(() => setLoading(false));
  }, [orderId]);

  const handleBackClick = () => {
    window.history.back();
  };

  const handleTrackShipment = () => {
    // Implementasi tracking, misal redirect ke halaman tracking
    alert("Fitur tracking belum tersedia.");
  };

  const handleCancelOrder = async () => {
    if (!orderId) return;
    try {
      await updateOrder(orderId, { order_status: "CANCEL" });
      // Refresh data order
      getOrder(orderId).then((res) => setOrder(res.data));
    } catch (err) {
      alert("Gagal membatalkan pesanan!");
    }
  };

  const handlePayment = async () => {
    if (!orderId) return;
    try {
      await updateOrder(orderId, {
        payment_status: "PAID",
        order_status: "PACKED",
      });
      // Refresh data order
      getOrder(orderId).then((res) => setOrder(res.data));
    } catch (err) {
      alert("Gagal melakukan pembayaran!");
    }
  };

  const handleCopyOrderId = async () => {
    try {
      await navigator.clipboard.writeText(order?.id || "");
      alert("ID Pesanan berhasil disalin!");
    } catch (err) {
      console.error("Gagal menyalin: ", err);
    }
  };

  return {
    order,
    loading,
    handleBackClick,
    handleTrackShipment,
    handleCancelOrder,
    handlePayment,
    handleCopyOrderId,
  };
};
