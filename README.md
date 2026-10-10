# KasirKu — Aplikasi Kasir Warung Makan / Cafe

Aplikasi kasir berbasis web untuk warung makan dan cafe kecil. Kasir dapat memilih menu, menghitung total tagihan dan kembalian secara otomatis, serta melihat riwayat transaksi.

## Alur Inti

1. Kasir membuka halaman utama dan melihat daftar menu
2. Kasir memilih menu dan mengatur jumlah pesanan
3. Sistem menghitung total, menerapkan diskon otomatis jika total ≥ Rp 100.000
4. Kasir memasukkan uang bayar, sistem menghitung kembalian
5. Kasir klik "Bayar Sekarang" dan transaksi tersimpan
6. Kasir dapat melihat riwayat transaksi, mencari, filter, dan ekspor CSV

## Cara Menjalankan (How to Run)

### Prasyarat

- Node.js versi 18 atau lebih baru
- npm versi 9 atau lebih baru
- Browser Chrome atau Firefox

### Langkah

1. Clone repositori:
   ```
   git clone https://github.com/fadlan139/kasir-cafe.git
   ```
2. Masuk ke folder proyek:
   ```
   cd kasir-cafe
   ```
3. Install dependensi:
   ```
   npm install
   ```
4. Jalankan website:
   ```
   npm run dev
   ```
5. Buka alamat berikut di browser: http://localhost:3000

### Jika terjadi masalah

- **Port sudah dipakai**: ganti port dengan `npm run dev -- -p 3001` lalu buka http://localhost:3001
- **Error `npm install`**: pastikan menggunakan Node.js versi 18+, cek dengan `node --version`

## Cara Menjalankan Pengujian

```
npx jest --no-coverage
```

Hasil yang diharapkan: **20 tests passed**, 0 failed.

## Tangkapan Layar Alur Inti

1. Halaman Kasir (Daftar Menu): ![Halaman Kasir](docs/bukti/langkah-1-halaman-kasir.png)
2. Keranjang & Perhitungan Tagihan: ![Keranjang](docs/bukti/langkah-2-keranjang-pesanan.png)
3. Modal Struk Transaksi Berhasil: ![Struk](docs/bukti/langkah-3-struk-transaksi.png)
4. Riwayat Transaksi & Fitur Filter/CSV: ![Riwayat](docs/bukti/langkah-4-riwayat-transaksi.png)
5. Halaman Kelola Menu: ![Kelola Menu](docs/bukti/langkah-5-kelola-menu.png)

## Fitur

- ✅ Daftar menu dengan filter kategori (Makanan / Minuman / Snack)
- ✅ Keranjang pesanan: tambah, kurangi, hapus item
- ✅ Hitung total tagihan otomatis
- ✅ Diskon 10% otomatis jika total ≥ Rp 100.000
- ✅ Hitung kembalian otomatis
- ✅ Validasi input (bayar kurang, keranjang kosong)
- ✅ Riwayat transaksi tersimpan di browser (localStorage)
- ✅ Pencarian riwayat berdasarkan ID transaksi
- ✅ Filter riwayat berdasarkan rentang tanggal
- ✅ Ekspor riwayat ke file CSV
- ✅ Kelola menu: tambah, edit, hapus menu

## Batasan yang Diketahui

- Data tersimpan di localStorage (hilang jika browser dibersihkan)
- Belum ada sistem login/autentikasi
- Belum mendukung printer struk fisik
- Hanya berjalan di satu perangkat (tidak sinkron antar perangkat)

## Aturan Bisnis

| Aturan | Detail |
|---|---|
| **Diskon** | 10% otomatis jika total belanja ≥ Rp 100.000 |
| **Kembalian** | = Uang bayar − Total setelah diskon |
| **Validasi bayar** | Sistem menolak jika uang bayar < total tagihan |
| **Minimal item** | Harus ada minimal 1 item di keranjang untuk checkout |

## Struktur Folder

| File / folder | Isi |
|---|---|
| `docs/` | Dokumen proses kerja (spesifikasi, rencana, log prompt, kasus uji, dll.) |
| `src/app/` | Halaman Next.js (kasir, riwayat, kelola menu) |
| `src/components/` | Komponen UI (KartuMenu, ItemKeranjang) |
| `src/lib/` | Logika bisnis (kasir.js) dan storage helper (storage.js) |
| `src/__tests__/` | Unit test |
| `bughunt-kasir/` | Hasil Bug Hunt |

## Sumber dan Lisensi

| Nama | Sumber | Lisensi |
|---|---|---|
| Next.js | https://nextjs.org | MIT |
| Tailwind CSS | https://tailwindcss.com | MIT |
| React | https://react.dev | MIT |

## Tim

| Nama | Peran |
|---|---|
| E-DALANG | Pengembang Aplikasi (Full-Stack) |
"# kasir_cafe" 
