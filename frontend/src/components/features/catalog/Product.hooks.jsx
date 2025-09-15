import { useState, useEffect, useCallback } from "react";
import {
  getProducts,
  getProductsByCategorySlug,
  searchProducts,
  getImageUrl,
} from "@/service/products/product";
import { useSearchParams } from "react-router-dom";

export const useProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");

  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get("category");

  const formatPrice = (price) => {
    return `Rp ${Number(price).toLocaleString("id-ID")}`;
  };

  const calculateDiscount = (originalPrice, discountedPrice) => {
    if (!originalPrice || !discountedPrice) return 0;
    const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
    return Math.round(discount);
  };

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      let response;

      if (categorySlug) {
        response = await getProductsByCategorySlug(categorySlug);
      } else if (searchQuery) {
        response = await searchProducts(searchQuery);
      } else {
        response = await getProducts();
      }

      const formattedProducts = response.data.map((product) => {
        let imageUrl = "/assets/default-product.png";
        if (Array.isArray(product.images) && product.images.length > 0) {
          const primary = product.images.find((img) => img.is_primary);
          imageUrl = getImageUrl(
            primary ? primary.image_url : product.images[0].image_url
          );
        } else if (product.image_url) {
          imageUrl = getImageUrl(product.image_url);
        }

        return {
          id: product.id,
          title: product.name,
          slug: product.slug,
          image: imageUrl,
          currentPrice: formatPrice(product.price),
          originalPrice: formatPrice(product.original_price),
          discount: product.discount_percent
            ? `${product.discount_percent}%`
            : null,
          unit: product.unit,
          shortDescription: product.short_description,
          description: product.description,
          availability: product.availability,
          categoryId: product.category_id,
          category: product.category?.name || "Uncategorized",
          rawPrice: Number(product.price),
          rawOriginalPrice: Number(product.original_price),
          rawDiscount: product.discount_percent || 0,
        };
      });

      setProducts(formattedProducts);
      sortAndFilterProducts(formattedProducts, activeTab);
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [categorySlug, searchQuery, activeTab]);

  const sortAndFilterProducts = useCallback((productsToSort, tabId) => {
    let sorted = [...productsToSort];

    switch (tabId) {
      case "latest":
        break;
      case "price-low":
        sorted.sort((a, b) => a.rawPrice - b.rawPrice);
        break;
      case "price-high":
        sorted.sort((a, b) => b.rawPrice - a.rawPrice);
        break;
      case "discount":
        sorted.sort((a, b) => b.rawDiscount - a.rawDiscount);
        break;
      case "choices":
        sorted = sorted.sort(() => Math.random() - 0.5);
        break;
      default:
        break;
    }

    setFilteredProducts(sorted);
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    sortAndFilterProducts(products, tabId);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products: filteredProducts,
    loading,
    error,
    activeTab,
    handleTabChange,
    handleSearch,
    calculateDiscount,
    formatPrice,
    fetchProducts,
    searchQuery,
    categorySlug,
  };
};
