# Analisis Change Request

Isi bagian ini **sebelum** mengubah kode, lalu commit dan push (contoh pesan: `dokumen: analisis change request`). Juri memeriksa bahwa commit ini muncul sebelum commit perubahan kode.

**Change request:** pencarian, filter, dan ekspor CSV (Tugas 3).

**Kriteria penerimaan yang akan dipenuhi dan cara kami memenuhinya:**
- Kasir dapat mencari transaksi berdasarkan nomor ID atau tanggal → tambah input pencarian di halaman Riwayat
- Kasir dapat memfilter transaksi berdasarkan rentang tanggal → tambah filter tanggal dari-sampai
- Data riwayat bisa diunduh dalam format CSV → tambah tombol "Ekspor CSV" yang mengunduh file

## 1. Dampak
| Bagian yang terdampak | File / fungsi | Perubahan yang diperlukan |
|---|---|---|
| Spesifikasi | `docs/01-spesifikasi.md` | Tambah fitur pencarian, filter, ekspor CSV ke fitur wajib & kriteria selesai |
| Kode | `src/app/riwayat/page.jsx` | Tambah state pencarian, filter tanggal, dan fungsi ekspor CSV |
| Kode | `src/lib/kasir.js` | Tambah fungsi `filterTransaksi` dan `eksporCSV` |
| Kasus uji / test | `docs/04-kasus-uji.md` | Tambah kasus uji U11–U14 |
| README | `README.md` | Perbarui daftar fitur |

## 2. Kasus uji baru
| ID | Langkah / input | Hasil yang diharapkan |
|---|---|---|
| U11 | Cari transaksi dengan ID "TRX001" | Hanya transaksi dengan ID TRX001 yang tampil |
| U12 | Filter transaksi tanggal hari ini | Hanya transaksi hari ini yang tampil |
| U13 | Klik "Ekspor CSV" dengan 3 transaksi tersimpan | File .csv berhasil diunduh dengan 3 baris data |
| U14 | Cari dengan keyword yang tidak ada (contoh: "ZZZZZ") | Tampil pesan "Tidak ada transaksi ditemukan" |

## 3. Setelah selesai
- [x] Kasus uji lama tetap lulus
- [x] Kasus uji baru lulus
- [x] Spesifikasi diperbarui
- [x] README diperbarui
