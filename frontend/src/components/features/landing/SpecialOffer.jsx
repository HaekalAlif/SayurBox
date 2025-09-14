import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useSpecialOffer } from "./SpecialOffer.hooks";
import SayurboxLoading from "@/components/base/SayurBoxLoading";
import { useAuth } from "@/context/AuthContext";
import { addCartItem } from "@/service/cart/cartItem";
import { createCart, getCart } from "@/service/cart/cart";
import { useCartItem } from "@/components/features/cart/CartItem.hooks";

const SpecialOffer = () => {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const rafId = useRef(null);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const clickStartTime = useRef(0);

  const { products, loading, error } = useSpecialOffer();
  const { user } = useAuth();
  const userId = user?.id;
  const [cartId, setCartId] = useState(null);
  const [addingId, setAddingId] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Ambil cart id user (sekali saja)
  useEffect(() => {
    const fetchCartId = async () => {
      if (!userId) return;
      try {
        const res = await getCart(userId);
        if (res.data && res.data.id) {
          setCartId(res.data.id);
        } else {
          // Jika belum ada cart, buat baru
          const newCart = await createCart(userId);
          setCartId(newCart.data.id);
        }
      } catch {
        // fallback: buat cart baru
        const newCart = await createCart(userId);
        setCartId(newCart.data.id);
      }
    };
    fetchCartId();
  }, [userId]);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  }, []);

  // Handle untuk smooth scrolling dengan momentum
  const handleDragStart = useCallback((clientX) => {
    clickStartTime.current = Date.now();
    setIsDragging(true);
    startX.current = clientX;
    scrollLeft.current = scrollRef.current.scrollLeft;
    lastX.current = clientX;
    lastTime.current = Date.now();
    velocity.current = 0;

    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  }, []);

  const handleDragMove = useCallback(
    (clientX) => {
      if (!isDragging) return;

      const now = Date.now();
      const dt = now - lastTime.current;
      const dx = lastX.current - clientX;

      if (dt > 0) {
        // Calculate velocity (px/ms) with smoothing
        const newVelocity = dx / dt;
        velocity.current = velocity.current * 0.7 + newVelocity * 0.3;
      }

      scrollRef.current.scrollLeft =
        scrollLeft.current + (startX.current - clientX);
      lastX.current = clientX;
      lastTime.current = now;
      checkScroll();
    },
    [isDragging, checkScroll]
  );

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;

    const dragDuration = Date.now() - clickStartTime.current;
    // If it's a short drag (like a click), don't apply momentum
    if (dragDuration < 100) {
      setIsDragging(false);
      return;
    }

    setIsDragging(false);

    // Apply momentum effect
    const startTime = Date.now();
    const initialVelocity = velocity.current * 15; // Adjust for better feel

    const momentumScroll = () => {
      const elapsed = Date.now() - startTime;
      // More natural easing curve
      const easing = Math.exp(-elapsed / 325);
      const delta = initialVelocity * easing;

      if (Math.abs(delta) > 0.5) {
        scrollRef.current.scrollLeft += delta;
        checkScroll();
        rafId.current = requestAnimationFrame(momentumScroll);
      } else {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };

    if (Math.abs(velocity.current) > 0.1) {
      rafId.current = requestAnimationFrame(momentumScroll);
    }
  }, [isDragging, checkScroll]);

  useEffect(() => {
    const el = scrollRef.current;
    checkScroll();
    el?.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  // Clean up RAF on unmount
  useEffect(() => {
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  // Add event listeners to prevent text selection during dragging
  const preventDefaultHandler = useCallback(
    (e) => {
      if (isDragging) {
        e.preventDefault();
      }
    },
    [isDragging]
  );

  useEffect(() => {
    window.addEventListener("dragstart", preventDefaultHandler);
    window.addEventListener("selectstart", preventDefaultHandler);

    return () => {
      window.removeEventListener("dragstart", preventDefaultHandler);
      window.removeEventListener("selectstart", preventDefaultHandler);
    };
  }, [preventDefaultHandler]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    setTimeout(() => {
      setShowRight(el.scrollWidth > el.clientWidth);
      setShowLeft(el.scrollLeft > 0);
    }, 100);
  }, [products]);

  const scrollBy = (amount) => {
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  const { isProductInCart } = useCartItem(userId);

  const handleAddToCart = async (product) => {
    if (!cartId || !product?.id) return;
    // Cek apakah produk sudah ada di keranjang
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
      setTimeout(() => setShowToast(false), 2500);
    } catch (err) {
      setToastMessage("Gagal menambahkan ke keranjang!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    } finally {
      setAddingId(null);
    }
  };

  return (
    <div className="px-4">
      {/* Toast */}
      {showToast && (
        <div className="fixed top-20 right-4 z-50 bg-green-600 text-white py-3 px-4 rounded-md shadow-lg flex items-center">
          <span className="mr-2">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-screen-lg mx-auto">
        <section className="w-full bg-white py-8">
          <div className="w-full max-w-screen-xl mx-auto">
            <div
              className="w-full rounded-2xl p-6 shadow-sm"
              style={{ backgroundColor: "#D4EEDF" }}
            >
              <div className="relative flex ">
                {/* Arrow Left */}
                {showLeft && (
                  <button
                    onClick={() => scrollBy(-300)}
                    className="absolute left-56 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-[#684C34] rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition cursor-pointer"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                )}
                {/* Arrow Right */}
                {showRight && (
                  <button
                    onClick={() => scrollBy(300)}
                    className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-[#684C34] rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition cursor-pointer"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                )}

                {/* Left Banner */}
                <div className="flex-shrink-0 px-2 ">
                  <div className="w-60 rounded-xl shadow-md overflow-hidden">
                    <img
                      src="assets/landing/special/special.png"
                      alt="Spesial Hari Ini"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  </div>
                </div>

                <div
                  className="flex items-center gap-6 overflow-x-auto px-2 scroll-smooth scrollbar-hide"
                  ref={scrollRef}
                  style={{
                    scrollBehavior: isDragging ? "auto" : "smooth",
                    cursor: isDragging ? "grabbing" : "grab",
                    userSelect: "none",
                    WebkitOverflowScrolling: "touch", // Enables momentum scrolling on iOS
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault(); // Prevent text selection
                    handleDragStart(e.clientX);
                  }}
                  onMouseMove={(e) => {
                    if (!isDragging) return;
                    e.preventDefault();
                    handleDragMove(e.clientX);
                  }}
                  onMouseUp={handleDragEnd}
                  onMouseLeave={handleDragEnd}
                  onTouchStart={(e) => {
                    handleDragStart(e.touches[0].clientX);
                  }}
                  onTouchMove={(e) => {
                    if (!isDragging) return;
                    e.preventDefault();
                    handleDragMove(e.touches[0].clientX);
                  }}
                  onTouchEnd={handleDragEnd}
                >
                  {/* Product Cards */}
                  {loading ? (
                    <div className="ml-82">
                      <SayurboxLoading />
                    </div>
                  ) : error ? (
                    <div className="text-center py-12 text-red-600 font-bold">
                      {error}
                    </div>
                  ) : (
                    products.map((product) => (
                      <a
                        href={`/product/${product.slug}`}
                        className="cursor-pointer"
                        key={product.id}
                        onClick={(e) => {
                          // Only allow click if we're not dragging
                          if (
                            isDragging ||
                            Date.now() - clickStartTime.current > 150
                          ) {
                            e.preventDefault();
                          }
                        }}
                      >
                        <div className="flex-shrink-0">
                          <div className="w-56 h-76 rounded-xl shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow">
                            {/* Image Area */}
                            <div className="relative w-full h-46">
                              {/* Badge Top */}
                              <div className="absolute top-2 left-2 z-10">
                                <img
                                  src={product.badgeTop}
                                  alt={product.badgeLabel}
                                  className="w-16 h-6 object-contain"
                                  onError={(e) => {
                                    e.target.style.display = "none";
                                  }}
                                />
                              </div>

                              {/* Product Image */}
                              <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                }}
                              />

                              {/* Add Icon */}
                              <button
                                type="button"
                                className="absolute top-2 right-4 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center transition-colors hover:bg-white group shadow-md hover:shadow-lg cursor-pointer"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleAddToCart(product);
                                }}
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
                                  <Plus className="w-8 h-8 text-white hover:text-green-600 transition-colors" />
                                )}
                              </button>
                            </div>

                            {/* Price & Info */}
                            <div className="p-3">
                              <div className="mb-1">
                                <span className="text-base font-bold text-gray-800">
                                  {product.currentPrice}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 mb-2">
                                {product.discount && (
                                  <span className="text-white font-semibold text-xs bg-red-500 px-1.5 py-0.5 rounded">
                                    {product.discount}
                                  </span>
                                )}
                                <span className="line-through text-gray-400 text-xs">
                                  {product.originalPrice}
                                </span>
                              </div>

                              <h4 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">
                                {product.title}
                              </h4>
                              <p className="text-xs text-gray-500">
                                {product.unit}
                              </p>
                            </div>
                          </div>
                        </div>
                      </a>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SpecialOffer;
