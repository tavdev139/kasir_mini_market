"use client";
import { useState, useEffect } from "react";
import { getTransaksi } from "@/lib/storage";
import { formatRupiah, filterTransaksi, eksporCSV } from "@/lib/kasir";
import Link from "next/link";

export default function HalamanRiwayat() {
  const [semua, setSemua] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [dari, setDari] = useState("");
  const [sampai, setSampai] = useState("");

  useEffect(() => {
    setSemua(getTransaksi());
  }, []);

  const hasil = filterTransaksi(semua, keyword, dari, sampai);

  function formatWaktu(iso) {
    return new Date(iso).toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-orange-600">Kasir Mini Market</h1>
        <nav className="flex gap-4 text-sm font-medium text-gray-500">
          <Link href="/" className="hover:text-orange-600">Kasir</Link>
          <Link href="/riwayat" className="text-orange-600">Riwayat</Link>
          <Link href="/menu" className="hover:text-orange-600">Kelola Barang</Link>
        </nav>
      </header>

      <main className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Riwayat Transaksi</h2>
          <button
            onClick={() => eksporCSV(hasil)}
            disabled={hasil.length === 0}
            className="bg-green-500 hover:bg-green-600 disabled:opacity-40 text-white text-sm px-4 py-2 rounded-lg font-medium transition"
          >
            ⬇ Ekspor CSV
          </button>
        </div>

        {/* Filter pencarian */}
        <div className="bg-white rounded-xl shadow p-4 mb-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-gray-500 block mb-1">Cari ID Transaksi</label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Contoh: TRX-20261008"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">Dari Tanggal</label>
            <input
              type="date"
              value={dari}
              onChange={(e) => setDari(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">Sampai Tanggal</label>
            <input
              type="date"
              value={sampai}
              onChange={(e) => setSampai(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>

        {/* Jumlah hasil */}
        <p className="text-sm text-gray-500 mb-3">
          Menampilkan <strong>{hasil.length}</strong> dari {semua.length} transaksi
        </p>

        {/* Daftar transaksi */}
        {hasil.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center text-gray-400">
            {semua.length === 0
              ? "Belum ada transaksi."
              : "Tidak ada transaksi yang sesuai filter."}
          </div>
        ) : (
          <div className="space-y-3">
            {hasil.map((trx) => (
              <div key={trx.id} className="bg-white rounded-xl shadow p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{trx.id}</p>
                    <p className="text-xs text-gray-400">{formatWaktu(trx.waktu)}</p>
                    {/* Badge metode bayar */}
                    <span className={`inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                      !trx.metodeBayar || trx.metodeBayar === "Tunai"
                        ? "bg-green-100 text-green-700"
                        : trx.metodeBayar === "QRIS"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-purple-100 text-purple-700"
                    }`}>
                      {trx.metodeBayar || "Tunai"}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-orange-600">{formatRupiah(trx.totalAkhir)}</p>
                    {trx.diskon > 0 && (
                      <p className="text-xs text-green-600">Diskon: −{formatRupiah(trx.diskon)}</p>
                    )}
                  </div>
                </div>
                <div className="text-xs text-gray-500 flex flex-wrap gap-1">
                  {trx.items.map((item, i) => (
                    <span key={i} className="bg-gray-100 rounded-full px-2 py-0.5">
                      {item.nama} ×{item.jumlah}
                    </span>
                  ))}
                </div>
                <div className="mt-2 text-xs text-gray-500 flex gap-4 flex-wrap">
                  {(!trx.metodeBayar || trx.metodeBayar === "Tunai") ? (
                    <>
                      <span>Bayar: {formatRupiah(trx.bayar)}</span>
                      <span>Kembalian: {formatRupiah(trx.kembalian)}</span>
                    </>
                  ) : (
                    <span>Ref: {trx.nomorReferensi || "-"}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
