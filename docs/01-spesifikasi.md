# Spesifikasi Produk

**Nama tim:** E-DALANG
**Nama produk:** KasirKu — Aplikasi Kasir Warung Makan / Cafe
**Alur inti yang dibangun:** Kasir memilih menu dan jumlah pesanan, sistem menghitung total tagihan dan kembalian secara otomatis.

## 1. Masalah
Pemilik warung makan atau cafe kecil sering menghitung total pesanan secara manual menggunakan kalkulator atau bahkan hapal di luar kepala. Hal ini rawan kesalahan hitung, terutama saat ramai. Kasir juga kesulitan melacak riwayat transaksi dan membuat laporan penjualan harian.

## 2. Pengguna
- **Kasir warung / cafe kecil** — perlu cara cepat dan akurat untuk mencatat pesanan dan menghitung kembalian
- **Pemilik warung / cafe** — perlu melihat riwayat transaksi dan laporan penjualan

## 3. Hasil wawancara calon pengguna
Narasumber: Pemilik warung makan, sekitar 35 tahun
Cara wawancara: Langsung / tanggal: (isi tanggal)

| Pertanyaan kami | Jawaban narasumber |
|---|---|
| Bagaimana cara kamu menghitung pesanan sekarang? | Pakai kalkulator atau hafalan, kadang salah kalau ramai |
| Apa yang paling menyulitkan? | Susah rekap penjualan di akhir hari |
| Fitur apa yang paling kamu butuhkan? | Bisa pilih menu yang ada, hitung otomatis, dan lihat rekap transaksi |

## 4. Fitur wajib (hanya untuk alur inti)
1. Kasir dapat melihat daftar menu beserta harga
2. Kasir dapat memilih menu dan mengatur jumlah pesanan
3. Sistem menghitung total tagihan secara otomatis (termasuk diskon jika berlaku)
4. Kasir memasukkan uang bayar, sistem menghitung kembalian
5. Transaksi tersimpan dan bisa dilihat di riwayat

## 5. Di luar cakupan (tidak dikerjakan dalam challenge ini)
- Sistem login/autentikasi pengguna
- Integrasi printer struk
- Pembayaran digital / QRIS
- Laporan analitik lanjutan (grafik penjualan, dll.)
- Multi-cabang

## 6. Aturan bisnis dan perhitungan
- Harga setiap menu sudah termasuk pajak (tidak ada pajak tambahan)
- Diskon berlaku jika total belanja ≥ Rp 100.000 → diskon 10%
- Kembalian = Uang bayar - Total setelah diskon
- Kasir tidak dapat menyelesaikan transaksi jika uang bayar < total tagihan
- Minimal 1 item harus dipilih sebelum bisa checkout

## 7. Data yang disimpan
| Data | Contoh isi | Disimpan di mana |
|---|---|---|
| Daftar menu | `{ id: 1, nama: "Nasi Goreng", harga: 15000, kategori: "Makanan" }` | localStorage / state |
| Transaksi | `{ id: "TRX001", waktu: "2026-10-08 14:00", items: [...], total: 45000, diskon: 0, bayar: 50000, kembalian: 5000 }` | localStorage |
| Item pesanan | `{ menuId: 1, nama: "Nasi Goreng", jumlah: 2, subtotal: 30000 }` | state (sementara) |

## 8. Kriteria "selesai"
Setiap kriteria harus bisa diuji (bisa dijawab ya atau tidak).
- [x] Kasir dapat memilih menu dari daftar yang tersedia
- [x] Jumlah item bisa ditambah dan dikurangi
- [x] Total tagihan berubah otomatis saat item ditambah/dikurangi
- [x] Diskon 10% otomatis muncul jika total ≥ Rp 100.000
- [x] Sistem menghitung kembalian dengan benar
- [x] Sistem menolak checkout jika uang bayar kurang dari total
- [x] Sistem menolak checkout jika tidak ada item dipilih
- [x] Transaksi tersimpan dan muncul di halaman riwayat
- [x] Riwayat bisa dicari berdasarkan tanggal atau nomor transaksi (Tugas 3)
- [x] Data riwayat bisa diunduh dalam format CSV (Tugas 3)
