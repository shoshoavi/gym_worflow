import type { Metadata } from "next";
import { Bowlby_One, Inter } from "next/font/google";
import "./globals.css";

const bowlbyOne = Bowlby_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-kicker",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fit Deal — Angebot sichern",
  description: "Angebots-Landingpage mit Countdown, Studio-Finder und Reservierungsformular.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${bowlbyOne.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
