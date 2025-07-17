import { useRef, useState, useEffect } from "react";
import { Trash2, Minus, Plus, ChevronLeft, Truck } from "lucide-react";

const CartItem = () => {
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState("today");
  const [selectAll, setSelectAll] = useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Alpukat Mentega",
      variant: "1 Pcs",
      price: "Rp. 2.500",
      originalPrice: "Rp. 15.625",
      discount: "84%",
      quantity: 1,
      minQuantity: 1,
      maxQuantity: 10,
      isSelected: true,
      image: "/src/assets/products/produk-1.png",
    },
    {
      id: 2,
      title: "Tomat Segar",
      variant: "500 gr",
      price: "Rp. 8.000",
      originalPrice: "Rp. 12.000",
      discount: "33%",
      quantity: 2,
      minQuantity: 1,
      maxQuantity: 10,
      isSelected: false,
      image: "/src/assets/products/produk-1.png",
    },
    {
      id: 3,
      title: "Bawang Merah",
      variant: "250 gr",
      price: "Rp. 7.000",
      originalPrice: "Rp. 9.000",
      discount: "22%",
      quantity: 1,
      minQuantity: 1,
      maxQuantity: 10,
      isSelected: false,
      image: "/src/assets/products/produk-1.png",
    },
  ]);

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

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setProducts(
      products.map((product) => ({
        ...product,
        isSelected: newSelectAll,
      }))
    );
  };

  const handleProductSelect = (productId) => {
    setProducts(
      products.map((product) =>
        product.id === productId
          ? { ...product, isSelected: !product.isSelected }
          : product
      )
    );
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setProducts(
      products.map((product) =>
        product.id === productId
          ? { ...product, quantity: newQuantity }
          : product
      )
    );
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
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

  const selectedProducts = products.filter((product) => product.isSelected);
  const totalItems = selectedProducts.length;

  // Add PromoProductItem component
  const PromoProductItem = ({ index }) => {
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddClick = () => {
      setIsAdded(true);
      setQuantity(1);
    };

    const handleQuantityIncrease = () => {
      if (quantity < 10) {
        setQuantity(quantity + 1);
      }
    };

    const handleQuantityDecrease = () => {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      } else {
        setIsAdded(false);
        setQuantity(0);
      }
    };

    return (
      <div
        key={index}
        className="min-w-[300px] bg-white rounded-lg border border-green-200 shadow-sm p-4 snap-center flex-shrink-0 pointer-events-auto"
        onMouseDown={(e) => e.preventDefault()}
      >
        <div className="flex items-center justify-between">
          <div className="w-26 h-20 rounded-md overflow-hidden bg-red-100">
            <img
              src="/src/assets/cart/marjan.jpg"
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
          <button
            onClick={handleAddClick}
            className="w-10 h-10 -mt-12 rounded-full bg-green-600 text-white flex items-center justify-center cursor-pointer hover:bg-green-700 transition-all duration-200"
          >
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
  };

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
              src={product.image}
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
            {/* Delete Button (sejajar dengan quantity) */}
            <button
              onClick={() => handleDeleteProduct(product.id)}
              className="text-gray-400 hover:text-red-500  p-2 rounded-full transition-all duration-200"
              title="Hapus item"
            >
              {/* Ganti dengan path ikon custom kalau perlu */}
              <img
                src="/src/assets/cart/trash.png"
                alt="Hapus"
                className="w-6 h-8 cursor-pointer"
              />
            </button>

            {/* Quantity */}
            <div className="flex items-center bg-white border-2 border-gray-200 rounded-full overflow-hidden shadow-sm">
              <button
                onClick={() => handleQuantityDecrease(product)}
                disabled={product.quantity <= product.minQuantity}
                className="group px-3 py-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full group-active:bg-green-600">
                  <img
                    src="/src/assets/cart/minus.png"
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
                className="group px-3 py-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full group-active:bg-green-600">
                  <img
                    src="/src/assets/cart/plus.png"
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

  const carouselRef = useRef(null);
  const [scrollValue, setScrollValue] = useState(0.25); // Set initial to 25%
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleScroll = () => {
    const container = carouselRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    const scrollPercentage = scrollLeft / (scrollWidth - clientWidth);
    // Add the initial 25% offset to the actual scroll percentage
    setScrollValue(0.25 + scrollPercentage * 0.75);
  };

  const handleSliderChange = (e) => {
    const container = carouselRef.current;
    if (!container) return;
    const newValue = parseFloat(e.target.value);
    setScrollValue(newValue);
    // Adjust the scroll calculation to account for the 25% offset
    const adjustedValue = Math.max(0, (newValue - 0.25) / 0.75);
    const newScrollLeft =
      adjustedValue * (container.scrollWidth - container.clientWidth);
    container.scrollTo({ left: newScrollLeft, behavior: "smooth" });
  };

  // Mouse wheel scroll handler
  const handleWheel = (e) => {
    const container = carouselRef.current;
    if (!container) return;

    e.preventDefault();
    const scrollAmount = e.deltaY > 0 ? 300 : -300;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    const container = carouselRef.current;
    if (!container) return;

    setIsDragging(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
    container.style.cursor = "grabbing";
  };

  const handleMouseMove = (e) => {
    const container = carouselRef.current;
    if (!container || !isDragging) return;

    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2;
    container.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    const container = carouselRef.current;
    if (!container) return;

    setIsDragging(false);
    container.style.cursor = "grab";
  };

  const handleMouseLeave = () => {
    const container = carouselRef.current;
    if (!container) return;

    setIsDragging(false);
    container.style.cursor = "grab";
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    const container = carouselRef.current;
    if (!container) return;

    setIsDragging(true);
    setStartX(e.touches[0].pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  };

  const handleTouchMove = (e) => {
    const container = carouselRef.current;
    if (!container || !isDragging) return;

    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - startX) * 2;
    container.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    handleScroll();
    // Don't scroll initially, just keep the progress bar at 25%
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white z-10 pl-4">
        <button
          onClick={handleBackClick}
          className="relative top-16 left-6 cursor-pointer items-center w-14 h-14 text-lg text-green-600 border border-green rounded-full border-green-400 hover:scale-110 transition-transform"
        >
          <ChevronLeft className="w-10 h-10 ml-1" />
        </button>
      </div>

      {/* Header Section */}
      <div className="font-bold text-3xl text-black pl-46">Keranjang</div>

      {/* 2-Column Grid Layout */}
      <div className="px-16 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Left Column - Takes 2/3 of space */}
        <div className="lg:col-span-2 space-y-6">
          {/* Enhanced Delivery Time Selection */}
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

          {/* Enhanced Select All - Hide when cart is empty */}
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

          {/* Enhanced Product List */}
          {products.length === 0 ? (
            /* Empty Cart UI - Only for product list area */
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center">
                <div className="text-center">
                  {/* Empty Cart Image */}
                  <div className="mb-6">
                    <img
                      src="/src/assets/cart/empty-cart.png"
                      alt="Keranjang Kosong"
                      className="w-64 mx-auto"
                    />
                  </div>

                  {/* Empty Cart Text */}
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Yah, keranjang mu kosong nih...
                  </h3>
                  <p className="text-md text-gray-600 mb-6">
                    Yuk belanja sekarang
                  </p>

                  {/* Shop Now Button */}
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

          <div className="mt-6 p-4 bg-[#D4E496] rounded-lg border border-orange-200">
            <h3 className="px-4 font-bold text-gray-900 mb-4 text-lg">
              Ayo Tebus Harga WOW!
            </h3>

            {/* Carousel Wrapper */}
            <div className="w-full px-4">
              {/* Carousel Card */}
              <div
                ref={carouselRef}
                onScroll={handleScroll}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="overflow-x-auto snap-x snap-mandatory flex space-x-4 pb-2 scroll-smooth scrollbar-hide touch-pan-x cursor-grab select-none"
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

              {/* Progress bar */}
              <div className="mt-4 relative h-3">
                <div className="absolute top-1 left-0 w-full h-2 bg-gray-200 rounded-full" />
                <div
                  className="absolute top-1 left-0 h-2 bg-green-500 rounded-full transition-all duration-200"
                  style={{ width: `${scrollValue * 100}%` }}
                />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={scrollValue}
                  onChange={handleSliderChange}
                  className="relative z-10 w-full h-3 opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Enhanced Cart Summary */}
        <div className="lg:col-span-1">
          <div>
            <div className="py-5 px-8 rounded-xl border border-2 border-gray-200 w-full max-w-sm mx-auto lg:mx-0">
              {/* Gratis Ongkir Highlight */}
              <div
                className="flex items-center space-x-3 mb-4 p-3 bg-white rounded-lg border border-green-200"
                style={{ backgroundColor: "#B1E9AB99" }}
              >
                <img
                  src="/src/assets/cart/truck.png"
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
                  Total : {products.length === 0 ? "Rp.-" : "Rp. 2.025"}
                </span>
              </div>

              {/* Points - Hide when cart is empty */}
              {products.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center text-sm">
                    <img
                      src="src/assets/cart/point.png"
                      className="w-10 h-10"
                    />
                    <span className="text-black font-bold ml-3">
                      +9 SayurPoint
                    </span>
                  </div>
                </div>
              )}

              {/* XP - Hide when cart is empty */}
              {products.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center text-sm">
                    <img src="src/assets/cart/xp.png" className="w-10 h-10" />
                    <span className="text-black font-bold ml-3">+18 XP</span>
                  </div>
                </div>
              )}

              {/* Add margin bottom when cart is empty to maintain spacing */}
              {products.length === 0 && <div className="mb-6"></div>}

              {/* Checkout Button */}
              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-sm font-semibold text-lg transition-all duration-200 shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={products.length === 0 || totalItems === 0}
              >
                {products.length === 0 ? "Keranjang Kosong" : "Checkout"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
