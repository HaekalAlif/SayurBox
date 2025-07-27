import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

const IngredientsSection = () => {
  const scrollRef1 = useRef(null);
  const [showLeft1, setShowLeft1] = useState(false);
  const [showRight1, setShowRight1] = useState(false);

  const fruitProducts = [
    {
      id: 1,
      title: "Alpukat Mentega",
      price: "Rp. 2.500",
      originalPrice: "Rp. 15.625",
      discount: "84%",
      unit: "1 Pcs, 1 Kg",
      image: "/assets/products/produk-1.png",
      badgeTop: "assets/landing/icons/badge-masak.png",
      badgeLabel: "Best Quality for MASAK!",
    },
    {
      id: 2,
      title: "Alpukat Mentega Premium",
      price: "Rp. 3.000",
      originalPrice: "Rp. 18.750",
      discount: "84%",
      unit: "1 Pcs, 1 Kg",
      image: "/assets/products/produk-1.png",
      badgeTop: "assets/landing/icons/badge-masak.png",
      badgeLabel: "Best Quality for MASAK!",
    },
    {
      id: 3,
      title: "Alpukat Organik",
      price: "Rp. 4.500",
      originalPrice: "Rp. 28.125",
      discount: "84%",
      unit: "1 Pcs, 1 Kg",
      image: "/assets/products/produk-1.png",
      badgeTop: "assets/landing/icons/badge-masak.png",
      badgeLabel: "Best Quality for MASAK!",
    },
    {
      id: 4,
      title: "Alpukat Segar",
      price: "Rp. 2.200",
      originalPrice: "Rp. 13.750",
      discount: "84%",
      unit: "1 Pcs, 1 Kg",
      image: "/assets/products/produk-1.png",
      badgeTop: "assets/landing/icons/badge-masak.png",
      badgeLabel: "Best Quality for MASAK!",
    },
    {
      id: 5,
      title: "Alpukat Import",
      price: "Rp. 5.500",
      originalPrice: "Rp. 34.375",
      discount: "84%",
      unit: "1 Pcs, 1 Kg",
      image: "/assets/products/produk-1.png",
      badgeTop: "assets/landing/icons/badge-masak.png",
      badgeLabel: "Best Quality for MASAK!",
    },
    {
      id: 6,
      title: "Alpukat Import 2",
      price: "Rp. 5.500",
      originalPrice: "Rp. 34.375",
      discount: "84%",
      unit: "1 Pcs, 1 Kg",
      image: "/assets/products/produk-1.png",
      badgeTop: "assets/landing/icons/badge-masak.png",
      badgeLabel: "Best Quality for MASAK!",
    },
  ];

  const checkScroll1 = () => {
    const el = scrollRef1.current;
    if (!el) return;
    setShowLeft1(el.scrollLeft > 0);
    setShowRight1(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    const el1 = scrollRef1.current;

    checkScroll1();

    el1?.addEventListener("scroll", checkScroll1);
    window.addEventListener("resize", checkScroll1);

    return () => {
      el1?.removeEventListener("scroll", checkScroll1);
      window.removeEventListener("resize", checkScroll1);
    };
  }, []);

  const scrollBy1 = (amount) => {
    scrollRef1.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  const ProductCard = ({ product }) => (
    <div>
      <div className="flex-shrink-0">
        <div className="w-56 h-full rounded-xl shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow max-w-2xl">
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
            <button className="absolute top-2 right-4 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center transition-colors hover:bg-white group shadow-md hover:shadow-lg cursor-pointer">
              <Plus className="w-8 h-8 text-white group-hover:text-green-600 transition-colors" />
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
            <p className="text-xs text-gray-500">{product.unit}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white">
      <div>
        <div className="mb-4">
          <div className="relative">
            <div className="">
              <button className="bg-green-100 text-sm text-left text-green-900 px-4 py-2 font-semibold rounded">
                Beli Bahannya di Sini :
              </button>
            </div>
            {/* Arrow Left */}
            {showLeft1 && (
              <button
                onClick={() => scrollBy1(-300)}
                className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-[#684C34] rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
            )}

            {/* Arrow Right */}
            {showRight1 && (
              <button
                onClick={() => scrollBy1(300)}
                className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-[#684C34] rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            )}

            <div
              className="flex items-center gap-4 overflow-x-auto px-2 h-88 md:px-0 scroll-smooth scrollbar-hide"
              ref={scrollRef1}
            >
              {fruitProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS untuk hide scrollbar*/}
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
