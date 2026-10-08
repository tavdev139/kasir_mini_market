"use client";
import { formatRupiah } from "@/lib/kasir";

/**
 * Satu baris item di keranjang pesanan.
 * Props: item (object), onUbahJumlah (fn), onHapus (fn)
 */
export default function ItemKeranjang({ item, onUbahJumlah, onHapus }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">{item.nama}</p>
        <p className="text-xs text-gray-500">{formatRupiah(item.harga)} / pcs</p>
      </div>
      <div className="flex items-center gap-2 mx-3">
        <button
          onClick={() => onUbahJumlah(item.id, item.jumlah - 1)}
          className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm"
        >
          −
        </button>
        <span className="w-6 text-center text-sm font-semibold">{item.jumlah}</span>
        <button
          onClick={() => onUbahJumlah(item.id, item.jumlah + 1)}
          className="w-7 h-7 rounded-full bg-orange-100 hover:bg-orange-200 text-orange-700 font-bold text-sm"
        >
          +
        </button>
      </div>
      <div className="text-right min-w-[80px]">
        <p className="text-sm font-semibold text-gray-800">{formatRupiah(item.harga * item.jumlah)}</p>
        <button
          onClick={() => onHapus(item.id)}
          className="text-xs text-red-400 hover:text-red-600"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}
