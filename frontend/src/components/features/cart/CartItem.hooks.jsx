import { useState, useEffect, useRef } from "react";
import { getCart } from "@/service/cart/cart";
import { useNavigate } from "react-router-dom";
import { updateCartItem, deleteCartItem } from "@/service/cart/cartItem";
import { checkoutCart } from "@/service/orders/order";

export const useCartItem = (userId) => {
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState("today");
  const [selectAll, setSelectAll] = useState(false);
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
      date: "6 April 2025",
      label: "Hari Ini",
      description: "Semua barang tersedia",
      time: "s/d pukul 12.00",
    },
    {
      id: "tomorrow",
      label: "Besok",
      date: "7 April 2025",
      description: "Semua barang tersedia",
      time: "s/d pukul 18.00",
    },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
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
              if (primary) {
                imageUrl = `/storage/${primary.image_url}`;
              } else {
                imageUrl = `/storage/${item.product.images[0].image_url}`;
              }
            }
            return {
              id: item.id,
              productId: item.product_id,
              title: item.product?.name || "",
              variant: item.product?.unit || "",
              price: `Rp. ${Number(item.product?.price).toLocaleString(
                "id-ID"
              )}`,
              originalPrice: item.product?.original_price
                ? `Rp. ${Number(item.product.original_price).toLocaleString(
                    "id-ID"
                  )}`
                : "",
              discount: item.product?.discount_percent
                ? `${item.product.discount_percent}%`
                : "",
              quantity: item.quantity,
              minQuantity: 1,
              maxQuantity: item.product?.stock ?? 10,
              isSelected: true,
              image: imageUrl,
              subtotal: Number(item.subtotal),
            };
          });
          setProducts(mappedProducts);
          setSelectAll(true); // default: semua terpilih
        } else {
          setProducts([]);
          setSelectAll(false);
        }
      } catch (err) {
        setProducts([]);
        setSelectAll(false);
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchCart();
  }, [userId]);

  // Select All handler
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setProducts((prev) =>
      prev.map((product) => ({
        ...product,
        isSelected: newSelectAll,
      }))
    );
  };

  // Single product select handler
  const handleProductSelect = (productId) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, isSelected: !product.isSelected }
          : product
      )
    );
  };

  // Sync selectAll state if all/none selected
  useEffect(() => {
    if (products.length === 0) {
      setSelectAll(false);
    } else {
      const allSelected = products.every((p) => p.isSelected);
      setSelectAll(allSelected);
    }
  }, [products]);

  const handleQuantityChange = async (productId, newQuantity) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    try {
      await updateCartItem(productId, newQuantity);
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, quantity: newQuantity } : p
        )
      );
    } catch (err) {}
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteCartItem(productId);
      setProducts((prev) => prev.filter((product) => product.id !== productId));
    } catch (err) {}
  };

  const handleQuantityDecrease = (product) => {
    if (product.quantity > product.minQuantity) {
      handleQuantityChange(product.id, product.quantity - 1);
    }
  };

  const handleQuantityIncrease = (product) => {
    if (product.quantity < product.maxQuantity) {
      handleQuantityChange(product.id, product.quantity + 1);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  // Produk yang di-checklist saja
  const selectedProducts = products.filter((product) => product.isSelected);
  const totalItems = selectedProducts.length;
  const totalPrice = selectedProducts.reduce((sum, p) => sum + p.subtotal, 0);

  // Carousel logic
  const carouselRef = useRef(null);
  const [scrollValue, setScrollValue] = useState(0.25);

  const handleScroll = () => {
    const container = carouselRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    const scrollPercentage = scrollLeft / (scrollWidth - clientWidth);
    setScrollValue(0.25 + scrollPercentage * 0.75);
  };

  useEffect(() => {
    handleScroll();
  }, []);

  // Untuk validasi penambahan barang ke keranjang (di fitur lain)
  const isProductInCart = (productId) => {
    return products.some((product) => product.productId === productId);
  };

  // Checkout hanya produk yang di-checklist
  const handleCheckout = async () => {
    if (selectedProducts.length === 0) return;
    setCheckoutLoading(true);
    try {
      // Kirim hanya id produk yang di-checklist
      const productIds = selectedProducts.map((p) => p.id);
      const res = await checkoutCart({
        delivery_slot: selectedDeliveryTime,
        cart_item_ids: productIds,
      });
      const orderId = res.data?.order?.id;
      if (orderId) {
        navigate(`/checkout/${orderId}`);
      } else {
        setToast({ show: true, message: "Gagal membuat order!", error: true });
      }
    } catch (err) {
      setToast({ show: true, message: "Checkout gagal!", error: true });
    } finally {
      setCheckoutLoading(false);
      setTimeout(
        () => setToast({ show: false, message: "", error: false }),
        2000
      );
    }
  };

  return {
    selectedDeliveryTime,
    setSelectedDeliveryTime,
    selectAll,
    setSelectAll,
    products,
    setProducts,
    deliveryOptions,
    handleSelectAll,
    handleProductSelect,
    handleQuantityChange,
    handleDeleteProduct,
    handleQuantityDecrease,
    handleQuantityIncrease,
    handleBackClick,
    selectedProducts,
    totalItems,
    carouselRef,
    scrollValue,
    handleScroll,
    handleCheckout,
    loading,
    isProductInCart,
    totalPrice,
    checkoutLoading,
    toast,
  };
};
