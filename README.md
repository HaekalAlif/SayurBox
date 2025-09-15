# SayurBox - Aplikasi E-Commerce Produk Segar

## 📋 Deskripsi Proyek

SayurBox adalah aplikasi e-commerce fullstack untuk penjualan produk segar seperti sayuran, buah-buahan, dan bahan makanan lainnya. Proyek ini dibangun dengan Laravel 12 untuk backend dan React 18 untuk frontend, menawarkan pengalaman berbelanja online yang responsif dan mudah digunakan.

## 🏗️ Arsitektur Aplikasi

Proyek ini menggunakan arsitektur monorepo dengan dua bagian utama:

- **Backend**: API RESTful dengan Laravel 12, MySQL, dan Laravel Sanctum untuk autentikasi
- **Frontend**: Single Page Application dengan React 18, Vite, dan Tailwind CSS

## 🚀 Fitur Utama

### Untuk Pengguna:
- Registrasi dan autentikasi pengguna
- Browsing produk dengan filter kategori
- Manajemen keranjang belanja
- Checkout dan pembayaran
- Pelacakan status pesanan
- Manajemen profil dan alamat

### Untuk Admin:
- Dashboard admin
- Manajemen produk dan kategori
- Pengelolaan pesanan
- Laporan dan analitik

## 🛠️ Teknologi

### Backend:
- Laravel 12 (PHP Framework)
- MySQL (Database)
- Laravel Sanctum (API Authentication)
- Eloquent ORM
- Laravel Validation

### Frontend:
- React 18
- Vite (Build Tool)
- Tailwind CSS
- React Router
- Axios
- React Context API
- React Query

## ⚙️ Instalasi

### Prasyarat:
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL 8.0+
- Git

### Langkah-langkah:

1. Clone repository:
   ```bash
   git clone https://github.com/HaekalAlif/SayurBox.git
   cd SayurBox
   ```

2. Setup Backend:
   ```bash
   cd backend
   composer install
   cp .env.example .env
   # Edit .env untuk konfigurasi database
   php artisan key:generate
   php artisan migrate --seed
   php artisan serve
   ```

3. Setup Frontend:
   ```bash
   cd ../frontend
   npm install
   # Edit .env jika diperlukan
   npm run dev
   ```

4. Akses aplikasi:
   - Backend: http://localhost:8000
   - Frontend: http://localhost:5173

## 📁 Struktur Folder

```
/
├── backend/                # Laravel Backend
│   ├── app/                # Core application code
│   │   ├── Http/           # Controllers, Middleware, Requests
│   │   ├── Models/         # Eloquent models
│   │   └── Providers/      # Service providers
│   ├── config/             # Configuration files
│   ├── database/           # Migrations and seeders
│   ├── routes/             # API routes
│   └── ...
│
├── frontend/               # React Frontend
│   ├── src/                # Source code
│   │   ├── assets/         # Static assets
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React context providers
│   │   ├── pages/          # Page components
│   │   └── service/        # API services
│   └── ...
```

## 📘 Dokumentasi

Untuk informasi lebih detail tentang API dan cara penggunaan:

- [Backend Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)

## 🔐 Autentikasi

Aplikasi menggunakan Laravel Sanctum untuk autentikasi API berbasis token dengan dukungan untuk cookie. Ini memungkinkan:

- Login aman dengan cookies
- API token untuk aplikasi pihak ketiga
- CSRF protection
- Autentikasi berbasis peran

## 🌐 Deployment

### Backend:
- Dapat di-deploy pada shared hosting, VPS, atau layanan cloud seperti Laravel Forge, Heroku, atau AWS.
- Pastikan PHP dan MySQL telah terinstal dan terkonfigurasi dengan benar.

### Frontend:
- Build untuk production: `npm run build`
- Deploy static files ke layanan seperti Vercel, Netlify, atau hosting statis lainnya.

## 🧪 Testing

### Backend:
```bash
cd backend
php artisan test
```

### Frontend:
```bash
cd frontend
npm run test
```