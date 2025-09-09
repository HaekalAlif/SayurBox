import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useRegister } from "./RegisterForm.hooks"; // Tambahkan import hooks

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(""); // Tambahkan email
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const { handleRegister, loading, error } = useRegister(); // Pakai hooks

  const handleBackClick = () => {
    window.history.back();
  };

  // Tambahkan logic submit
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      alert("Password tidak sama!");
      return;
    }
    await handleRegister({
      name,
      email,
      password,
      password_confirmation: repeatPassword,
      phone,
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/assets/auth/bg-pattern.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "120px",
      }}
    >
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg px-36 py-10 border-2 border-green-400 mx-4">
        <div className="absolute -ml-25 border-b border-gray-200">
          <div className="flex items-center mb-4">
            <button
              onClick={handleBackClick}
              className="w-14 h-14 rounded-full border border-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-100 transition-all duration-200 mr-3 cursor-pointer"
            >
              <ChevronLeft size={46} />
            </button>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">
          Lengkapi Data Diri
        </h2>
        <p className="text-center text-md text-gray-700 mb-4">
          Lengkapi data diri terlebih dahulu untuk proses pemesanan yang lebih
          murah
        </p>
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label className="block font-semibold mb-2 text-gray-800">
              <span className="text-red-600">*</span>Nama Pengguna
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan Nama Lengkap"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-800">
              <span className="text-red-600">*</span>Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan Email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-800">
              <span className="text-red-600">*</span>Nomor HP/Whatsapp
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Masukkan nomor hp dan/atau nomor whatsapp yang bisa di hubungi"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-800">
              <span className="text-red-600">*</span>Buat Password Baru
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 Huruf/Angka"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-800">
              <span className="text-red-600">*</span>Ulangi Password
            </label>
            <input
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              placeholder="Masukkan ulang password yang sudah dibuat"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition-colors mt-4 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;