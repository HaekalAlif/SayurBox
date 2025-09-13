import { useEffect, useState } from "react";
import { getOrder, updateOrder } from "../../../service/orders/order";
import { useParams, useNavigate } from "react-router-dom";

export const useAdminOrderDetail = () => {
  const { id: orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!orderId) return;
    setLoading(true);
    getOrder(orderId)
      .then((res) => {
        setOrder(res.data);
        setNewStatus(res.data?.order_status || "");
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
    try {
      await updateOrder(orderId, { order_status: newStatus });
      getOrder(orderId).then((res) => setOrder(res.data));
    } catch (err) {
      alert("Gagal mengubah status order!");
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
    handleBackClick,
    handleChangeStatus,
    statusOptions,
    newStatus,
    setNewStatus,
    handleUpdateStatus,
  };
};
