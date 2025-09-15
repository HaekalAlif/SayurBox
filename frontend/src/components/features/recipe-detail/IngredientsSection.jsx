import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { getProducts, getImageUrl } from "@/service/products/product";
import { useAuth } from "@/context/AuthContext";
import { createCart, getCart } from "@/service/cart/cart";
import { addCartItem } from "@/service/cart/cartItem";
import { useCartItem } from "@/components/features/cart/CartItem.hooks";
import SayurboxLoading from "@/components/base/SayurBoxLoading";

const IngredientsSection = () => {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const userId = user?.id;
  const [cartId, setCartId] = useState(null);
  const [addingId, setAddingId] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts();
        const formattedProducts = response.data.map((product) => {
          let imageUrl = "/assets/default-product.png";
          if (Array.isArray(product.images) && product.images.length > 0) {
            const primary = product.images.find((img) => img.is_primary);
            imageUrl = getImageUrl(
              primary ? primary.image_url : product.images[0].image_url
            );
          }
          return {
            id: product.id,
            slug: product.slug,
            title: product.name,
            image: imageUrl,
            unit: product.unit,
            price: `Rp. ${Number(product.price).toLocaleString("id-ID")}`,
            originalPrice: `Rp. ${Number(product.original_price).toLocaleString(
              "id-ID"
            )}`,
            discount: product.discount_percent
              ? `${product.discount_percent}%`
              : null,
          };
        });
        setProducts(formattedProducts.slice(0, 6)); 
        setError(null);
      } catch (err) {
        setError("Gagal mengambil data produk");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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

  const { isProductInCart } = useCartItem(userId);

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
    } catch (err) {
      setToastMessage("Gagal menambahkan ke keranjang!");
      setShowToast(true);
    } finally {
      setAddingId(null);
      setTimeout(() => setShowToast(false), 2500);
    }
  };

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    checkScroll();
    el?.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll, products]);

  const scrollBy = (amount) => {
    scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  const ProductCard = ({ product }) => (
    <div className="flex-shrink-0">
      <div className="w-56 h-full rounded-xl shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow max-w-2xl">
        <div className="relative w-full h-46">
          <a href={`/product/${product.slug}`}>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </a>
          <button
            className="absolute top-2 right-4 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center transition-colors hover:bg-white group shadow-md hover:shadow-lg cursor-pointer"
            onClick={() => handleAddToCart(product)}
            disabled={addingId === product.id}
          >
            {addingId === product.id ? (
              <svg
                className="animate-spin w-8 h-8 text-white"
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
          <a href={`/product/${product.slug}`}>
            <h4 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2 hover:underline">
              {product.title}
            </h4>
          </a>
          <p className="text-xs text-gray-500">{product.unit}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white">
      {/* Toast Notifikasi */}
      {showToast && (
        <div className="fixed top-20 right-4 z-50 bg-green-600 text-white py-3 px-4 rounded-md shadow-lg">
          {toastMessage}
        </div>
      )}

      <div>
        <div className="mb-4">
          <div className="relative">
            <div className="mb-4">
              <button className="bg-green-100 text-sm text-left text-green-900 px-4 py-2 font-semibold rounded">
                Beli Bahannya di Sini :
              </button>
            </div>
            {showLeft && (
              <button
                onClick={() => scrollBy(-300)}
                className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-[#684C34] rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
            )}
            {showRight && (
              <button
                onClick={() => scrollBy(300)}
                className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-[#684C34] rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            )}
            <div
              className="flex items-center gap-4 overflow-x-auto px-2 h-88 md:px-0 scroll-smooth scrollbar-hide"
              ref={scrollRef}
            >
              {loading ? (
                <div className="w-full flex justify-center items-center h-72">
                  <SayurboxLoading />
                </div>
              ) : error ? (
                <div className="w-full text-center py-12 text-red-600 font-bold">
                  {error}
                </div>
              ) : (
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </div>
          </div>
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

export default IngredientsSection;
