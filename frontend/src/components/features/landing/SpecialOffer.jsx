import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

const SpecialOffer = () => {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const products = [
    {
      id: 1,
      image: "assets/landing/products/alpukat.png",
      badgeTop: "assets/landing/icons/badge-masak.png",
      badgeLabel: "Best Quality for MASAK!",
      title: "Alpukat Mentega",
      unit: "1 Pcs, 1 Kg",
      currentPrice: "Rp. 2.500",
      originalPrice: "Rp. 15.625",
      discount: "84%",
    },
    {
      id: 2,
      image: "assets/landing/products/alpukat.png",
      badgeTop: "assets/landing/icons/badge-masak.png",
      badgeLabel: "Best Quality for MASAK!",
      title: "Alpukat Mentega",
      unit: "1 Pcs, 1 Kg",
      currentPrice: "Rp. 3.000",
      originalPrice: "Rp. 18.750",
      discount: "84%",
    },
    {
      id: 3,
      image: "assets/landing/products/alpukat.png",
      badgeTop: "assets/landing/icons/badge-masak.png",
      badgeLabel: "Best Quality for MASAK!",
      title: "Alpukat Mentega",
      unit: "1 Pcs, 1 Kg",
      currentPrice: "Rp. 4.500",
      originalPrice: "Rp. 28.125",
      discount: "84%",
    },
    {
      id: 4,
      image: "assets/landing/products/alpukat.png",
      badgeTop: "assets/landing/icons/badge-masak.png",
      badgeLabel: "Best Quality for MASAK!",
      title: "Alpukat Segar",
      unit: "1 Pcs, 1 Kg",
      currentPrice: "Rp. 2.200",
      originalPrice: "Rp. 13.750",
      discount: "84%",
    },
  ];

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    const el = scrollRef.current;
    checkScroll();
    el?.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scrollBy = (amount) => {
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="px-4">
      <div className="max-w-screen-lg mx-auto">
        <section className="w-full bg-white py-8">
          <div className="w-full max-w-screen-xl mx-auto">
            <div
              className="w-full rounded-2xl p-6 shadow-sm"
              style={{ backgroundColor: "#D4EEDF" }}
            >
              <div className="relative">
                {/* Arrow Left */}
                {showLeft && (
                  <button
                    onClick={() => scrollBy(-300)}
                    className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-[#684C34] rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                )}

                {/* Arrow Right */}
                {showRight && (
                  <button
                    onClick={() => scrollBy(300)}
                    className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-[#684C34] rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                )}

                <div
                  className="flex items-center gap-6 overflow-x-auto px-2 md:px-0 scroll-smooth scrollbar-hide"
                  ref={scrollRef}
                >
                  {/* Left Banner */}
                  <div className="flex-shrink-0">
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

                  {/* Product Cards */}
                  {products.map((product) => (
                    <div key={product.id} className="flex-shrink-0">
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
                          <button className="absolute top-2 right-4 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center transition-colors hover:bg-white group shadow-md hover:shadow-lg cursor-pointer">
                            <Plus className="w-8 h-8 text-white group-hover:text-green-600 transition-colors" />
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
                            <span className="text-white font-semibold text-xs bg-red-500 px-1.5 py-0.5 rounded">
                              {product.discount}
                            </span>
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
                  ))}
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
