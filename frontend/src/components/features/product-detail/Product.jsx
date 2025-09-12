import React from "react";
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

const Product = () => {
  const {
    product,
    loading,
    error,
    selectedImageIndex,
    selectedVariant,
    quantity,
    showFullDescription,
    showToast,
    toastMessage,
    variants,
    handleBackClick,
    handleThumbnailClick,
    handleVariantSelect,
    handleQuantityChange,
    toggleDescription,
    handleAddToCart,
    handleChatSayurbox,
    setShowToast,
  } = useProductDetail();

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

  // Konstruksi array thumbnails jika ada lebih dari satu gambar
  // Untuk saat ini hanya ada satu gambar, tapi implementasi ini memungkinkan pengembangan
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
              {/* Main Image with Hoverable Chevrons */}
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

                {/* Chevron Left (Previous) - Only show if there are thumbnails */}
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

                {/* Chevron Right (Next) - Only show if there are thumbnails */}
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

              {/* Thumbnail Images - Only show if there are thumbnails */}
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
              {/* Product Title & Subtitle */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.title}
                </h1>
                <p className="text-gray-900 text-md">{product.subtitle}</p>
              </div>

              {/* Price Section */}
              <div className="space-y-1">
                {/* Current Price */}
                <span className="text-2xl font-bold text-gray-900">
                  {product.currentPrice}
                </span>

                {/* Discount + Original Price in one line below */}
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

              {/* Category */}
              <div className="text-md text-gray-600 py-2">
                <span className="font-semibold text-gray-800">Kategori: </span>
                {product.category.map((cat, index) => (
                  <span key={index} className="font-bold text-gray-800">
                    {cat}
                    {index < product.category.length - 1 && ", "}
                  </span>
                ))}
              </div>

              {/* Variant Selection */}
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

              {/* Availability */}
              <div className="text-md py-2">
                <span className="font-semibold text-gray-800">
                  Tersedia untuk:{" "}
                </span>
                <span className="font-bold text-gray-900">
                  {product.availability}
                </span>
              </div>

              {/* Quantity Section */}
              <div className="flex items-center text-md font-semibold text-gray-900 space-x-3 py-2">
                <span>Pilih Jumlah :</span>

                {/* Minus Button */}
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  disabled={quantity <= 1}
                  className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-green-600 font-bold">−</span>
                </button>

                {/* Quantity */}
                <span className="min-w-[1.5rem] text-center text-base font-semibold text-gray-900">
                  {quantity}
                </span>

                {/* Plus Button */}
                <button
                  onClick={() => handleQuantityChange("increase")}
                  disabled={quantity >= 11}
                  className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-green-600 font-bold text-lg">+</span>
                </button>

                {/* Max Label */}
                <span className="text-xs text-gray-500">Maks: 11</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {/* Tombol Masukkan Keranjang */}
                <button
                  onClick={handleAddToCart}
                  className="w-full max-w-[280px] bg-white py-3 px-4 rounded-lg font-bold flex items-center justify-start gap-3 border border-green-600 hover:bg-green-50 transition-colors cursor-pointer"
                >
                  {/* Icon bulat hijau */}
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <Plus className="w-6 h-6 text-white" />
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

          {/* Product Information Section */}
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
