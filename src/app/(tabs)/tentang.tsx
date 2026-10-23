// app/(tabs)/tentang.tsx
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { typeScale, spacing } from "../../constants/styles";
import { useTheme } from "../../contexts/ThemeContext";

export default function TabTentang() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, padding: spacing.sedang, backgroundColor: colors.background }}>
      <View style={{ gap: spacing.kecil }}>
        <Text
          accessible
          accessibilityLabel="Nama aplikasi Jelajah Aman"
          style={{ fontSize: typeScale.judul, fontWeight: "bold", color: colors.text }}
        >
          Jelajah Aman
        </Text>
        <Text style={{ fontSize: typeScale.isi, marginTop: spacing.kecil, color: colors.text }}>
          Versi 1.0.0
        </Text>
        <Text style={{ fontSize: typeScale.isi, marginTop: spacing.sedang, color: colors.text }}>
          Pembuat: M. RAFI RIs
        </Text>
        <Text style={{ fontSize: typeScale.keterangan, marginTop: spacing.sedang, color: colors.textSecondary }}>
          Aplikasi informasi cuaca dan kualitas udara untuk perjalanan yang lebih aman.
        </Text>
      </View>
    </SafeAreaView>
  );
}
