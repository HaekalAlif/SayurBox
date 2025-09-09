import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, getCsrfCookie } from "@/service/auth/auth";
import { useAuth } from "@/context/AuthContext";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = async ({ emailOrPhone, password }) => {
    setLoading(true);
    setError(null);
    try {
      await getCsrfCookie();
      const response = await login({
        email: emailOrPhone,
        password,
      });

      setLoading(false);

      const res = response?.data || response;
      setUser(res.user);

      console.log(setUser)

      // Redirect sesuai role
      if (res.user.role === 1) {
        navigate("/admin");
      } else if (res.user.role === 0) {
        navigate("/");
      }

      return res;
      
    } catch (err) {
      setError(
        err.response?.data?.message || "Login gagal. Silakan cek data Anda."
      );
      setLoading(false);
      return null;
    }
  };

  return { handleLogin, loading, error };
}
