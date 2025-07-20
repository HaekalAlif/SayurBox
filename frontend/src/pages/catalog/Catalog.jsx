import React from "react";
import FilterSection from "../../components/features/catalog/FilterSection";
import ProductSection from "../../components/features/catalog/Product";

const Catalog = () => {
  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* Left Sidebar - Filter Section */}
        <div className="flex-shrink-0">
          <FilterSection />
        </div>

        {/* Right Content - Product Grid */}
        <div className="flex-1 overflow-x-hidden">
          <div className="py-6">
            <ProductSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
