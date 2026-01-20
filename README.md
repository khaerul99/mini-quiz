# 🧠 Mini Quiz Platform (Frontend)

Aplikasi web frontend untuk platform kuis online yang interaktif. Dibangun menggunakan **React**, **Vite**, dan **Tailwind CSS**. Aplikasi ini memungkinkan pengguna untuk mendaftar, login, mengerjakan kuis (subtest), melihat riwayat pengerjaan, dan analisis hasil skor.

## 🚀 Teknologi Utama

- **Core:** React.js (Vite)
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Routing:** React Router DOM v6
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **Notifications:** React Hot Toast

---

## 🛠️ Cara Menjalankan Project

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di komputer lokal Anda:

### 1. Clone Repository
```bash
git clone [https://github.com/username-anda/nama-repo-quiz.git](https://github.com/username-anda/nama-repo-quiz.git)
cd nama-repo-quiz

### 2. Install Depedensi
npm install

### 3. Konfigurasi Environment
# URL Backend API Anda
VITE_API_BASE_URL=http://localhost:5000/api/v1

### 4. jalankan Server
npm run dev

## Strultur folder
src/
├── assets/              # Gambar, font, dan file statis
├── components/          # Komponen UI yang dapat digunakan kembali
│   ├── dashboard/       # Komponen spesifik dashboard (Layout, Sidebar, Navbar)
│   └── ui/              # Komponen kecil (Button, Input, Card)
├── hooks/               # Custom hooks global (jika ada)
├── lib/                 # Utilitas dan konfigurasi library (axios.js, utils.js)
├── pages/               # Halaman utama aplikasi (berdasarkan rute)
│   ├── auth/            # Halaman Login, Register, Verify Email
│   └── dashboard/       # Halaman Dashboard
│       ├── history/     # Fitur Riwayat (index.jsx + logic hook)
│       ├── home/        # Fitur Home Dashboard
│       ├── quiz/        # Fitur Pengerjaan Kuis Aktif
│       └── result/      # Fitur Halaman Hasil Kuis
├── services/            # Layer komunikasi API (Axios calls)
│   ├── auth/            # Endpoint auth (login/register)
│   └── quiz/            # Endpoint quiz data
├── store/               # Global State Management (Zustand)
│   ├── useAuthStore.js  # State User & Token
│   └── useQuizStore.js  # State Sesi Kuis
├── App.jsx              # Konfigurasi Routing Utama
└── main.jsx             # Entry point React
