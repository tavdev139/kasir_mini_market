"use client";
import { useState, useEffect } from "react";
import KartuMenu from "@/components/KartuMenu";
import ItemKeranjang from "@/components/ItemKeranjang";
import {
  hitungTotal,
  hitungDiskon,
  hitungTotalAkhir,
  hitungKembalian,
  formatRupiah,
  buatIdTransaksi,
  BATAS_DISKON,
} from "@/lib/kasir";
import { getMenu, simpanTransaksi } from "@/lib/storage";
import Link from "next/link";

export default function HalamanKasir() {
  const [menu, setMenu] = useState([]);
  const [keranjang, setKeranjang] = useState([]);
  const [filterKategori, setFilterKategori] = useState("Semua");
  const [bayar, setBayar] = useState("");
  const [error, setError] = useState("");
  const [sukses, setSukses] = useState(null); // data transaksi sukses

  // Load menu dari localStorage saat pertama render
  useEffect(() => {
    setMenu(getMenu());
  }, []);

  // === Logika keranjang ===
  function tambahKeKeranjang(itemMenu) {
    setKeranjang((prev) => {
      const ada = prev.find((i) => i.id === itemMenu.id);
      if (ada) {
        return prev.map((i) =>
          i.id === itemMenu.id ? { ...i, jumlah: i.jumlah + 1 } : i
        );
      }
      return [...prev, { ...itemMenu, jumlah: 1 }];
    });
    setError("");
  }

  function ubahJumlah(id, jumlahBaru) {
    if (jumlahBaru <= 0) {
      hapusDariKeranjang(id);
    } else {
      setKeranjang((prev) =>
        prev.map((i) => (i.id === id ? { ...i, jumlah: jumlahBaru } : i))
      );
    }
  }

  function hapusDariKeranjang(id) {
    setKeranjang((prev) => prev.filter((i) => i.id !== id));
  }

  function kosongkanKeranjang() {
    setKeranjang([]);
    setBayar("");
    setError("");
  }

  // === Kalkulasi ===
  const total = hitungTotal(keranjang);
  const diskon = hitungDiskon(total);
  const totalAkhir = hitungTotalAkhir(total);
  const uangBayar = parseInt(bayar.replace(/\D/g, ""), 10) || 0;
  const kembalian = hitungKembalian(uangBayar, totalAkhir);

  // === Checkout ===
  function handleCheckout() {
    setError("");
    if (keranjang.length === 0) {
      setError("Pilih minimal 1 menu sebelum checkout.");
      return;
    }
    if (uangBayar < totalAkhir) {
      setError(`Uang bayar kurang. Kekurangan: ${formatRupiah(totalAkhir - uangBayar)}`);
      return;
    }

    const transaksi = {
      id: buatIdTransaksi(),
      waktu: new Date().toISOString(),
      items: keranjang.map((i) => ({
        nama: i.nama,
        jumlah: i.jumlah,
        harga: i.harga,
        subtotal: i.harga * i.jumlah,
      })),
      total,
      diskon,
      totalAkhir,
      bayar: uangBayar,
      kembalian,
    };

    simpanTransaksi(transaksi);
    setSukses(transaksi);
    kosongkanKeranjang();
  }

  // === Kategori ===
  const kategori = ["Semua", ...new Set(menu.map((m) => m.kategori))];
  const menuTampil =
    filterKategori === "Semua"
      ? menu
      : menu.filter((m) => m.kategori === filterKategori);

  // === Tampilan struk setelah sukses ===
  if (sukses) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full text-center">
          <div className="text-5xl mb-3">✅</div>
          <h2 className="text-xl font-bold text-gray-800 mb-1">Transaksi Berhasil!</h2>
          <p className="text-sm text-gray-500 mb-4">{sukses.id}</p>
          <div className="text-left text-sm text-gray-700 space-y-1 mb-4">
            {sukses.items.map((i, idx) => (
              <div key={idx} className="flex justify-between">
                <span>{i.nama} ×{i.jumlah}</span>
                <span>{formatRupiah(i.subtotal)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2">
              {sukses.diskon > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Diskon 10%</span>
                  <span>−{formatRupiah(sukses.diskon)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-gray-800">
                <span>Total</span>
                <span>{formatRupiah(sukses.totalAkhir)}</span>
              </div>
              <div className="flex justify-between">
                <span>Bayar</span>
                <span>{formatRupiah(sukses.bayar)}</span>
              </div>
              <div className="flex justify-between font-bold text-orange-600 text-base">
                <span>Kembalian</span>
                <span>{formatRupiah(sukses.kembalian)}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setSukses(null)}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-2 font-semibold"
          >
            Transaksi Baru
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-orange-600">☕ KasirKu</h1>
        <nav className="flex gap-4 text-sm font-medium text-gray-500">
          <Link href="/" className="text-orange-600">Kasir</Link>
          <Link href="/riwayat" className="hover:text-orange-600">Riwayat</Link>
          <Link href="/menu" className="hover:text-orange-600">Kelola Menu</Link>
        </nav>
      </header>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Panel kiri: Daftar Menu */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Filter kategori */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {kategori.map((kat) => (
              <button
                key={kat}
                onClick={() => setFilterKategori(kat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                  filterKategori === kat
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-600 hover:bg-orange-50 border border-gray-200"
                }`}
              >
                {kat}
              </button>
            ))}
          </div>

          {/* Grid menu */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {menuTampil.map((m) => (
              <KartuMenu key={m.id} menu={m} onTambah={tambahKeKeranjang} />
            ))}
          </div>
        </div>

        {/* Panel kanan: Keranjang */}
        <div className="w-80 bg-white shadow-lg flex flex-col">
          <div className="p-4 border-b">
            <h2 className="font-bold text-gray-800">🛒 Pesanan</h2>
          </div>

          {/* Daftar item keranjang */}
          <div className="flex-1 overflow-y-auto px-4">
            {keranjang.length === 0 ? (
              <p className="text-center text-gray-400 text-sm mt-8">Belum ada item dipilih</p>
            ) : (
              keranjang.map((item) => (
                <ItemKeranjang
                  key={item.id}
                  item={item}
                  onUbahJumlah={ubahJumlah}
                  onHapus={hapusDariKeranjang}
                />
              ))
            )}
          </div>

          {/* Ringkasan harga */}
          <div className="p-4 border-t bg-gray-50 space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>{formatRupiah(total)}</span>
            </div>
            {diskon > 0 && (
              <div className="flex justify-between text-sm text-green-600 font-medium">
                <span>Diskon 10% (≥{formatRupiah(BATAS_DISKON)})</span>
                <span>−{formatRupiah(diskon)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-gray-800 text-base border-t pt-2">
              <span>Total</span>
              <span>{formatRupiah(totalAkhir)}</span>
            </div>

            {/* Input bayar */}
            <div className="mt-2">
              <label className="text-xs text-gray-500 mb-1 block">Uang Bayar (Rp)</label>
              <input
                type="number"
                min="0"
                value={bayar}
                onChange={(e) => { setBayar(e.target.value); setError(""); }}
                placeholder="Masukkan jumlah"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Kembalian */}
            {uangBayar > 0 && uangBayar >= totalAkhir && (
              <div className="flex justify-between text-orange-600 font-bold">
                <span>Kembalian</span>
                <span>{formatRupiah(kembalian)}</span>
              </div>
            )}

            {/* Pesan error */}
            {error && (
              <p className="text-red-500 text-xs bg-red-50 rounded-lg p-2">{error}</p>
            )}

            {/* Tombol checkout */}
            <button
              onClick={handleCheckout}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-2.5 font-bold text-sm transition mt-1"
            >
              Bayar Sekarang
            </button>
            {keranjang.length > 0 && (
              <button
                onClick={kosongkanKeranjang}
                className="w-full text-gray-400 text-xs hover:text-red-400 transition"
              >
                Kosongkan keranjang
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
