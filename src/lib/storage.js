// src/lib/storage.js
// Helper untuk menyimpan & membaca data dari localStorage

const KEY_TRANSAKSI = "kasir_minimarket_sekolah_transaksi";
const KEY_MENU = "kasir_minimarket_sekolah_produk";

import { MENU_AWAL } from "./kasir";

/** Ambil semua transaksi dari localStorage */
export function getTransaksi() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(KEY_TRANSAKSI);
  return data ? JSON.parse(data) : [];
}

/** Simpan satu transaksi baru */
export function simpanTransaksi(transaksi) {
  const semua = getTransaksi();
  semua.unshift(transaksi); // tambah di awal (terbaru di atas)
  localStorage.setItem(KEY_TRANSAKSI, JSON.stringify(semua));
}

/** Ambil daftar menu (dari localStorage atau default) */
export function getMenu() {
  if (typeof window === "undefined") return MENU_AWAL;
  const data = localStorage.getItem(KEY_MENU);
  return data ? JSON.parse(data) : MENU_AWAL;
}

/** Simpan daftar menu */
export function simpanMenu(menu) {
  localStorage.setItem(KEY_MENU, JSON.stringify(menu));
}
