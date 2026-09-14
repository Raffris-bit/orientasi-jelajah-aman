// components/IndikatorAQI.tsx
import { View, Text } from "react-native";
import { LaporanUdara } from "../types/cuaca";

export default function IndikatorAQI({ kota, indeksAQI, tingkat, diperbaruiPada }: LaporanUdara) {
  // Menentukan warna berdasarkan tingkat AQI
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
