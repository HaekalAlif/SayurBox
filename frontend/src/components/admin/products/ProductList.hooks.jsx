import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProducts,
  deleteProduct,
  getImageUrl,
} from "../../../service/products/product";

export const useProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to load products. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (productId) => {
    navigate(`/admin/products/edit/${productId}`);
  };

  const handleDeleteConfirm = (productId) => {
    setConfirmDelete(productId);
  };

  const handleDelete = async (productId) => {
    try {
      setLoading(true);
      await deleteProduct(productId);
      setProducts(products.filter((product) => product.id !== productId));
      setConfirmDelete(null);
      setError(null);
    } catch (err) {
      setError("Failed to delete product. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.short_description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return {
    products,
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
    navigate,
  };
};
