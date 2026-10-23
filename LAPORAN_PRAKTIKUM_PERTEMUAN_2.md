# LAPORAN PRAKTIKUM PERTEMUAN 2
## Pemrograman Berbasis Platform (INF2528)
**TypeScript & React - Aplikasi Jelajah Aman**

---

### Informasi Mahasiswa
- **Nama**: [Nama Lengkap Anda]
- **NIM**: [NIM Anda]
- **Kelas**: [Kelas Anda]
- **Program Studi**: Informatika
- **Institusi**: UIN K.H. Abdurrahman Wahid Pekalongan
- **Dosen Pengampu**: Reza Iqbal Pramudya, M.Kom
- **Tanggal Praktikum**: 15 September 2026

---

## 1. TUJUAN PRAKTIKUM

Setelah menyelesaikan praktikum ini, mahasiswa mampu:
- ✅ Menuliskan kode dengan TypeScript secara konsisten menggunakan `type` dan `interface`
- ✅ Membangun komponen React yang reusable dengan props yang ditipekan dengan benar
- ✅ Mengelola state lokal menggunakan `useState` dan menangani event pengguna
- ✅ Menggunakan `useEffect` untuk side effect tanpa menyebabkan infinite loop
- ✅ Melakukan commit Git secara bertahap sebagai bukti proses pengerjaan

---

## 2. HASIL PRAKTIKUM

### 2.1 Verifikasi TypeScript Configuration

**File**: `tsconfig.json`

Screenshot tsconfig.json:
```
[SCREENSHOT: Tampilkan isi file tsconfig.json]
```

**Hasil TypeScript Check**:
```bash
npx tsc --noEmit
```

Screenshot hasil type checking:
```
[SCREENSHOT: Hasil npx tsc --noEmit tanpa error]
```

---

### 2.2 Definisi Type dan Interface

**File**: `src/types/cuaca.ts`

**Kode**:
```typescript
// types/cuaca.ts
export interface DataCuaca {
  kota: string;
  suhu: number;
  kelembapan: number;
  catatan?: string;
}

export type TingkatAQI = "BAIK" | "SEDANG" | "TIDAK_SEHAT" | "BERBAHAYA";

export interface WeatherCardProps {
  kota: string;
  suhu: number;
  tingkatAQI: TingkatAQI;
}

// Latihan Mandiri - Interface LaporanUdara
export interface LaporanUdara {
  kota: string;
  indeksAQI: number;
  tingkat: "BAIK" | "SEDANG" | "TIDAK_SEHAT" | "BERBAHAYA";
  diperbaruiPada?: string;
}
```

Screenshot kode cuaca.ts di VS Code:
```
[SCREENSHOT: File cuaca.ts di editor VS Code]
```

---

### 2.3 Komponen WeatherCard

**File**: `src/components/WeatherCard.tsx`

**Kode**:
```typescript
// components/WeatherCard.tsx
import { View, Text } from "react-native";
import { WeatherCardProps } from "../types/cuaca";

export default function WeatherCard({ kota, suhu, tingkatAQI }: WeatherCardProps) {
  const warnaAQI = tingkatAQI === "BAIK" ? "green" : "orange";

  return (
    <View style={{ padding: 16, borderRadius: 8, backgroundColor: "#F4F7FA" }}>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>{kota}</Text>
      <Text style={{ fontSize: 32 }}>{suhu}°C</Text>
      <Text style={{ color: warnaAQI }}>AQI: {tingkatAQI}</Text>
    </View>
  );
}
```

Screenshot kode WeatherCard.tsx:
```
[SCREENSHOT: File WeatherCard.tsx di VS Code]
```

---

### 2.4 Komponen SearchBox

**File**: `src/components/SearchBox.tsx`

