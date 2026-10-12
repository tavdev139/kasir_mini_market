// src/lib/kasir.js
// Semua logika bisnis kasir ada di sini (murni fungsi, mudah diuji)

/** Daftar produk awal minimarket sekolah / koperasi sekolah */
export const MENU_AWAL = [
  { id: 1, nama: "Buku Tulis B5", harga: 5000, kategori: "Alat Tulis" },
  { id: 2, nama: "Pulpen Gel Hitam", harga: 4000, kategori: "Alat Tulis" },
  { id: 3, nama: "Pensil 2B", harga: 3000, kategori: "Alat Tulis" },
  { id: 4, nama: "Penghapus Pensil", harga: 2500, kategori: "Alat Tulis" },
  { id: 5, nama: "Penggaris 30cm", harga: 3500, kategori: "Alat Tulis" },
  { id: 6, nama: "Tip-Ex Kertas Correction", harga: 8000, kategori: "Alat Tulis" },
  { id: 7, nama: "Roti Cokelat Keju", harga: 6000, kategori: "Makanan Ringan" },
  { id: 8, nama: "Biskuit Cokelat", harga: 8500, kategori: "Makanan Ringan" },
  { id: 9, nama: "Wafer Cokelat", harga: 4000, kategori: "Makanan Ringan" },
  { id: 10, nama: "Keripik Singkong", harga: 5000, kategori: "Makanan Ringan" },
  { id: 11, nama: "Air Mineral 600ml", harga: 3500, kategori: "Minuman" },
  { id: 12, nama: "Susu Kotak UHT 200ml", harga: 6000, kategori: "Minuman" },
  { id: 13, nama: "Teh Kotak Melati", harga: 4500, kategori: "Minuman" },
  { id: 14, nama: "Jus Buah Kemasan", harga: 7000, kategori: "Minuman" },
  { id: 15, nama: "Tisu Saku", harga: 3000, kategori: "Perlengkapan Siswa" },
  { id: 16, nama: "Kaos Kaki Putih Polos", harga: 12000, kategori: "Perlengkapan Siswa" },
  { id: 17, nama: "Dasi Seragam Sekolah", harga: 15000, kategori: "Perlengkapan Siswa" },
];

/** Aturan bisnis: diskon 10% jika total >= Rp 100.000 */
export const BATAS_DISKON = 100000;
export const PERSEN_DISKON = 0.1;

/**
 * Hitung subtotal satu item pesanan.
 * @param {number} harga - harga satuan
 * @param {number} jumlah - banyak item
 * @returns {number}
 */
export function hitungSubtotal(harga, jumlah) {
  if (jumlah < 0) return 0;
  return harga * jumlah;
}

/**
 * Hitung total tagihan dari keranjang pesanan.
 * @param {Array<{harga: number, jumlah: number}>} keranjang
 * @returns {number}
 */
export function hitungTotal(keranjang) {
  return keranjang.reduce((acc, item) => acc + hitungSubtotal(item.harga, item.jumlah), 0);
}

/**
 * Hitung diskon. Diskon 10% jika total >= BATAS_DISKON.
 * @param {number} total
 * @returns {number} nominal diskon (bukan persen)
 */
export function hitungDiskon(total) {
  if (total >= BATAS_DISKON) {
    return Math.round(total * PERSEN_DISKON);
  }
  return 0;
}

/**
 * Hitung total akhir setelah diskon.
 * @param {number} total
 * @returns {number}
 */
export function hitungTotalAkhir(total) {
  return total - hitungDiskon(total);
}

/**
 * Hitung kembalian.
 * @param {number} bayar - uang yang dibayarkan
 * @param {number} totalAkhir - total setelah diskon
 * @returns {number} kembalian (negatif berarti kurang bayar)
 */
export function hitungKembalian(bayar, totalAkhir) {
  return bayar - totalAkhir;
}

/**
 * Format angka ke format rupiah. Contoh: 15000 → "Rp 15.000"
 * @param {number} angka
 * @returns {string}
 */
export function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

/**
 * Buat ID transaksi unik.
 * @returns {string} contoh: "TRX-20261008-001"
 */
export function buatIdTransaksi() {
  const now = new Date();
  const tgl = now.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = String(Math.floor(Math.random() * 1000)).padStart(3, "0");
  return `TRX-${tgl}-${rand}`;
}

/**
 * Filter daftar transaksi berdasarkan keyword dan rentang tanggal.
 * @param {Array} transaksi
 * @param {string} keyword - ID transaksi atau substring
 * @param {string} dari - tanggal awal (YYYY-MM-DD), opsional
 * @param {string} sampai - tanggal akhir (YYYY-MM-DD), opsional
 * @returns {Array}
 */
export function filterTransaksi(transaksi, keyword = "", dari = "", sampai = "") {
  return transaksi.filter((trx) => {
    const cocokKeyword =
      keyword === "" || trx.id.toLowerCase().includes(keyword.toLowerCase());
    const tglTrx = trx.waktu.slice(0, 10); // ambil YYYY-MM-DD
    const cocokDari = dari === "" || tglTrx >= dari;
    const cocokSampai = sampai === "" || tglTrx <= sampai;
    return cocokKeyword && cocokDari && cocokSampai;
  });
}

/**
 * Ekspor daftar transaksi ke format CSV dan download otomatis (client-side).
 * @param {Array} transaksi
 */
export function eksporCSV(transaksi) {
  if (transaksi.length === 0) return;

  const header = ["ID Transaksi", "Waktu", "Item", "Total", "Diskon", "Total Akhir", "Bayar", "Kembalian"];
  const baris = transaksi.map((trx) => [
    trx.id,
    trx.waktu,
    trx.items.map((i) => `${i.nama} x${i.jumlah}`).join("; "),
    trx.total,
    trx.diskon,
    trx.totalAkhir,
    trx.bayar,
    trx.kembalian,
  ]);

  const csvContent = [header, ...baris]
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `transaksi-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
