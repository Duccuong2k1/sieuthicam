import { Header } from "@/components/Header";
import "./globals.css";

import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import Head from "./head";
import { ToastProvider } from "@/libs/providers/toast-provider";
import { ContactPhoneNumber } from "@/components/ContactPhoneNumber";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head />
      <body className={inter.className}>
        <ToastProvider>
          <Header />
          <div className="min-h-screen bg-accent">{children}</div>
          <ContactPhoneNumber />

          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
