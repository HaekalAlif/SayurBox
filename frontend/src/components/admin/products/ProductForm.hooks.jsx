import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProduct,
  createProduct,
  updateProduct,
  getImageUrl,
} from "../../../service/products/product";
import { getCategories } from "../../../service/categories/category";

export const useProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [formData, setFormData] = useState({
    category_id: "",
    name: "",
    short_description: "",
    description: "",
    price: "",
    original_price: "",
    discount_percent: "",
    availability: "available",
    images: [],
    unit: "",
  });

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);

        if (response.data.length > 0 && !isEditMode) {
          setFormData((prev) => ({
            ...prev,
            category_id: response.data[0].id.toString(),
          }));
        }
      } catch (err) {
        setError("Failed to load categories");
      }
    };

    // Fetch product data if in edit mode
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProduct(id);
        const product = response.data;

        setFormData({
          category_id: product.category_id.toString(),
          name: product.name,
          short_description: product.short_description,
          description: product.description,
          price: product.price,
          original_price: product.original_price,
          discount_percent: product.discount_percent || "",
          availability: product.availability,
          images: [],
          unit: product.unit,
        });

        // Set image previews from product.images array
        if (Array.isArray(product.images)) {
          setImagePreviews(
            product.images.map((img) => getImageUrl(img.image_url))
          );
        } else {
          setImagePreviews([]);
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to load product");
        setLoading(false);
      }
    };

    fetchCategories();
    if (isEditMode) {
      fetchProduct();
    }
  }, [id, isEditMode]);

  // Handle change for all fields including multiple images
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const newFiles = Array.from(files);
      // Gabungkan file lama dan baru
      const allFiles = [...formData.images, ...newFiles];
      setFormData({ ...formData, images: allFiles });

      // Preview semua gambar (lama + baru)
      Promise.all(
        allFiles.map(
          (file) =>
            new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.readAsDataURL(file);
            })
        )
      ).then((results) => {
        setImagePreviews(results);
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Hapus gambar dari preview dan dari formData.images
  const handleRemoveImage = (idx) => {
    const newImages = [...formData.images];
    newImages.splice(idx, 1);
    setFormData({ ...formData, images: newImages });

    const newPreviews = [...imagePreviews];
    newPreviews.splice(idx, 1);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Kirim images sebagai images[] di FormData
      const dataToSubmit = {
        ...formData,
        price: parseFloat(formData.price),
        original_price: parseFloat(formData.original_price),
        discount_percent: formData.discount_percent
          ? parseInt(formData.discount_percent)
          : null,
        category_id: parseInt(formData.category_id),
      };

      // Service sudah handle images[] jika array file
      if (isEditMode) {
        await updateProduct(id, dataToSubmit);
      } else {
        await createProduct(dataToSubmit);
      }

      navigate("/admin/products");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return {
    isEditMode,
    loading,
    error,
    categories,
    formData,
    imagePreviews,
    handleChange,
    handleSubmit,
    navigate,
  };
};
