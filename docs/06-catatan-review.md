# Catatan Code Review

Minta AI me-review kode kalian, lalu putuskan saran mana yang diterima.
Menolak saran AI dengan alasan yang jelas adalah hal yang baik.

**Prompt review yang dipakai:** "Lakukan review terhadap struktur kode aplikasi kasir ini, prioritaskan performa, kebersihan kode, dan kemudahan pengujian."

| No | Saran dari AI | Diterima / ditolak | Alasan | Bagian kode yang berubah |
|---|---|---|---|---|
| 1 | Menyarankan menginstal library eksternal (seperti `lodash` dan `date-fns`) untuk pengolahan array dan format tanggal | **Ditolak** | Menambah ukuran dependensi (overengineering). JavaScript modern sudah memiliki fungsi array bawaan (`reduce`, `filter`, `map`) dan `Intl / toLocaleString` yang sangat memadai tanpa perlu library luar. | Tidak ada perubahan (tetap memakai vanilla JS) |
| 2 | Menyarankan menghubungkan aplikasi dengan database server eksternal (PostgreSQL / Supabase) | **Ditolak** | Di luar spesifikasi batasan proyek saat ini. Aplikasi kasir cafe sederhana dirancang cepat, mandiri (client-side), dan mudah dijalankan di komputer mana pun tanpa koneksi backend tambahan. | Tidak ada perubahan (tetap memakai `localStorage`) |
| 3 | Memisahkan seluruh rumus kalkulasi matematika ke modul terpisah (`kasir.js`) sebagai fungsi murni (*pure functions*) | **Diterima** | Sangat baik untuk arsitektur kode. Logika bisnis tidak tercampur dengan UI React, sehingga 100% bisa diuji secara independen dengan unit test otomatis. | Dibuat modul `src/lib/kasir.js` dan unit test di `src/__tests__/kasir.test.js` |
| 4 | Menambahkan penanganan kembalian negatif secara langsung saat kasir mengetik uang bayar | **Diterima** | Memberikan umpan balik instan (*real-time*) kepada kasir sebelum tombol bayar ditekan, mengurangi risiko kesalahan transaksi. | Ditambahkan validasi dan feedback di `src/app/page.jsx` |

Penjelasan kode ditulis terpisah di `08-penjelasan-kode.md`.
