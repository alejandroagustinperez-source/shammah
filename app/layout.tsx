import type { Metadata } from "next";
import { Nunito, Pacifico } from "next/font/google";
import Script from "next/script";
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
  title: "Shammah Bebé | Ropa y accesorios para bebés",
  description:
    "Baberos, babitas, portachupetes, mantas y muñecos de tela artesanales. También cunas, cochecitos, sillas para auto y más productos para tu bebé.",
  keywords: "ropa bebe, baberos artesanales, accesorios bebe, cunas, cochecito, silla auto bebe, pañales, Argentina",
  verification: {
    google: "2_1cyfIn1NO2IrNEBWt7kTcss4hZArJnwvE52VI6b-w",
  },
  openGraph: {
    title: "Shammah Bebé | Todo lo que tu bebé necesita",
    description: "Productos artesanales y accesorios para bebés con envío a todo el país.",
    url: "https://shammah-bebe.vercel.app",
    siteName: "Shammah Bebé",
    images: [{ url: "https://shammah-bebe.vercel.app/logo.png" }],
    locale: "es_AR",
    type: "website",
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
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "ws7zjke0ft");`}
        </Script>
      </body>
    </html>
  );
}
