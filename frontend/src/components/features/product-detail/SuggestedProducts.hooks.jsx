import { useEffect, useState } from "react";
import { getProducts, getImageUrl } from "@/service/products/product";

function getRandomItems(array, count) {
  if (!Array.isArray(array)) return [];
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export const useSuggestedProducts = () => {
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
            price: Number(product.price),
            originalPrice: Number(product.original_price),
            discount: product.discount_percent
              ? `${product.discount_percent}%`
              : null,
            unit: product.unit,
            image: imageUrl,
            badgeTop: "/assets/landing/icons/badge-masak.png",
            badgeLabel: "Best Quality for MASAK!",
          };
        });
        setProducts(getRandomItems(formattedProducts, 10));
        setError(null);
      } catch (err) {
        console.error("Failed to fetch suggested products:", err);
        setError("Gagal mengambil produk rekomendasi");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return { products, loading, error };
};
