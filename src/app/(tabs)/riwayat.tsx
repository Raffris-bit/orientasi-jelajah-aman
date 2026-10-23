// src/app/(tabs)/riwayat.tsx
import { useState, useCallback } from "react";
import { View, Text, Button, Alert, TouchableOpacity, ScrollView } from "react-native";
import { useFocusEffect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { ambilSemuaFavorit, hapusFavorit } from "../../services/favoritStorage";
import { KotaFavorit } from "../../types/favorit";
import { ambilRiwayatPencarian, hapusItemRiwayat, SearchHistoryItem } from "../../services/searchHistoryService";
import { useTheme } from "../../contexts/ThemeContext";

export default function TabRiwayat() {
  const [daftarFavorit, setDaftarFavorit] = useState<KotaFavorit[]>([]);
  const [riwayatPencarian, setRiwayatPencarian] = useState<SearchHistoryItem[]>([]);

  // UTS: Gunakan tema
  const { colors } = useTheme();

  useFocusEffect(
    useCallback(() => {
      ambilSemuaFavorit().then(setDaftarFavorit);
      ambilRiwayatPencarian().then(setRiwayatPencarian);
    }, [])
  );

  // Latihan Mandiri 1: Konfirmasi Hapus Favorit
  function konfirmasiHapusFavorit(id: number, nama: string) {
    Alert.alert("Konfirmasi", `Yakin hapus ${nama} dari favorit?`, [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        style: "destructive",
        onPress: async () => {
          await hapusFavorit(id);
          setDaftarFavorit((prev) => prev.filter((k) => k.id !== id));
        }
      },
    ]);
  }

  // UTS: Konfirmasi Hapus Riwayat
  function konfirmasiHapusRiwayat(id: number, nama: string) {
    Alert.alert("Konfirmasi", `Yakin hapus ${nama} dari riwayat?`, [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        style: "destructive",
        onPress: async () => {
          await hapusItemRiwayat(id);
          setRiwayatPencarian((prev) => prev.filter((r) => r.id !== id));
        }
      },
    ]);
  }

  // UTS: Fungsi untuk membuka pencarian kota dari riwayat
  function bukaKotaDariRiwayat(item: SearchHistoryItem) {
    router.push({
      pathname: "/",
      params: {
        kotaId: String(item.id),
        kotaNama: item.nama,
        kotaLat: String(item.latitude),
        kotaLon: String(item.longitude),
      },
    });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        {/* Bagian Riwayat Pencarian */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8, color: colors.text }}>Riwayat Pencarian</Text>
          <Text style={{ color: colors.textSecondary, marginBottom: 12 }}>
            {riwayatPencarian.length} pencarian terakhir
          </Text>

          {riwayatPencarian.length === 0 && (
            <Text style={{ color: colors.textSecondary, fontStyle: "italic" }}>
              Belum ada riwayat pencarian
            </Text>
          )}

          {riwayatPencarian.map((item) => (
            <View
              key={`${item.id}-${item.tanggalPencarian}`}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
                padding: 12,
                backgroundColor: colors.surface,
                borderRadius: 8,
              }}
            >
              <TouchableOpacity
                onPress={() => bukaKotaDariRiwayat(item)}
                style={{ flex: 1 }}
              >
                <Text style={{ fontSize: 16, fontWeight: "500", color: colors.text }}>{item.nama}</Text>
                <Text style={{ fontSize: 12, color: colors.textSecondary, marginTop: 4 }}>
                  {new Date(item.tanggalPencarian).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </TouchableOpacity>
              <Button
                title="Hapus"
                onPress={() => konfirmasiHapusRiwayat(item.id, item.nama)}
                color={colors.error}
              />
            </View>
          ))}
        </View>

        {/* Bagian Kota Favorit */}
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8, color: colors.text }}>Kota Favorit</Text>
          <Text style={{ color: colors.textSecondary, marginBottom: 12 }}>
            Tersimpan {daftarFavorit.length} kota
          </Text>

          {daftarFavorit.length === 0 && (
            <Text style={{ color: colors.textSecondary, fontStyle: "italic" }}>
              Belum ada kota favorit
            </Text>
          )}

          {daftarFavorit.map((kota) => (
            <View
              key={kota.id}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
                padding: 12,
                backgroundColor: colors.cardAlt,
                borderRadius: 8,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500", color: colors.text }}>{kota.nama}</Text>
              <Button
                title="Hapus"
                onPress={() => konfirmasiHapusFavorit(kota.id, kota.nama)}
                color={colors.error}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
