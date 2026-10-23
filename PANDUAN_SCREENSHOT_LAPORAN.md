# 📸 PANDUAN SCREENSHOT LAPORAN PRAKTIKUM
## Modul Pertemuan 2 & 3 - Pemrograman Berbasis Platform

**Nama**: M. RAFI RIs  
**Tanggal**: 15 September 2026

---

## 📋 DAFTAR SCREENSHOT YANG DIPERLUKAN

### A. MODUL PERTEMUAN 2 - TypeScript & React

#### 1. **Struktur Folder Proyek** (1 screenshot)
**Cara ambil:**
- Buka VS Code
- Klik ikon Explorer (sidebar kiri)
- Expand semua folder: src/app, src/components, src/types, src/constants
- Screenshot sidebar explorer yang menampilkan struktur lengkap

**Isi yang harus terlihat:**
```
orientasi-jelajah-aman/
├── src/
│   ├── app/
│   ├── components/
│   │   ├── WeatherCard.tsx
│   │   ├── SearchBox.tsx
│   │   ├── RiwayatList.tsx
│   │   └── IndikatorAQI.tsx
│   ├── types/
│   │   └── cuaca.ts
│   └── constants/
```

---

#### 2. **File types/cuaca.ts** (1 screenshot)
**Cara ambil:**
- Buka file `src/types/cuaca.ts` di VS Code
- Pastikan semua kode terlihat (interface DataCuaca, TingkatAQI, WeatherCardProps, LaporanUdara)
- Screenshot full editor

**Yang harus terlihat:**
- Semua 4 interface/type
- Syntax highlighting yang jelas
- Nomor baris di sebelah kiri

---

#### 3. **File WeatherCard.tsx** (1 screenshot)
**Cara ambil:**
- Buka file `src/components/WeatherCard.tsx`
- Pastikan semua kode terlihat (import, props, return JSX)
- Screenshot full editor

**Yang harus terlihat:**
- Import statement (typeScale, spacing)
- Props dengan type WeatherCardProps
- JSX dengan style yang menggunakan typeScale & spacing

---

#### 4. **File SearchBox.tsx** (1 screenshot)
**Cara ambil:**
- Buka file `src/components/SearchBox.tsx`
- Pastikan kode useState terlihat jelas
- Screenshot full editor

**Yang harus terlihat:**
- useState hook
- Controlled component (value={teks}, onChangeText={setTeks})
- Button dengan accessibilityLabel

---

#### 5. **File RiwayatList.tsx** (1 screenshot)
**Cara ambil:**
- Buka file `src/components/RiwayatList.tsx`
- Pastikan map() dan key prop terlihat
- Screenshot full editor

**Yang harus terlihat:**
- Import Link dari expo-router
- map() function dengan key={kota}
- Link component dengan href

---

#### 6. **File IndikatorAQI.tsx** (1 screenshot - Latihan Mandiri)
**Cara ambil:**
- Buka file `src/components/IndikatorAQI.tsx`
- Screenshot full editor

**Yang harus terlihat:**
- Interface LaporanUdara
- Function getWarnaByTingkat
- Conditional rendering untuk warna

---

#### 7. **File index.tsx (Halaman Utama)** (1 screenshot)
**Cara ambil:**
- Buka file `src/app/(tabs)/index.tsx`
- Pastikan useState dan useEffect terlihat
- Screenshot full editor

**Yang harus terlihat:**
- useState untuk kotaAktif dan riwayat
- useEffect dengan dependency array [kotaAktif]
- Function handleCari
- SafeAreaView dengan responsive layout

---

