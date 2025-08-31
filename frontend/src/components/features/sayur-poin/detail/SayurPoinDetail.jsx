import React from "react";
import { ChevronLeft } from "lucide-react";

const detailImages = [
  "/assets/sayur-poin/detail/image-1.png",
  "/assets/sayur-poin/detail/image-2.png",
  "/assets/sayur-poin/detail/image-3.png",
  "/assets/sayur-poin/detail/image-4.png",
];

const SayurPoinDetail = () => {
  const handleBackClick = () => window.history.back();

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Header with Back Button */}
      <div className="top-0 bg-white z-10 pl-4">
        <button
          onClick={handleBackClick}
          className="relative top-12 left-6 cursor-pointer items-center w-14 h-14 text-lg text-green-600 border border-green rounded-full border-green-400 hover:scale-110 transition-transform"
        >
          <ChevronLeft className="w-10 h-10 ml-1" />
        </button>
      </div>
      {/* Container */}
      <div className="mx-auto w-full max-w-[480px] bg-white rounded-2xl overflow-hidden mb-10">
        {/* Hero Image */}
        <img
          src="/assets/sayur-poin/detail/sayur-poin-detail.png"
          alt="SayurPoin Guide"
          className="w-full h-auto block"
        />

        {/* Detail Images */}
        <div className="flex flex-col">
          {detailImages.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`SayurPoin Detail ${idx + 1}`}
              className="w-full h-auto shadow"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SayurPoinDetail;
