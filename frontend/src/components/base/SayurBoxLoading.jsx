import React from "react";

const SayurboxLoading = () => {
  return (
    <div className="flex items-center justify-center w-full py-10">
      <div className="flex flex-col items-center">
        {/* Logo-inspired loader */}
        <div className="relative h-20 w-20">
          {/* Outer rotating circle */}
          <div className="absolute inset-0 animate-spin-slow">
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                strokeWidth="6"
                stroke="#22c55e"
                strokeDasharray="70 180"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Inner pulse circle */}
          <div className="absolute inset-0 flex items-center justify-center animate-pulse">
            <div className="h-12 w-12 rounded-full bg-green-500 opacity-80"></div>
          </div>

          {/* Central leaf icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-10 w-10 text-white">
              <path
                fill="currentColor"
                d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* CSS animations */}
      <style>{`
        .animate-spin-slow {
          animation: spin 2s linear infinite;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default SayurboxLoading;
