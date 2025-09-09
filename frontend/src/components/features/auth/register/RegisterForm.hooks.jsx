import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register, getCsrfCookie } from "@/service/auth/auth";
import { useAuth } from "@/context/AuthContext";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleRegister = async ({
    name,
    email,
    password,
    password_confirmation,
    phone,
  }) => {
    setLoading(true);
    setError(null);
    try {
      await getCsrfCookie();
      const response = await register({
        name,
        email,
        password,
        password_confirmation,
        phone,
      });

      setLoading(false);

      const res = response?.data || response;
      setUser(res.user);

      navigate("/");

      return res;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registrasi gagal. Silakan cek data Anda."
      );
      setLoading(false);
      return null;
    }
  };

  return { handleRegister, loading, error };
}
