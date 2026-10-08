# Refleksi Tim

**1. Apa yang berjalan baik dalam cara kami bekerja dengan AI?**
Komunikasi yang terstruktur dan bertahap. Ketika kami meminta AI membuat kode secara modular (memisahkan fungsi kalkulasi bisnis murni di `kasir.js` terpisah dari komponen visual React di `src/app/`), hasilnya menjadi sangat rapi, mudah dibaca, dan langsung bisa diuji dengan unit test otomatis tanpa konflik.

**2. Kapan AI paling membantu? Kapan AI justru menyulitkan?**
- **Paling membantu:** Saat melakukan *scaffolding* awal proyek, menyusun kerangka kasus uji, menulis test suite Jest yang mencakup banyak skenario batas, dan mendesain antarmuka UI kasir yang intuitif dengan Tailwind CSS.
- **Paling menyulitkan:** Saat instalasi dependensi awal di mana AI mencoba perintah standar tanpa memperhatikan kebijakan pembatasan skrip lokal (`EALLOWSCRIPTS`), sehingga memerlukan intervensi manual untuk mengonfigurasi `allowScripts` pada `package.json`.

**3. Kesalahan terbesar yang hampir lolos, dan bagaimana kami menemukannya?**
Pada pembuatan awal fungsi subtotal, jumlah item pesanan tidak dibatasi sehingga berpotensi menerima nilai negatif (`jumlah < 0`). Hal tersebut hampir lolos jika kami hanya menguji skenario ideal. Kesalahan ini berhasil ditemukan berkat perancangan kasus uji batas (edge cases U09) pada dokumen `04-kasus-uji.md` yang disusun sebelum pengkodean dimulai.

**4. Apa yang akan kami lakukan berbeda jika mengulang challenge ini?**
Kami akan memeriksa konfigurasi lingkungan kerja peranti lunak (seperti Node.js, PowerShell execution policy, dan npm permissions) terlebih dahulu sebelum memulai proyek, sehingga proses instalasi paket di langkah pertama bisa diselesaikan lebih cepat.

**5. Bagaimana kami mengatur waktu? Langkah mana yang jauh lebih lama dari estimasi, dan kenapa?**
Kami membagi pengerjaan menjadi blok waktu 30-45 menit per langkah sesuai tabel rencana kerja. Langkah yang memakan waktu sedikit lebih lama dari estimasi awal adalah langkah penyesuaian instalasi lingkungan dan integrasi Jest, karena perlunya konfigurasi preset `next/jest` dan mapper path `@/*`. Namun, langkah pembuatan UI dan logika bisnis justru selesai lebih cepat dari perkiraan karena panduan spesifikasi sudah jelas sejak awal.

**6. Bagian mana dari kode yang masih belum kami pahami sepenuhnya? (Jawab dengan jujur.)**
Konfigurasi optimasi Turbopack dan build engine internal Next.js App Router (seperti `Cache Components` dan Partial Prerendering) yang berjalan di latar belakang saat server kompilasi berjalan. Meskipun secara fungsi aplikasi bekerja normal, detail alur kompilasi internalnya masih perlu kami pelajari lebih mendalam di kemudian hari.
