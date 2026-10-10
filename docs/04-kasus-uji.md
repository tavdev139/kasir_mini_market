# Kasus Uji

Bagian A diisi sebelum mulai membangun. Hasil yang diharapkan dihitung sendiri oleh tim (boleh dengan kalkulator), bukan oleh AI.
Bagian B diisi setelah aplikasi diuji.

| ID | Kriteria yang diuji | Langkah / input | Hasil yang diharapkan | Hasil sebenarnya | Lulus? | Bukti (nama file tangkapan layar / unit test) |
|---|---|---|---|---|---|---|
| U01 | Hitung total tanpa diskon | Pilih item produk tanpa diskon | Total dihitung otomatis sesuai harga x jumlah | Total tampil sesuai hitungan (contoh Rp97.000) | Lulus | `langkah-2-keranjang-pesanan.png` |
| U02 | Hitung total dengan diskon 10% | Pilih item dengan total >= Rp100.000 (contoh 7x Beras Premium = Rp105.000) | Diskon 10% terpotong, total akhir Rp94.500 | Logika diskon 10% aktif jika total >= 100.000 | Lulus | `src/__tests__/kasir.test.js` (U02) |
| U03 | Hitung kembalian yang benar | Total Rp97.000, bayar Rp100.000 | Kembalian = Rp3.000 | Kembalian tampil tepat Rp3.000 di keranjang dan struk | Lulus | `langkah-3-struk-transaksi.png` |
| U04 | Input bayar kurang dari total (input salah) | Bayar kurang dari total tagihan | Sistem menampilkan pesan error validasi pembayaran | Muncul error uang bayar kurang dan checkout dicegah | Lulus | `src/__tests__/kasir.test.js` (U04) dan validasi form |
| U05 | Checkout tanpa memilih item (input kosong) | Langsung klik bayar saat keranjang kosong | Sistem menampilkan pesan error minimal 1 barang | Muncul pesan validasi dan transaksi ditolak | Lulus | `src/__tests__/kasir.test.js` dan validasi form |
| U06 | Di batas aturan diskon — tepat Rp100.000 | Total belanja pas Rp100.000 | Diskon 10% (Rp10.000), total akhir Rp90.000 | Teruji pada unit test batas tepat Rp100.000 | Lulus | `src/__tests__/kasir.test.js` (U06) |
| U07 | Di batas aturan diskon — di bawah Rp100.000 | Total belanja di bawah Rp100.000 (misal Rp97.000) | Tidak ada diskon, total tetap | Total Rp97.000 tidak mendapat potongan diskon | Lulus | `langkah-2-keranjang-pesanan.png` |
| U08 | Transaksi tersimpan di riwayat | Selesaikan transaksi lalu buka halaman Riwayat | Transaksi tersimpan dengan nomor TRX, waktu, dan nominal | Transaksi langsung masuk di halaman Riwayat | Lulus | `langkah-4-riwayat-transaksi.png` |
| U09 | Input jumlah item 0 / pengurangan sampai habis | Kurangi jumlah item menggunakan tombol minus hingga 0 | Item otomatis terhapus dari keranjang belanja | Item terhapus dan subtotal langsung terbarui | Lulus | `src/__tests__/kasir.test.js` (U09) |
| U10 | Bayar pas (kembalian nol) | Bayar sama persis dengan total tagihan | Kembalian = Rp0, transaksi sukses | Transaksi sukses, kembalian Rp0 di riwayat | Lulus | `langkah-4-riwayat-transaksi.png` (TRX-20261008-607) |
| U11 | Cari transaksi berdasarkan ID (Change Request) | Masukkan ID transaksi di kolom pencarian | Hanya transaksi dengan ID tersebut yang tampil | Pencarian responsif menyaring data transaksi | Lulus | `src/__tests__/kasir.test.js` (U11) |
| U12 | Filter riwayat berdasarkan tanggal (Change Request) | Pilih tanggal di kolom filter tanggal | Hanya transaksi pada tanggal tersebut yang tampil | Data terfilter sesuai rentang tanggal | Lulus | `src/__tests__/kasir.test.js` (U12) |
| U13 | Ekspor riwayat ke CSV (Change Request) | Klik tombol Ekspor CSV | File CSV terunduh berisi data transaksi | Tombol berfungsi mengunduh file spreadsheet CSV | Lulus | `langkah-4-riwayat-transaksi.png` |
| U14 | Pencarian dengan keyword tidak ada (Change Request) | Masukkan ID yang tidak terdaftar | Tampil status tidak ada transaksi | Daftar kosong tanpa error crash | Lulus | `src/__tests__/kasir.test.js` (U14) |

Wajib ada:
- minimal satu kasus dengan **input yang salah** (kosong, negatif, huruf di kolom angka): U04, U05, U09
- minimal satu kasus **di batas aturan** (contoh: tepat Rp100.000 jika aturannya minimal Rp100.000): U06, U07

## Unit test otomatis (jika ada)
Nama file test: `src/__tests__/kasir.test.js`
Jumlah test: 20 lulus dari 20 (100% lulus)
