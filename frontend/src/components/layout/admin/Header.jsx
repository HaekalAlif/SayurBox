import React from "react";
import { ChevronDown } from "lucide-react";

const AdminHeader = () => {
  return (
    <header className="w-full bg-white shadow-sm border-b border-green-100">
      <div className="max-w-full mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo & Title */}
        <a
          className="flex items-center gap-3 focus:outline-none"
          aria-label="Sayurbox Admin Home"
        >
          <img
            src="/assets/header/sayurbox-logo.png"
            alt="Sayurbox Admin Logo"
            className="h-14 w-auto object-contain"
          />
        </a>
        {/* Navigation */}
        <nav className="flex items-center gap-2 md:gap-6">
          <a
            href="/admin/orders"
            className="px-3 py-2 rounded-md font-medium text-green-700 hover:bg-green-50 hover:text-green-900 transition-colors focus:outline-none"
          >
            Orders
          </a>
          <a
            href="/admin/products"
            className="px-3 py-2 rounded-md font-medium text-green-700 hover:bg-green-50 hover:text-green-900 transition-colors focus:outline-none"
          >
            Products
          </a>
        </nav>
        {/* Admin Profile */}
        <button
          type="button"
          className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-full shadow hover:bg-green-100 transition-colors focus:outline-none"
          aria-label="Admin Profile"
        >
          <img
            src="/assets/header/profile.png"
            alt="Admin"
            className="w-8 h-8 rounded-full border border-green-200 object-cover"
          />
          <span className="font-medium text-green-700">Admin</span>
          <ChevronDown className="w-4 h-4 text-green-400" />
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
