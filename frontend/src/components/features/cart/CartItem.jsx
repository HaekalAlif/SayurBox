import { ChevronLeft } from "lucide-react";
import { useCartItem } from "./CartItem.hooks";
import { useAuth } from "@/context/AuthContext";
import SayurboxLoading from "@/components/base/SayurBoxLoading";

const CartItem = () => {
  const { user } = useAuth();
  const userId = user?.id;

  const {
    selectedDeliveryTime,
    setSelectedDeliveryTime,
    selectAll,
    products,
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
    totalPrice,
    checkoutLoading,
    toast,
  } = useCartItem(userId);

  // PromoProductItem component
  const PromoProductItem = ({ index }) => (
    <div
      key={index}
      className="min-w-[300px] bg-white rounded-lg border border-green-200 shadow-sm p-4 snap-center flex-shrink-0 pointer-events-auto"
      onMouseDown={(e) => e.preventDefault()}
    >
      <div className="flex items-center justify-between">
        <div className="w-26 h-20 rounded-md overflow-hidden bg-red-100">
          <img
            src="assets/cart/marjan.jpg"
            alt="Product"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 px-4">
          <h4 className="text-sm font-semibold text-gray-900 leading-snug">
            Marjan Sirup <br /> Cocopandan
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-bold bg-red-500 text-white px-2 py-0.5 rounded">
              43%
            </span>
            <span className="text-xs text-gray-400 line-through">
              Rp. 25.700
            </span>
          </div>
          <p className="font-bold text-gray-900 text-base mt-1">Rp. 14.900</p>
        </div>
        <button className="w-10 h-10 -mt-12 rounded-full bg-green-600 text-white flex items-center justify-center cursor-pointer hover:bg-green-700 transition-all duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
      <p className="text-[11px] max-w-[300px] text-gray-600 mt-3 px-4">
        Tambah{" "}
        <strong>
          {" "}
          49rb Proteins, Vegetables, Sayurbox Kitchen, atau Fruits
        </strong>
      </p>
    </div>
  );

  const ProductItem = ({ product }) => (
    <div
      className="px-6 py-4 border transition-all duration-200"
      style={{ backgroundColor: "#D4E496" }}
    >
      <div className="flex items-start space-x-4">
        {/* Checkbox */}
        <label className="relative w-10 h-10 inline-block">
          <input
            type="checkbox"
            checked={product.isSelected}
            onChange={() => handleProductSelect(product.id)}
            className="custom-checkbox w-10 h-10 appearance-none rounded border-2 border-green-500 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
          />
        </label>

        {/* Image */}
        <div className="w-28 h-28 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex-shrink-0 overflow-hidden shadow-sm">
          {product.image ? (
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}${product.image}`}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          )}
        </div>

        <div className="flex justify-between gap-20 items-start py-2">
          {/* Product Details (kiri) */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-base leading-tight mb-4">
              {product.title}
            </h3>
            <p className="text-md text-gray-600 font-medium mb-2">
              {product.variant}
            </p>
            {/* Price */}
            <div className="flex items-center space-x-2">
              <span className="font-bold text-gray-900 text-lg">
                {product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-gray-500 line-through">
                    {product.originalPrice}
                  </span>
                  {product.discount && (
                    <span className="text-xs bg-red-600 font-bold text-white px-2 py-1 rounded-md">
                      -{product.discount}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
          {/* Action Buttons (kanan) */}
          <div className="flex flex-row items-center gap-4 mt-14 ml-10">
            {/* Delete Button */}
            <button
              onClick={() => handleDeleteProduct(product.id)}
              className="text-gray-400 hover:text-red-500  p-2 rounded-full transition-all duration-200"
              title="Hapus item"
            >
              <img
                src="assets/cart/trash.png"
                alt="Hapus"
                className="w-6 h-8 cursor-pointer"
              />
            </button>
            {/* Quantity */}
            <div className="flex items-center bg-white border-2 border-gray-200 rounded-full overflow-hidden shadow-sm">
              <button
                onClick={() => handleQuantityDecrease(product)}
                disabled={product.quantity <= product.minQuantity}
                className="group px-3 py-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full group-active:bg-green-600">
                  <img
                    src="assets/cart/minus.png"
                    alt="Kurangi"
                    className="w-6 h-6"
                  />
                </div>
              </button>
              <div className="py-2 bg-gray-50">
                <span className="text-lg font-semibold text-gray-900 min-w-[20px] text-center block">
                  {product.quantity}
                </span>
              </div>
              <button
                onClick={() => handleQuantityIncrease(product)}
                disabled={product.quantity >= product.maxQuantity}
                className="group px-3 py-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full group-active:bg-green-600">
                  <img
                    src="assets/cart/plus.png"
                    alt="Tambah"
                    className="w-6 h-6"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <SayurboxLoading />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="absolute bg-white z-10 pl-4">
        <button
          onClick={handleBackClick}
          className="relative left-6 cursor-pointer items-center w-14 h-14 text-lg text-green-600 border border-green rounded-full border-green-400 hover:scale-110 transition-transform"
        >
          <ChevronLeft className="w-10 h-10 ml-1" />
        </button>
      </div>
      <div className="mt-10">
        {/* Header Section */}
        <div className="font-bold text-3xl text-black pl-46">Keranjang</div>
        {/* 2-Column Grid Layout */}
        <div className="px-16 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Time Selection */}
            <div
              style={{ backgroundColor: "#D4E496" }}
              className="p-8 rounded-lg"
            >
              <h2 className="font-bold text-gray-900 mb-4 text-lg">
                Pilih Waktu Pengiriman
              </h2>
              <div className="grid grid-cols-2 max-w-md">
                {deliveryOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`p-4 w-50 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedDeliveryTime === option.id
                        ? "border-green-500 bg-white shadow-sm"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedDeliveryTime(option.id)}
                  >
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                        {option.date}
                      </p>
                      <p className="text-base font-bold text-green-800">
                        {option.label}
                      </p>
                      <p className="text-xs text-gray-700 font-medium">
                        {option.description}
                      </p>
                      <p className="text-xs text-green-800">{option.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Select All */}
            {products.length > 0 && (
              <div
                className="mt-4 p-6 border-b border-gray-200"
                style={{ backgroundColor: "#D4E496" }}
              >
                <div className="flex items-center space-x-3">
                  <label className="relative w-10 h-10 inline-block">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="custom-checkbox w-10 h-10 appearance-none rounded border-2 border-green-500 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                    />
                  </label>
                  <span className="font-bold text-gray-900">Pilih Semua</span>
                  <span className="text-gray-500 text-md font-medium">
                    ({products.length})
                  </span>
                </div>
              </div>
            )}
            {/* Product List */}
            {products.length === 0 ? (
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center">
                  <div className="text-center">
                    <div className="mb-6">
                      <img
                        src="assets/cart/empty-cart.png"
                        alt="Keranjang Kosong"
                        className="w-64 mx-auto"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Yah, keranjang mu kosong nih...
                    </h3>
                    <p className="text-md text-gray-600 mb-6">
                      Yuk belanja sekarang
                    </p>
                    <button
                      onClick={() => window.history.back()}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg text-md transition-all duration-200 shadow-sm"
                    >
                      Belanja Sekarang
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))}
              </div>
            )}
            {/* Promo Carousel */}
            <div className="mt-6 p-4 bg-[#D4E496] rounded-lg border border-orange-200">
              <h3 className="px-4 font-bold text-gray-900 mb-4 text-lg">
                Ayo Tebus Harga WOW!
              </h3>
              <div className="w-full px-4">
                <div
                  ref={carouselRef}
                  onScroll={handleScroll}
                  className="overflow-x-auto snap-x snap-mandatory flex space-x-4 pb-2 scroll-smooth scrollbar-hide touch-pan-x"
                  style={{
                    WebkitOverflowScrolling: "touch",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  {[1, 2, 3, 4, 5, 6].map((item, i) => (
                    <PromoProductItem key={i} index={i} />
                  ))}
                </div>
                <div className="mt-4 relative h-3">
                  <div className="absolute top-1 left-0 w-full h-2 bg-gray-200 rounded-full" />
                  <div
                    className="absolute top-1 left-0 h-2 bg-green-500 rounded-full transition-all duration-200"
                    style={{ width: `${scrollValue * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Cart Summary */}
          <div className="lg:col-span-1">
            <div>
              <div className="py-5 px-8 rounded-xl border border-2 border-gray-200 w-full max-w-sm mx-auto lg:mx-0">
                {/* Gratis Ongkir */}
                <div
                  className="flex items-center space-x-3 mb-4 p-3 bg-white rounded-lg border border-green-200"
                  style={{ backgroundColor: "#B1E9AB99" }}
                >
                  <img
                    src="assets/cart/truck.png"
                    alt="Truck Icon"
                    className="text-green-600 w-14 h-8"
                  />
                  <div>
                    <p className="font-semibold text-sm text-gray-900">
                      <strong>Gratis Ongkir</strong> minimum belanja{" "}
                      <strong>Rp. 100.000</strong>
                    </p>
                  </div>
                </div>
                {/* Total */}
                <div className="flex items-center py-3 ">
                  <span className="font-bold text-gray-900 text-lg">
                    Total :{" "}
                    {products.length === 0 || totalItems === 0
                      ? "Rp.-"
                      : `Rp. ${Number(totalPrice).toLocaleString("id-ID")}`}
                  </span>
                </div>
                {/* Points */}
                {products.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center text-sm">
                      <img src="assets/cart/point.png" className="w-10 h-10" />
                      <span className="text-black font-bold ml-3">
                        +9 SayurPoint
                      </span>
                    </div>
                  </div>
                )}
                {/* XP */}
                {products.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center text-sm">
                      <img src="assets/cart/xp.png" className="w-10 h-10" />
                      <span className="text-black font-bold ml-3">+18 XP</span>
                    </div>
                  </div>
                )}
                {/* Spacing */}
                {products.length === 0 && <div className="mb-6"></div>}
                {/* Checkout Button */}
                <button
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-sm font-semibold text-lg transition-all duration-200 shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center"
                  disabled={
                    products.length === 0 || totalItems === 0 || checkoutLoading
                  }
                  onClick={handleCheckout}
                >
                  {checkoutLoading ? (
                    <svg
                      className="animate-spin w-6 h-6 mr-2"
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
                  ) : null}
                  {products.length === 0 ? "Keranjang Kosong" : "Checkout"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-20 right-4 z-50 px-4 py-3 rounded-md shadow-lg ${
            toast.error ? "bg-red-600" : "bg-green-600"
          } text-white`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default CartItem;
