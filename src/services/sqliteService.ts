// src/services/sqliteService.ts
import * as SQLite from 'expo-sqlite';
import { DataCuacaLengkap, DataKualitasUdara } from '../types/weather';

const DB_NAME = 'jelajahaman.db';

// 1. Membuat tabel jika belum ada
export async function initDB() {
  try {
    const db = await SQLite.openDatabaseAsync(DB_NAME);
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS riwayat_cuaca (
        id_kota TEXT PRIMARY KEY,
        nama_kota TEXT,
        data_cuaca TEXT,
        data_aqi TEXT,
        waktu_simpan INTEGER
      );
    `);
    console.log("Database SQLite berhasil diinisialisasi!");
  } catch (error) {
    console.error("Gagal membuat database:", error);
  }
}

// 2. Menyimpan data (Cache) ke SQLite saat Online
export async function simpanCuacaKeDB(idKota: string, namaKota: string, cuaca: DataCuacaLengkap, aqi: DataKualitasUdara) {
  try {
    const db = await SQLite.openDatabaseAsync(DB_NAME);
    await db.runAsync(
      `INSERT OR REPLACE INTO riwayat_cuaca (id_kota, nama_kota, data_cuaca, data_aqi, waktu_simpan) VALUES (?, ?, ?, ?, ?)`,
      [idKota, namaKota, JSON.stringify(cuaca), JSON.stringify(aqi), Date.now()]
    );
    console.log(`Cuaca ${namaKota} berhasil disimpan ke SQLite!`);
  } catch (error) {
    console.error("Gagal menyimpan ke database:", error);
  }
}

// 3. Mengambil data dari SQLite saat Offline
export async function ambilCuacaDariDB(idKota: string) {
  try {
    const db = await SQLite.openDatabaseAsync(DB_NAME);
    // Menggunakan getFirstAsync untuk mengambil 1 baris data
    const baris = await db.getFirstAsync<{ data_cuaca: string, data_aqi: string }>(
      'SELECT data_cuaca, data_aqi FROM riwayat_cuaca WHERE id_kota = ?',
      [idKota]
    );

    if (baris) {
      return {
        cuaca: JSON.parse(baris.data_cuaca) as DataCuacaLengkap,
        aqi: JSON.parse(baris.data_aqi) as DataKualitasUdara
      };
    }
    return null;
  } catch (error) {
    console.error("Gagal mengambil dari database:", error);
    return null;
  }
}