#### 8. **TypeScript Check - No Error** (1 screenshot)
**Cara ambil:**
- Buka terminal di VS Code (Ctrl + `)
- Jalankan: `npx tsc --noEmit`
- Screenshot hasil (harus tidak ada error)

**Yang harus terlihat:**
- Command: `npx tsc --noEmit`
- Output: (kosong atau "Compiled successfully")
- Timestamp

---

#### 9. **Git Log Modul 2** (1 screenshot)
**Cara ambil:**
- Di terminal, jalankan: `git log --oneline -7`
- Screenshot output

**Yang harus terlihat 7 commit:**
```
1a86091 feat: latihan mandiri - tambah interface LaporanUdara dan komponen IndikatorAQI
0dcdcbf feat: tambah useEffect untuk log perubahan kota
7353449 feat: gabungkan komponen di halaman utama
fbab8d9 feat: buat komponen RiwayatList
fd4d9ce feat: buat komponen SearchBox dengan useState
6dd9008 feat: buat komponen WeatherCard
bb7a622 feat: tambah interface DataCuaca dan WeatherCardProps
```

---

#### 10. **GitHub Repository - Commit History** (1 screenshot)
**Cara ambil:**
- Buka browser
- Akses: https://github.com/Raffris-bit/orientasi-jelajah-aman
- Klik tab "Commits"
- Screenshot halaman commits

**Yang harus terlihat:**
- URL GitHub di address bar
- Daftar commit dengan pesan
- Avatar dan username Anda

---

### B. MODUL PERTEMUAN 3 - UI, Navigasi, dan Expo Router

#### 11. **Struktur Folder Expo Router** (1 screenshot)
**Cara ambil:**
- Di VS Code Explorer, expand folder `src/app`
- Pastikan struktur (tabs), detail/, dan tambah-favorit.tsx terlihat
- Screenshot

**Yang harus terlihat:**
```
src/app/
├── _layout.tsx
├── (tabs)/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── riwayat.tsx
│   ├── pengaturan.tsx
│   └── tentang.tsx
├── detail/
│   └── [kota].tsx
└── tambah-favorit.tsx
```

---

#### 12. **File app/_layout.tsx (Root Layout)** (1 screenshot)
**Cara ambil:**
- Buka file `src/app/_layout.tsx`
- Screenshot full editor

**Yang harus terlihat:**
- Import Stack dari expo-router
- Stack.Screen untuk (tabs), detail/[kota], tambah-favorit
- Modal presentation

---

#### 13. **File app/(tabs)/_layout.tsx (Tab Layout)** (1 screenshot)
**Cara ambil:**
- Buka file `src/app/(tabs)/_layout.tsx`
- Screenshot full editor

**Yang harus terlihat:**
- Import Tabs dari expo-router
- 4 Tabs.Screen (index, riwayat, pengaturan, tentang)

---

#### 14. **File detail/[kota].tsx** (1 screenshot)
**Cara ambil:**
- Buka file `src/app/detail/[kota].tsx`
- Screenshot full editor

**Yang harus terlihat:**
- useLocalSearchParams hook
- Dynamic parameter {kota}
- WeatherCard component

---

#### 15. **File tambah-favorit.tsx (Modal)** (1 screenshot)
**Cara ambil:**
- Buka file `src/app/tambah-favorit.tsx`
- Screenshot full editor

**Yang harus terlihat:**
- Import router dari expo-router
- router.back() function
- Modal content (Text + Button)

---

#### 16. **File constants/styles.ts** (1 screenshot)
**Cara ambil:**
- Buka file `src/constants/styles.ts`
- Screenshot full editor

**Yang harus terlihat:**
- typeScale object (judul, subjudul, isi, keterangan)
- spacing object (kecil, sedang, besar)

---

#### 17. **File tentang.tsx (Latihan Mandiri)** (1 screenshot)
**Cara ambil:**
- Buka file `src/app/(tabs)/tentang.tsx`
- Screenshot full editor

**Yang harus terlihat:**
- SafeAreaView
- typeScale & spacing usage
- accessibilityLabel
- Nama pembuat: M. RAFI RIs

---

#### 18. **Git Log Modul 3** (1 screenshot)
**Cara ambil:**
- Di terminal, jalankan: `git log --oneline -9`
- Screenshot output

**Yang harus terlihat 8-9 commit:**
```
427e97c docs: update nama pembuat di tab Tentang
6f4eba5 feat: tambah tab Tentang dengan accessibility dan hierarki visual
c4baa38 feat: tambah accessibility label pada elemen interaktif
7ce7f5b feat: tambah SafeAreaView dan responsive layout
674e2c5 feat: tambah type scale dan spacing system
6b4241a feat: tambah modal tambah favorit
bbe02a3 feat: tambah halaman detail dan navigasi dari RiwayatList
c25d69a feat: buat tab navigation Beranda, Riwayat, Pengaturan
e2a8eeb chore: restrukturisasi folder untuk Expo Router
```

---

### C. APLIKASI BERJALAN DI EXPO GO (HP)

#### 19. **Expo DevTools - QR Code** (1 screenshot)
**Cara ambil:**
- Di terminal, jalankan: `npx expo start`
- Tunggu hingga QR code muncul
- Screenshot terminal dengan QR code

**Yang harus terlihat:**
- QR code berukuran besar
- Metro bundler info
- URL expo (exp://...)
- Menu interaktif (w, a, r, m, dll)

---

#### 20. **Tab Beranda - Tampilan Awal** (1 screenshot HP)
**Cara ambil:**
- Scan QR code dengan Expo Go
- Pastikan app terbuka di Tab Beranda
- Screenshot HP

**Yang harus terlihat:**
- SearchBox dengan placeholder "Nama kota"
- WeatherCard menampilkan "Pekalongan, 29°C, AQI: BAIK"
- RiwayatList menampilkan "Pekalongan"
- Tab bar di bawah (Beranda, Riwayat, Pengaturan, Tentang)

---

#### 21. **Tab Beranda - Setelah Cari Jakarta** (1 screenshot HP)
**Cara ambil:**
- Di SearchBox, ketik "Jakarta"
- Tap tombol "Cari"
- Screenshot HP

**Yang harus terlihat:**
- WeatherCard berubah menampilkan "Jakarta"
- RiwayatList menampilkan: Pekalongan, Jakarta

---

#### 22. **Tab Beranda - Setelah Cari Bandung** (1 screenshot HP)
**Cara ambil:**
- Di SearchBox, ketik "Bandung"
- Tap tombol "Cari"
- Screenshot HP

**Yang harus terlihat:**
- WeatherCard berubah menampilkan "Bandung"
- RiwayatList menampilkan: Pekalongan, Jakarta, Bandung

---

#### 23. **Tab Riwayat** (1 screenshot HP)
**Cara ambil:**
- Tap tab "Riwayat" di bottom tab bar
- Screenshot HP

**Yang harus terlihat:**
- Header "Riwayat"
- Daftar kota: Pekalongan, Jakarta, Semarang
- Tab bar aktif di "Riwayat"

---

#### 24. **Halaman Detail dari Riwayat** (1 screenshot HP)
**Cara ambil:**
- Di Tab Riwayat, tap "Pekalongan"
- Screenshot halaman Detail yang muncul

**Yang harus terlihat:**
- Header "Detail Cuaca" dengan back button
- WeatherCard menampilkan "Pekalongan"
- Navigation bar dengan back arrow

---

#### 25. **Tab Pengaturan** (1 screenshot HP)
**Cara ambil:**
- Tap tab "Pengaturan" di bottom tab bar
- Screenshot HP

**Yang harus terlihat:**
- Header "Pengaturan"
- Text "Jelajah Aman"
- Text "Versi 1.0.0"

---

#### 26. **Tab Tentang (Latihan Mandiri)** (1 screenshot HP)
**Cara ambil:**
- Tap tab "Tentang" di bottom tab bar
- Screenshot HP

**Yang harus terlihat:**
- Header "Tentang"
- Text "Jelajah Aman"
- Text "Versi 1.0.0"
- Text "Pembuat: M. RAFI RIs"
- Deskripsi aplikasi

---

#### 27. **Console Log useEffect** (1 screenshot)
**Cara ambil:**
- Buka terminal yang menjalankan `npx expo start`
- Cari kota baru di aplikasi HP beberapa kali
- Scroll terminal untuk melihat log
- Screenshot

**Yang harus terlihat:**
- Log: "Kota aktif berubah menjadi: Jakarta"
- Log: "Kota aktif berubah menjadi: Bandung"
- Timestamp atau Metro bundler info

---

### D. GITHUB REPOSITORY

#### 28. **GitHub - Halaman Utama Repository** (1 screenshot)
**Cara ambil:**
- Buka browser
- Akses: https://github.com/Raffris-bit/orientasi-jelajah-aman
- Screenshot halaman utama

**Yang harus terlihat:**
- URL di address bar
- Struktur folder (src/, package.json, dll)
- README.md
- Jumlah commits
- Branch: main

---

#### 29. **GitHub - Commit History Lengkap** (1 screenshot)
**Cara ambil:**
- Di halaman GitHub, klik tab "Commits"
- Screenshot

**Yang harus terlihat:**
- Total commits: 16+ commits
- Commit messages dari Modul 2 & 3
- Tanggal commits
- Username Anda

---

#### 30. **GitHub - Isi Folder src/components** (1 screenshot)
**Cara ambil:**
- Di GitHub, klik folder `src/` → `components/`
- Screenshot

**Yang harus terlihat:**
- WeatherCard.tsx
- SearchBox.tsx
- RiwayatList.tsx
- IndikatorAQI.tsx
- File lainnya

---

## 📊 RINGKASAN SCREENSHOT

### **Total Screenshot yang Diperlukan: 30 screenshot**

**Breakdown:**
- VS Code (struktur & kode): 17 screenshot
- Terminal (git log, tsc, expo): 3 screenshot
- HP (Expo Go - aplikasi berjalan): 9 screenshot
- GitHub: 3 screenshot

---

## 🎯 TIPS MENGAMBIL SCREENSHOT

### **VS Code:**
1. Gunakan tema yang kontras (Dark+ atau Light+)
2. Zoom code agar jelas (Ctrl + scroll atau Ctrl + +)
3. Pastikan nomor baris terlihat
4. Hide sidebar kanan jika terlalu penuh

### **Terminal:**
1. Gunakan font size yang cukup besar
2. Pastikan output tidak terpotong
3. Gunakan full screen atau maximize window

### **HP (Expo Go):**
1. Pastikan tidak ada notifikasi mengganggu
2. Screenshot dalam mode portrait
3. Pastikan tab bar dan header terlihat jelas
4. Cahaya cukup agar layar tidak gelap

### **GitHub:**
1. Gunakan browser dalam mode normal (bukan incognito)
2. Zoom 100% atau 90% agar full page terlihat
3. Pastikan URL lengkap di address bar

---

## 📝 CARA MENYUSUN LAPORAN PDF

### **Struktur Laporan:**

1. **Cover** - Judul, Nama, NIM, Kelas, Tanggal
2. **Daftar Isi**
3. **Modul 2: TypeScript & React**
   - Screenshot 1-10
   - Penjelasan setiap screenshot
4. **Modul 3: UI & Navigasi**
   - Screenshot 11-27
   - Penjelasan setiap screenshot
5. **GitHub & Repository**
   - Screenshot 28-30
6. **Kesimpulan**
7. **Lampiran** (jika ada)

### **Format Screenshot di Laporan:**
```
#### 1. Struktur Folder Proyek

[GAMBAR SCREENSHOT]

Penjelasan:
Screenshot menampilkan struktur folder lengkap proyek Jelajah Aman
yang terdiri dari folder src/app (navigasi), src/components (komponen),
src/types (interface TypeScript), dan src/constants (design system).
```

---

## ✅ CHECKLIST SEBELUM SUBMIT

- [ ] Semua 30 screenshot sudah diambil
- [ ] Screenshot berkualitas tinggi (tidak blur)
- [ ] Setiap screenshot memiliki penjelasan
- [ ] Nama, NIM, Kelas sudah diisi
- [ ] Cover page sudah dibuat
- [ ] Daftar isi sudah dibuat
- [ ] Format PDF (bukan Word/Google Docs)
- [ ] File size tidak terlalu besar (<10MB)
- [ ] File name: LAPORAN_MODUL2-3_NIM_NAMA.pdf

---

**Dibuat**: 15 September 2026  
**Untuk**: Laporan Praktikum Modul 2 & 3  
**Mata Kuliah**: Pemrograman Berbasis Platform (INF2528)

---

**Selamat mengerjakan! Semoga sukses! 🚀**
