import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductBySlug,
  getImageUrl,
} from "@/service/products/product";

export const useProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [variants, setVariants] = useState([]);
  const [maxQuantity, setMaxQuantity] = useState(11); 

  const formatCurrency = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProductBySlug(slug);
        const productData = response.data;

        const imagesArr = Array.isArray(productData.images)
          ? productData.images.map((img) => ({
              url: getImageUrl(img.image_url),
              is_primary: img.is_primary,
            }))
          : [];

        let mainImageUrl = imagesArr[0]?.url || "/assets/default-product.png";
        if (imagesArr.length > 0) {
          const primary = imagesArr.find((img) => img.is_primary);
          if (primary) mainImageUrl = primary.url;
        }

        const thumbnails = imagesArr
          .filter((img) => img.url !== mainImageUrl)
          .map((img) => img.url);

        const formattedProduct = {
          id: productData.id,
          title: productData.name,
          slug: productData.slug,
          subtitle: productData.short_description,
          description: productData.description,
          currentPrice: formatCurrency(productData.price),
          originalPrice: formatCurrency(productData.original_price),
          discount: productData.discount_percent
            ? `${productData.discount_percent}%`
            : null,
          rawPrice: productData.price,
          rawOriginalPrice: productData.original_price,
          unit: productData.unit,
          availability:
            productData.availability === "available"
              ? "Besok"
              : productData.availability === "limited"
              ? "Stok Terbatas"
              : "Tidak Tersedia",
          category: [productData.category.name],
          stock: productData.stock ?? 0,
          images: {
            main: mainImageUrl,
            thumbnails: thumbnails,
          },
        };

        setProduct(formattedProduct);

        const defaultVariants = [`1 ${productData.unit.toUpperCase()}`];
        if (
          productData.unit.toLowerCase() === "pcs" ||
          productData.unit.toLowerCase() === "pc"
        ) {
          defaultVariants.push("1 Kg");
        } else if (productData.unit.toLowerCase() === "kg") {
          defaultVariants.push("500 gram");
        }

        setVariants(defaultVariants);
        setSelectedVariant(defaultVariants[0]);

        setMaxQuantity(productData.stock ?? 11);

        setLoading(false);
      } catch (err) {
        setError("Failed to load product details");
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
  };

  const handleQuantityChange = (type) => {
    if (type === "increase" && quantity < maxQuantity) {
      setQuantity(quantity + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleChatSayurbox = () => {
    setToastMessage("Fitur chat akan segera hadir!");
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return {
    product,
    loading,
    error,
    selectedImageIndex,
    selectedVariant,
    quantity,
    maxQuantity,
    showFullDescription,
    showToast,
    toastMessage,
    variants,
    handleBackClick,
    handleThumbnailClick,
    handleVariantSelect,
    handleQuantityChange,
    toggleDescription,
    handleChatSayurbox,
    setShowToast,
  };
};
