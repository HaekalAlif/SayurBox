import { useEffect, useState } from "react";
import { getAdminOrder, updateAdminOrder } from "@/service/orders/order";
import { useParams, useNavigate } from "react-router-dom";

export const useAdminOrderDetail = () => {
  const { id: orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!orderId) return;

    setLoading(true);
    setError(null);

    getAdminOrder(orderId)
      .then((res) => {
        setOrder(res.data);
        setNewStatus(res.data?.order_status || "");
      })
      .catch((err) => {
        console.error("Error fetching order details:", err);
        setError(err.response?.data?.message || "Gagal memuat data pesanan");
      })
      .finally(() => setLoading(false));
  }, [orderId]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleChangeStatus = (status) => {
    setNewStatus(status);
  };

  const handleUpdateStatus = async () => {
    if (!orderId || !newStatus) return;

    setUpdating(true);
    try {
      await updateAdminOrder(orderId, { order_status: newStatus });

      const updatedOrder = await getAdminOrder(orderId);
      setOrder(updatedOrder.data);

      return true; 
    } catch (err) {
      console.error("Error updating order status:", err);
      setError(err.response?.data?.message || "Gagal mengubah status pesanan");
      return false;
    } finally {
      setUpdating(false);
    }
  };

  const statusOptions = [
    { value: "PENDING", label: "Menunggu Pembayaran" },
    { value: "PACKED", label: "Pesanan Dikemas" },
    { value: "SHIPPED", label: "Pesanan Dikirim" },
    { value: "DELIVERED", label: "Pesanan Diterima" },
    { value: "COMPLETED", label: "Pesanan Selesai" },
    { value: "CANCELLED", label: "Pesanan Dibatalkan" },
  ];

  return {
    order,
    loading,
    error,
    updating,
    handleBackClick,
    handleChangeStatus,
    statusOptions,
    newStatus,
    setNewStatus,
    handleUpdateStatus,
  };
};
