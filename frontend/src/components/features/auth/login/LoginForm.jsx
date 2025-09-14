import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "./LoginForm.hooks";

const ErrorModal = ({ title, message, onClose }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center"
    onClick={onClose} // Tutup modal jika klik di luar modal
  >
    <div
      className="bg-white rounded-lg shadow-lg border border-red-400 px-8 py-4 max-w-lg w-full text-center"
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="text-lg font-bold mb-3">{title}</h3>
      <p className="text-gray-700 mb-2">{message}</p>
    </div>
  </div>
);

const LoginForm = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, loading, error } = useLogin();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await handleLogin({ emailOrPhone, password });
    if (result) {
      if (result.role === "admin" || result.role === 1) {
        navigate("/admin/products");
      } else {
        navigate("/");
      }
    } else if (error) {
      // Deteksi error dan tampilkan modal sesuai jenis error
      if (error.toLowerCase().includes("email")) {
        setModalContent({
          title: "E-Mail Salah!",
          message: "E-mail yang anda masukkan salah/tidak terisi, coba lagi!",
        });
      } else {
        setModalContent({
          title: "Password Salah!",
          message: "Password yang anda masukkan salah/tidak terisi, coba lagi!",
        });
      }
      setShowModal(true);
    }
  };

  return (
    <div
      className="flex bg-gray-100"
      style={{
        minHeight: "100dvh",
        height: "100dvh",
        overflow: "hidden",
      }}
    >
      {/* Modal Error */}
      {showModal && (
        <ErrorModal
          title={modalContent.title}
          message={modalContent.message}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Left Side - Image & Info */}
      <div className="hidden md:flex w-1/2 relative">
        <img
          src="/assets/auth/login-bg.png"
          alt="Petani di Ladang"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <img
              src="/assets/auth/sayurbox-logo.png"
              alt="Sayurbox Logo"
              className="h-20"
            />
          </div>
          <h2 className="text-xl font-bold mb-6 text-gray-900">Masuk</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block font-semibold mb-2 text-gray-800">
                Nomor HP/E-mail
              </label>
              <input
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="Masukkan Nomor Handphone atau E-mail"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-1">
                Cth. 08969123456789 atau dummy@mail.com
              </p>
            </div>
            <div className="mb-6">
              <label className="block font-semibold mb-2 text-gray-800">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan Password"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition-colors cursor-pointer"
              disabled={loading}
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>
          <div className="flex items-center my-6">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-500 font-semibold">
              Atau masuk dengan
            </span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          <div className="flex justify-center gap-8 mb-4">
            <button className="flex items-center transition-colors hover:scale-120 transition-transform cursor-pointer">
              <img
                src="/assets/auth/facebook.png"
                alt="Facebook"
                className="w-12 h-12"
              />
            </button>
            <button className="flex items-center transition-colors hover:scale-120 transition-transform cursor-pointer">
              <img
                src="/assets/auth/google.png"
                alt="Google"
                className="w-12 h-12"
              />
            </button>
          </div>
          <div className="text-center mt-2">
            <span className="text-gray-700">Belum punya akun?</span>{" "}
            <a
              href="/register"
              className="text-green-700 font-bold hover:underline"
            >
              Daftar sekarang
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
