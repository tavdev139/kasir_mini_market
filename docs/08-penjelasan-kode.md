# Penjelasan Kode

Tidak ada sesi presentasi, jadi dokumen ini adalah bukti utama bahwa tim memahami kode yang dihasilkan AI.

Aturan:
- Setiap anggota menjelaskan **minimal dua bagian kode yang berbeda**.
- Tulis dengan bahasa sendiri. Boleh bertanya ke AI untuk memahami, tetapi jangan menyalin jawabannya.
- Sebut nama file dan fungsi yang nyata, serta contoh nilai yang nyata.

---

## Bagian A: Penjelasan per anggota

### Penjelasan 1
- **Ditulis oleh:** Tim E-DALANG
- **File dan fungsi:** `src/lib/kasir.js` → `hitungDiskon(total)` dan `hitungTotalAkhir(total)`
- **Apa yang dilakukan:** 
  Fungsi ini bertugas memeriksa apakah jumlah uang belanjaan pelanggan berhak mendapatkan potongan diskon promosi atau tidak. Jika total belanja mencapai atau melebihi batas promo (Rp 100.000), fungsi menghitung 10% dari total tersebut dengan pembulatan rupiah. Selanjutnya, fungsi `hitungTotalAkhir` mengurangkan total awal dengan nominal diskon yang didapat.
- **Kenapa dibuat seperti ini:** 
  Saya memisahkannya menjadi fungsi murni (*pure function*) dan memakai konstanta `BATAS_DISKON` serta `PERSEN_DISKON`. Dengan cara ini, kode sangat fleksibel jika sewaktu-waktu pemilik cafe ingin mengubah syarat promo tanpa membongkar tampilan UI.
- **Contoh:** 
  - Jika pelanggan memesan 7 porsi Nasi Goreng dengan subtotal Rp 105.000, `hitungDiskon(105000)` mengembalikan `10500` (karena 105.000 ≥ 100.000). Total akhirnya menjadi `Rp 94.500`.
  - Jika belanjaan hanya Rp 97.000, fungsi mengembalikan `0` karena belum mencapai batas minimal.
- **Jika input salah atau kosong:** 
  Jika total 0 atau bernilai minus, kondisi `total >= BATAS_DISKON` bernilai salah (`false`) sehingga sistem dengan aman mengembalikan diskon 0 rupiah.

### Penjelasan 2
- **Ditulis oleh:** Tim E-DALANG
- **File dan fungsi:** `src/lib/kasir.js` → `filterTransaksi(transaksi, keyword, dari, sampai)`
- **Apa yang dilakukan:** 
  Fungsi ini menyaring daftar seluruh transaksi berdasarkan input pencarian ID dan rentang tanggal (fitur Change Request).
- **Kenapa dibuat seperti ini:** 
  Menggunakan metode bawaan JavaScript `.filter()` yang mengevaluasi tiga kondisi sekaligus: kecocokan kata kunci ID transaksi, batas tanggal awal (`dari`), dan batas tanggal akhir (`sampai`). Semua perbandingan string tanggal menggunakan format `YYYY-MM-DD` sehingga perbandingan leksikografis (huruf/angka) berjalan akurat.
- **Contoh:** 
  Jika kasir mengetik kata kunci `"TRX-20261008"` di kolom cari, fungsi hanya mengambil transaksi yang nomor ID-nya mengandung teks tersebut dan mengabaikan transaksi lainnya.
- **Jika input salah atau kosong:** 
  Jika parameter filter dibiarkan string kosong `""`, fungsi mengembalikan seluruh transaksi tanpa membuang data satu pun. Jika kata kunci tidak ditemukan, fungsi mengembalikan array kosong `[]` secara aman tanpa menyebabkan website macet.

---

## Bagian B: Pertanyaan yang dijawab bersama

**1. Jika aturan diskon berubah dari "≥ Rp100.000 diskon 10%" menjadi "≥ Rp75.000 diskon 5%", file dan fungsi mana yang harus diubah? Jelaskan alasannya.**
- **File:** `src/lib/kasir.js`
- **Konstanta/Fungsi:** Ubah nilai konstanta `BATAS_DISKON = 75000` dan `PERSEN_DISKON = 0.05`.
- **Alasan:** Karena fungsi `hitungDiskon(total)` dan komponen UI keranjang merujuk langsung pada variabel konstanta terpusat tersebut. Kita tidak perlu repot mengubah logika rumus matematika di file halaman React (`page.jsx`).

**2. Bagaimana data mengalir dari saat kasir memilih menu sampai total tagihan tampil di layar? Sebutkan file dan fungsi yang dilewati secara berurutan.**
1. Pengguna mengklik tombol "+ Tambah" di komponen `src/components/KartuMenu.jsx`.
2. Tombol memanggil callback `onTambah(menu)` yang diteruskan ke fungsi `tambahKeKeranjang(itemMenu)` di `src/app/page.jsx`.
3. State React `keranjang` diperbarui (kuantitas item bertambah).
4. Pembaruan state memicu pemanggilan fungsi `hitungTotal(keranjang)` di `src/lib/kasir.js`.
5. Nilai total diteruskan ke `hitungDiskon(total)` dan `hitungTotalAkhir(total)`.
6. Nilai akhir diformat oleh `formatRupiah()` lalu ditampilkan secara instan ke komponen ringkasan harga di layar kasir.

**3. Pilih satu unit test. Apa yang diuji, dan dalam kondisi apa test itu akan gagal?**
- **Unit test yang dipilih:** `U06 - total tepat Rp100.000 dapat diskon 10% = 10000` di `src/__tests__/kasir.test.js`.
- **Apa yang diuji:** Menguji nilai batas tepat (boundary value) apakah belanjaan yang pas Rp 100.000 sudah berhak menerima diskon sesuai spesifikasi.
- **Kondisi gagal:** Test ini akan gagal jika programmer keliru menggunakan tanda pembanding lebih besar murni (`total > BATAS_DISKON`) alih-alih lebih besar sama dengan (`total >= BATAS_DISKON`).

**4. Pilih satu saran AI yang kalian tolak. Apa sarannya dan kenapa kalian menolaknya?**
- **Saran AI:** AI menyarankan memasang library utilitas eksternal seperti `lodash` untuk manipulasi data dan `date-fns` untuk manipulasi tanggal.
- **Alasan ditolak:** Menambah ukuran dependensi instalasi yang tidak mendesak (*overengineering*). JavaScript modern sudah memiliki fungsi array bawaan (`filter`, `reduce`, `map`) dan formatting `Intl.DateTimeFormat` / `toLocaleDateString` yang sangat cepat dan mumpuni tanpa perlu library pihak ketiga.

**5. Bagian kode mana yang paling sulit dipahami, dan bagaimana kalian akhirnya memahaminya?**
- **Bagian kode:** Mekanisme pembuatan file dan unduh otomatis pada fungsi `eksporCSV()` di `src/lib/kasir.js`, khususnya baris `new Blob(...)` dan `URL.createObjectURL(blob)`.
- **Cara memahami:** Saya membaca referensi dokumentasi web MDN bahwa `Blob` adalah objek yang menampung data biner atau teks mentah dalam memori browser, dan `createObjectURL` membuat tautan URL sementara agar browser dapat mengeksekusi aksi unduh seolah-olah mengunduh file dari server eksternal.
