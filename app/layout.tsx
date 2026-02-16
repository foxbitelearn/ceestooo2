import type { Metadata } from "next";
import { Inter, Lora, Caveat } from "next/font/google"; // Using Inter for UI, Lora for long text, Caveat for handwritten notes
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Class Farewell | Anonymous Messages & Gallery",
  description: "Share your last words and memories anonymously.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${lora.variable} ${caveat.variable} antialiased font-sans bg-paper text-ink pt-20`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
