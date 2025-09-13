import React from "react";
import { RefreshCw, Edit2, Eye } from "lucide-react";
import { useAdminOrderList } from "./OrderList.hooks";
import SayurboxLoading from "@/components/base/SayurBoxLoading";

const OrderList = () => {
  const { orders, loading, error, fetchOrders, navigate } = useAdminOrderList();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-700">Master Data Order</h1>
        <button
          onClick={fetchOrders}
          className="flex items-center px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </button>
      </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {loading ? (
        <SayurboxLoading />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left border-b">Order ID</th>
                <th className="py-3 px-4 text-left border-b">User</th>
                <th className="py-3 px-4 text-left border-b">Total</th>
                <th className="py-3 px-4 text-left border-b">Status</th>
                <th className="py-3 px-4 text-left border-b">Created At</th>
                <th className="py-3 px-4 text-center border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-4 text-center text-gray-500">
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b font-bold">{order.id}</td>
                    <td className="py-3 px-4 border-b">
                      {order.user?.name || "-"}
                      <div className="text-xs text-gray-500">
                        {order.user?.email}
                      </div>
                    </td>
                    <td className="py-3 px-4 border-b">
                      Rp {Number(order.final_amount).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 border-b">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium
                          ${
                            order.order_status === "PENDING"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.order_status === "PACKED"
                              ? "bg-blue-100 text-blue-800"
                              : order.order_status === "SHIPPED"
                              ? "bg-purple-100 text-purple-800"
                              : order.order_status === "DELIVERED"
                              ? "bg-green-100 text-green-800"
                              : order.order_status === "COMPLETED"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-red-100 text-red-800"
                          }`}
                      >
                        {order.order_status}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b">
                      {new Date(order.created_at).toLocaleString("id-ID")}
                    </td>
                    <td className="py-3 px-4 border-b text-center">
                      <button
                        onClick={() => navigate(`/admin/order/${order.id}`)}
                        className="p-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 cursor-pointer"
                        title="Lihat Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderList;