**Kode**:
```typescript
// components/SearchBox.tsx
import { useState } from "react";
import { View, TextInput, Button } from "react-native";

interface SearchBoxProps {
  onCari: (kota: string) => void;
}

export default function SearchBox({ onCari }: SearchBoxProps) {
  const [teks, setTeks] = useState("");

  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      <TextInput
        placeholder="Nama kota"
        value={teks}
        onChangeText={setTeks}
        style={{ flex: 1, borderWidth: 1, padding: 8 }}
      />
      <Button title="Cari" onPress={() => onCari(teks)} />
    </View>
  );
}
```

Screenshot kode SearchBox.tsx:
```
[SCREENSHOT: File SearchBox.tsx di VS Code]
```

**Penjelasan useState**:
Komponen ini menggunakan `useState` untuk membuat controlled component. State `teks` menyimpan nilai input yang diketik user, dan `setTeks` adalah fungsi untuk mengupdate state tersebut.

---

### 2.5 Komponen RiwayatList

**File**: `src/components/RiwayatList.tsx`

**Kode**:
```typescript
// components/RiwayatList.tsx
import { View, Text } from "react-native";

interface RiwayatListProps {
  daftarKota: string[];
}

export default function RiwayatList({ daftarKota }: RiwayatListProps) {
  return (
    <View>
      {daftarKota.map((kota) => (
        <Text key={kota}>{kota}</Text>
      ))}
    </View>
  );
}
```

Screenshot kode RiwayatList.tsx:
```
[SCREENSHOT: File RiwayatList.tsx di VS Code]
```

**Penjelasan Key Prop**:
Setiap elemen hasil `map()` diberi prop `key={kota}` untuk membantu React mengidentifikasi elemen mana yang berubah, ditambahkan, atau dihapus, sehingga rendering lebih efisien.

---

### 2.6 Halaman Utama dengan Lifting State Up

**File**: `src/app/index.tsx`

**Kode**:
```typescript
// app/index.tsx
import { View } from "react-native";
import { useState, useEffect } from "react";
import WeatherCard from "@/components/WeatherCard";
import SearchBox from "@/components/SearchBox";
import RiwayatList from "@/components/RiwayatList";

export default function HalamanUtama() {
  const [kotaAktif, setKotaAktif] = useState("Pekalongan");
  const [riwayat, setRiwayat] = useState<string[]>(["Pekalongan"]);

  useEffect(() => {
    console.log("Kota aktif berubah menjadi:", kotaAktif);
  }, [kotaAktif]);

  function handleCari(kota: string) {
    setKotaAktif(kota);
    if (!riwayat.includes(kota)) {
      setRiwayat([...riwayat, kota]);
    }
  }

  return (
    <View style={{ padding: 16, gap: 16 }}>
      <SearchBox onCari={handleCari} />
      <WeatherCard kota={kotaAktif} suhu={29} tingkatAQI="BAIK" />
      <RiwayatList daftarKota={riwayat} />
    </View>
  );
}
```

Screenshot kode index.tsx:
```
[SCREENSHOT: File index.tsx di VS Code]
```

**Penjelasan Lifting State Up**:
State `kotaAktif` dan `riwayat` dikelola di komponen induk (HalamanUtama) dan di-share ke komponen child melalui props. Ini memungkinkan sinkronisasi data antar komponen.

**Penjelasan useEffect**:
`useEffect` dengan dependency array `[kotaAktif]` akan dijalankan setiap kali nilai `kotaAktif` berubah. Ini mencegah infinite loop karena hanya berjalan saat dependency berubah.

---

### 2.7 Latihan Mandiri - Komponen IndikatorAQI

**File**: `src/components/IndikatorAQI.tsx`

