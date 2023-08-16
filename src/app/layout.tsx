import { Header } from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Đại lý cám bảo thuỳ - mua hàng tốt, hàng chuẩn, ship tận nơi",
  description: "Siêu thị cám chuyên cung cấp thức ăn chăn nuôi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="min-h-screen bg-accent">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
