import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  ChevronUp,
  ChevronDown,
  X,
} from "lucide-react";
import { useProductDetail } from "./Product.hooks";
import SayurboxLoading from "../../base/SayurBoxLoading";
import { useAuth } from "@/context/AuthContext";
import { getCart, createCart } from "@/service/cart/cart";
import { addCartItem } from "@/service/cart/cartItem";
import { useCartItem } from "@/components/features/cart/CartItem.hooks";

const Product = () => {
  const {
    product,
    loading,
    error,
    selectedImageIndex,
    selectedVariant,
    quantity,
    showFullDescription,
    variants,
    handleBackClick,
    handleThumbnailClick,
    handleVariantSelect,
    handleQuantityChange,
    toggleDescription,
    handleChatSayurbox,
  } = useProductDetail();

  const { user } = useAuth();
  const userId = user?.id;
  const { isProductInCart } = useCartItem(userId);

  const [cartId, setCartId] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);
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

  // Handle tambah ke cart
  const handleAddToCart = async () => {
    if (!cartId || !product?.id) return;
    if (isProductInCart(product.id)) {
      setToastMessage("Produk sudah ada di keranjang!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
      return;
    }
    setAddingToCart(true);
    try {
      await addCartItem(cartId, product.id, quantity);
      setToastMessage("Berhasil menambahkan ke keranjang!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    } catch (err) {
      setToastMessage("Gagal menambahkan ke keranjang!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return <SayurboxLoading />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-lg mx-auto">
          <h2 className="text-lg font-semibold mb-2">Error</h2>
          <p>{error}</p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const images = {
    main: product.images.main,
    thumbnails: product.images.thumbnails || [],
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-4 z-50 bg-green-600 text-white py-3 px-4 rounded-md shadow-lg flex items-center">
          <span className="mr-2">{toastMessage}</span>
          <button
            onClick={() => setShowToast(false)}
            className="text-white hover:text-green-200"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Header with Back Button */}
      <div className="top-0 bg-white z-10 pl-4">
        <button
          onClick={handleBackClick}
          className="relative top-16 left-6 cursor-pointer items-center w-14 h-14 text-lg text-green-600 border border-green rounded-full border-green-400 hover:scale-110 transition-transform"
        >
          <ChevronLeft className="w-10 h-10 ml-1" />
        </button>
      </div>

      {/* Main Content */}
      <div className="px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Images */}
            <div className="space-y-4">
              <div className="relative group w-full max-h-[500px]">
                <img
                  src={
                    selectedImageIndex === 0
                      ? images.main
                      : images.thumbnails[selectedImageIndex - 1]
                  }
                  alt={product.title}
                  className="w-full h-auto object-cover"
                  style={{ maxHeight: "500px" }}
                  onError={(e) => {
                    e.target.src = "/assets/default-product.png";
                  }}
                />
                {images.thumbnails.length > 0 && (
                  <button
                    onClick={() =>
                      handleThumbnailClick(
                        selectedImageIndex === 0
                          ? images.thumbnails.length
                          : selectedImageIndex - 1
                      )
                    }
                    className="absolute top-1/2 left-4 transform hover:bg-gray-100 rounded-full cursor-pointer -translate-y-1/2 text-green-900 hidden group-hover:flex"
                  >
                    <ChevronLeft className="w-10 h-10" />
                  </button>
                )}
                {images.thumbnails.length > 0 && (
                  <button
                    onClick={() =>
                      handleThumbnailClick(
                        selectedImageIndex === images.thumbnails.length
                          ? 0
                          : selectedImageIndex + 1
                      )
                    }
                    className="absolute top-1/2 right-4 transform hover:bg-gray-100 rounded-full cursor-pointer -translate-y-1/2 text-green-900 hidden group-hover:flex"
                  >
                    <ChevronRight className="w-10 h-10" />
                  </button>
                )}
              </div>
              {(images.thumbnails.length > 0 || true) && (
                <div className="flex space-x-3">
                  <div
                    onClick={() => handleThumbnailClick(0)}
                    className={`cursor-pointer border overflow-hidden ${
                      selectedImageIndex === 0
                        ? "border-green-600 border-2"
                        : "border-gray-300"
                    }`}
                  >
                    <img
                      src={images.main}
                      alt="Main"
                      className="w-44 h-44 object-cover"
                      onError={(e) => {
                        e.target.src = "/assets/default-product.png";
                      }}
                    />
                  </div>
                  {images.thumbnails.map((thumb, index) => (
                    <div
                      key={index}
                      onClick={() => handleThumbnailClick(index + 1)}
                      className={`cursor-pointer border overflow-hidden ${
                        selectedImageIndex === index + 1
                          ? "border-green-600 border-2"
                          : "border-gray-300"
                      }`}
                    >
                      <img
                        src={thumb}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-44 h-44 object-cover"
                        onError={(e) => {
                          e.target.src = "/assets/default-product.png";
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-7 max-w-lg">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.title}
                </h1>
                <p className="text-gray-900 text-md">{product.subtitle}</p>
              </div>
              <div className="space-y-1">
                <span className="text-2xl font-bold text-gray-900">
                  {product.currentPrice}
                </span>
                {product.discount && (
                  <div className="flex items-center space-x-3 pt-3">
                    <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                      {product.discount}
                    </span>
                    <span className="text-gray-400 line-through text-md">
                      {product.originalPrice}
                    </span>
                  </div>
                )}
              </div>
              <div className="text-md text-gray-600 py-2">
                <span className="font-semibold text-gray-800">Kategori: </span>
                {product.category.map((cat, index) => (
                  <span key={index} className="font-bold text-gray-800">
                    {cat}
                    {index < product.category.length - 1 && ", "}
                  </span>
                ))}
              </div>
              <div>
                <p className="text-md font-semibold text-gray-900 mb-3">
                  Pilih Varian :
                </p>
                <div className="flex space-x-3">
                  {variants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => handleVariantSelect(variant)}
                      className={`px-4 py-2 rounded-lg border font-medium transition-colors ${
                        selectedVariant === variant
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-white text-gray-900 border-gray-300 hover:border-green-600"
                      }`}
                    >
                      {variant}
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-md py-2">
                <span className="font-semibold text-gray-800">
                  Tersedia untuk:{" "}
                </span>
                <span className="font-bold text-gray-900">
                  {product.availability}
                </span>
                <span className="ml-4 font-semibold text-gray-800">Stok: </span>
                <span className="font-bold text-green-700">
                  {product.stock}
                </span>
              </div>
              <div className="flex items-center text-md font-semibold text-gray-900 space-x-3 py-2">
                <span>Pilih Jumlah :</span>
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  disabled={quantity <= 1}
                  className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span className="text-green-600 font-bold">−</span>
                </button>
                <span className="min-w-[1.5rem] text-center text-base font-semibold text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  disabled={quantity >= product.stock}
                  className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span className="text-green-600 font-bold text-lg">+</span>
                </button>
                <span className="text-xs text-gray-500">
                  Maks: {product.stock}
                </span>
              </div>
              <div className="space-y-3">
                {/* Tombol Masukkan Keranjang */}
                <button
                  onClick={handleAddToCart}
                  className="w-full max-w-[280px] bg-white py-3 px-4 rounded-lg font-bold flex items-center justify-start gap-3 border border-green-600 hover:bg-green-50 transition-colors cursor-pointer"
                  disabled={addingToCart}
                >
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    {addingToCart ? (
                      <svg
                        className="animate-spin w-6 h-6 text-white"
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
                      <Plus className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <span className="text-green-600">Masukkan Keranjang</span>
                </button>
                {/* Tombol Chat Sayurbox */}
                <button
                  onClick={handleChatSayurbox}
                  className="w-full max-w-[280px] bg-white text-green-600 py-3 px-4 rounded-lg font-bold border border-green-600 flex items-center justify-start gap-3 hover:bg-green-50 transition-colors cursor-pointer"
                >
                  <img
                    src="/assets/products/whatsapp.png"
                    alt="WhatsApp"
                    className="w-10 h-10"
                    onError={(e) => {
                      e.target.src = "/assets/whatsapp-icon.png";
                    }}
                  />
                  <span>Chat Sayurbox</span>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-12 bg-white">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Informasi Produk
            </h3>
            <div className="text-gray-700 text-md leading-relaxed">
              {showFullDescription || product.description.length <= 200 ? (
                <p>{product.description}</p>
              ) : (
                <p>{product.description.substring(0, 200)}...</p>
              )}
            </div>
            {product.description.length > 200 && (
              <button
                onClick={toggleDescription}
                className="flex items-center space-x-1 text-green-600 font-medium mt-3 hover:text-green-700 transition-colors"
              >
                <span>{showFullDescription ? "View Less" : "View More"}</span>
                {showFullDescription ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
