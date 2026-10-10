# Log Prompt

**Alat AI yang dipakai:** Antigravity (AI Assistant)

Catat prompt penting saja, tidak perlu semuanya. Yang wajib dicatat: prompt yang menghasilkan kode utama, prompt yang hasilnya ditolak atau diperbaiki, dan prompt untuk debugging.

| No | Waktu | Langkah ke- | Prompt (ringkas) | Hasil dari AI | Keputusan tim (diterima / diubah / ditolak) dan alasannya |
|---|---|---|---|---|---|
| 1 | 14:44 | 1 | "Bantu siapkan struktur proyek dan folder dokumentasi untuk aplikasi kasir" | Dibuatkan folder docs, bughunt-kasir, dan file markdown spesifikasi serta rencana | Diterima: struktur sesuai dengan format standar challenge |
| 2 | 14:48 | 1 | "Inisialisasi proyek Next.js dengan App Router dan Tailwind CSS" | Terjadi kendala PowerShell script policy dan npm EALLOWSCRIPTS | Diubah: menambahkan konfigurasi allowScripts di package.json agar instalasi berhasil |
| 3 | 14:49 | 2 | "Buat file logika bisnis pure functions untuk hitung total, diskon 10% jika >= 100rb, kembalian, format Rupiah, dan filter" | Kode `src/lib/kasir.js` berisi fungsi modular dan terpisah dari UI | Diterima: pemisahan logika bisnis memudahkan penulisan unit test otomatis |
| 4 | 14:50 | 3-4 | "Buat halaman Kasir dengan komponen kartu produk, panel belanja, dan validasi pembayaran" | Dibuat KartuMenu.jsx, ItemKeranjang.jsx, dan src/app/page.jsx | Diterima: alur kasir responsif dengan feedback error saat uang bayar kurang |
| 5 | 14:50 | 5-6 | "Buat halaman riwayat transaksi lengkap dengan filter ID/tanggal dan ekspor CSV, serta halaman kelola barang" | Halaman riwayat dan menu kelola barang dengan penyimpanan localStorage | Diterima: memenuhi seluruh kebutuhan Tugas 3 (Change Request) |
| 6 | 14:51 | 7 | "Tuliskan unit test Jest untuk menguji fungsi kalkulasi dan skenario kasus uji U01 sampai U14" | Dibuatkan 20 test case di src/__tests__/kasir.test.js | Diterima: seluruh 20 test lulus 100 persen |
| 7 | 09:02 | - | "Lakukan penyesuaian aplikasi dan dokumentasi menjadi Kasir Mini Market" | Memperbarui katalog produk minimarket (sembako, makanan, minuman, kebersihan), antarmuka UI, dan spesifikasi | Diterima: seluruh logika kalkulasi dan pengujian tetap konsisten |
