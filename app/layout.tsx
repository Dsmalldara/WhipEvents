import type { Metadata } from "next";
import { Amaranth } from "next/font/google";
import { Poppins } from "next/font/google";
import { Pompiere } from "next/font/google";
import "./globals.css";
import { Exo } from "next/font/google";
import { Mulish } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight:['400','500','600','700'], variable:'--font-poppins',
});
const pompiere = Pompiere({ subsets: ["latin"], weight:['400'], variable:'--font-pompiere',})
const amaranth = Amaranth({
  subsets: ["latin"],
  weight:['400'],
  variable:'--font-amaranth',
})

const mulish = Mulish({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mulish',
});
export const metadata: Metadata = {
  title: "WhipEvents",
  description: "get access to the best events in town",
  icons:{
    icon:'/icon.jpg'
  }
};
export const exo = Exo({ subsets: ["latin"], weight:['400','500','600','700'], variable:'--font-exo',})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable } ${pompiere.variable} ${exo.variable}`}>{children}</body>
    </html>
  );
}
