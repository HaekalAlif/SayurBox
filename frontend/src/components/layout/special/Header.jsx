import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center">
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <img
            src="/assets/header/sayurbox-logo.png"
            alt="Sayurbox Logo"
            className="h-20 w-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
