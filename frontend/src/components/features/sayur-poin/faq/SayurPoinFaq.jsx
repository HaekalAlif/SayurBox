import React from "react";
import { ChevronLeft } from "lucide-react";

const detailImages = [
  "/assets/sayur-poin/faq/image-1.png",
  "/assets/sayur-poin/faq/image-2.png",
];

const SayurPoinFaq = () => {
  const handleBackClick = () => window.history.back();

  return (
    <div
      className="min-h-screen w-full bg-pattern"
      style={{
        backgroundImage: `url("/bg-pattern-sayurbox.png")`,
        backgroundRepeat: "repeat",
        backgroundSize: "130px",
      }}
    >
      {/* Header with Back Button */}
      <div className="absolute bg-white z-10 pl-4">
        <button
          onClick={handleBackClick}
          className="relative top-12 left-6 cursor-pointer items-center w-14 h-14 text-lg text-green-600 border border-green rounded-full border-green-400 hover:scale-110 transition-transform"
        >
          <ChevronLeft className="w-10 h-10 ml-1" />
        </button>
      </div>
      {/* Container */}
      <div className="mx-auto w-full max-w-[480px] rounded-2xl overflow-hidden mb-10 pt-12">
        {/* Hero Image */}
        <img
          src="/assets/sayur-poin/detail/image-4.png"
          alt="SayurPoin Faq"
          className="w-full h-auto block"
        />

        {/* Detail Images */}
        <div className="flex flex-col">
          {detailImages.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`SayurPoin Faq ${idx + 1}`}
              className="w-full h-auto shadow"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SayurPoinFaq;
