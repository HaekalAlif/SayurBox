import React, { useRef, useState, useEffect, useCallback } from "react";

const Hero = () => {
  // Data kategori produk
  const kategoriItems = [
    {
      icon: "assets/landing/kategori/sayur.png",
      label: "Sayur",
      href: "/catalog?category=sayur",
    },
    {
      icon: "assets/landing/kategori/buah.png",
      label: "Buah",
      href: "/catalog?category=buah",
    },
    {
      icon: "assets/landing/kategori/protein.png",
      label: "Protein",
      href: "/catalog?category=protein",
    },
    {
      icon: "assets/landing/kategori/sembako.png",
      label: "Sembako",
      href: "/catalog?category=sembako",
    },
    {
      icon: "assets/landing/kategori/bumbu.png",
      label: "Bumbu Dapur",
      href: "/catalog?category=bumbu-dapur",
    },
  ];

  // Data tab list (carousel)
  const tabItems = [
    {
      label: "Semua Kategori",
      icon: "assets/landing/kategori/all.png",
      href: "/category",
    },
    {
      label: "Produk Terbaru",
      icon: "assets/landing/kategori/new.png",
      href: "/catalog?category=new-product",
    },
    {
      label: "Ibu & Bayi",
      icon: "assets/landing/kategori/baby.png",
      href: "/catalog?category=ibu-bayi",
    },
    {
      label: "Susu & Olahan",
      icon: "assets/landing/kategori/susu.png",
      href: "/catalog?category=susu-olahan",
    },
    {
      label: "Siap Saji",
      icon: "assets/landing/kategori/siap-saji.png",
      href: "/catalog?category=siap-saji",
    },
  ];

  const sliderRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const rafId = useRef(null);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const clickStartTime = useRef(0);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .no-scrollbar::-webkit-scrollbar { display: none; }
      .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleScroll = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    const currentScroll = slider.scrollLeft;
    const percent = maxScroll === 0 ? 0 : currentScroll / maxScroll;
    setProgress(percent);
  }, []);

  // Handle untuk smooth scrolling
  const handleDragStart = useCallback((clientX) => {
    clickStartTime.current = Date.now();
    setIsDragging(true);
    startX.current = clientX;
    scrollLeft.current = sliderRef.current.scrollLeft;
    lastX.current = clientX;
    lastTime.current = Date.now();
    velocity.current = 0;

    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  }, []);

  const handleDragMove = useCallback(
    (clientX) => {
      if (!isDragging) return;

      const now = Date.now();
      const dt = now - lastTime.current;
      const dx = lastX.current - clientX;

      if (dt > 0) {
        const newVelocity = dx / dt;
        velocity.current = velocity.current * 0.7 + newVelocity * 0.3;
      }

      sliderRef.current.scrollLeft =
        scrollLeft.current + (startX.current - clientX);
      lastX.current = clientX;
      lastTime.current = now;
      handleScroll();
    },
    [isDragging, handleScroll]
  );

  const handleDragEnd = useCallback(
    (e) => {
      if (!isDragging) return;

      const dragDuration = Date.now() - clickStartTime.current;
      if (dragDuration < 100) {
        setIsDragging(false);
        return;
      }

      setIsDragging(false);

      const startTime = Date.now();
      const initialVelocity = velocity.current * 15;

      const momentumScroll = () => {
        const elapsed = Date.now() - startTime;
        const easing = Math.exp(-elapsed / 325);
        const delta = initialVelocity * easing;

        if (Math.abs(delta) > 0.5) {
          sliderRef.current.scrollLeft += delta;
          handleScroll();
          rafId.current = requestAnimationFrame(momentumScroll);
        } else {
          cancelAnimationFrame(rafId.current);
          rafId.current = null;
        }
      };

      if (Math.abs(velocity.current) > 0.1) {
        rafId.current = requestAnimationFrame(momentumScroll);
      }
    },
    [isDragging, handleScroll]
  );

  useEffect(() => {
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    slider.addEventListener("scroll", handleScroll);
    setProgress(0);
    return () => slider.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const preventDefaultHandler = useCallback(
    (e) => {
      if (isDragging) {
        e.preventDefault();
      }
    },
    [isDragging]
  );

  useEffect(() => {
    window.addEventListener("dragstart", preventDefaultHandler);
    window.addEventListener("selectstart", preventDefaultHandler);

    return () => {
      window.removeEventListener("dragstart", preventDefaultHandler);
      window.removeEventListener("selectstart", preventDefaultHandler);
    };
  }, [preventDefaultHandler]);

  return (
    <div className="pt-8 px-4 md:px-8">
      <div className="max-w-screen-lg mx-auto space-y-8">
        {/* Hero Section - Banner Promo */}
        <section>
          <div className="w-full">
            <img
              src="assets/landing/hero/banner-promo.png"
              alt="Transaksi Pertama Ditraktir 50rb"
              className="w-full h-auto object-contain rounded-xl shadow-md"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          </div>
        </section>

        {/* Kategori Produk Section */}
        <section className="w-full bg-white py-2">
          <div className="w-full max-w-screen-xl mx-auto">
            <div className="w-full rounded-2xl border border-green-500 p-6 bg-white shadow-sm">
              {/* Title */}
              <h2 className="text-center text-2xl font-bold text-gray-800 mb-7">
                Kategori Produk
              </h2>

              {/* Kategori Grid */}
              <div className="grid grid-cols-3 md:grid-cols-5 gap-10 mb-6 px-12">
                {kategoriItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex flex-col items-center space-y-2"
                  >
                    {/* Kartu kategori */}
                    <div className="flex items-center justify-center w-28 bg-[rgba(212,228,150,0.25)] border border-[rgba(180,200,100,0.5)] rounded-xl py-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="w-16 h-20 flex items-center justify-center">
                        <img
                          src={item.icon}
                          alt={item.label}
                          className="w-18 h-18 object-contain"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      </div>
                    </div>
                    {/* Label kategori di bawah card */}
                    {item.label && (
                      <span className="text-sm text-gray-800 font-bold text-center">
                        {item.label}
                      </span>
                    )}
                  </a>
                ))}
              </div>

              {/* Tab List - Carousel */}
              <div className="relative">
                <div
                  ref={sliderRef}
                  className="flex gap-6 px-6 pt-4 overflow-x-auto no-scrollbar"
                  style={{
                    scrollBehavior: isDragging ? "auto" : "smooth",
                    cursor: isDragging ? "grabbing" : "grab",
                    userSelect: "none",
                    WebkitOverflowScrolling: "touch", 
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleDragStart(e.clientX);
                  }}
                  onMouseMove={(e) => {
                    if (!isDragging) return;
                    e.preventDefault();
                    handleDragMove(e.clientX);
                  }}
                  onMouseUp={handleDragEnd}
                  onMouseLeave={handleDragEnd}
                  onTouchStart={(e) => {
                    handleDragStart(e.touches[0].clientX);
                  }}
                  onTouchMove={(e) => {
                    if (!isDragging) return;
                    e.preventDefault();
                    handleDragMove(e.touches[0].clientX);
                  }}
                  onTouchEnd={handleDragEnd}
                >
                  {tabItems.map((tab, index) => (
                    <a
                      key={index}
                      href={tab.href}
                      onClick={(e) => {
                        if (
                          isDragging ||
                          Date.now() - clickStartTime.current > 150
                        ) {
                          e.preventDefault();
                        }
                      }}
                      className="flex items-center gap-3 min-w-[300px] bg-[rgba(212,228,150,0.25)] rounded-sm py-3 px-4 hover:shadow-lg transition-shadow cursor-pointer"
                      style={{
                        height: "80px",
                        boxSizing: "border-box",
                      }}
                    >
                      <div className="w-24 h-8 flex items-center justify-center">
                        <img
                          src={tab.icon}
                          alt={tab.label}
                          className="w-12 h-12 object-contain"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-800 font-bold">
                        {tab.label}
                      </span>
                      {tab.badge && (
                        <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full ml-2">
                          {tab.badge}
                        </span>
                      )}
                    </a>
                  ))}
                </div>
                {/* Garis Bawah sebagai indikator progress */}
                <div className="w-[95%] h-1 mx-auto mt-7 rounded-full overflow-hidden flex">
                  {/* Progress hijau */}
                  <div
                    className="h-full"
                    style={{
                      width: `${40 + progress * 60}%`,
                      backgroundColor: "#049624",
                      transition: "width 0.2s",
                    }}
                  ></div>
                  {/* Sisa abu-abu */}
                  <div
                    className="h-full"
                    style={{
                      width: `${60 - progress * 60}%`,
                      backgroundColor: "#e5e7eb",
                      transition: "width 0.2s",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hero;
