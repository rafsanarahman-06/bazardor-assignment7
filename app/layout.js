import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "বাজার দর — আজকের বাজারের দাম",
  description:
    "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম ও বাজার তুলনা।",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />

        <PriceTicker />

        <main className="flex-1">
          {children}
        </main>

        <Footer />

        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              fontFamily: "Arial, sans-serif",
              borderRadius: "12px",
            },
          }}
        />
      </body>
    </html>
  );
}