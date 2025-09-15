import { useEffect, useState } from "react";
import { getProducts, getImageUrl } from "@/service/products/product";

export const useSpecialOffer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts();
        const formattedProducts = response.data.map((product) => {
          let imageUrl = "/assets/default-product.png";
          if (Array.isArray(product.images) && product.images.length > 0) {
            const primary = product.images.find((img) => img.is_primary);
            imageUrl = getImageUrl(
              primary ? primary.image_url : product.images[0].image_url
            );
          }
          return {
            id: product.id,
            slug: product.slug,
            title: product.name,
            image: imageUrl,
            unit: product.unit,
            currentPrice: `Rp. ${Number(product.price).toLocaleString(
              "id-ID"
            )}`,
            originalPrice: `Rp. ${Number(product.original_price).toLocaleString(
              "id-ID"
            )}`,
            discount: product.discount_percent
              ? `${product.discount_percent}%`
              : null,
            badgeTop: "assets/landing/icons/badge-masak.png",
            badgeLabel: "Best Quality for MASAK!",
          };
        });
        setProducts(formattedProducts.slice(0, 6));
        setError(null);
      } catch (err) {
        setError("Gagal mengambil data produk");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
  };
};
