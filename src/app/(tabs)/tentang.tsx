// app/(tabs)/tentang.tsx
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { typeScale, spacing } from "../../constants/styles";

export default function TabTentang() {
  return (
    <SafeAreaView style={{ flex: 1, padding: spacing.sedang }}>
      <View style={{ gap: spacing.kecil }}>
        <Text
          accessible
          accessibilityLabel="Nama aplikasi Jelajah Aman"
          style={{ fontSize: typeScale.judul, fontWeight: "bold" }}
        >
          Jelajah Aman
        </Text>
        <Text style={{ fontSize: typeScale.isi, marginTop: spacing.kecil }}>
          Versi 1.0.0
        </Text>
        <Text style={{ fontSize: typeScale.isi, marginTop: spacing.sedang }}>
          Pembuat: [Nama Anda]
        </Text>
        <Text style={{ fontSize: typeScale.keterangan, marginTop: spacing.sedang, color: "#666" }}>
          Aplikasi informasi cuaca dan kualitas udara untuk perjalanan yang lebih aman.
        </Text>
      </View>
    </SafeAreaView>
  );
}
