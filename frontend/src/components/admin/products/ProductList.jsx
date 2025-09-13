import React from "react";
import { Link } from "react-router-dom";
import { PlusCircle, Pencil, Trash2, Search, RefreshCw } from "lucide-react";
import { useProductList } from "./ProductList.hooks";
import BaseModal from "@/components/base/BaseModal";
import SayurboxLoading from "@/components/base/SayurBoxLoading";

const ProductList = () => {
  const {
    loading,
    error,
    searchTerm,
    confirmDelete,
    filteredProducts,
    handleEdit,
    handleDeleteConfirm,
    handleDelete,
    handleCancelDelete,
    handleSearch,
    fetchProducts,
    formatCurrency,
    getImageUrl,
  } = useProductList();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-700">
          Product Management
        </h1>
        <Link
          to="/admin/product-form"
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Product
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-4 flex items-center justify-between">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>

        <button
          onClick={fetchProducts}
          className="flex items-center px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </button>
      </div>

      {loading && !confirmDelete ? (
        <div className="flex justify-center items-center h-64">
          <SayurboxLoading />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left border-b">Image</th>
                <th className="py-3 px-4 text-left border-b">Name</th>
                <th className="py-3 px-4 text-left border-b">Category</th>
                <th className="py-3 px-4 text-left border-b">Price</th>
                <th className="py-3 px-4 text-left border-b">Original Price</th>
                <th className="py-3 px-4 text-left border-b">Discount</th>
                <th className="py-3 px-4 text-left border-b">Status</th>
                <th className="py-3 px-4 text-center border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-4 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  // Ambil gambar utama dari relasi images (primary atau pertama)
                  let imageUrl = "/assets/default-product.png";
                  if (
                    Array.isArray(product.images) &&
                    product.images.length > 0
                  ) {
                    const primary = product.images.find(
                      (img) => img.is_primary
                    );
                    imageUrl = getImageUrl(
                      primary ? primary.image_url : product.images[0].image_url
                    );
                  }

                  return (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">
                        <img
                          src={imageUrl}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-md"
                          onError={(e) => {
                            e.target.src = "/assets/default-product.png";
                          }}
                        />
                      </td>
                      <td className="py-3 px-4 border-b">
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {product.short_description}
                        </div>
                      </td>
                      <td className="py-3 px-4 border-b">
                        {product.category?.name || "Uncategorized"}
                      </td>
                      <td className="py-3 px-4 border-b">
                        {formatCurrency(product.price)}
                        <span className="text-sm text-gray-500 ml-1">
                          /{product.unit}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b">
                        {formatCurrency(product.original_price)}
                      </td>
                      <td className="py-3 px-4 border-b">
                        {product.discount_percent
                          ? `${product.discount_percent}%`
                          : "-"}
                      </td>
                      <td className="py-3 px-4 border-b">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium
                          ${
                            product.availability === "available"
                              ? "bg-green-100 text-green-800"
                              : product.availability === "limited"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.availability === "available"
                            ? "Available"
                            : product.availability === "limited"
                            ? "Limited"
                            : "Out of Stock"}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleEdit(product.id)}
                            className="p-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 cursor-pointer"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteConfirm(product.id)}
                            className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <BaseModal
          open={!!confirmDelete}
          onClose={handleCancelDelete}
          title="Hapus Produk"
          description="Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan."
          confirmText={loading ? "Menghapus..." : "Hapus"}
          cancelText="Batal"
          onConfirm={() => handleDelete(confirmDelete)}
          confirmColor="bg-red-600 hover:bg-red-700"
          cancelColor="border-green-600 text-green-600 hover:bg-green-50"
        />
      )}
    </div>
  );
};

export default ProductList;
