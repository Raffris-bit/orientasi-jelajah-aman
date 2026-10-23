// src/app/(tabs)/pengaturan.tsx
import { useState } from "react";
import { Text, Button, View, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { hapusSemuaCache } from "../../services/cacheRepository";
import { useTheme } from "../../contexts/ThemeContext";

export default function TabPengaturan() {
  const [pesan, setPesan] = useState<string | null>(null);
  const { themeMode, setThemeMode, colors } = useTheme();

  async function hapusDataTersimpan() {
    Alert.alert(
      "Konfirmasi",
      "Yakin ingin menghapus semua data cuaca tersimpan?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            await hapusSemuaCache();
            setPesan("Data cuaca tersimpan sudah dihapus.");
            setTimeout(() => setPesan(null), 3000);
          },
        },
      ]
    );
  }

  const themeModes = [
    { value: "light" as const, label: "Terang" },
    { value: "dark" as const, label: "Gelap" },
    { value: "system" as const, label: "Ikuti Sistem" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ padding: 16, gap: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: colors.text }}>
          Jelajah Aman
        </Text>
        <Text style={{ color: colors.textSecondary }}>Versi 1.0.0</Text>

        {/* UTS: Pilihan Tema */}
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 12, color: colors.text }}>
            Tema Aplikasi
          </Text>
          {themeModes.map((mode) => (
            <TouchableOpacity
              key={mode.value}
              onPress={() => setThemeMode(mode.value)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 12,
                marginBottom: 8,
                backgroundColor: themeMode === mode.value ? colors.primary + "20" : colors.surface,
                borderRadius: 8,
                borderWidth: themeMode === mode.value ? 2 : 1,
                borderColor: themeMode === mode.value ? colors.primary : colors.border,
              }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: colors.primary,
                  marginRight: 12,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {themeMode === mode.value && (
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: colors.primary,
                    }}
                  />
                )}
              </View>
              <Text style={{ fontSize: 16, color: colors.text }}>{mode.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ marginTop: 24 }}>
          <Button title="Hapus Data Cuaca Tersimpan" onPress={hapusDataTersimpan} color={colors.error} />
          {pesan && (
            <Text accessibilityLabel={pesan} style={{ marginTop: 12, color: colors.success }}>
              {pesan}
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
