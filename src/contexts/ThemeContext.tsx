// src/contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeMode = "light" | "dark" | "system";
type ActualTheme = "light" | "dark";

interface ThemeContextType {
  themeMode: ThemeMode;
  actualTheme: ActualTheme;
  setThemeMode: (mode: ThemeMode) => void;
  colors: ThemeColors;
}

interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  primary: string;
  border: string;
  error: string;
  success: string;
  card: string;
  cardAlt: string;
}

const lightColors: ThemeColors = {
  background: "#ffffff",
  surface: "#f5f5f5",
  text: "#000000",
  textSecondary: "#666666",
  primary: "#007AFF",
  border: "#e0e0e0",
  error: "#ff6b6b",
  success: "#51cf66",
  card: "#f0f0f0",
  cardAlt: "#e8f5e9",
};

const darkColors: ThemeColors = {
  background: "#121212",
  surface: "#1e1e1e",
  text: "#ffffff",
  textSecondary: "#b0b0b0",
  primary: "#0a84ff",
  border: "#2c2c2c",
  error: "#ff6b6b",
  success: "#51cf66",
  card: "#2a2a2a",
  cardAlt: "#1a3a1a",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "@jelajah_aman:theme_mode";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useSystemColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>("system");
  const [isLoading, setIsLoading] = useState(true);

  // Load theme preference from storage
  useEffect(() => {
    loadThemePreference();
  }, []);

  async function loadThemePreference() {
    try {
      const saved = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (saved && (saved === "light" || saved === "dark" || saved === "system")) {
        setThemeModeState(saved as ThemeMode);
      }
    } catch (error) {
      console.error("Gagal memuat preferensi tema:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function setThemeMode(mode: ThemeMode) {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
      setThemeModeState(mode);
    } catch (error) {
      console.error("Gagal menyimpan preferensi tema:", error);
    }
  }

  // Determine actual theme based on mode and system preference
  const actualTheme: ActualTheme =
    themeMode === "system"
      ? systemColorScheme === "dark"
        ? "dark"
        : "light"
      : themeMode;

  const colors = actualTheme === "dark" ? darkColors : lightColors;

  if (isLoading) {
    return null; // Atau loading indicator
  }

  return (
    <ThemeContext.Provider value={{ themeMode, actualTheme, setThemeMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme harus digunakan di dalam ThemeProvider");
  }
  return context;
}
