import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { updateProfile } from "@/service/auth/auth";

export const useAccountSection = () => {
  const { user, fetchUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    birth_date: "",
    email: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        birth_date: user.birth_date || "",
        email: user.email || "",
        gender: user.gender || "male",
      });
    }
  }, [user]);

  const isFormDirty =
    user &&
    (formData.name !== (user.name || "") ||
      formData.phone !== (user.phone || "") ||
      formData.birth_date !== (user.birth_date || "") ||
      formData.gender !== (user.gender || "male"));

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveData = async () => {
    setIsSaveModalOpen(false);
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const dataToUpdate = {
        name: formData.name,
        phone: formData.phone,
        birth_date: formData.birth_date,
        gender: formData.gender,
      };
      await updateProfile(dataToUpdate);
      await fetchUser();
      setSuccess("Data berhasil disimpan!");
    } catch (err) {
      console.error("Failed to update profile:", err);
      const message = err.response?.data?.message || "Gagal menyimpan data.";
      setError(message);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 3000);
    }
  };

  return {
    formData,
    loading,
    error,
    success,
    isFormDirty,
    isExitModalOpen,
    setIsExitModalOpen,
    isSaveModalOpen,
    setIsSaveModalOpen,
    handleInputChange,
    handleSaveData,
  };
};