**Kode**:
```typescript
// components/IndikatorAQI.tsx
import { View, Text } from "react-native";
import { LaporanUdara } from "../types/cuaca";

export default function IndikatorAQI({ kota, indeksAQI, tingkat, diperbaruiPada }: LaporanUdara) {
  const getWarnaByTingkat = (tingkat: string) => {
    switch (tingkat) {
      case "BAIK":
        return "#4CAF50"; // hijau
      case "SEDANG":
        return "#FFC107"; // kuning
      case "TIDAK_SEHAT":
        return "#FF9800"; // orange
      case "BERBAHAYA":
        return "#F44336"; // merah
      default:
        return "#757575"; // abu-abu
    }
  };

  const warna = getWarnaByTingkat(tingkat);

  return (
    <View style={{ padding: 12, borderRadius: 8, borderWidth: 2, borderColor: warna, backgroundColor: "#FAFAFA" }}>
      <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 4 }}>{kota}</Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: warna }} />
        <Text style={{ fontSize: 14, color: warna, fontWeight: "600" }}>
          {tingkat} (AQI: {indeksAQI})
        </Text>
      </View>
      {diperbaruiPada && (
        <Text style={{ fontSize: 12, color: "#757575", marginTop: 4 }}>
          Diperbarui: {diperbaruiPada}
        </Text>
      )}
    </View>
  );
}
```

Screenshot kode IndikatorAQI.tsx:
```
[SCREENSHOT: File IndikatorAQI.tsx di VS Code]
```

**Penjelasan**:
Komponen ini menggunakan interface `LaporanUdara` dan menampilkan warna yang berbeda-beda berdasarkan tingkat AQI menggunakan fungsi `getWarnaByTingkat()`.

---

## 3. STRUKTUR PROYEK

Screenshot struktur folder proyek:
```
[SCREENSHOT: Tree view/explorer VS Code menampilkan struktur folder]
```

**Struktur folder yang dibuat**:
```
orientasi-jelajah-aman/
├── src/
│   ├── app/
│   │   └── index.tsx
│   ├── components/
│   │   ├── WeatherCard.tsx
│   │   ├── SearchBox.tsx
│   │   ├── RiwayatList.tsx
│   │   └── IndikatorAQI.tsx
│   └── types/
│       └── cuaca.ts
├── tsconfig.json
└── package.json
```

---

## 4. GIT COMMIT HISTORY

**Riwayat Commit**:
```bash
git log --oneline -7
```

Screenshot git log:
```
[SCREENSHOT: Hasil git log menampilkan 7 commit]
```

**Detail Commit**:
1. `bb7a622` - feat: tambah interface DataCuaca dan WeatherCardProps
2. `6dd9008` - feat: buat komponen WeatherCard
3. `fd4d9ce` - feat: buat komponen SearchBox dengan useState
4. `fbab8d9` - feat: buat komponen RiwayatList
5. `7353449` - feat: gabungkan komponen di halaman utama
6. `0dcdcbf` - feat: tambah useEffect untuk log perubahan kota
7. `1a86091` - feat: latihan mandiri - tambah interface LaporanUdara dan komponen IndikatorAQI

Screenshot GitHub repository:
```
[SCREENSHOT: Halaman GitHub repository menampilkan commit history]
```

**Link Repository GitHub**: https://github.com/Raffris-bit/orientasi-jelajah-aman

---

## 5. MENJALANKAN APLIKASI

### 5.1 Development Server

**Perintah menjalankan Expo**:
```bash
npx expo start
```

Screenshot Expo DevTools:
```
[SCREENSHOT: Terminal menampilkan QR code dan menu Expo]
```

### 5.2 Aplikasi Berjalan di Expo Go

Screenshot aplikasi di HP (Expo Go):
```
[SCREENSHOT 1: Tampilan awal aplikasi dengan SearchBox, WeatherCard, dan RiwayatList]
[SCREENSHOT 2: Setelah mencari kota "Jakarta" - menampilkan perubahan]
[SCREENSHOT 3: Setelah mencari kota "Bandung" - riwayat bertambah]
```

### 5.3 Console Log useEffect

Screenshot console log di terminal:
```
[SCREENSHOT: Terminal menampilkan log "Kota aktif berubah menjadi: ..."]
```

**Penjelasan**:
Setiap kali user mencari kota baru, useEffect akan menjalankan `console.log()` dan mencatat perubahan di terminal. Ini membuktikan useEffect bekerja dengan benar tanpa infinite loop.

---

## 6. VERIFIKASI TYPESCRIPT

**TypeScript Check Hasil Akhir**:
```bash
npx tsc --noEmit
```

