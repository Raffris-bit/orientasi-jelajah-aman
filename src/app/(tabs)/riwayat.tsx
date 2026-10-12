// src/app/(tabs)/riwayat.tsx
import { useState, useCallback } from "react";
import { View, Text, Button, Alert } from "react-native";
import { useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { ambilSemuaFavorit, hapusFavorit } from "../../services/favoritStorage";
import { KotaFavorit } from "../../types/favorit";

export default function TabRiwayat() {
  const [daftarFavorit, setDaftarFavorit] = useState<KotaFavorit[]>([]);

  useFocusEffect(
    useCallback(() => {
      ambilSemuaFavorit().then(setDaftarFavorit);
    }, [])
  );

  // Latihan Mandiri 1: Konfirmasi Hapus
  function konfirmasiHapus(id: number, nama: string) {
    Alert.alert("Konfirmasi", `Yakin hapus ${nama}?`, [
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

  return (
    <SafeAreaView style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Kota Favorit</Text>
      
      {/* Latihan Mandiri 2: Menampilkan jumlah favorit */}
      <Text>Tersimpan {daftarFavorit.length} kota</Text>

      {daftarFavorit.length === 0 && <Text>Belum ada kota favorit</Text>}
      
      {daftarFavorit.map((kota) => (
        <View
          key={kota.id}
          style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}
        >
          <Text>{kota.nama}</Text>
          <Button title="Hapus" onPress={() => konfirmasiHapus(kota.id, kota.nama)} color="red" />
        </View>
      ))}
    </SafeAreaView>
  );
}
