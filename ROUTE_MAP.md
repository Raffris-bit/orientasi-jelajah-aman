# Route Map - Aplikasi Jelajah Aman

## Struktur Navigasi

```
┌─────────────────────────────────────────────────────┐
│              ROOT LAYOUT (Stack)                    │
└─────────────────────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
   ┌─────────┐    ┌──────────┐    ┌──────────┐
   │  TABS   │    │  DETAIL  │    │  MODAL   │
   │ Layout  │    │  [kota]  │    │  Favorit │
   └─────────┘    └──────────┘    └──────────┘
        │              ▲                ▲
   ┌────┼────┬────┐    │                │
   ▼    ▼    ▼    ▼    │                │
┌──────┐ ┌──────┐ ┌──────┐             │
│Beranda│ │Riwayat│ │Pengaturan│         │
└──────┘ └──────┘ └──────┘              │
   │        │                            │
   │        └────────────────────────────┘
   │                 (tap kota)
   └─────────────────────────────────────┘
              (tap tambah favorit)
```

## Detail Setiap Layar

### 1. Tab Beranda (index.tsx)
**Path**: `/(tabs)/index`
**Komponen**: SearchBox, WeatherCard, RiwayatList
**Fungsi**: 
- Pencarian kota
- Menampilkan cuaca kota aktif
- Menampilkan riwayat pencarian
**Navigasi keluar**: -
**Navigasi masuk**: Default tab

### 2. Tab Riwayat (riwayat.tsx)
**Path**: `/(tabs)/riwayat`
**Komponen**: RiwayatList (dengan Link)
**Fungsi**: 
- Menampilkan daftar kota yang pernah dicari
- Setiap item bisa ditekan untuk melihat detail
**Navigasi keluar**: → Detail [kota]
**Navigasi masuk**: Tap tab Riwayat

### 3. Tab Pengaturan (pengaturan.tsx)
**Path**: `/(tabs)/pengaturan`
**Komponen**: Text (info aplikasi)
**Fungsi**: 
- Menampilkan info aplikasi
- Versi aplikasi
**Navigasi keluar**: -
**Navigasi masuk**: Tap tab Pengaturan

### 4. Halaman Detail (detail/[kota].tsx)
**Path**: `/detail/[kota]`
**Komponen**: WeatherCard
**Fungsi**: 
- Menampilkan detail cuaca satu kota
- Tombol tambah favorit
**Navigasi keluar**: → Modal Tambah Favorit
**Navigasi masuk**: 
- Dari Tab Riwayat (tap item)
- Dari Tab Beranda (future: tap WeatherCard)

### 5. Modal Tambah Favorit (tambah-favorit.tsx)
**Path**: `/tambah-favorit`
**Komponen**: Text, Button
**Fungsi**: 
- Konfirmasi tambah kota ke favorit
- Tombol simpan/batal
**Navigasi keluar**: router.back()
**Navigasi masuk**: Dari Halaman Detail

## Alur Pengguna (User Flow)

### Flow 1: Pencarian Kota Baru
```
Beranda → Ketik nama kota → Tap "Cari" → WeatherCard update
```

### Flow 2: Lihat Detail dari Riwayat
```
Tab Riwayat → Tap nama kota → Halaman Detail
```

### Flow 3: Tambah Favorit
```
Halaman Detail → Tap "Tambah Favorit" → Modal muncul → Tap "Simpan" → Kembali ke Detail
```

### Flow 4: Lihat Info Aplikasi
```
Tab Pengaturan → Info aplikasi ditampilkan
```

## Checklist Navigasi

- ✅ Setiap layar memiliki jalan masuk yang jelas
- ✅ Setiap layar memiliki jalan keluar yang jelas
- ✅ Tidak ada dead-end (jalan buntu)
- ✅ Modal bisa ditutup dengan mudah
- ✅ Back navigation bekerja dengan benar
- ✅ Tab navigation mudah diakses di mana saja

## Implementasi Expo Router

### File Structure:
```
app/
├── _layout.tsx              # Root Stack Layout
├── (tabs)/
│   ├── _layout.tsx          # Tab Layout
│   ├── index.tsx            # Tab Beranda
│   ├── riwayat.tsx          # Tab Riwayat
│   └── pengaturan.tsx       # Tab Pengaturan
├── detail/
│   └── [kota].tsx           # Halaman Detail (dynamic route)
└── tambah-favorit.tsx       # Modal
```

---

**Dibuat**: 15 September 2026
**Versi**: 1.0.0
**Untuk**: Praktikum Pertemuan 3 - PBP
