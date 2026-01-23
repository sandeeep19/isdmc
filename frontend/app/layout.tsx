import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Providers } from "@/components/providers/Providers";
import TimedEnquiryPopup from "@/components/shared/TimedEnquiryPopup";
import MotifBackground from "@/components/layout/MotifBackground";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const merriweather = Merriweather({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather",
});

export const metadata: Metadata = {
  title: "Indian Studio DMC | Banaras, Seen From Inside",
  description: "Every Ghat. Every Kachori. Every Secret. Your insider guide to Banaras — places, food and stories only locals know.",
  keywords: "Banaras, Kashi, Varanasi, ghats, temples, street food, hidden gems, travel guide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <TimedEnquiryPopup />
          <MotifBackground />
        </Providers>
      </body>
    </html>
  );
}
