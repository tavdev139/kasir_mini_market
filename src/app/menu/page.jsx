"use client";
import { useState, useEffect } from "react";
import { getMenu, simpanMenu } from "@/lib/storage";
import { formatRupiah } from "@/lib/kasir";
import Link from "next/link";

export default function HalamanMenu() {
  const [daftarMenu, setDaftarMenu] = useState([]);
  const [form, setForm] = useState({ nama: "", harga: "", kategori: "Makanan" });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setDaftarMenu(getMenu());
  }, []);

  function simpan() {
    setError("");
    if (!form.nama.trim()) { setError("Nama menu tidak boleh kosong."); return; }
    const harga = parseInt(form.harga, 10);
    if (isNaN(harga) || harga <= 0) { setError("Harga harus berupa angka lebih dari 0."); return; }

    let updated;
    if (editId !== null) {
      updated = daftarMenu.map((m) =>
        m.id === editId ? { ...m, nama: form.nama.trim(), harga, kategori: form.kategori } : m
      );
      setEditId(null);
    } else {
      const idBaru = Math.max(0, ...daftarMenu.map((m) => m.id)) + 1;
      updated = [...daftarMenu, { id: idBaru, nama: form.nama.trim(), harga, kategori: form.kategori }];
    }

    setDaftarMenu(updated);
    simpanMenu(updated);
    setForm({ nama: "", harga: "", kategori: "Makanan" });
  }

  function mulaiEdit(menu) {
    setEditId(menu.id);
    setForm({ nama: menu.nama, harga: String(menu.harga), kategori: menu.kategori });
    setError("");
  }

  function hapus(id) {
    const updated = daftarMenu.filter((m) => m.id !== id);
    setDaftarMenu(updated);
    simpanMenu(updated);
    if (editId === id) { setEditId(null); setForm({ nama: "", harga: "", kategori: "Makanan" }); }
  }

  function batal() {
    setEditId(null);
    setForm({ nama: "", harga: "", kategori: "Makanan" });
    setError("");
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-orange-600">☕ KasirKu</h1>
        <nav className="flex gap-4 text-sm font-medium text-gray-500">
          <Link href="/" className="hover:text-orange-600">Kasir</Link>
          <Link href="/riwayat" className="hover:text-orange-600">Riwayat</Link>
          <Link href="/menu" className="text-orange-600">Kelola Menu</Link>
        </nav>
      </header>

      <main className="p-6 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Kelola Menu</h2>

        {/* Form tambah / edit */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">
            {editId !== null ? "✏️ Edit Menu" : "➕ Tambah Menu Baru"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-gray-500 block mb-1">Nama Menu</label>
              <input
                type="text"
                value={form.nama}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
                placeholder="Contoh: Nasi Uduk"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Harga (Rp)</label>
              <input
                type="number"
                min="1"
                value={form.harga}
                onChange={(e) => setForm({ ...form, harga: e.target.value })}
                placeholder="Contoh: 15000"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Kategori</label>
              <select
                value={form.kategori}
                onChange={(e) => setForm({ ...form, kategori: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
              >
                <option>Makanan</option>
                <option>Minuman</option>
                <option>Snack</option>
              </select>
            </div>
          </div>
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          <div className="flex gap-2 mt-3">
            <button
              onClick={simpan}
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-5 py-2 rounded-lg font-medium"
            >
              {editId !== null ? "Simpan Perubahan" : "Tambah"}
            </button>
            {editId !== null && (
              <button onClick={batal} className="text-gray-500 text-sm px-4 py-2 hover:underline">
                Batal
              </button>
            )}
          </div>
        </div>

        {/* Tabel menu */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-3">Nama</th>
                <th className="text-left px-4 py-3">Kategori</th>
                <th className="text-right px-4 py-3">Harga</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {daftarMenu.map((m) => (
                <tr key={m.id} className="hover:bg-orange-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{m.nama}</td>
                  <td className="px-4 py-3 text-gray-500">{m.kategori}</td>
                  <td className="px-4 py-3 text-right text-orange-600 font-semibold">{formatRupiah(m.harga)}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => mulaiEdit(m)} className="text-blue-500 hover:underline mr-3 text-xs">Edit</button>
                    <button onClick={() => hapus(m.id)} className="text-red-400 hover:underline text-xs">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
