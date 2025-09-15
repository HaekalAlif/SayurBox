# SayurBox Backend API

<p align="center">
  <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo">
</p>

## 📋 Deskripsi

SayurBox adalah aplikasi e-commerce untuk produk segar, dibangun dengan Laravel 12 dan MySQL. Aplikasi ini menawarkan fitur lengkap untuk pengguna dan admin, termasuk manajemen produk, keranjang belanja, checkout, dan pelacakan pesanan.

## 🚀 Fitur Utama

-   Autentikasi pengguna aman dengan Sanctum
-   Manajemen produk dan kategori
-   Keranjang belanja interaktif
-   Proses checkout lengkap
-   Manajemen pesanan untuk pengguna dan admin
-   API RESTful untuk integrasi dengan frontend

## 🛠️ Teknologi

-   **Laravel 12** - Framework PHP modern
-   **MySQL** - Sistem database
-   **Laravel Sanctum** - Autentikasi API token-based
-   **Eloquent ORM** - Object-Relational Mapping
-   **Blade Templates** - Template engine

## ⚙️ Instalasi

````bash
# Clone repository
git clone https://github.com/HaekalAlif/SayurBox.git
cd sayurbox/backend

# Install dependencies
composer install

# Copy .env example dan sesuaikan konfigurasi database
cp .env.example .env

# Generate application key
php artisan key:generate

# Jalankan migrasi dan seeder
php artisan migrate --seed

# Start development server
php artisan serve
``` Backend API

<div align="center">
  <img src="public/assets/logo-sayurbox.png" alt="SayurBox Logo" width="200">
  <p>Backend API untuk aplikasi e-commerce SayurBox</p>
</div>

## 📋 Tentang Proyek

Backend untuk aplikasi **SayurBox**, dibangun dengan Laravel 12. Proyek ini menyediakan REST API untuk autentikasi, manajemen produk, alamat, keranjang belanja, pesanan, pembayaran, serta integrasi dengan frontend React.

## 🚀 Tech Stack

- **Framework:** Laravel 12
- **Database:** MySQL 8.0+
- **Autentikasi:** Laravel Sanctum
- **File Storage:** Laravel Storage dengan disk public
- **Cache:** Laravel File Cache
- **API:** RESTful API dengan JSON responses
- **Validasi:** Laravel Form Request Validation

## 🧰 Fitur Utama

- ✅ Autentikasi (register, login, logout)
- ✅ Manajemen Produk dan Kategori
- ✅ Manajemen Keranjang Belanja
- ✅ Sistem Alamat Pengiriman
- ✅ Pemrosesan Pesanan
- ✅ Status Tracking Pesanan
- ✅ Admin Dashboard API
- ✅ Upload dan Manajemen Gambar

## ⚙️ Prasyarat

- PHP >= 8.2
- Composer
- MySQL 8.0+ atau MariaDB 10.5+
- PHP Extensions:
  - BCMath
  - Ctype
  - Fileinfo
  - JSON
  - Mbstring
  - OpenSSL
  - PDO
  - Tokenizer
  - XML

## 📦 Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/HaekalAlif/SayurBox.git
cd SayurBox/backend
````

### 2. Install Dependencies

```bash
composer install
```

### 3. Konfigurasi Environment

```bash
cp .env.example .env
php artisan key:generate
```

### 4. Konfigurasi Database

Edit file `.env` dan sesuaikan konfigurasi database:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sayurbox
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 5. Konfigurasi Sanctum untuk SPA

Untuk integrasi dengan frontend, tambahkan domain frontend di `.env`:

```
FRONTEND_URL=http://localhost:5173
SANCTUM_STATEFUL_DOMAINS=localhost:5173
```

### 6. Jalankan Migrasi & Seeder

```bash
php artisan migrate
php artisan storage:link
php artisan db:seed
```

## 🛠️ Menjalankan Server

```bash
php artisan serve
```

API akan tersedia di `http://localhost:8000/api`

## 📝 API Endpoints

### Auth

| Method | Endpoint        | Deskripsi                       |
| ------ | --------------- | ------------------------------- |
| POST   | `/api/register` | Registrasi user baru            |
| POST   | `/api/login`    | Login user                      |
| POST   | `/api/logout`   | Logout user                     |
| GET    | `/api/user`     | Get data user yang sedang login |

### Produk

| Method | Endpoint                               | Deskripsi                    |
| ------ | -------------------------------------- | ---------------------------- |
| GET    | `/api/products`                        | Daftar semua produk          |
| GET    | `/api/products/{id}`                   | Detail produk berdasarkan ID |
| GET    | `/api/products/category/{category_id}` | Produk berdasarkan kategori  |

### Kategori

| Method | Endpoint               | Deskripsi                      |
| ------ | ---------------------- | ------------------------------ |
| GET    | `/api/categories`      | Daftar semua kategori          |
| GET    | `/api/categories/{id}` | Detail kategori berdasarkan ID |

### Keranjang

| Method | Endpoint               | Deskripsi                 |
| ------ | ---------------------- | ------------------------- |
| GET    | `/api/cart/{user_id}`  | Get keranjang user        |
| POST   | `/api/cart`            | Buat keranjang baru       |
| POST   | `/api/cart-items`      | Tambah item ke keranjang  |
| PUT    | `/api/cart-items/{id}` | Update jumlah item        |
| DELETE | `/api/cart-items/{id}` | Hapus item dari keranjang |

### Pesanan

| Method | Endpoint                    | Deskripsi               |
| ------ | --------------------------- | ----------------------- |
| GET    | `/api/orders`               | Daftar pesanan user     |
| GET    | `/api/orders/{id}`          | Detail pesanan          |
| POST   | `/api/orders/checkout-cart` | Checkout dari keranjang |
| PUT    | `/api/orders/{id}`          | Update status pesanan   |

### Admin

| Method | Endpoint                 | Deskripsi                     |
| ------ | ------------------------ | ----------------------------- |
| GET    | `/api/admin/orders`      | Daftar semua pesanan (admin)  |
| GET    | `/api/admin/orders/{id}` | Detail pesanan (admin)        |
| PUT    | `/api/admin/orders/{id}` | Update status pesanan (admin) |
| GET    | `/api/admin/users`       | Daftar semua user             |

## 🧪 Testing

```bash
php artisan test
```

## 🔒 Security

Endpoint sensitif dilindungi dengan middleware autentikasi Laravel Sanctum.