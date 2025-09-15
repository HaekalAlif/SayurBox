# SayurBox Frontend

## 📋 Deskripsi

Frontend untuk aplikasi SayurBox, sebuah e-commerce produk segar yang dibangun dengan React, Vite, dan Tailwind CSS. Aplikasi ini menyediakan antarmuka pengguna yang intuitif untuk berbelanja produk segar, mengelola keranjang belanja, dan melacak pesanan.

## 🚀 Fitur Utama

- Autentikasi pengguna (login, register, logout)
- Katalog produk dengan filter kategori
- Keranjang belanja interaktif
- Proses checkout
- Halaman profil pengguna
- Dashboard admin untuk manajemen pesanan
- Tampilan responsif untuk semua ukuran perangkat

## 🛠️ Teknologi

- **React 18** - Library JavaScript untuk UI
- **Vite** - Build tool dan development server
- **Tailwind CSS** - Framework CSS utility-first
- **Axios** - HTTP client untuk API requests
- **React Router** - Routing library
- **React Context API** - State management
- **React Query** - Data fetching dan caching

## ⚙️ Instalasi

```bash
# Clone repository
git clone https://github.com/HaekalAlif/SayurBox.git
cd sayurbox/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Aplikasi akan tersedia di `http://localhost:5173`

## 🔗 Integrasi dengan Backend

Frontend berkomunikasi dengan Backend Laravel melalui RESTful API. Pastikan backend sudah berjalan sebelum menggunakan aplikasi frontend.

Konfigurasi API endpoint dapat diubah di file `.env` atau `src/service/api.js`.

## 📁 Struktur Folder

```
src/
├── assets/         # Static assets (images, icons)
├── components/     # Reusable UI components
├── context/        # React context untuk state management
├── pages/          # Page components
├── service/        # API service dan utilities
├── App.jsx         # Main application component
└── main.jsx        # Application entry point
```

## 🧪 Testing

```bash
# Menjalankan unit tests
npm run test

# Menjalankan e2e tests
npm run test:e2e
```

## 🔍 Fitur Penting

### Authentication Context

`AuthContext` menyediakan state management untuk autentikasi pengguna. Komponen ini mengatur login, logout, dan persistensi session user.

### API Client

Modul `api.js` mengkonfigurasi Axios untuk berkomunikasi dengan backend, termasuk handling untuk CSRF token dan credentials.


