import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, MapPin, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { logout } from "@/service/auth/auth";
import { getAddresses, setDefaultAddress } from "@/service/addresses/address";
import { getCart } from "@/service/cart/cart";
import { getOrders } from "@/service/orders/order";
import { searchProducts, getImageUrl } from "@/service/products/product";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Jumlah produk di cart dan order
  const [cartCount, setCartCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  const addressContainerRef = useRef(null);
  const profileContainerRef = useRef(null);
  const searchDropdownRef = useRef(null);

  const { user, setUser } = useAuth();
  const isLoggedIn = !!user;
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        addressContainerRef.current &&
        !addressContainerRef.current.contains(event.target)
      ) {
        setShowAddress(false);
      }
      if (
        profileContainerRef.current &&
        !profileContainerRef.current.contains(event.target)
      ) {
        setShowProfile(false);
      }
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target)
      ) {
        setShowSearchDropdown(false);
      }
    }

    if (showAddress || showProfile || showSearchDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAddress, showProfile, showSearchDropdown]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchAddresses();
      fetchCartCount();
      fetchOrderCount();
    }
  }, [isLoggedIn]);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const response = await getAddresses();
      setAddresses(response.data);

      const defaultIdx = response.data.findIndex((addr) => addr.is_default);
      if (defaultIdx !== -1) {
        setSelectedAddress(defaultIdx);
      }

      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mengambil alamat");
      setLoading(false);
    }
  };

  // Ambil jumlah produk di cart (dari cart user)
  const fetchCartCount = async () => {
    try {
      if (!user?.id) return setCartCount(0);
      const response = await getCart(user.id);
      setCartCount(
        Array.isArray(response.data?.items) ? response.data.items.length : 0
      );
    } catch {
      setCartCount(0);
    }
  };

  // Ambil jumlah order
  const fetchOrderCount = async () => {
    try {
      const response = await getOrders();
      setOrderCount(Array.isArray(response.data) ? response.data.length : 0);
    } catch {
      setOrderCount(0);
    }
  };

  // Search AJAX
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.length > 1) {
        searchProducts(searchQuery)
          .then((res) => {
            setSearchResults(Array.isArray(res.data) ? res.data : []);
            setShowSearchDropdown(true);
          })
          .catch(() => {
            setSearchResults([]);
            setShowSearchDropdown(false);
          });
      } else {
        setSearchResults([]);
        setShowSearchDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSelectAddress = async (idx) => {
    setSelectedAddress(idx);
    try {
      await setDefaultAddress(addresses[idx].id);
      fetchAddresses();
    } catch (err) {
      console.error("Gagal mengubah alamat default:", err);
    }
  };

  const handleShowAddress = () => {
    if (!isLoggedIn) {
      goTo(paths.login);
      return;
    }
    setShowAddress(!showAddress);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout(); 
      setUser(null); 
      window.location.href = "/"; 
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatAddress = (address) => {
    if (!address) return "";
    return address.full_address || address.address;
  };

  const paths = {
    logo: "/",
    cart: "/cart",
    bill: "/orders",
    cart2: "/catalog",
    profile: "/profile",
    voucher: "/voucher",
    sayurpoin: "/sayur-poin",
    resep: "/recipe",
    pesanan: "/orders",
    keranjang: "/cart",
    sayurpanen: "/sayur-panen",
    logout: "/logout",
    alamat: "/profile/address",
    login: "/login",
  };

  const goTo = (path) => {
    window.location.href = path;
  };

  // Handle klik pada hasil search
  const handleProductClick = (slug) => {
    setShowSearchDropdown(false);
    setSearchQuery("");
    navigate(`/product/${slug}`);
  };

  return (
    <div className="w-full bg-white">
      {/* Header Utama */}
      <div className="container mx-auto px-2 py-2">
        <div className="flex items-center justify-between px-4">
          {/* Logo */}
          <div className="w-[25%] flex items-center space-x-3">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => goTo(paths.logo)}
            >
              <img
                src="/assets/header/sayurbox-logo.png"
                alt="Sayurbox Logo"
                className="h-18 w-auto object-contain"
              />
            </div>
          </div>
          {/* Search Bar */}
          <div className="w-[90%] relative">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari produknya disini!"
                className="w-full h-10 px-6 py-3 pr-12 border-2 focus:outline-none focus:border-green-400 transition-colors rounded-md"
                style={{ borderColor: "#BEE4B4" }}
                onFocus={() => {
                  if (searchResults.length > 0) setShowSearchDropdown(true);
                }}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full">
                <Search className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            {/* Dropdown hasil search */}
            {showSearchDropdown && (
              <div
                ref={searchDropdownRef}
                className="absolute left-0 top-full z-50 bg-white rounded-md shadow-xl w-full mt-2 border border-gray-200"
              >
                {searchResults.length === 0 ? (
                  <div className="p-4 text-gray-500 text-center">
                    Tidak ada produk ditemukan
                  </div>
                ) : (
                  <ul>
                    {searchResults.map((product) => (
                      <li
                        key={product.id}
                        className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-green-50 transition"
                        onClick={() => handleProductClick(product.slug)}
                      >
                        <img
                          src={getImageUrl(
                            product.images?.find((img) => img.is_primary)
                              ?.image_url || product.images?.[0]?.image_url
                          )}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div>
                          <div className="font-semibold text-gray-800">
                            {product.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {product.category?.name}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          {/* Ikon Kanan */}
          <div className="w-[50%] flex items-center space-x-10 justify-end">
            {isLoggedIn && (
              <>
                {/* Ikon Keranjang */}
                <div className="relative">
                  <div
                    className="w-14 h-14 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
                    onClick={() => goTo(paths.cart)}
                  >
                    <img src="/assets/header/cart.png" className="w-8" />
                  </div>
                  {cartCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">
                        {cartCount}
                      </span>
                    </div>
                  )}
                </div>
                {/* Ikon Nota */}
                <div className="relative">
                  <div
                    className="w-14 h-14 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
                    onClick={() => goTo(paths.bill)}
                  >
                    <img src="/assets/header/bill.png" className="w-8" />
                  </div>
                  {orderCount > 0 && (
                    <div
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                      style={{
                        background: "linear-gradient(45deg, #FFD42A, #4ADE80)",
                      }}
                    >
                      <span className="text-xs text-white font-bold">
                        {orderCount}
                      </span>
                    </div>
                  )}
                </div>
                {/* Ikon Keranjang 2 (tidak perlu badge) */}
                <div className="relative">
                  <div
                    className="w-14 h-14 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
                    onClick={() => goTo(paths.cart2)}
                  >
                    <img src="/assets/header/cart-2.png" className="w-8" />
                  </div>
                </div>
              </>
            )}
            {/* Ikon Profil - Profile Container */}
            {/* Ikon Profil - Profile Container */}
            <div className="relative" ref={profileContainerRef}>
              <div
                className="w-18 h-18 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow cursor-pointer relative z-60"
                style={{ backgroundColor: "#E6B800" }}
                onClick={() => {
                  if (!isLoggedIn) {
                    goTo(paths.login);
                  } else {
                    setShowProfile(!showProfile);
                  }
                }}
              >
                <img
                  src="/assets/header/profile.png"
                  alt=""
                  className="relative z-60"
                />
              </div>
              {/* Profile Dropdown */}
              {showProfile && isLoggedIn && (
                <div
                  className="absolute right-7 top-10 z-50 bg-white rounded-2xl shadow-xl p-8 flex gap-8 min-w-[520px] max-w-[600px]"
                  style={{ border: "1.5px solid #E6E6E6" }}
                >
                  <div className="gap-6 flex flex-col w-full">
                    <div className="flex gap-6">
                      {/* Kiri: Card List */}
                      <div className="flex flex-col gap-4 w-[260px]">
                        {/* Voucher */}
                        <div
                          className="flex items-center bg-white rounded-xl shadow border border-[#E6E6E6] px-4 py-3 cursor-pointer hover:shadow-lg transition"
                          onClick={() => goTo(paths.voucher)}
                        >
                          <img
                            src="/assets/profile/voucher.png"
                            className="w-12 h-12 mr-4"
                            alt="Voucher"
                          />
                          <div className="flex-1">
                            <div className="font-bold text-base text-[#BCA16A]">
                              Voucher
                            </div>
                          </div>
                          <ChevronRight className="w-6 h-6 text-[#BCA16A]" />
                        </div>
                        {/* SayurPoin */}
                        <div
                          className="flex items-center bg-white rounded-xl shadow border border-[#E6E6E6] px-4 py-3 cursor-pointer hover:shadow-lg transition"
                          onClick={() => goTo(paths.sayurpoin)}
                        >
                          <img
                            src="/assets/profile/point.png"
                            className="w-12 h-12 mr-4"
                            alt="SayurPoin"
                          />
                          <div className="flex-1">
                            <div className="font-bold text-base text-[#BCA16A]">
                              SayurPoin
                            </div>
                            <div className="text-sm text-gray-700">
                              Poin : 3000
                            </div>
                          </div>
                          <ChevronRight className="w-6 h-6 text-[#BCA16A]" />
                        </div>
                        {/* Resep */}
                        <div
                          className="flex items-center bg-white rounded-xl shadow border border-[#E6E6E6] px-4 py-3 cursor-pointer hover:shadow-lg transition"
                          onClick={() => goTo(paths.resep)}
                        >
                          <img
                            src="/assets/profile/recipe.png"
                            className="w-12 h-12 mr-4"
                            alt="Resep"
                          />
                          <div className="flex-1">
                            <div className="font-bold text-base text-[#BCA16A]">
                              Resep
                            </div>
                          </div>
                          <ChevronRight className="w-6 h-6 text-[#BCA16A]" />
                        </div>
                      </div>
                      {/* Kanan: Profile Info & Menu */}
                      <div className="flex flex-col justify-between py-2 flex-1">
                        <div>
                          <div className="font-bold text-2xl mb-4">
                            {user?.name || "User"}
                          </div>
                          <div className="flex flex-col gap-2 text-base font-medium">
                            <button
                              className="text-left cursor-pointer hover:underline"
                              onClick={() => goTo(paths.profile)}
                            >
                              Ubah Profil
                            </button>
                            <button
                              className="text-left cursor-pointer hover:underline"
                              onClick={() => goTo(paths.pesanan)}
                            >
                              Pesanan
                            </button>
                            <button
                              className="text-left cursor-pointer hover:underline"
                              onClick={() => goTo(paths.keranjang)}
                            >
                              Keranjang
                            </button>
                            <button
                              className="text-left cursor-pointer hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                              onClick={handleLogout}
                              disabled={isLoading}
                            >
                              {isLoading ? "Loading..." : "Log Out"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* SayurPanen */}
                    <div
                      className="bg-[#F5FFCE] rounded-xl flex items-center justify-between px-4 py-3 border border-green-500 shadow cursor-pointer hover:shadow-lg transition"
                      onClick={() => goTo(paths.sayurpanen)}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src="/assets/profile/sayur-panen.png"
                          className="w-10 h-10"
                          alt="SayurPanen"
                        />
                        <div>
                          <div className="font-bold text-base text-[#059669]">
                            SayurPanen
                          </div>
                          <div className="text-sm text-gray-700">
                            +700xp lagi untuk naik level!
                          </div>
                          <div className="w-full bg-gray-200 rounded h-2 mt-2">
                            <div
                              className="h-2 rounded bg-green-500"
                              style={{ width: "40%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-6 h-6 text-[#059669]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Alamat Pengiriman */}
      <div className="container mx-auto px-10 pb-3">
        <div className="text-sm font-bold text-gray-700 mb-2">Dikirim ke :</div>
        <div className="relative" ref={addressContainerRef}>
          <div
            className="flex items-center justify-between p-3 rounded-sm cursor-pointer hover:shadow-sm transition-shadow max-w-xl"
            style={{ backgroundColor: "#FFD42A" }}
            onClick={handleShowAddress}
          >
            <div className="flex items-center space-x-2 overflow-hidden max-w-[90%]">
              <MapPin className="w-4 h-4 text-gray-600 flex-shrink-0" />
              <span className="text-gray-800 font-medium truncate">
                {!isLoggedIn
                  ? "Need Login First"
                  : loading
                  ? "Memuat alamat..."
                  : addresses.length === 0
                  ? "Belum ada alamat"
                  : formatAddress(addresses[selectedAddress])}
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-green-600 flex-shrink-0" />
          </div>

          {/* Dropdown Address */}
          {showAddress && isLoggedIn && (
            <div
              className="absolute left-0 top-full z-50 bg-white rounded-sm shadow-xl p-6 w-full max-w-xl"
              style={{ border: "1.5px solid #E6E6E6" }}
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="font-bold text-lg text-gray-900">
                  Pilih Alamat Pengiriman
                </div>
                <button
                  className="text-green-700 font-semibold text-base cursor-pointer hover:text-green-500"
                  onClick={() => goTo(paths.alamat)}
                >
                  Tambah Alamat
                </button>
              </div>

              {loading ? (
                <div className="text-center py-4">Memuat alamat...</div>
              ) : addresses.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  Belum ada alamat. Silakan tambahkan alamat baru.
                </div>
              ) : (
                <div className="flex flex-col gap-4 mb-5 max-h-[300px] overflow-y-auto">
                  {addresses.map((address, idx) => (
                    <div
                      key={address.id}
                      className={`border rounded-sm px-5 py-4 bg-white flex items-center justify-between cursor-pointer transition-all ${
                        selectedAddress === idx
                          ? "border-green-600 shadow bg-green-50"
                          : "border-[#E6E6E6]"
                      }`}
                      onClick={() => handleSelectAddress(idx)}
                    >
                      <div className="overflow-hidden pr-4 flex-1">
                        <div className="flex gap-2 items-center mb-1">
                          {address.address_label && (
                            <span className="font-bold text-gray-700 text-base">
                              {address.address_label}
                            </span>
                          )}
                          <span className="font-bold text-black text-base">
                            {address.recipient_name}
                          </span>
                        </div>
                        <div className="text-gray-700 text-base mb-1">
                          {address.phone}
                        </div>
                        <div className="text-gray-700 text-sm truncate">
                          {address.full_address || address.address}
                        </div>
                      </div>
                      {/* Radio Button */}
                      <div className="flex items-center ml-4 flex-shrink-0">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="address"
                            value={idx}
                            checked={selectedAddress === idx}
                            onChange={() => handleSelectAddress(idx)}
                            className="sr-only"
                          />
                          <div className="w-7 h-7 rounded-full border-[3px] border-green-600 flex items-center justify-center bg-white transition-all duration-200">
                            <div
                              className={`w-4 h-4 bg-green-600 rounded-full transition-all duration-200 ${
                                selectedAddress === idx ? "block" : "hidden"
                              }`}
                            ></div>
                          </div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                className="w-full bg-[#FFD42A] text-black font-semibold text-lg py-3 rounded-sm flex items-center justify-between gap-2 px-4 cursor-pointer hover:shadow-lg transition"
                onClick={() => goTo(paths.alamat)}
              >
                <span>Lihat Semua Alamat</span>
                <span>
                  <ChevronRight className="w-6 h-6 text-black" />
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Garis Bawah */}
      <div
        className="w-[95%] h-1 mx-auto"
        style={{ backgroundColor: "#BEE4B4" }}
      ></div>
    </div>
  );
};

export default Header;
