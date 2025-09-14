import React, { useRef, useState } from "react";
import { Plus, ChevronDown, AlertCircle, X } from "lucide-react";
import { useProductCatalog } from "./Product.hooks";
import { Link } from "react-router-dom";
import SayurboxLoading from "../../base/SayurBoxLoading";

const ProductSection = () => {
  const scrollRef = useRef(null);
  const [showToast, setShowToast] = useState(false);

  // Menggunakan custom hook untuk fetch data produk
  const { products, loading, error, activeTab, handleTabChange } =
    useProductCatalog();

  // Data tabs
  const tabs = [
    { id: "latest", label: "Semua" },
    { id: "choices", label: "Produk Terlaris" },
  ];

  // Handler untuk menampilkan toast
  const handleAddToCart = (e, productId) => {
    e.preventDefault(); // Mencegah navigasi ke halaman detail
    e.stopPropagation(); // Mencegah event bubble ke Link

    setShowToast(true);

    // Otomatis sembunyikan toast setelah 3 detik
    setTimeout(() => {
      setShowToast(false);
    }, 3000);

    console.log("Product added to cart (coming soon):", productId);
  };

  return (
    <div className="pb-8">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-4 z-50 bg-green-600 text-white py-3 px-4 rounded-md shadow-lg flex items-center">
          <span className="mr-2">Cart feature coming soon!</span>
          <button
            onClick={() => setShowToast(false)}
            className="text-white hover:text-green-200"
          >
            <X size={18} />
          </button>
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
      <div className="flex flex-wrap gap-4 md:gap-8 bg-[#C5FFBF] p-4 max-w-screen-lg mx-auto overflow-x-auto">
        <div className="my-auto font-semibold ml-2 whitespace-nowrap">
          <h1>Urutkan :</h1>
        </div>
        <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`text-sm md:text-md font-semibold rounded-sm px-4 md:px-6 py-2 md:py-3 border transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? "bg-green-600 text-white"
                  : "bg-white text-green-600 font-bold hover:bg-green-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="py-8 px-4 md:px-8">
        <div className="max-w-screen-lg mx-auto">
          <section className="w-full bg-white">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                {error}
              </div>
            )}

            {loading ? (
              <SayurboxLoading />
            ) : (
              <div className="relative">
                {products.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 px-4">
                    <div className="text-center">
                      <div className="mb-6">
                        <img
                          src="/assets/catalog/empty-products.png"
                          alt="Produk Tidak Ditemukan"
                          className="w-64 mx-auto"
                          onError={(e) => {
                            e.target.src = "/assets/cart/empty-cart.png"; // Fallback ke gambar cart jika gambar catalog tidak ada
                          }}
                        />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        Produk tidak ditemukan
                      </h3>
                      <p className="text-md text-gray-600 mb-6 max-w-md mx-auto">
                        Maaf, kami tidak dapat menemukan produk yang sesuai
                        dengan kriteria pencarian Anda. Coba sesuaikan filter
                        atau cari dengan kata kunci lain.
                      </p>
                      <button
                        onClick={() => (window.location.href = "/")}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg text-md transition-all duration-200 shadow-sm"
                      >
                        Kembali ke Beranda
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    ref={scrollRef}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto scroll-smooth custom-scrollbar"
                    style={{ maxHeight: "960px" }}
                  >
                    {products.map((product) => (
                      <Link
                        to={`/product/${product.slug}`}
                        key={product.id}
                        className="cursor-pointer"
                      >
                        <ProductCard
                          product={product}
                          onAddToCart={(e) => handleAddToCart(e, product.id)}
                        />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, onAddToCart }) => (
  <div className="flex-shrink-0">
    <div className="w-full h-full rounded-sm shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow">
      {/* Image Area */}
      <div className="relative w-full h-46 aspect-square">
        {/* Badge Top - Only show if product is limited */}
        {product.availability === "limited" && (
          <div className="absolute top-2 left-2 z-10">
            <span className="bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded">
              Stok Terbatas
            </span>
          </div>
        )}

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
          onClick={onAddToCart}
          className="absolute top-2 right-4 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center transition-colors hover:bg-white group shadow-md hover:shadow-lg cursor-pointer"
        >
          <Plus className="w-6 h-6 text-white group-hover:text-green-600 transition-colors" />
        </button>
      </div>

      {/* Price & Info */}
      <div className="p-3">
        <div className="mb-1">
          <span className="text-base font-bold text-gray-800">
            {product.currentPrice}
          </span>
        </div>

        {product.discount && (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-white font-semibold text-xs bg-red-500 px-1.5 py-0.5 rounded">
              {product.discount}
            </span>
            <span className="line-through text-gray-400 text-xs">
              {product.originalPrice}
            </span>
          </div>
        )}

        <h4 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">
          {product.title}
        </h4>
        <p className="text-xs text-gray-500">{product.unit}</p>
      </div>
    </div>
  </div>
);

export default ProductSection;
