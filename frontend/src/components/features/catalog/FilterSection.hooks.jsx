import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getProductsByCategorySlug } from "../../../service/products/product";

export const useCatalogFilter = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categorySlug = searchParams.get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        if (categorySlug) {
          const response = await getProductsByCategorySlug(categorySlug);
          setProducts(response.data);
        } else {
          // fallback: ambil semua produk
        }
        setError(null);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categorySlug]);

  return { products, loading, error, categorySlug };
};
