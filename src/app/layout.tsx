import type { Metadata } from "next";
import { Barlow_Condensed, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const display = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VOLTX Casino",
  description: "High-performance volcanic casino lobby wrapper",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${outfit.variable} ${display.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-volcanic text-offwhite">{children}</body>
    </html>
  );
}
