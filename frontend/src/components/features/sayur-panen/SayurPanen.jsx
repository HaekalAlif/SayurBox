import React, { useRef, useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const carouselData = [
  {
    image: "/assets/sayur-panen/benih.png",
    badge: {
      label: "Levelmu: Benih",
      coin: { value: 26, icon: "/assets/sayur-panen/xp.png" },
      bg: "bg-[#906C4D]",
      icon: "/assets/sayur-panen/xp.png",
    },
    progress: {
      label: "Kumpulkan 124 XP lagi untuk naik level",
      value: 26,
      max: 150,
      color: "#FACC15",
    },
    textRow: {
      left: "Sebelum 20 Juli 2025",
      right: { label: "Lihat Selengkapnya" },
    },
  },
  {
    image: "/assets/sayur-panen/bunga.png",
    badge: {
      label: "Bunga",
      bg: "bg-[#B1E9AB]",
    },
    progress: {
      label: "Kumpulkan 220 XP lagi untuk naik level",
      value: 80,
      max: 300,
      color: "#FACC15",
    },
    textRow: {
      left: "Selesai: 20 Juli 2025",
      right: { label: "Lihat Selengkapnya" },
    },
  },
  {
    image: "/assets/sayur-panen/buah.png",
    badge: {
      label: "Buah",
      bg: "bg-[#D4E496]",
    },
    progress: {
      label: "Kumpulkan 320 XP lagi untuk naik level",
      value: 180,
      max: 500,
      color: "#FACC15",
    },
    textRow: {
      left: "Selesai: 20 Juli 2025",
      right: { label: "Lihat Selengkapnya" },
    },
  },
  {
    image: "/assets/sayur-panen/panen.png",
    badge: {
      label: "Panen",
      bg: "bg-[#F9CE1D]",
    },
    progress: {
      label: "Level Maks Tercapai",
      value: 500,
      max: 500,
      color: "#FACC15",
    },
    text: {
      text: "Selamat! Kamu sudah di level tertinggi",
      style: "text-xs text-[#059669] mt-2 text-center",
    },
  },
];

// Reward data per level
const rewardData = [
  // Card 1
  [
    { icon: "/assets/sayur-panen/coin.png", label: "Sayurpoin Per Transaksi" },
    { icon: "/assets/sayur-panen/voucher.png", label: "Tukar Voucher" },
  ],
  // Card 2
  [
    {
      icon: "/assets/sayur-panen/coin.png",
      label: "Extra SayurPoin",
      oval: "+10%",
    },
    { icon: "/assets/sayur-panen/voucher.png", label: "Bonus Voucher" },
  ],
  // Card 3
  [
    {
      icon: "/assets/sayur-panen/coin.png",
      label: "Extra SayurPoin",
      oval: "+20%",
    },
    { icon: "/assets/sayur-panen/voucher.png", label: "Bonus Voucher" },
  ],
  // Card 4
  [
    {
      icon: "/assets/sayur-panen/coin.png",
      label: "Extra SayurPoin",
      oval: "+30%",
    },
    { icon: "/assets/sayur-panen/voucher.png", label: "Bonus Voucher" },
    { icon: "/assets/sayur-panen/priority.png", label: "Service Prioritas" },
    {
      icon: "/assets/sayur-panen/exclusive.png",
      label: "Undangan Event Ekslusif",
    },
  ],
];

const leafIcon = "/assets/sayur-panen/daun.png";

const CARD_WIDTH = 420;
const CARD_GAP = 32;

const SayurPanenSection = () => {
  const scrollRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Scroll ke card yang dipilih
  const scrollToIdx = (idx) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      left: idx * (CARD_WIDTH + CARD_GAP),
      behavior: "smooth",
    });
  };

  // Sync activeIdx dengan posisi scroll
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const idx = Math.round(
      scrollRef.current.scrollLeft / (CARD_WIDTH + CARD_GAP)
    );
    setActiveIdx(idx);
  };

  useEffect(() => {
    const el = scrollRef.current;
    el?.addEventListener("scroll", handleScroll);
    return () => {
      el?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Arrow handler
  const handlePrev = () => {
    if (activeIdx > 0) scrollToIdx(activeIdx - 1);
  };
  const handleNext = () => {
    if (activeIdx < carouselData.length - 1) scrollToIdx(activeIdx + 1);
  };

  // Card carousel
  const CarouselCard = ({ item, idx }) => (
    <div
      className={`flex-shrink-0`}
      style={{
        width: CARD_WIDTH,
        marginRight: idx === carouselData.length - 1 ? 0 : CARD_GAP,
        transition: "transform 0.3s",
        transform: "scale(1)",
        opacity: 1,
        zIndex: 5,
        position: "relative",
      }}
    >
      <div className="bg-white rounded-2xl shadow overflow-hidden flex items-center justify-center relative h-[500px] px-10">
        <img
          src={item.image}
          alt="Level"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 w-full h-full flex flex-col justify-end p-4">
          {/* Badge */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 top-73 z-20 flex items-center justify-between ${item.badge.bg} px-4 py-2 rounded-lg w-[85%] shadow-lg`}
          >
            <div className="flex items-center gap-2">
              {idx === 0 ? (
                <>
                  <span className="text-sm font-semibold text-white">
                    {item.badge.label}
                  </span>
                </>
              ) : (
                <>
                  <img src={leafIcon} className="w-5 h-5" alt="Daun" />
                  <span className="text-sm font-semibold text-black">
                    {item.badge.label}
                  </span>
                </>
              )}
            </div>
            {idx === 0 && (
              <div className="flex items-center gap-1">
                <img
                  src={item.badge.coin.icon}
                  alt="coin"
                  className="w-6 h-6"
                />
                <span className="text-sm font-bold text-white">
                  {item.badge.coin.value}
                </span>
              </div>
            )}
          </div>
          {/* Progress */}
          <div
            className={
              idx === 0
                ? "bg-white rounded-sm px-7 pt-8 pb-2 mb-8"
                : "bg-black rounded-sm p-4 mb-28 "
            }
          >
            <div className="mb-2">
              {idx === 0 ? (
                <>
                  <div className="flex justify-center items-center mb-4">
                    <span className="text-xs font-bold text-center">
                      {item.progress.label}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded h-4 mb-6">
                    <div
                      className="h-4 rounded"
                      style={{
                        width: `${
                          (item.progress.value / item.progress.max) * 100
                        }%`,
                        backgroundColor: item.progress.color,
                      }}
                    ></div>
                  </div>
                  {item.textRow && (
                    <div
                      className={`flex justify-between items-center mt-2 text-xs ${
                        idx === 0 ? "" : "text-white"
                      }`}
                    >
                      <span>{item.textRow.left}</span>
                      <button
                        className={`flex items-center font-semibold ${
                          idx === 0 ? "text-green-700" : "text-white"
                        }`}
                      >
                        {item.textRow.right.label}
                        <ChevronRight className="w-4 h-4 mt-0.5" />
                      </button>
                    </div>
                  )}
                  {item.text && (
                    <div className={item.text.style}>{item.text.text}</div>
                  )}
                </>
              ) : (
                <div className="w-full flex items-center justify-center mt-2">
                  <span className="text-xs font-bold text-white">
                    Level masih terkunci
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
    </div>
  );

  // Reward Card
  const RewardCard = ({ icon, label, oval }) => (
    <div className="flex flex-col items-center gap-2 relative">
      <div className="relative flex flex-col items-center">
        <img src={icon} className="w-20 h-20" />
        {oval && (
          <span
            className="absolute left-1/2 -translate-x-1/2 top-15 bg-red-500 text-xs font-bold text-white px-3 py-0.5 rounded-full shadow"
            style={{ whiteSpace: "nowrap" }}
          >
            {oval}
          </span>
        )}
      </div>
      <span className="text-xs text-gray-700 font-semibold text-center max-w-[80px]">
        {label}
      </span>
    </div>
  );

  // Split reward icons into rows of max 3
  const getRewardRows = (rewards) => {
    const rows = [];
    for (let i = 0; i < rewards.length; i += 3) {
      rows.push(rewards.slice(i, i + 3));
    }
    return rows;
  };

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Back Button */}
      <div className="top-0 bg-white z-10 pl-4">
        <button
          onClick={handleBackClick}
          className="relative top-16 left-6 cursor-pointer items-center w-14 h-14 text-lg text-green-600 border border-green rounded-full border-green-400 hover:scale-110 transition-transform"
        >
          <ChevronLeft className="w-10 h-10 ml-1" />
        </button>
      </div>
      <div className="mx-auto w-full max-w-[800px] rounded-2xl overflow-hidden">
        {/* Carousel */}
        <div className="relative">
          <div className="bg-black py-5 w-full border border-green-200 ">
            <div className="flex flex-col items-center">
              {/* Carousel Cards */}
              <div className="text-[#B1E9AB] font-bold text-3xl pb-8 pt-4">
                <h1>Sayur Panen</h1>
              </div>
              <div className="absolute ml-auto right-24 top-8 cursor-pointer">
                <img src="/assets/sayur-panen/FaQ.png" className="w-12" />
              </div>
              <div className="relative w-full flex items-center justify-center">
                <div
                  className="flex items-center gap-8 overflow-x-auto scroll-smooth scrollbar-hide"
                  ref={scrollRef}
                  style={{
                    width: "100%",
                    scrollSnapType: "x mandatory",
                    paddingLeft: "160px",
                    paddingRight: "160px",
                  }}
                >
                  {carouselData.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        scrollSnapAlign: "center",
                      }}
                    >
                      <CarouselCard
                        item={item}
                        idx={idx}
                        active={activeIdx === idx}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/* Carousel Dots & Arrow */}
              <div className="flex justify-center items-center gap-2 mt-3 mb-3">
                <button
                  onClick={handlePrev}
                  disabled={activeIdx === 0}
                  className="w-5 h-5 flex items-center justify-center cursor-pointer"
                  aria-label="Sebelumnya"
                  style={{ opacity: activeIdx === 0 ? 0.4 : 1 }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <polygon points="11,3 5,8 11,13" fill="white" />
                  </svg>
                </button>
                {carouselData.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToIdx(idx)}
                    className="rounded-full"
                    style={{
                      width: 8,
                      height: 8,
                      backgroundColor:
                        activeIdx === idx ? "#FACC15" : "#D1D5DB",
                    }}
                    aria-label={`Go to slide ${idx + 1}`}
                  ></button>
                ))}
                <button
                  onClick={handleNext}
                  disabled={activeIdx === carouselData.length - 1}
                  className="w-5 h-5 flex items-center justify-center cursor-pointer"
                  aria-label="Berikutnya"
                  style={{
                    opacity: activeIdx === carouselData.length - 1 ? 0.4 : 1,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <polygon points="5,3 11,8 5,13" fill="white" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Rewards Section */}
        <div className="bg-white rounded-2xl p-4 shadow border border-green-500 mb-10 relative -top-3">
          <div className="text-center font-bold text-2xl mb-4">
            {activeIdx === 0 && "Rewards di Level Benih"}
            {activeIdx === 1 && "Rewards di Level Bunga"}
            {activeIdx === 2 && "Rewards di Level Buah"}
            {activeIdx === 3 && "Rewards di Level Panen"}
          </div>
          {/* Reward icons in rows */}
          <div className="flex flex-col items-center gap-4">
            {getRewardRows(rewardData[activeIdx]).map((row, rowIdx) => (
              <div
                key={rowIdx}
                className="flex gap-12 justify-start"
                style={{ width: "100%", maxWidth: "360px" }}
              >
                {row.map((reward, idx) => (
                  <RewardCard
                    key={idx}
                    icon={reward.icon}
                    label={reward.label}
                    oval={reward.oval}
                  />
                ))}
              </div>
            ))}
          </div>
          {/* Riwayat XP hanya di index 0 */}
          {activeIdx === 0 && (
            <div className="bg-[#F5FFCE] rounded-xl flex items-center justify-between px-4 py-3 mt-6 mx-auto w-full max-w-[400px] border border-green-500 mb-6 cursor-pointer">
              <div className="flex ">
                <div className="flex items-center gap-2">
                  <img src="/assets/sayur-panen/xp.png" className="w-12 h-12" />
                </div>
                <div className=" text-xs my-auto">
                  <div className="font-bold text-sm text-black mb-1">
                    Riwayat XP
                  </div>
                  <div className="text-xs text-black">
                    <span>Yang telah didapat dari transaksimu</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-6 h-6" />
            </div>
          )}
        </div>
      </div>
      {/* Hide scrollbar */}
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

export default SayurPanenSection;
