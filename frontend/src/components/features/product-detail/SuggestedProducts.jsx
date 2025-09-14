import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useSuggestedProducts } from "./SuggestedProducts.hooks";
import SayurboxLoading from "@/components/base/SayurBoxLoading";
import { useAuth } from "@/context/AuthContext";
import { useCartItem } from "@/components/features/cart/CartItem.hooks";
import { addCartItem } from "@/service/cart/cartItem";
import { getCart, createCart } from "@/service/cart/cart";
import { useNavigate } from "react-router-dom";

const SuggestedProducts = () => {
  const navigate = useNavigate();
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);
  const [showLeft1, setShowLeft1] = useState(false);
  const [showRight1, setShowRight1] = useState(false);
  const [showLeft2, setShowLeft2] = useState(false);
  const [showRight2, setShowRight2] = useState(false);

  // Refs to track drag state for each carousel
  const dragInfo1 = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    isDragging: false,
  });
  const dragInfo2 = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    isDragging: false,
  });

  const { user } = useAuth();
  const userId = user?.id;
  const { isProductInCart } = useCartItem(userId);

  const [cartId, setCartId] = useState(null);
  const [addingId, setAddingId] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const fetchCartId = async () => {
      if (!userId) return;
      try {
        const res = await getCart(userId);
        setCartId(res.data?.id);
      } catch {
        try {
          const newCart = await createCart(userId);
          setCartId(newCart.data?.id);
        } catch (e) {
          console.error("Failed to create or get cart:", e);
        }
      }
    };
    fetchCartId();
  }, [userId]);

  const {
    products: fruitProducts,
    loading: loading1,
    error: error1,
  } = useSuggestedProducts();
  const {
    products: relatedProducts,
    loading: loading2,
    error: error2,
  } = useSuggestedProducts();

  const checkScroll = useCallback((ref, setShowLeft, setShowRight) => {
    const el = ref.current;
    if (!el) return;
    const hasOverflow = el.scrollWidth > el.clientWidth;
    setShowLeft(el.scrollLeft > 0);
    setShowRight(
      hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 1
    );
  }, []);

  useEffect(() => {
    const checkAllScrolls = () => {
      checkScroll(scrollRef1, setShowLeft1, setShowRight1);
      checkScroll(scrollRef2, setShowLeft2, setShowRight2);
    };
    const el1 = scrollRef1.current;
    const el2 = scrollRef2.current;

    el1?.addEventListener("scroll", checkAllScrolls);
    el2?.addEventListener("scroll", checkAllScrolls);
    window.addEventListener("resize", checkAllScrolls);
    checkAllScrolls();

    return () => {
      el1?.removeEventListener("scroll", checkAllScrolls);
      el2?.removeEventListener("scroll", checkAllScrolls);
      window.removeEventListener("resize", checkAllScrolls);
    };
  }, [fruitProducts, relatedProducts, checkScroll]);

  const scrollBy = (ref, amount) =>
    ref.current?.scrollBy({ left: amount, behavior: "smooth" });

  const handleAddToCart = async (product, e) => {
    e.stopPropagation(); // Prevent card click
    e.preventDefault(); // Prevent link navigation
    if (!userId) {
      navigate("/login");
      return;
    }
    if (!cartId || !product?.id) return;
    if (isProductInCart(product.id)) {
      setToastMessage("Produk sudah ada di keranjang!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
      return;
    }
    setAddingId(product.id);
    try {
      await addCartItem(cartId, product.id, 1);
      setToastMessage("Berhasil menambahkan ke keranjang!");
      setShowToast(true);
    } catch (err) {
      setToastMessage("Gagal menambahkan ke keranjang!");
      setShowToast(true);
    } finally {
      setTimeout(() => setShowToast(false), 2500);
      setAddingId(null);
    }
  };

  // Generic Drag Handlers
  const createDragHandlers = (scrollRef, dragInfo) => ({
    onMouseDown: (e) => {
      const slider = scrollRef.current;
      if (!slider) return;
      dragInfo.current = {
        isDown: true,
        startX: e.pageX - slider.offsetLeft,
        scrollLeft: slider.scrollLeft,
        isDragging: false,
      };
      slider.style.cursor = "grabbing";
      slider.style.userSelect = "none";
    },
    onMouseLeave: () => {
      dragInfo.current.isDown = false;
      const slider = scrollRef.current;
      if (slider) {
        slider.style.cursor = "grab";
      }
    },
    onMouseUp: () => {
      dragInfo.current.isDown = false;
      const slider = scrollRef.current;
      if (slider) {
        slider.style.cursor = "grab";
        slider.style.userSelect = "auto";
      }
      // Reset isDragging after a short delay to allow click event to check it
      setTimeout(() => {
        dragInfo.current.isDragging = false;
      }, 50);
    },
    onMouseMove: (e) => {
      if (!dragInfo.current.isDown) return;
      e.preventDefault();
      const slider = scrollRef.current;
      if (!slider) return;
      const x = e.pageX - slider.offsetLeft;
      const walk = x - dragInfo.current.startX;
      if (Math.abs(walk) > 5) {
        // Threshold to confirm dragging
        dragInfo.current.isDragging = true;
      }
      slider.scrollLeft = dragInfo.current.scrollLeft - walk;
    },
  });

  const ProductCard = ({ product, dragInfo }) => {
    return (
      <a
        href={`/product/${product.slug}`}
        className="flex-shrink-0"
        onClick={(e) => {
          // If it was a drag action, prevent navigation
          if (dragInfo.current.isDragging) {
            e.preventDefault();
          }
        }}
      >
        <div className="w-56 h-76 rounded-xl shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow">
          <div className="relative w-full h-46">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover pointer-events-none"
            />
            <button
              type="button"
              className="absolute top-2 right-4 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center transition-colors hover:bg-white group shadow-md hover:shadow-lg"
              onClick={(e) => handleAddToCart(product, e)}
              disabled={addingId === product.id}
              title="Tambah ke keranjang"
            >
              {addingId === product.id ? (
                <svg
                  className="animate-spin w-8 h-8 text-white group-hover:text-green-600"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
              ) : (
                <Plus className="w-8 h-8 text-white group-hover:text-green-600 transition-colors" />
              )}
            </button>
          </div>
          <div className="p-3 pointer-events-none">
            <div className="mb-1">
              <span className="text-base font-bold text-gray-800">
                Rp {product.price.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              {product.discount && (
                <span className="text-white font-semibold text-xs bg-red-500 px-1.5 py-0.5 rounded">
                  {product.discount}
                </span>
              )}
              {product.originalPrice > 0 && (
                <span className="line-through text-gray-400 text-xs">
                  Rp {product.originalPrice.toLocaleString("id-ID")}
                </span>
              )}
            </div>
            <h4 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">
              {product.title}
            </h4>
            <p className="text-xs text-gray-500">{product.unit}</p>
          </div>
        </div>
      </a>
    );
  };

  const renderCarousel = (
    products,
    loading,
    error,
    ref,
    showLeft,
    showRight,
    scrollFn,
    dragInfo
  ) => (
    <div className="relative">
      {showLeft && (
        <button
          onClick={() => scrollFn(ref, -300)}
          className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-[#684C34] rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      )}
      {showRight && (
        <button
          onClick={() => scrollFn(ref, 300)}
          className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-[#684C34] rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition cursor-pointer"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      )}
      <div
        className="flex items-center gap-4 overflow-x-auto px-2 h-88 md:px-0 scrollbar-hide"
        ref={ref}
        style={{ cursor: "grab", scrollBehavior: "auto" }}
        {...createDragHandlers(ref, dragInfo)}
      >
        {loading ? (
          <SayurboxLoading />
        ) : error ? (
          <div className="text-center py-12 text-red-600 font-bold">
            {error}
          </div>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              dragInfo={dragInfo}
            />
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="px-4 py-8">
      {showToast && (
        <div className="fixed top-20 right-4 z-50 bg-green-600 text-white py-3 px-4 rounded-md shadow-lg flex items-center">
          <span className="mr-2">{toastMessage}</span>
        </div>
      )}
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Lainnya dari : Buah
          </h2>
          {renderCarousel(
            fruitProducts,
            loading1,
            error1,
            scrollRef1,
            showLeft1,
            showRight1,
            scrollBy,
            dragInfo1
          )}
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Yang lain beli juga!
          </h2>
          {renderCarousel(
            relatedProducts,
            loading2,
            error2,
            scrollRef2,
            showLeft2,
            showRight2,
            scrollBy,
            dragInfo2
          )}
        </div>
      </div>
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default SuggestedProducts;
