import { useState, useEffect } from "react";
import {
  getAddresses,
  deleteAddress,
  updateAddress,
  getAddress,
  setDefaultAddress as setDefaultAddressApi,
} from "@/service/addresses/address";

export function useAddressList() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(0);

  useEffect(() => {
    setLoading(true);
    getAddresses()
      .then((res) => {
        setAddresses(res.data);
        setLoading(false);
        // Otomatis pilih yang is_default
        const defaultIdx = res.data.findIndex((addr) => addr.is_default);
        setSelectedAddress(defaultIdx !== -1 ? defaultIdx : 0);
      })
      .catch((err) => {
        setError(
          err.response?.data?.message || "Gagal mengambil daftar alamat."
        );
        setLoading(false);
      });
  }, []);

  const handleSetDefaultAddress = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await setDefaultAddressApi(id);
      const res = await getAddresses();
      setAddresses(res.data);
      const defaultIdx = res.data.findIndex((addr) => addr.is_default);
      setSelectedAddress(defaultIdx !== -1 ? defaultIdx : 0);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mengubah alamat default.");
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteAddress(id);
      const updated = addresses.filter((addr) => addr.id !== id);
      setAddresses(updated);
      const defaultIdx = updated.findIndex((addr) => addr.is_default);
      setSelectedAddress(defaultIdx !== -1 ? defaultIdx : 0);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menghapus alamat.");
      setLoading(false);
    }
  };

  const handleEditAddress = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAddress(id);
      setLoading(false);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mengambil detail alamat.");
      setLoading(false);
      return null;
    }
  };

  return {
    addresses,
    loading,
    error,
    selectedAddress,
    setSelectedAddress,
    handleSetDefaultAddress,
    handleDeleteAddress,
    handleEditAddress,
    setAddresses,
  };
}
