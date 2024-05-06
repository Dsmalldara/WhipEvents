import type { Metadata } from "next";
import { Amaranth } from "next/font/google";
import { Poppins } from "next/font/google";
import { Pompiere } from "next/font/google";
import "./globals.css";
import { Mulish } from "next/font/google";
import { Toaster } from "react-hot-toast";
import {Ojuju} from "next/font/google"
const poppins = Poppins({ subsets: ["latin"], weight:['400','500','600','700'], variable:'--font-poppins',
});
const pompiere = Pompiere({ subsets: ["latin"], weight:['400'], variable:'--font-pompiere',})
const ojuju = Ojuju({subsets:['latin'], weight:['400','500','600','700'], variable:'--font-ojuju'})


// const mulish = Mulish({
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700'],
//   variable: '--font-mulish',
// });
export const metadata: Metadata = {
  title: "WhipEvents",
  description: "get access to the best events in town",
  icons:{
    icon:'/icon.jpg'
  }
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable } ${pompiere.variable} ${ojuju.variable}`}>{children}
      <Toaster position="top-left"/>
      </body>
    </html>
  );
}
