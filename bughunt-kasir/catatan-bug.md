# Catatan Bug Hunt: Kasir Kantin STEAM

**Nama tim:** KasirKu Team

Buat satu entri untuk setiap bug yang ditemukan. Simpan file ini di folder `bughunt-kasir/`.

## Bug 1
- **Gejala** (apa yang terlihat salah): Tombol checkout tetap bisa diklik saat keranjang belanja belum memiliki item sama sekali.
- **Langkah untuk memunculkan bug:**
  1. Buka halaman kasir.
  2. Jangan pilih menu apa pun (keranjang kosong).
  3. Masukkan uang bayar misal Rp 50.000.
  4. Klik tombol "Bayar Sekarang".
- **Aturan bisnis yang dilanggar**: Aturan "Minimal 1 item harus dipilih sebelum bisa checkout".
- **Penyebab** (file, fungsi, dan penjelasan): Pada `src/app/page.jsx` fungsi `handleCheckout()`, validasi awal tidak mengecek panjang array `keranjang.length`.
- **Perbaikan** (apa yang diubah): Menambahkan pengecekan `if (keranjang.length === 0) { setError("Pilih minimal 1 menu sebelum checkout."); return; }`.
- **Test yang membuktikan** (nama test): U05 (Kasus Uji Input Kosong).
- **Commit perbaikan** (pesan commit): `fix: cegah checkout saat keranjang kosong`
- **Ditemukan oleh:** tim sendiri

---

## Bug 2
- **Gejala**: Ketika total belanja di bawah Rp 100.000, nilai diskon sempat muncul NaN atau tidak terdefinisi jika tipe data berupa string.
- **Langkah untuk memunculkan bug:**
  1. Menambah item pesanan.
  2. Total subtotal Rp 97.000.
  3. Memeriksa komponen kalkulasi diskon.
- **Aturan bisnis yang dilanggar**: Aturan diskon "Hanya belanja minimal Rp 100.000 yang memperoleh diskon 10%".
- **Penyebab** (file, fungsi, dan penjelasan): Pada `src/lib/kasir.js`, fungsi `hitungDiskon` belum menangani nilai fallback 0 secara konsisten dengan tipe number integer.
- **Perbaikan** (apa yang diubah): Mengembalikan integer eksplisit `return 0;` jika kondisi total < BATAS_DISKON, dan memastikan pembulatan `Math.round(total * PERSEN_DISKON)` ketika diskon aktif.
- **Test yang membuktikan**: `U07 - total Rp99.000 TIDAK dapat diskon` pada `src/__tests__/kasir.test.js`.
- **Commit perbaikan**: `fix: pastikan diskon bernilai 0 jika total belanja di bawah batas promo`
- **Ditemukan oleh:** bersama
