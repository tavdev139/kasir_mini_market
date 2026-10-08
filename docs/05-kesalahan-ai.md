# Kesalahan AI yang Kami Temukan

Catat setiap kali AI memberikan hasil yang salah, tidak sesuai spesifikasi, atau tidak perlu.
Ini bukan catatan kegagalan tim. Justru ini bukti bahwa tim memeriksa hasil AI.

| No | Apa yang diminta | Kesalahan AI | Bagaimana kami mengetahuinya | Perbaikan yang kami lakukan |
|---|---|---|---|---|
| 1 | Menjalankan instalasi paket npm proyek Next.js | Perintah langsung `npm install` gagal dengan error `EALLOWSCRIPTS` karena aturan sistem lokal melarang build scripts tanpa deklarasi eksplisit | Membaca pesan error log pada terminal konsol | Mengubah konfigurasi `package.json` dengan menambahkan blok `allowScripts` untuk library terkait sehingga instalasi berjalan lancar |
| 2 | Menghitung subtotal pesanan dengan jumlah item sembarang | Pada pembuatan awal, AI tidak memasukkan proteksi terhadap input jumlah item negatif (`jumlah < 0`), sehingga bisa menghasilkan total belanjaan bernilai minus | Ditemukan saat merancang kasus uji batas (edge case) U09 | Menambahkan validasi pengecekan `if (jumlah < 0) return 0;` di dalam fungsi `hitungSubtotal()` pada `src/lib/kasir.js` |
| 3 | Ekspor data transaksi ke file CSV | AI awalnya langsung merender array item tanpa tanda kutip penutup, yang menyebabkan kolom terbelah jika nama menu mengandung koma atau tanda baca | Saat mencoba membuka file CSV di aplikasi spreadsheet (tabel berantakan) | Memperbaiki format generator CSV dengan menambahkan escaping tanda kutip ganda `"` di setiap sel nilai |
