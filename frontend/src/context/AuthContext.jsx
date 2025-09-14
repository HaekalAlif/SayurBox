import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { getAuthUser } from "@/service/auth/auth"; // Impor service API

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true); // Tambah state loading

  const setUser = (userData) => {
    setUserState(userData);
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("user");
    }
  };

  // Fungsi untuk mengambil data user dari API dan memperbarui state
  const fetchUser = useCallback(async () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setLoading(false);
      return;
    }
    try {
      const response = await getAuthUser();
      setUser(response.data); // Perbarui state dan localStorage
    } catch (error) {
      console.error("Failed to fetch user, logging out.", error);
      setUser(null); // Jika token tidak valid, logout user
    } finally {
      setLoading(false);
    }
  }, []);

  // Ambil user saat komponen pertama kali dimuat
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
