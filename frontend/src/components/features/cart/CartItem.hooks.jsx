import { useState, useEffect, useRef, useCallback } from "react";
import { getCart, createCart } from "@/service/cart/cart";
import { useNavigate } from "react-router-dom";
import { updateCartItem, deleteCartItem } from "@/service/cart/cartItem";
import { checkoutCart } from "@/service/orders/order";

export const useCartItem = (userId) => {
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState("today");
  const [selectAll, setSelectAll] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    error: false,
  });

  const deliveryOptions = [
    {
      id: "today",
      date: "14 September 2025",
      label: "Hari Ini",
      description: "Semua barang tersedia",
      time: "s/d pukul 12.00",
    },
    {
      id: "tomorrow",
      label: "Besok",
      date: "15 September 2025",
      description: "Semua barang tersedia",
      time: "s/d pukul 18.00",
    },
  ];

  const navigate = useNavigate();

  const fetchCart = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await getCart(userId);
      const cart = response.data;
      if (cart && cart.items) {
        const mappedProducts = cart.items.map((item) => {
          let imageUrl = "";
          if (
            Array.isArray(item.product?.images) &&
            item.product.images.length > 0
          ) {
            const primary = item.product.images.find(
              (img) => img.is_primary === 1
            );
            imageUrl = primary
              ? primary.image_url
              : item.product.images[0].image_url;
          }
          return {
            id: item.id,
            productId: item.product_id,
            title: item.product?.name || "Produk tidak ditemukan",
            variant: item.product?.unit || "",
            price: Number(item.product?.price) || 0,
            originalPrice: Number(item.product?.original_price) || 0,
            discount: item.product?.discount_percent || 0,
            quantity: item.quantity,
            minQuantity: 1,
            maxQuantity: item.product?.stock ?? 1,
            isSelected: true,
            image: imageUrl,
          };
        });
        setProducts(mappedProducts);
        setSelectAll(true);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      if (err.response?.status === 404) {
        // Jika cart tidak ditemukan, coba buat baru
        try {
          await createCart(userId);
          setProducts([]);
        } catch (createErr) {
          console.error("Failed to create new cart:", createErr);
        }
      } else {
        setProducts([]);
      }
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setProducts((prev) =>
      prev.map((p) => ({ ...p, isSelected: newSelectAll }))
    );
  };

  const handleProductSelect = (productId) => {
    const newProducts = products.map((p) =>
      p.id === productId ? { ...p, isSelected: !p.isSelected } : p
    );
    setProducts(newProducts);
    setSelectAll(newProducts.every((p) => p.isSelected));
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    const product = products.find((p) => p.id === productId);
    if (
      !product ||
      newQuantity < product.minQuantity ||
      newQuantity > product.maxQuantity
    )
      return;

    const originalQuantity = product.quantity;
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, quantity: newQuantity } : p
      )
    );

    try {
      await updateCartItem(productId, newQuantity);
    } catch (err) {
      console.error("Failed to update quantity:", err);
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, quantity: originalQuantity } : p
        )
      );
      setToast({ show: true, message: "Gagal mengubah jumlah", error: true });
      setTimeout(
        () => setToast({ show: false, message: "", error: false }),
        2000
      );
    }
  };

  const handleDeleteProduct = async (productId) => {
    const originalProducts = [...products];
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    try {
      await deleteCartItem(productId);
    } catch (err) {
      console.error("Failed to delete item:", err);
      setProducts(originalProducts);
      setToast({ show: true, message: "Gagal menghapus item", error: true });
      setTimeout(
        () => setToast({ show: false, message: "", error: false }),
        2000
      );
    }
  };

  const handleBackClick = () => navigate(-1);

  const selectedProducts = products.filter((p) => p.isSelected);
  const totalItems = selectedProducts.reduce((sum, p) => sum + p.quantity, 0);
  const totalPrice = selectedProducts.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  const carouselRef = useRef(null);
  const [scrollValue, setScrollValue] = useState(0.25);

  const handleScroll = () => {
    const container = carouselRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    if (scrollWidth <= clientWidth) {
      setScrollValue(1);
      return;
    }
    const scrollPercentage = scrollLeft / (scrollWidth - clientWidth);
    setScrollValue(0.25 + scrollPercentage * 0.75);
  };

  const handleCheckout = async () => {
    if (selectedProducts.length === 0) return;
    setCheckoutLoading(true);
    try {
      const cartItemIds = selectedProducts.map((p) => p.id);
      const res = await checkoutCart({
        delivery_slot: selectedDeliveryTime,
        cart_item_ids: cartItemIds,
      });
      const orderId = res.data?.order?.id;
      if (orderId) {
        navigate(`/checkout/${orderId}`);
      } else {
        throw new Error("Order ID not found in response");
      }
    } catch (err) {
      console.error("Checkout failed:", err);
      setToast({ show: true, message: "Checkout gagal!", error: true });
      setTimeout(
        () => setToast({ show: false, message: "", error: false }),
        2000
      );
    } finally {
      setCheckoutLoading(false);
    }
  };

  return {
    selectedDeliveryTime,
    setSelectedDeliveryTime,
    selectAll,
    products,
    deliveryOptions,
    handleSelectAll,
    handleProductSelect,
    handleQuantityChange,
    handleDeleteProduct,
    handleBackClick,
    totalItems,
    carouselRef,
    scrollValue,
    handleScroll,
    handleCheckout,
    loading,
    totalPrice,
    checkoutLoading,
    toast,
  };
};
