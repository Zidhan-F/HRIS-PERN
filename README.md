# HRIS Project — PERN Stack

Human Resources Information System (HRIS) berbasis EMS dengan monorepo React + Express + PostgreSQL (Sequelize).

## Ringkasan

Proyek ini terdiri dari:
- `client/`: Frontend React dengan Vite, Google OAuth, peta Leaflet, dan fitur absensi.
- `server/`: Backend Express dengan PostgreSQL, Sequelize ORM, Google OAuth verification, absensi, riwayat, payroll automation, dan laporan.
- `docker-compose.yml`: Konfigurasi PostgreSQL database, backend, dan frontend untuk pengembangan container.

## Fitur Utama

- Login Google OAuth
- Absensi kehadiran dengan lokasi GPS (Radius Geofencing)
- Riwayat absensi dan ringkasan kehadiran harian
- Dashboard karyawan dengan manajemen profil
- Request jenis cuti, izin, sakit, lembur, reimburse, dll
- Kalkulasi payroll otomatis, slip gaji PDF (PDFKit), dan email blast (Nodemailer)
- Export bank transfer file (BCA CSV & Mandiri TXT)
- Backend PostgreSQL + Sequelize ORM + Express
- Frontend React + Vite + Leaflet

## Struktur Proyek

- `client/` - Frontend (React SPA)
- `server/` - Backend (Express.js + Sequelize)
- `docker-compose.yml` - Layanan PostgreSQL database, backend, frontend
- `package.json` - Skrip build monorepo

## Persiapan Lingkungan

### 1. Clone repository

```bash
git clone https://github.com/Zidhan-F/hris-project.git
cd hris-project
```

### 2. Install dependencies

```bash
cd server
npm install
cd ../client
npm install
```

### 3. Konfigurasi environment

Buat file `.env` di `server/` dengan variabel berikut:

```env
PORT=5000
DATABASE_URL=postgres://postgres:password@localhost:5432/ems_db
GOOGLE_CLIENT_ID=<your_google_oauth_client_id>
GOOGLE_CLIENT_SECRET=<your_google_oauth_client_secret>
FRONTEND_URL=http://localhost:5173
ALLOW_OPEN_REGISTRATION=true
ENABLE_CRON=true
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=<your_email@gmail.com>
SMTP_PASS=<your_app_password>
```

Jika menggunakan Docker Compose, environment database di `docker-compose.yml` akan terkonfigurasi otomatis.

## Menjalankan Aplikasi

### Pilihan 1: Docker Compose

```bash
docker-compose up --build
```

- Backend tersedia di `http://localhost:5000`
- Frontend tersedia di `http://localhost:5173`
- PostgreSQL tersedia di `localhost:5432`

### Pilihan 2: Jalankan lokal manual

Pastikan PostgreSQL server Anda sudah berjalan dan database `ems_db` sudah dibuat sebelum menjalankan server backend.

Backend:
```bash
cd server
npm run dev
```

Frontend:
```bash
cd client
npm run dev
```

## Build Produksi

Dari root proyek:

```bash
npm run build
```

Skrip ini akan membangun frontend dan memindahkan hasilnya ke direktori `dist`.

## Kontak

Jika membutuhkan bantuan, silakan lihat repository atau ajukan issue di GitHub.
