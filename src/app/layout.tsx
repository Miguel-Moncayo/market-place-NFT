import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NFTify - Marketplace de NFTs",
  description: "El mayor mercado de NFTs con artículos excepcionales en subasta. Descubre tokens coleccionables y no fungibles al alcance de tu mano.",
  keywords: ["NFT", "Marketplace", "Crypto", "Blockchain", "Digital Art", "Collectibles"],
  authors: [{ name: "NFTify Team" }],
  openGraph: {
    title: "NFTify - Marketplace de NFTs",
    description: "El mayor mercado de NFTs con artículos excepcionales en subasta",
    url: "https://nftify.com",
    siteName: "NFTify",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NFTify - Marketplace de NFTs",
    description: "El mayor mercado de NFTs con artículos excepcionales en subasta",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
