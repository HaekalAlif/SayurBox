import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useSuggestedProducts } from "./SuggestedProducts.hooks";
import SayurboxLoading from "@/components/base/SayurBoxLoading";
import { useAuth } from "@/context/AuthContext";
import { useCartItem } from "@/components/features/cart/CartItem.hooks";
import { addCartItem } from "@/service/cart/cartItem";
import { getCart, createCart } from "@/service/cart/cart";

const SuggestedProducts = () => {
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);
  const [showLeft1, setShowLeft1] = useState(false);
  const [showRight1, setShowRight1] = useState(false);
  const [showLeft2, setShowLeft2] = useState(false);
  const [showRight2, setShowRight2] = useState(false);

  const { user } = useAuth();
  const userId = user?.id;
  const { isProductInCart } = useCartItem(userId);

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
          const newCart = await createCart(userId);
          setCartId(newCart.data.id);
        }
      } catch {
        const newCart = await createCart(userId);
        setCartId(newCart.data.id);
      }
    };
    fetchCartId();
  }, [userId]);

  // Ambil produk dari hooks (API, random 10)
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

  // Scroll logic section 1
  const checkScroll1 = () => {
    const el = scrollRef1.current;
    if (!el) return;
    setShowLeft1(el.scrollLeft > 0);
    setShowRight1(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  // Scroll logic section 2
  const checkScroll2 = () => {
    const el = scrollRef2.current;
    if (!el) return;
    setShowLeft2(el.scrollLeft > 0);
    setShowRight2(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    const el1 = scrollRef1.current;
    const el2 = scrollRef2.current;

    checkScroll1();
    checkScroll2();

    el1?.addEventListener("scroll", checkScroll1);
    el2?.addEventListener("scroll", checkScroll2);
    window.addEventListener("resize", checkScroll1);
    window.addEventListener("resize", checkScroll2);

    return () => {
      el1?.removeEventListener("scroll", checkScroll1);
      el2?.removeEventListener("scroll", checkScroll2);
      window.removeEventListener("resize", checkScroll1);
      window.removeEventListener("resize", checkScroll2);
    };
  }, []);

  const scrollBy1 = (amount) => {
    scrollRef1.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  const scrollBy2 = (amount) => {
    scrollRef2.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  // Handle tambah ke cart
  const handleAddToCart = async (product) => {
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
      setTimeout(() => setShowToast(false), 2500);
    } catch (err) {
      setToastMessage("Gagal menambahkan ke keranjang!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    } finally {
      setAddingId(null);
    }
  };

  const ProductCard = ({ product }) => (
    <a
      href={`/product/${product.slug}`}
      className="cursor-pointer"
      key={product.id}
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
                e.target.nextSibling.style.display = "flex";
              }}
            />
            {/* Fallback Image */}
            <div className="w-full h-full bg-green-50 flex items-center justify-center hidden">
              <span className="text-6xl">🥑</span>
            </div>

            {/* Add Icon */}
            <button
              type="button"
              className="absolute top-2 right-4 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center transition-colors hover:bg-white group shadow-md hover:shadow-lg cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
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
                <Plus className="w-8 h-8 text-white group-hover:text-green-600 transition-colors" />
              )}
            </button>
          </div>

          {/* Price & Info */}
          <div className="p-3">
            <div className="mb-1">
              <span className="text-base font-bold text-gray-800">
                {product.price}
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
            <p className="text-xs text-gray-500">{product.unit}</p>
          </div>
        </div>
      </div>
    </a>
  );

  return (
    <div className="px-4 py-8">
      {/* Toast */}
      {showToast && (
        <div className="fixed top-20 right-4 z-50 bg-green-600 text-white py-3 px-4 rounded-md shadow-lg flex items-center">
          <span className="mr-2">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Section 1: Lainnya dari : Buah */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 ">
            Lainnya dari : Buah
          </h2>

          <div className="relative">
            {/* Arrow Left */}
            {showLeft1 && (
              <button
                onClick={() => scrollBy1(-300)}
                className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-[#684C34] rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
            )}

            {/* Arrow Right */}
            {showRight1 && (
              <button
                onClick={() => scrollBy1(300)}
                className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-[#684C34] rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            )}

            <div
              className="flex items-center gap-4 overflow-x-auto px-2 h-88 md:px-0 scroll-smooth scrollbar-hide"
              ref={scrollRef1}
            >
              {loading1 ? (
                <SayurboxLoading />
              ) : error1 ? (
                <div className="text-center py-12 text-red-600 font-bold">
                  {error1}
                </div>
              ) : (
                fruitProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Yang lain beli juga! */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 ">
            Yang lain beli juga!
          </h2>

          <div className="relative">
            {/* Arrow Left*/}
            {showLeft2 && (
              <button
                onClick={() => scrollBy2(-300)}
                className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-[#684C34] rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
            )}

            {/* Arrow Right*/}
            {showRight2 && (
              <button
                onClick={() => scrollBy2(300)}
                className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-[#684C34] rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            )}

            <div
              className="flex items-center gap-4 overflow-x-auto h-88 px-2 md:px-0 scroll-smooth scrollbar-hide"
              ref={scrollRef2}
            >
              {loading2 ? (
                <SayurboxLoading />
              ) : error2 ? (
                <div className="text-center py-12 text-red-600 font-bold">
                  {error2}
                </div>
              ) : (
                relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS untuk hide scrollbar */}
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
