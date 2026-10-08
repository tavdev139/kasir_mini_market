import "./globals.css";

export const metadata = {
  title: "KasirKu — Aplikasi Kasir Warung Makan",
  description: "Aplikasi kasir sederhana untuk warung makan dan cafe",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  );
}