Screenshot hasil akhir type checking:
```
[SCREENSHOT: Hasil npx tsc --noEmit tanpa error setelah semua komponen selesai]
```

**Status**: ✅ Tidak ada type error

---

## 7. CHECKLIST COMPLETION

Checklist kelulusan praktikum:

- ☑ File `types/cuaca.ts` berhasil dibuat tanpa type error
- ☑ Komponen WeatherCard tampil dengan props yang benar
- ☑ Komponen SearchBox berhasil mengubah kotaAktif saat tombol Cari ditekan
- ☑ Komponen RiwayatList menampilkan daftar kota tanpa warning "missing key"
- ☑ useEffect mencatat log setiap kota berubah, tanpa infinite loop
- ☑ Minimal 6 commit bertahap berhasil dibuat dan di-push ke GitHub
- ☑ Latihan mandiri interface LaporanUdara dan komponen IndikatorAQI terselesaikan

---

## 8. ANALISIS DAN PEMBELAJARAN

### 8.1 TypeScript vs JavaScript
**Keuntungan menggunakan TypeScript**:
- Type safety mencegah error saat development
- Autocomplete lebih baik di IDE
- Interface dan type membuat kode lebih self-documenting
- Mudah refactor karena tipe data terjaga

### 8.2 React Hooks
**useState**:
- Mengelola state lokal di functional component
- Re-render component saat state berubah
- Cocok untuk data yang berubah berdasarkan interaksi user

**useEffect**:
- Menjalankan side effect setelah render
- Dependency array mengontrol kapan effect dijalankan
- Mencegah infinite loop dengan dependency yang tepat

### 8.3 Component Design Pattern
**Lifting State Up**:
- State dikelola di parent component
- Child component menerima data via props
- Memudahkan sinkronisasi data antar komponen
- Single source of truth untuk state

### 8.4 Reusable Components
Semua komponen yang dibuat (WeatherCard, SearchBox, RiwayatList, IndikatorAQI) bersifat reusable karena:
- Menggunakan props yang well-typed
- Tidak terikat dengan logic spesifik
- Bisa digunakan di berbagai bagian aplikasi

---

## 9. KENDALA DAN SOLUSI

### Kendala yang Dihadapi:
1. **[Isi jika ada kendala, misalnya: Type error saat pertama kali membuat interface]**
   - Solusi: [Isi solusi yang dilakukan]

2. **[Isi kendala lain jika ada]**
   - Solusi: [Isi solusi]

### Pembelajaran:
- [Isi pembelajaran yang didapat dari praktikum ini]
- [Isi insight atau pemahaman baru]

---

## 10. KESIMPULAN

Praktikum Pertemuan 2 berhasil diselesaikan dengan sempurna. Semua komponen TypeScript dan React telah dibuat dengan baik, terverifikasi tanpa error, dan berjalan sesuai ekspektasi. Aplikasi Jelajah Aman telah memiliki fondasi yang kuat untuk dilanjutkan ke materi UI/Navigasi di Pertemuan 3.

**Komponen yang berhasil dibuat**:
- ✅ 4 komponen React reusable (WeatherCard, SearchBox, RiwayatList, IndikatorAQI)
- ✅ 2 interface dan 1 type union (DataCuaca, WeatherCardProps, LaporanUdara, TingkatAQI)
- ✅ Implementasi useState untuk state management
- ✅ Implementasi useEffect untuk side effect
- ✅ Lifting state up pattern untuk komunikasi antar komponen
- ✅ Git workflow dengan 7 commit bertahap

**Repository GitHub**: https://github.com/Raffris-bit/orientasi-jelajah-aman

---

**Tanda Tangan Digital**

**Mahasiswa**                    **Dosen Pengampu**

[Nama Lengkap]                   Reza Iqbal Pramudya, M.Kom
NIM: [NIM Anda]

---

*Laporan ini dibuat sebagai bukti penyelesaian Modul Praktikum Pertemuan 2 - Pemrograman Berbasis Platform*
