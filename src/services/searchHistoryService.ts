// src/services/searchHistoryService.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY_SEARCH_HISTORY = "@jelajah_aman:search_history";
const MAX_HISTORY = 10;

export interface SearchHistoryItem {
  id: number;
  nama: string;
  latitude: number;
  longitude: number;
  tanggalPencarian: string;
}

export async function tambahKeRiwayat(item: Omit<SearchHistoryItem, "tanggalPencarian">) {
  try {
    const riwayat = await ambilRiwayatPencarian();

    // Hapus duplikat berdasarkan id
    const riwayatBersih = riwayat.filter((r) => r.id !== item.id);

    // Tambahkan item baru di awal
    const riwayatBaru: SearchHistoryItem[] = [
      {
        ...item,
        tanggalPencarian: new Date().toISOString(),
      },
      ...riwayatBersih,
    ].slice(0, MAX_HISTORY); // Batasi maksimal 10 item

    await AsyncStorage.setItem(KEY_SEARCH_HISTORY, JSON.stringify(riwayatBaru));
  } catch (error) {
    console.error("Gagal menyimpan riwayat pencarian:", error);
  }
}

export async function ambilRiwayatPencarian(): Promise<SearchHistoryItem[]> {
  try {
    const data = await AsyncStorage.getItem(KEY_SEARCH_HISTORY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Gagal mengambil riwayat pencarian:", error);
    return [];
  }
}

export async function hapusItemRiwayat(id: number) {
  try {
    const riwayat = await ambilRiwayatPencarian();
    const riwayatBaru = riwayat.filter((r) => r.id !== id);
    await AsyncStorage.setItem(KEY_SEARCH_HISTORY, JSON.stringify(riwayatBaru));
  } catch (error) {
    console.error("Gagal menghapus item riwayat:", error);
  }
}

export async function hapusSemuaRiwayat() {
  try {
    await AsyncStorage.removeItem(KEY_SEARCH_HISTORY);
  } catch (error) {
    console.error("Gagal menghapus semua riwayat:", error);
  }
}
