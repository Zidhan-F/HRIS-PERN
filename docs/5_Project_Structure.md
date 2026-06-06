# Project Structure Template
## EMS — Employee Management System
**Last Updated:** 28 Mei 2026

---

## Full Directory Tree

```
hris-project/
├── 📁 client/                          # Frontend (React SPA)
│   ├── 📁 public/
│   ├── 📁 src/
│   │   ├── 📁 components/              # Modular UI components
│   │   │   ├── 📁 modals/              # Modal dialogs
│   │   │   │   ├── EditEmployeeModal.jsx
│   │   │   │   ├── EditPayrollModal.jsx
│   │   │   │   ├── EditProfileModal.jsx
│   │   │   │   ├── OfficeSettingsModal.jsx
│   │   │   │   └── RequestModal.jsx
│   │   │   ├── AttendancePersonal.jsx   # Riwayat absensi personal
│   │   │   ├── AttendanceReport.jsx     # Laporan absensi bulanan
│   │   │   ├── DailyReport.jsx          # Laporan absensi harian
│   │   │   ├── Dashboard.jsx            # Dashboard utama (Feed + My Info)
│   │   │   ├── EmployeeView.jsx         # Manajemen karyawan
│   │   │   ├── LeaveView.jsx            # Permohonan & approval cuti
│   │   │   ├── LoginPage.jsx            # Login Google OAuth
│   │   │   ├── PayrollView.jsx          # Manajemen payroll
│   │   │   ├── ProfileView.jsx          # Profil karyawan
│   │   │   ├── ScheduleView.jsx         # Kalender & hari libur
│   │   │   ├── Sidebar.jsx              # Navigasi sidebar
│   │   │   └── TopNavbar.jsx            # Navbar atas
│   │   ├── 📁 utils/                   # Shared utilities
│   │   │   └── helpers.js               # Constants, formatters, calculations
│   │   ├── App.jsx                     # Root coordinator (state + routing)
│   │   ├── App.css                     # Global styles & design system
│   │   ├── index.css                   # Base CSS reset
│   │   └── main.jsx                    # React entry point
│   ├── .env                            # Frontend environment variables
│   ├── index.html                      # HTML template
│   ├── package.json                    # Frontend dependencies
│   └── vite.config.js                  # Vite build configuration
│
├── 📁 server/                          # Backend (Express.js + Sequelize)
│   ├── 📁 models/                      # Sequelize models (8 file)
│   │   ├── Attendance.js               # Tabel attendances
│   │   ├── Payroll.js                  # Tabel payrolls (kalkulasi gaji)
│   │   ├── PayrollLog.js               # Tabel payroll_logs (audit trail)
│   │   ├── PayrollSettings.js          # Tabel payroll_settings (config global)
│   │   ├── Request.js                  # Tabel requests (cuti/izin)
│   │   ├── Settings.js                 # Tabel settings (key-value store)
│   │   ├── TeamMember.js               # Tabel team_members
│   │   ├── User.js                     # Tabel users (karyawan)
│   │   └── index.js                    # Define associations (Relasi antar tabel)
│   │
│   ├── 📁 routes/                      # Express route modules (6 file)
│   │   ├── auth.js                     # POST /api/auth/google
│   │   ├── attendance.js               # /api/attendance/* endpoints
│   │   ├── employees.js                # /api/employees/* endpoints
│   │   ├── payroll.js                  # /api/payroll/* endpoints
│   │   ├── requests.js                 # /api/requests/* endpoints
│   │   └── settings.js                 # /api/settings/* endpoints
│   │
│   ├── 📁 middleware/                  # Express middleware
│   │   └── auth.js                     # authMiddleware + requireRole
│   │
│   ├── 📁 helpers/                     # Utility functions
│   │   └── validation.js               # Input validators (profile, employee, payroll, request)
│   │
│   ├── 📁 services/                    # Background logic & external integrations
│   │   ├── cronJobs.js                 # Automation (attendance reminder, payroll calc)
│   │   ├── payrollEngine.js            # Salary calculation logic & bank transfer export
│   │   ├── pdfGenerator.js             # Payslip PDF generation (PDFKit)
│   │   └── emailService.js             # SMTP/Email sending (Nodemailer)
│   │
│   ├── index.js                        # Server entry (routes, middleware, DB sync)
│   ├── db.js                           # Sequelize Database Connection Setup
│   ├── .env                            # Backend environment variables
│   ├── package.json                    # Backend dependencies
│   └── Dockerfile                      # Server container definition
│
├── 📁 docs/                            # Project documentation
├── docker-compose.yml                  # Full stack orchestration
├── render.yaml                         # Render.com deployment config
├── vercel.json                         # Vercel serverless config
└── README.md                           # Project readme
```

