import React, { useRef, useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useLandingProduct } from "./Product.hooks";
import SayurboxLoading from "@/components/base/SayurBoxLoading";
import { useAuth } from "@/context/AuthContext";
import { createCart, getCart } from "@/service/cart/cart";
import { addCartItem } from "@/service/cart/cartItem";

const ProductSection = () => {
  const scrollRef = useRef(null);
  const { products, loading, error, tabs, activeTab, setActiveTab } =
    useLandingProduct();

  const { user, cart, fetchCart } = useAuth();
  const userId = user?.id;

  const [cartId, setCartId] = useState(null);
  const [addingId, setAddingId] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

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
        // Jika getCart gagal (misal 404), buat cart baru
        const newCart = await createCart(userId);
        setCartId(newCart.data.id);
      }
    };
    fetchCartId();
  }, [userId]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleAddToCart = async (product) => {
    if (!cartId || !product?.id) return;

    const isProductInCart = cart?.cart_items?.some(
      (item) => item.product_id === product.id
    );

    if (isProductInCart) {
      setToastMessage("Produk sudah ada di keranjang!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
      return;
    }

    setAddingId(product.id);
    try {
      await addCartItem(cartId, product.id, 1);
      setToastMessage("Berhasil menambahkan ke keranjang!");
      if (fetchCart) {
        await fetchCart();
      }
    } catch (err) {
      console.error("Gagal menambahkan ke keranjang:", err);
      setToastMessage("Gagal menambahkan ke keranjang!");
    } finally {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
      setAddingId(null);
    }
  };

  return (
    <div className="pb-8">
      {/* Toast */}
      {showToast && (
        <div className="fixed top-20 right-4 z-50 bg-green-600 text-white py-3 px-4 rounded-md shadow-lg flex items-center">
          <span className="mr-2">{toastMessage}</span>
        </div>
      )}

      {/* Custom Scrollbar CSS */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #16a34a;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #15803d;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #16a34a #f1f5f9;
        }
      `}</style>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`text-md font-semibold rounded-full px-6 py-3 border transition-colors w-64 whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? "bg-green-600 text-white border-green-800"
                : "bg-white text-green-800 font-bold border-green-800 border-2 hover:bg-green-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="py-8 px-4 md:px-8">
        <div className="max-w-screen-lg mx-auto">
          <section className="w-full bg-white">
            <div className="relative">
              {loading ? (
                <SayurboxLoading />
              ) : error ? (
                <div className="text-center py-12 text-red-600 font-bold">
                  {error}
                </div>
              ) : (
                <div
                  ref={scrollRef}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto scroll-smooth custom-scrollbar"
                  style={{ maxHeight: "960px" }}
                >
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      adding={addingId === product.id}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, onAddToCart, adding }) => (
  <div className="cursor-pointer group">
    <div className="flex-shrink-0">
      <div className="w-56 h-full rounded-xl shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow flex flex-col">
        {/* Image Area */}
        <a
          href={`/product/${product.slug}`}
          className="relative w-full h-46 block"
        >
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
              e.target.src = "/assets/default-product.png"; 
            }}
          />

          {/* Add Icon */}
          <button
            type="button"
            className="absolute top-2 right-4 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center transition-colors hover:bg-white group shadow-md hover:shadow-lg cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToCart(product);
            }}
            disabled={adding}
            title="Tambah ke keranjang"
          >
            {adding ? (
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
        </a>

        {/* Price & Info */}
        <div className="p-3 flex flex-col flex-grow">
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

          <a href={`/product/${product.slug}`} className="mt-auto">
            <h4 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">
              {product.title}
            </h4>
            <p className="text-xs text-gray-500">{product.unit}</p>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default ProductSection;
