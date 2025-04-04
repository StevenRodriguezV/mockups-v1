import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import VendlyFooterNav from "@/Home_no-smart/vendly-footer-nav";
import VendlyHeader from "@/Header-s/enhanced-header-search";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mockups",
  description: "mockups",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <div className="min-h-screen max-w-lg mx-auto mb-16">
          <VendlyHeader/>
          {children}
          <VendlyFooterNav/>
         </div>

      </body>
    </html>
  );
}
