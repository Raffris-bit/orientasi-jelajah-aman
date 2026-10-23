// src/app/(tabs)/index.tsx
import { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";

import SearchBox from "../../components/SearchBox";
import WeatherCard from "../../components/WeatherCard";
import AtribusiCuaca from "../../components/AtribusiCuaca";
import StatusData from "../../components/StatusData";

import { useDebounce } from "../../hooks/use-debounce";
import { cariKota } from "../../services/geocodingService";
import { ambilCuacaOfflineFirst, BATAS_CACHE_MS } from "../../services/cuacaRepository";
import { bersihkanCacheLama, daftarKotaTersimpan, hapusCacheByKunci } from "../../services/cacheRepository";
import { mintaIzinLokasi, ambilKoordinatSaatIni } from "../../services/locationService";
import { ambilSemuaFavorit } from "../../services/favoritStorage";
import { konversiTingkatAQI } from "../../services/weatherAdapter";
import { labelKodeCuaca } from "../../constants/weatherCodes";
import { tambahKeRiwayat } from "../../services/searchHistoryService";

import { HasilGeocoding } from "../../types/geocoding";
import { HasilCuacaOffline, RingkasanKotaTersimpan } from "../../types/cache";
import { useTheme } from "../../contexts/ThemeContext";

export default function HalamanUtama() {
  // UTS: Ambil parameter dari riwayat pencarian
  const params = useLocalSearchParams<{
    kotaId?: string;
    kotaNama?: string;
    kotaLat?: string;
    kotaLon?: string;
  }>();

  // UTS: Gunakan tema
  const { colors } = useTheme();

  const [teksCari, setTeksCari] = useState("");
  const [hasilPencarian, setHasilPencarian] = useState<HasilGeocoding[]>([]);
  const [kotaTerpilih, setKotaTerpilih] = useState<HasilGeocoding | null>(null);
  const [hasil, setHasil] = useState<HasilCuacaOffline | null>(null);
  const [kotaTersimpan, setKotaTersimpan] = useState<RingkasanKotaTersimpan[]>([]);
  const [sedangMemuat, setSedangMemuat] = useState(false);
  const [pesanError, setPesanError] = useState<string | null>(null);
  const [pesanLokasi, setPesanLokasi] = useState<string | null>(null);
  const [isFavorit, setIsFavorit] = useState(false); // Latihan Mandiri 3: Cek apakah kota sudah favorit

  const teksTertunda = useDebounce(teksCari, 500);
  const requestIdRef = useRef(0); // pencegah race condition

  async function muatKotaTersimpan() {
    setKotaTersimpan(await daftarKotaTersimpan());
  }

  // Saat aplikasi dibuka: buang cache > 7 hari, lalu tampilkan daftar tersimpan
  useEffect(() => {
    bersihkanCacheLama(BATAS_CACHE_MS)
      .then(muatKotaTersimpan)
      .catch(() => {});
  }, []);

  // Latihan Mandiri 3: Cek apakah kota terpilih sudah ada di daftar favorit
  useFocusEffect(
    useCallback(() => {
      if (kotaTerpilih) {
        ambilSemuaFavorit().then((daftar) => {
          setIsFavorit(daftar.some((k) => k.id === kotaTerpilih.id));
        });
      }
    }, [kotaTerpilih])
  );

  useEffect(() => {
    if (teksTertunda.trim().length === 0) {
      setHasilPencarian([]);
      return;
    }
    cariKota(teksTertunda).then(setHasilPencarian).catch(() => setHasilPencarian([]));
  }, [teksTertunda]);

  async function pilihKota(kota: HasilGeocoding, paksaPerbarui = false) {
    setKotaTerpilih(kota);
    const idSaatIni = ++requestIdRef.current;

    setSedangMemuat(true);
    setPesanError(null);

    try {
      const data = await ambilCuacaOfflineFirst(
        { id: kota.id, nama: kota.name, latitude: kota.latitude, longitude: kota.longitude },
        { paksaPerbarui }
      );

      if (idSaatIni !== requestIdRef.current) return; // hasil basi, abaikan
      setHasil(data);
      muatKotaTersimpan();

      // Simpan ke riwayat pencarian (kecuali untuk lokasi GPS dengan id: -1)
      if (kota.id !== -1) {
        await tambahKeRiwayat({
          id: kota.id,
          nama: kota.name,
          latitude: kota.latitude,
          longitude: kota.longitude,
        });
      }
    } catch (err) {
      if (idSaatIni !== requestIdRef.current) return;
      setHasil(null);
      setPesanError(
        "Belum ada data tersimpan dan tidak ada koneksi internet. Sambungkan internet lalu coba lagi."
      );
    } finally {
      if (idSaatIni === requestIdRef.current) setSedangMemuat(false);
    }
  }

  async function gunakanLokasiSaatIni() {
    const status = await mintaIzinLokasi();
    if (status === "denied") {
      setPesanLokasi("Izin lokasi ditolak. Silakan cari kota secara manual di atas.");
      return;
    }
    if (status === "unavailable") {
      setPesanLokasi("Layanan lokasi tidak aktif di perangkat ini. Silakan cari kota secara manual.");
      return;
    }
    setPesanLokasi(null);
    const koordinat = await ambilKoordinatSaatIni();
    pilihKota({
      id: -1,
      name: "Lokasi Saat Ini",
      latitude: koordinat.latitude,
      longitude: koordinat.longitude,
      country: "",
    });
  }

  // UTS: Konfirmasi hapus cache kota
  function konfirmasiHapusCache(kunci: string, nama: string) {
    Alert.alert(
      "Konfirmasi Hapus Cache",
      `Yakin ingin menghapus data cache ${nama}? Data ini tidak akan bisa dibuka secara offline lagi.`,
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            await hapusCacheByKunci(kunci);
            muatKotaTersimpan();
            Alert.alert("Berhasil", `Cache ${nama} telah dihapus.`);
          },
        },
      ]
    );
  }

  // UTS: Otomatis pilih kota jika ada parameter dari riwayat
  useEffect(() => {
    if (params.kotaId && params.kotaNama && params.kotaLat && params.kotaLon) {
      pilihKota({
        id: parseInt(params.kotaId),
        name: params.kotaNama,
        latitude: parseFloat(params.kotaLat),
        longitude: parseFloat(params.kotaLon),
        country: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.kotaId, params.kotaNama, params.kotaLat, params.kotaLon]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{ padding: 16, gap: 16 }}
        keyboardShouldPersistTaps="handled"
      >
        <SearchBox onCari={setTeksCari} />

        <Button title="Gunakan Lokasi Saat Ini" onPress={gunakanLokasiSaatIni} />
        {pesanLokasi && (
          <Text accessibilityLabel={pesanLokasi} style={{ color: colors.error }}>
            {pesanLokasi}
          </Text>
        )}

        {hasilPencarian.map((kota) => (
          <TouchableOpacity
            key={kota.id}
            onPress={() => pilihKota(kota)}
            style={{
              padding: 12,
              backgroundColor: colors.surface,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text style={{ color: colors.text }}>{kota.name}</Text>
          </TouchableOpacity>
        ))}

        {kotaTersimpan.length > 0 && (
          <View style={{ gap: 6 }}>
            <Text style={{ fontWeight: "bold", color: colors.text }}>
              Tersimpan di perangkat (bisa dibuka offline)
            </Text>
            {kotaTersimpan.map((k) => (
              <View
                key={k.kunci}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 12,
                  backgroundColor: colors.card,
                  borderRadius: 8,
                  marginBottom: 8,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    pilihKota({
                      id: k.id,
                      name: k.nama,
                      latitude: k.latitude,
                      longitude: k.longitude,
                      country: "",
                    })
                  }
                  style={{ flex: 1 }}
                >
                  <Text style={{ fontSize: 16, fontWeight: "500", color: colors.text }}>
                    {k.nama}
                  </Text>
                  <Text style={{ fontSize: 12, color: colors.textSecondary, marginTop: 4 }}>
                    Disimpan: {new Date(k.disimpanPada).toLocaleDateString("id-ID")}
                  </Text>
                </TouchableOpacity>
                <Button
                  title="Hapus Cache"
                  onPress={() => konfirmasiHapusCache(k.kunci, k.nama)}
                  color={colors.error}
                />
              </View>
            ))}
          </View>
        )}

        {sedangMemuat && <ActivityIndicator />}

        {pesanError && (
          <View>
            <Text accessibilityLabel={pesanError} style={{ color: colors.error }}>
              {pesanError}
            </Text>
            <Button
              title="Coba Lagi"
              onPress={() => kotaTerpilih && pilihKota(kotaTerpilih, true)}
            />
          </View>
        )}

        {hasil && kotaTerpilih && !sedangMemuat && (
          <>
            <StatusData sumber={hasil.sumber} disimpanPada={hasil.disimpanPada} />

            <WeatherCard
              kota={kotaTerpilih.name}
              suhu={hasil.cuaca.saatIni.suhu}
              tingkatAQI={konversiTingkatAQI(hasil.kualitasUdara.indeksAQI)}
            />

            <Text style={{ fontSize: 12, color: colors.textSecondary }}>
              Kondisi: {labelKodeCuaca(hasil.cuaca.saatIni.kodeCuaca)} {"•"} Angin{" "}
              {hasil.cuaca.saatIni.kecepatanAngin} km/j
            </Text>

            <Button
              title="Perbarui Sekarang"
              onPress={() => pilihKota(kotaTerpilih, true)}
            />

            {/* Latihan Mandiri 3: Sembunyikan tombol jika sudah favorit atau lokasi GPS (id: -1) */}
            {!isFavorit && kotaTerpilih.id !== -1 && (
              <Button
                title="Tambahkan ke Favorit"
                onPress={() =>
                  router.push({
                    pathname: "/tambah-favorit",
                    params: {
                      id: String(kotaTerpilih.id),
                      nama: kotaTerpilih.name,
                      lat: String(kotaTerpilih.latitude),
                      lon: String(kotaTerpilih.longitude),
                    },
                  })
                }
              />
            )}
          </>
        )}

        <AtribusiCuaca />
      </ScrollView>
    </SafeAreaView>
  );
}
