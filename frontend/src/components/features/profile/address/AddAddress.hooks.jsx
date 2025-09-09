import { useState, useEffect } from "react";
import {
  createAddress,
  getAddress,
  updateAddress,
} from "@/service/addresses/address";
import { useParams } from "react-router-dom";

export function useAddAddress() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams(); // Ambil parameter id dari URL

  // Form data with default empty values
  const [formData, setFormData] = useState({
    location: "",
    courierNote: "",
    recipientName: "",
    recipientPhone: "",
    recipientEmail: "",
    addressType: "",
  });

  // Fetch address data if id exists (edit mode)
  useEffect(() => {
    if (id) {
      setIsEdit(true);
      setLoading(true);
      getAddress(id)
        .then((res) => {
          const address = res.data;
          setFormData({
            location: address.full_address || "",
            courierNote: address.notes || "",
            recipientName: address.recipient_name || "",
            recipientPhone: address.phone || "",
            recipientEmail: address.email || "",
            addressType: address.address_label || "",
          });
          setLoading(false);
        })
        .catch((err) => {
          setError(
            err.response?.data?.message || "Gagal mengambil data alamat"
          );
          setLoading(false);
        });
    }
  }, [id]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleQuickNote = (note) => {
    setFormData((prev) => ({
      ...prev,
      courierNote: prev.courierNote + (prev.courierNote ? ", " : "") + note,
    }));
  };

  const handleAddressTypeSelect = (type) => {
    setFormData((prev) => ({
      ...prev,
      addressType: type,
    }));
  };

  const handleAddAddress = async (data) => {
    setLoading(true);
    setError(null);

    try {
      let res;

      // Update existing address if in edit mode
      if (isEdit) {
        res = await updateAddress(id, data);
      } else {
        // Create new address
        res = await createAddress(data);
      }

      setLoading(false);
      return res;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (isEdit ? "Gagal mengupdate alamat" : "Gagal menambahkan alamat baru")
      );
      setLoading(false);
      return null;
    }
  };

  return {
    loading,
    error,
    isEdit,
    formData,
    handleInputChange,
    handleQuickNote,
    handleAddressTypeSelect,
    handleAddAddress,
  };
}
