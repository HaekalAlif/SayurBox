import { useEffect, useState } from "react";
import { getAllOrders, updateOrder } from "@/service/orders/order";
import { useNavigate } from "react-router-dom";

export const useAdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusModal, setStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const navigate = useNavigate();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await getAllOrders();
      setOrders(res.data || []);
      setError(null);
    } catch (err) {
      setError("Gagal memuat data order.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleChangeStatusClick = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.order_status);
    setStatusModal(true);
  };

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrder) return;
    try {
      await updateOrder(selectedOrder.id, { order_status: newStatus });
      setStatusModal(false);
      setSelectedOrder(null);
      fetchOrders();
    } catch (err) {
      setError("Gagal mengubah status order.");
    }
  };

  const handleCloseModal = () => {
    setStatusModal(false);
    setSelectedOrder(null);
  };

  // Progress step status list
  const statusOptions = [
    { value: "PENDING", label: "Menunggu Pembayaran" },
    { value: "PACKED", label: "Pesanan Dikemas" },
    { value: "SHIPPED", label: "Pesanan Dikirim" },
    { value: "DELIVERED", label: "Pesanan Diterima" },
    { value: "COMPLETED", label: "Pesanan Selesai" },
    { value: "CANCELED", label: "Pesanan Dibatalkan" },
  ];

  return {
    orders,
    loading,
    error,
    statusModal,
    selectedOrder,
    newStatus,
    statusOptions,
    handleChangeStatusClick,
    handleStatusChange,
    handleUpdateStatus,
    handleCloseModal,
    fetchOrders,
    navigate,
  };
};
