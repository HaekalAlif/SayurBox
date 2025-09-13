import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrder } from "@/service/orders/order";
import { getAddresses } from "@/service/addresses/address";
import { useAuth } from "@/context/AuthContext";

export const usePaymentSection = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // UI states
  const [selectedDeliverySlot, setSelectedDeliverySlot] = useState("slot_1");
  const [useCustomPackaging, setUseCustomPackaging] = useState(false);
  const [isGift, setIsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cod");
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [addressList, setAddressList] = useState([]);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getOrder(id)
      .then((res) => {
        setOrder(res.data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!user?.id) return;
    getAddresses()
      .then((res) => {
        setAddressList(res.data || []);
      })
      .catch(() => setAddressList([]));
  }, [user]);

  const deliverySlots = [
    {
      id: "slot_1",
      label: "Slot Dini Hari",
      timeRange: "05:00 - 08:00 WIB",
      price: 2500,
      estimatedDelivery: "Estimasi tiba pada 05:00 - 08:00 WIB",
      realPrice: 5000,
    },
    {
      id: "slot_2",
      label: "Slot Pagi Hari",
      timeRange: "09:00 - 12:00 WIB",
      price: 2500,
      estimatedDelivery: "Estimasi tiba pada 09:00 - 12:00 WIB",
      realPrice: 5000,
    },
    {
      id: "slot_3",
      label: "Slot Siang Hari",
      timeRange: "13:00 - 17:00 WIB",
      price: 2500,
      estimatedDelivery: "Estimasi tiba pada 13:00 - 17:00 WIB",
      realPrice: 5000,
    },
    {
      id: "slot_4",
      label: "Slot Malam Hari",
      timeRange: "18:00 - 22:00 WIB",
      price: 2500,
      estimatedDelivery: "Estimasi tiba pada 18:00 - 22:00 WIB",
      realPrice: 5000,
    },
  ];

  const paymentMethods = [
    {
      id: "cod",
      label: "Sayur/Tunai (Bayar di tempat)",
      description:
        "Bayar tunai & dapat mengembalikan produk yang tidak sesuai di tempat",
      icon: "/assets/payment/sayur-tunai.png",
    },
    {
      id: "bni",
      label: "BNI Virtual Account",
      description: "Bayar ke BNI Virtual Account Transferpay!",
      icon: "/assets/payment/bni.png",
    },
  ];

  // Ambil biaya pengiriman dari slot yang dipilih
  const selectedSlotObj =
    deliverySlots.find((slot) => slot.id === selectedDeliverySlot) ||
    deliverySlots[0];
  const deliveryFee = selectedSlotObj.price || 0;

  let subtotal = 0;
  let productDiscount = 0;
  let packagingFee = useCustomPackaging ? 5000 : 0;
  let reservationFee = 2500;

  let orderItems = [];

  if (order && order.items) {
    orderItems = order.items.map((item) => {
      let imageUrl = "/assets/products/produk-1.png";
      if (
        item.product &&
        Array.isArray(item.product.images) &&
        item.product.images.length > 0
      ) {
        const primary = item.product.images.find((img) => img.is_primary === 1);
        imageUrl = primary
          ? `${import.meta.env.VITE_API_BASE_URL}/storage/${primary.image_url}`
          : `${import.meta.env.VITE_API_BASE_URL}/storage/${
              item.product.images[0].image_url
            }`;
      }

      return {
        id: item.id, // order_item id
        product_id: item.product_id, // tambahkan ini!
        product: item.product, // tambahkan ini!
        productName: item.product?.name,
        image: imageUrl,
        price: Number(item.product?.original_price || item.product?.price),
        unit: item.product?.unit || "",
        discount:
          Number(item.product?.original_price || item.product?.price) -
          Number(item.product?.price),
        finalPrice: Number(item.product?.price),
        quantity: item.quantity,
      };
    });

    subtotal = order.items.reduce(
      (sum, item) => sum + Number(item.product?.price) * item.quantity,
      0
    );
    productDiscount = order.items.reduce((sum, item) => {
      const original = Number(
        item.product?.original_price || item.product?.price
      );
      return sum + (original - Number(item.product?.price)) * item.quantity;
    }, 0);
  }

  // Perhitungan total pembayaran yang benar
  const totalPayment =
    subtotal - productDiscount + deliveryFee + packagingFee + reservationFee;

  return {
    loading,
    orderItems,
    subtotal,
    productDiscount,
    packagingFee,
    reservationFee,
    deliverySlots,
    paymentMethods,
    selectedDeliverySlot,
    setSelectedDeliverySlot,
    useCustomPackaging,
    setUseCustomPackaging,
    isGift,
    setIsGift,
    giftMessage,
    setGiftMessage,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    showAddressModal,
    setShowAddressModal,
    addressList,
    selectedAddress,
    setSelectedAddress,
    totalPayment,
  };
};
