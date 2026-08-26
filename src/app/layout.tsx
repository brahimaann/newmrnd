import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const andrewElegant = localFont({
  src: "./fonts/andrew-elegant.ttf",
  variable: "--font-andrew-elegant",
  display: "swap",
});

const breakLabel = localFont({
  src: "./fonts/break-label.otf",
  variable: "--font-break-label",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MRND - Modern Renaissance",
  description: "A creative collective and multimedia lifestyle brand empowering emerging talent.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${andrewElegant.variable} ${breakLabel.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-(--color-parchment)" suppressHydrationWarning>
        <Header />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
