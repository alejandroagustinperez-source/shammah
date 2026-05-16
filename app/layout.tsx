import type { Metadata } from "next";
import { Nunito, Pacifico } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "600", "700", "800"],
});

const pacifico = Pacifico({
  subsets: ["latin"],
  variable: "--font-pacifico",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Shammah Bebé | Todo lo que tu bebé necesita, con amor",
  description:
    "Baberos, portachupetes, babitas, mantas y muñecos de tela hechos con amor para tu bebé.",
  openGraph: {
    title: "Shammah Bebé",
    description: "Todo lo que tu bebé necesita, con amor",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${nunito.variable} ${pacifico.variable} font-nunito antialiased`}>
        {children}
      </body>
    </html>
  );
}
