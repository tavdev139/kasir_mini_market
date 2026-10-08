"use client";
import { formatRupiah } from "@/lib/kasir";

/**
 * Kartu satu item menu.
 * Props: menu (object), onTambah (fn)
 */
export default function KartuMenu({ menu, onTambah }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <span className="text-xs bg-orange-100 text-orange-600 rounded-full px-2 py-0.5">
          {menu.kategori}
        </span>
      </div>
      <h3 className="font-semibold text-gray-800">{menu.nama}</h3>
      <p className="text-orange-600 font-bold">{formatRupiah(menu.harga)}</p>
      <button
        onClick={() => onTambah(menu)}
        className="mt-auto bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-lg py-1.5 transition"
      >
        + Tambah
      </button>
    </div>
  );
}
