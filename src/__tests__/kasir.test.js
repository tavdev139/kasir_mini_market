// src/__tests__/kasir.test.js
// Unit test untuk fungsi-fungsi bisnis di kasir.js

import {
  hitungSubtotal,
  hitungTotal,
  hitungDiskon,
  hitungTotalAkhir,
  hitungKembalian,
  filterTransaksi,
  formatRupiah,
} from "../lib/kasir";

// =============================================
// hitungSubtotal
// =============================================
describe("hitungSubtotal", () => {
  test("U01 - subtotal normal: 2 Beras Premium @15000 = 30000", () => {
    expect(hitungSubtotal(15000, 2)).toBe(30000);
  });

  test("subtotal 1 item", () => {
    expect(hitungSubtotal(5000, 1)).toBe(5000);
  });

  test("U09 - jumlah negatif mengembalikan 0", () => {
    expect(hitungSubtotal(15000, -1)).toBe(0);
  });
});

// =============================================
// hitungTotal
// =============================================
describe("hitungTotal", () => {
  test("U01 - total 2 item: 2x Beras Premium + 1x Teh Kemasan = 35000", () => {
    const keranjang = [
      { harga: 15000, jumlah: 2 },
      { harga: 5000, jumlah: 1 },
    ];
    expect(hitungTotal(keranjang)).toBe(35000);
  });

  test("keranjang kosong menghasilkan 0", () => {
    expect(hitungTotal([])).toBe(0);
  });
});

// =============================================
// hitungDiskon
// =============================================
describe("hitungDiskon", () => {
  test("U07 - total Rp99.000 TIDAK dapat diskon", () => {
    expect(hitungDiskon(99000)).toBe(0);
  });

  test("U06 - total tepat Rp100.000 dapat diskon 10% = 10000", () => {
    expect(hitungDiskon(100000)).toBe(10000);
  });

  test("U02 - total Rp105.000 dapat diskon 10% = 10500", () => {
    expect(hitungDiskon(105000)).toBe(10500);
  });
});

// =============================================
// hitungTotalAkhir
// =============================================
describe("hitungTotalAkhir", () => {
  test("U01 - total 35000 tidak ada diskon, total akhir tetap 35000", () => {
    expect(hitungTotalAkhir(35000)).toBe(35000);
  });

  test("U02 - total 105000 → totalAkhir = 94500", () => {
    expect(hitungTotalAkhir(105000)).toBe(94500);
  });

  test("U06 - total tepat 100000 → totalAkhir = 90000", () => {
    expect(hitungTotalAkhir(100000)).toBe(90000);
  });
});

// =============================================
// hitungKembalian
// =============================================
describe("hitungKembalian", () => {
  test("U03 - bayar 50000, total 35000 → kembalian 15000", () => {
    expect(hitungKembalian(50000, 35000)).toBe(15000);
  });

  test("U10 - bayar pas 35000 → kembalian 0", () => {
    expect(hitungKembalian(35000, 35000)).toBe(0);
  });

  test("U04 - bayar kurang (20000 < 35000) → kembalian negatif", () => {
    expect(hitungKembalian(20000, 35000)).toBe(-15000);
  });
});

// =============================================
// filterTransaksi (Tugas 3 - Change Request)
// =============================================
describe("filterTransaksi", () => {
  const transaksi = [
    { id: "TRX-20261008-001", waktu: "2026-10-08T10:00:00.000Z", total: 35000 },
    { id: "TRX-20261008-002", waktu: "2026-10-08T14:00:00.000Z", total: 105000 },
    { id: "TRX-20261007-001", waktu: "2026-10-07T09:00:00.000Z", total: 20000 },
  ];

  test("U11 - cari 'TRX-20261008-001' menemukan 1 transaksi", () => {
    const hasil = filterTransaksi(transaksi, "TRX-20261008-001");
    expect(hasil).toHaveLength(1);
    expect(hasil[0].id).toBe("TRX-20261008-001");
  });

  test("U12 - filter tanggal 2026-10-08 menampilkan 2 transaksi", () => {
    const hasil = filterTransaksi(transaksi, "", "2026-10-08", "2026-10-08");
    expect(hasil).toHaveLength(2);
  });

  test("U14 - keyword tidak ditemukan ('ZZZZZ') menghasilkan array kosong", () => {
    const hasil = filterTransaksi(transaksi, "ZZZZZ");
    expect(hasil).toHaveLength(0);
  });

  test("tanpa filter menampilkan semua transaksi", () => {
    const hasil = filterTransaksi(transaksi);
    expect(hasil).toHaveLength(3);
  });
});

// =============================================
// formatRupiah
// =============================================
describe("formatRupiah", () => {
  test("15000 diformat menjadi 'Rp 15.000'", () => {
    expect(formatRupiah(15000)).toBe("Rp 15.000");
  });

  test("0 diformat menjadi 'Rp 0'", () => {
    expect(formatRupiah(0)).toBe("Rp 0");
  });
});