---

## Component Responsibility Map

### View Components (12 komponen)

| Komponen | Akses | Fungsi Utama |
|----------|-------|-------------|
| `LoginPage` | Public | Login via Google OAuth 2.0 |
| `Sidebar` | All | Navigasi menu dengan sub-menu (attendance) |
| `TopNavbar` | All | Header bar, hamburger, user info, logout |
| `Dashboard` | All | Feed (on-leave, recent activities) + My Info (GPS, Camera, Clock) |
| `ProfileView` | All | Lihat/edit profil pribadi (Personal, Contract, Team) |
| `EmployeeView` | Admin/HRD/Manager | Daftar karyawan, detail, edit posisi/department |
| `PayrollView` | All | My Payslip (employee) + Manage Payroll (admin/HRD) |
| `LeaveView` | All | Riwayat permohonan + Approval (admin/manager) |
| `AttendancePersonal` | All | Riwayat absensi per bulan milik sendiri |
| `AttendanceReport` | Admin/HRD/Manager | Laporan kehadiran bulanan seluruh karyawan |
| `DailyReport` | Admin/HRD/Manager | Laporan kehadiran per tanggal |
| `ScheduleView` | All | Kalender bulanan + hari libur nasional |

### Modal Components (5 komponen)

| Komponen | Trigger | Fungsi |
|----------|---------|--------|
| `EditProfileModal` | ProfileView | Edit profil (nama, telepon, bio, dll) |
| `EditEmployeeModal` | EmployeeView | Edit posisi, role, team members |
| `EditPayrollModal` | PayrollView | Edit gaji, bank, BPJS, PPh21 |
| `OfficeSettingsModal` | Dashboard | Edit lokasi kantor & hari kerja |
| `RequestModal` | LeaveView | Pengajuan cuti/izin/lembur/reimburse |

---

## Backend Route Organization

Routing didefinisikan di `server/index.js` dan didelegasikan ke modul-modul di `server/routes/`:

| Mount Path | Route File | Deskripsi |
|------------|-----------|-----------|
| `/api` | `routes/auth.js` | Authentication (Google OAuth) |
| `/api` | `routes/attendance.js` | Absensi (submit, history, summary) |
| `/api/employees` | `routes/employees.js` | Manajemen karyawan |
| `/api/requests` | `routes/requests.js` | Permohonan cuti/izin |
| `/api/payroll` | `routes/payroll.js` | Manajemen payroll |
| `/api/settings` | `routes/settings.js` | Pengaturan kantor & payroll |

Dua endpoint tambahan didefinisikan langsung di `index.js`:
- `PUT /api/users/profile` — Update profil pribadi
- `GET /api/schedule/holidays` — Ambil hari libur nasional via iCal

---

## Key Configuration Files

### `vite.config.js`
```js
export default defineConfig({
  plugins: [react()],
})
```

### `.env` (Server)
```
PORT=5000
DATABASE_URL=postgres://user:password@localhost:5432/ems_db
GOOGLE_CLIENT_ID=your-google-client-id
FRONTEND_URL=https://your-frontend.vercel.app
ENABLE_CRON=true
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### `.env` (Client)
```
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```
