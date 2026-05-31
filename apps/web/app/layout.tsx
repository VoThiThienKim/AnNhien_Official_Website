import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "An Nhiên - Nhà hàng chay",
  description: "Đặt món chay tươi lành và đặt bàn tại An Nhiên."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}

