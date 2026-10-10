import "./globals.css";

export const metadata = {
  title: "Kasir Mini Market — Sistem Kasir Minimarket",
  description: "Aplikasi kasir mini market untuk pencatatan transaksi penjualan barang",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  );
}
