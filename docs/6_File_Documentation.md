# Penjelasan Lengkap Seluruh File Proyek
## EMS — Employee Management System (HRIS)
**Last Updated:** 28 Mei 2026

---

## Daftar Isi

1. [Root Files](#1-root-files)
2. [Server — Backend](#2-server--backend)
3. [Client — Frontend](#3-client--frontend)
4. [Utils](#4-utils)
5. [Components — Views](#5-components--views)
6. [Components — Modals](#6-components--modals)

---

## 1. Root Files

### `.gitignore`
File konfigurasi Git yang menentukan file/folder mana yang **tidak boleh di-commit** (node_modules, .env, dll).

### `README.md`
Dokumentasi utama proyek yang ditampilkan di halaman GitHub.

### `docker-compose.yml`
Orkestrasi Docker untuk menjalankan layanan React (Frontend) dan Express (Backend). Database dapat menggunakan Docker terpisah atau layanan Cloud (Supabase/Neon).

### `render.yaml`
Konfigurasi deployment untuk platform Render.com.

### `vercel.json`
Konfigurasi deployment serverless untuk Vercel.

### `package.json` (root)
Root package.json untuk scripts level workspace.

---

## 2. Server — Backend

### 📄 `server/package.json`
Manajemen dependensi untuk backend. 
- **Dependencies utama:** `express`, `sequelize`, `pg`, `pg-hstore` (driver PostgreSQL), `google-auth-library`, `dotenv`, `cors`, `helmet`, `express-rate-limit`, `node-cron`, `nodemailer`, `pdfkit`, `node-ical`.

### 📄 `server/db.js`
Inisialisasi koneksi PostgreSQL menggunakan Sequelize ORM. Mengambil variabel `DATABASE_URL` dari `.env`. Mengaktifkan SSL untuk production dan konfigurasi pool koneksi.

### 📄 `server/index.js`
Entry point backend Express.js. Menjalankan:
- Security middleware (Helmet, CORS whitelist, Rate Limit)
- Import dan mount 6 route modules (`auth`, `attendance`, `employees`, `requests`, `payroll`, `settings`)
- 2 inline routes (`/api/users/profile`, `/api/schedule/holidays`)
- Sequelize database connection + sync
- Inisialisasi cron jobs
- Export `app` untuk Vercel serverless

---

### 📁 `server/models/` — Sequelize Models (9 file)

| File | Tabel DB | Fungsi |
|------|----------|--------|
| `User.js` | `users` | Profil karyawan, jabatan, data payroll, leave quota |
| `Attendance.js` | `attendances` | Catatan clock-in/clock-out harian |
| `Request.js` | `requests` | Permohonan cuti, izin, lembur, reimburse |
| `Payroll.js` | `payrolls` | Hasil kalkulasi slip gaji (25+ fields) |
| `PayrollLog.js` | `payroll_logs` | Audit trail operasi payroll |
| `PayrollSettings.js` | `payroll_settings` | Konfigurasi global payroll (rates, jam kerja) |
| `Settings.js` | `settings` | Pengaturan umum aplikasi (key-value JSONB) |
| `TeamMember.js` | `team_members` | Daftar anggota tim per manager |
| `index.js` | - | Mendefinisikan **Associations** antar tabel (`hasMany`, `belongsTo`) |

---

### 📁 `server/routes/` — Express Route Modules (6 file)

| File | Mount Path | Endpoints | Fungsi |
|------|-----------|-----------|--------|
| `auth.js` | `/api` | 1 endpoint | Login/register via Google OAuth 2.0 |
| `attendance.js` | `/api` | 5 endpoints | Submit absensi, history, summary (today/monthly/daily) |
| `employees.js` | `/api/employees` | 4 endpoints | CRUD karyawan + update payroll info |
| `requests.js` | `/api/requests` | 6 endpoints | CRUD permohonan + approval + on-leave |
| `payroll.js` | `/api/payroll` | 14 endpoints | Calculate, finalize, mark paid/unpaid, PDF, email, export, logs |
| `settings.js` | `/api/settings` | 6 endpoints | Office location, workdays, payroll settings |

---

### 📁 `server/middleware/` — Express Middleware (1 file)

#### 📄 `auth.js`
Middleware autentikasi dan otorisasi:
- `verifyGoogleToken(token)` — Verifikasi JWT token Google
- `authMiddleware(req, res, next)` — Ekstrak user dari token, cek di database
- `requireRole(...roles)` — Role-based access control (RBAC)

---

### 📁 `server/helpers/` — Utility Functions (1 file)

#### 📄 `validation.js`
Fungsi validasi input untuk berbagai operasi:
- `validatePayrollInput()` — Validasi gaji, tunjangan, role, status payroll
- `validateEmployeeInput()` — Validasi role, employment status, posisi
- `validateRequestInput()` — Validasi tipe request, alasan, amount
- `validateProfileInput()` — Validasi nama, bio, phone, gender
- `calculateDistance()` — Hitung jarak GPS (Haversine formula)

---

### 📁 `server/services/` — Background Logic (4 file)

| File | Fungsi |
|------|--------|
| `cronJobs.js` | Cron jobs otomatis: attendance reminder (08:30 WIB), payroll calculation (tanggal 25) |
| `payrollEngine.js` | Engine kalkulasi payroll: hitung gaji, tunjangan, potongan, PPh21, BPJS. Export bank transfer (BCA CSV, Mandiri TXT) |
| `pdfGenerator.js` | Generate payslip PDF dengan branding perusahaan menggunakan PDFKit |
| `emailService.js` | Kirim email payslip massal menggunakan Nodemailer + SMTP |

---

## 3. Client — Frontend

### 📄 `client/package.json`
Manajemen dependensi frontend: `react`, `react-dom`, `axios`, `@react-oauth/google`, `leaflet`, `react-leaflet`.

### 📄 `client/vite.config.js`
Konfigurasi Vite build tool dengan plugin React.

### 📄 `client/index.html`
HTML template utama. Entry point untuk SPA.

### 📄 `client/src/main.jsx`
React entry point. Membungkus `App` dengan `GoogleOAuthProvider`.

### 📄 `client/src/App.jsx`
**Central state coordinator**. File terbesar (~710 baris) yang mengelola:
- Seluruh state aplikasi (user, attendance, payroll, requests, settings, dll)
- Side effects (useEffect) untuk data fetching
- Handler functions untuk semua operasi CRUD
- Routing logic berdasarkan `activeMenu` dan `activeSubMenu`
- Render semua View dan Modal components

### 📄 `client/src/App.css`
Design system lengkap (~110KB): variabel warna, typography, layout, animasi, responsive breakpoints, dan styling untuk semua komponen.

### 📄 `client/src/index.css`
Base CSS reset dan font imports.

---

## 4. Utils

### 📄 `client/src/utils/helpers.js`
Shared utilities dan constants:
- `API_URL` — Backend API base URL dari env
- `DEFAULT_OFFICE` — Default koordinat kantor
- `MENU_ITEMS` — Definisi menu sidebar
- `getDistanceMeters()` — Haversine distance calculation (frontend)
- `getInitials()` — Ekstrak inisial dari nama
- `safeISO()` — Safe ISO date formatting
- `formatTimestamp()` — Format timestamp ke locale Indonesia

---

## 5. Components — Views

### 📄 `LoginPage.jsx`
Halaman login dengan Google OAuth 2.0. Menampilkan branding, loading state, dan pesan error.

### 📄 `Sidebar.jsx`
Navigasi sidebar responsif dengan menu items dan sub-menu (Attendance → Personal, Report, Daily, Schedule). Menampilkan profil user di header.

### 📄 `TopNavbar.jsx`
Navbar atas dengan hamburger menu (mobile), nama halaman aktif, user avatar, dan tombol logout.

### 📄 `Dashboard.jsx`
Dashboard utama dengan 2 tab:
- **Feed**: Karyawan yang sedang cuti hari ini, aktivitas terbaru, quick stats (total staff, hadir, terlambat)
- **My Info**: Peta Leaflet lokasi kantor, verifikasi GPS, live camera preview, tombol Clock In/Out, riwayat absensi terbaru

### 📄 `ProfileView.jsx`
Halaman profil karyawan dengan 3 tab: Personal, Contract, Team. Tombol edit membuka `EditProfileModal`.

### 📄 `EmployeeView.jsx`
Manajemen karyawan (admin/HRD/Manager):
- Daftar karyawan dengan search & filter
- Detail profil dengan tab (Personal, Contract, Team, Attendance)
- Riwayat absensi per karyawan
- Tombol edit (admin) membuka `EditEmployeeModal`

### 📄 `PayrollView.jsx`
Manajemen payroll komprehensif (~39KB):
- **My Payslip**: Payslip pribadi dengan branding, download PDF
- **Manage Payroll**: Tabel semua karyawan, kalkulasi, finalize, mark paid/unpaid, export bank, email blast
- Seleksi karyawan untuk batch operations
- Summary total gaji, potongan, net pay

### 📄 `LeaveView.jsx`
Manajemen cuti/izin:
- **History**: Riwayat semua permohonan milik user
- **Approval** (admin/manager): Daftar pending requests dengan aksi Approve/Reject/Return
- Tombol pengajuan baru → `RequestModal`

### 📄 `AttendancePersonal.jsx`
Riwayat absensi personal per bulan/tahun. Menampilkan tabel dengan waktu clock-in/out dan total jam kerja.

### 📄 `AttendanceReport.jsx`
Laporan kehadiran bulanan (admin/HRD/Manager). Tabel semua karyawan: foto, nama, days present, late days, total hours, work rate. Export CSV.

### 📄 `DailyReport.jsx`
Laporan kehadiran per tanggal spesifik (admin/HRD/Manager). Tabel karyawan dengan status hadir/tidak hadir pada tanggal tersebut.

### 📄 `ScheduleView.jsx`
Kalender bulanan interaktif dengan navigasi. Menampilkan hari libur nasional (dari iCal), weekend otomatis, dan highlight hari ini.

---

## 6. Components — Modals

### 📄 `EditProfileModal.jsx`
Form edit profil pribadi: nama, bio, telepon, alamat, tanggal lahir, gender, status pernikahan.

### 📄 `EditEmployeeModal.jsx`
Form edit karyawan (admin): posisi, departemen, role, employee ID, employment status, manager, team members (add/remove), leave quota, contract end date. Tombol hapus karyawan.

### 📄 `EditPayrollModal.jsx`
Form edit payroll karyawan (admin/HRD): gaji pokok, tunjangan, rekening bank, status PTKP, rate tunjangan makan/transport, BPJS Kesehatan/TK, PPh21, status pembayaran, leave quota, contract end.

### 📄 `OfficeSettingsModal.jsx`
Pengaturan kantor (admin/HRD): koordinat (latitude/longitude), radius absensi, nama kantor, hari kerja (pilih hari aktif).

### 📄 `RequestModal.jsx`
Form pengajuan permohonan: tipe (Leave, Permit, Sick, Overtime, Reimbursement, dll), tanggal mulai/selesai, alasan, nominal (jika applicable). Validasi otomatis jatah cuti.
