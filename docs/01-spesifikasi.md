# Spesifikasi Produk

**Nama tim:** E-DALANG
**Nama produk:** Kasir Mini Market
**Alur inti yang dibangun:** Kasir memilih produk barang dan jumlah pembelian, sistem menghitung total tagihan belanja dan kembalian secara otomatis.

## 1. Masalah
Pengelola toko kelontong dan minimarket skala kecil sering kali menghadapi kendala saat antrean ramai, terutama dalam menghitung total barang belanjaan pelanggan dan uang kembalian secara akurat. Pencatatan manual juga menyulitkan pemilik toko dalam merekap penjualan harian dan memeriksa riwayat transaksi.

## 2. Pengguna
- Kasir minimarket: memerlukan aplikasi cepat, responsif, dan akurat untuk menghitung tagihan barang dan kembalian pelanggan.
- Pemilik toko: memerlukan rekapitulasi data riwayat transaksi penjualan yang rapi dan dapat diunduh.

## 3. Hasil wawancara calon pengguna
Narasumber: Pengelola toko kelontong / minimarket, 32 tahun
Cara wawancara: Langsung

| Pertanyaan kami | Jawaban narasumber |
|---|---|
| Bagaimana proses penghitungan total belanja saat ini? | Masih menggunakan kalkulator manual, rawan salah tekan saat jam sibuk |
| Kendala apa yang paling sering dihadapi? | Rekap total penjualan sore hari membutuhkan waktu lama karena harus menghitung nota fisik satu per satu |
| Fitur apa yang paling mendesak dibutuhkan? | Pemilihan barang belanjaan cepat, hitung diskon dan kembalian otomatis, serta riwayat penjualan yang bisa diekspor |

## 4. Fitur wajib (hanya untuk alur inti)
1. Kasir dapat melihat daftar produk barang minimarket beserta harganya
2. Kasir dapat memilih produk dan menambah atau mengurangi jumlah pembelian
3. Sistem menghitung total tagihan belanja secara otomatis (termasuk diskon promo jika memenuhi syarat)
4. Kasir memasukkan uang bayar, sistem menghitung uang kembalian secara otomatis
5. Transaksi tersimpan dan dapat dilihat pada halaman riwayat penjualan

## 5. Di luar cakupan (tidak dikerjakan dalam challenge ini)
- Integrasi alat pemindai barcode fisik
- Mesin printer cetak struk termal
- Pembayaran terintegrasi kartu debit/kredit dan QRIS payment gateway
- Laporan grafik analitik keuntungan laba rugi lanjutan
- Sistem manajemen gudang multi-cabang

## 6. Aturan bisnis dan perhitungan
- Harga produk sudah merupakan harga final (tidak ada pajak tambahan)
- Program diskon promosi: belanja minimal Rp 100.000 mendapatkan potongan diskon 10%
- Kembalian = Uang bayar - Total setelah diskon
- Kasir tidak dapat menyelesaikan transaksi jika nominal bayar kurang dari total tagihan
- Minimal satu barang harus dipilih sebelum transaksi dapat diselesaikan

## 7. Data yang disimpan
| Data | Contoh isi | Disimpan di mana |
|---|---|---|
| Daftar produk | `{ id: 1, nama: "Beras Premium 1kg", harga: 15000, kategori: "Sembako" }` | localStorage / state |
| Transaksi | `{ id: "TRX-20261008-375", waktu: "2026-10-08 14:55", items: [...], total: 97000, diskon: 0, bayar: 100000, kembalian: 3000 }` | localStorage |
| Item keranjang | `{ id: 1, nama: "Beras Premium 1kg", harga: 15000, jumlah: 2 }` | state halaman kasir |

## 8. Kriteria "selesai"
Setiap kriteria harus bisa diuji (bisa dijawab ya atau tidak).
- [x] Kasir dapat memilih produk dari daftar barang yang tersedia
- [x] Jumlah barang dapat ditambah dan dikurangi
- [x] Total tagihan berubah otomatis saat kuantitas barang berubah
- [x] Diskon 10% otomatis terhitung jika total belanja >= Rp 100.000
- [x] Sistem menghitung kembalian uang dengan tepat
- [x] Sistem menolak transaksi jika uang bayar kurang dari tagihan
- [x] Sistem menolak transaksi jika keranjang belanja masih kosong
- [x] Transaksi langsung tersimpan dan tercatat di riwayat penjualan
- [x] Riwayat penjualan dapat dicari berdasarkan ID atau difilter berdasarkan tanggal (Tugas 3)
- [x] Data riwayat penjualan dapat diunduh ke dalam format CSV (Tugas 3)
