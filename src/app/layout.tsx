import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ONIX | Importación Premium de Artículos",
  description:
    "Importamos artículos electrónicos, hogar y moda a precios por debajo de mercado. Casillero en USA con asesoría gratis o entrega puerta a puerta en Colombia y Venezuela.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${manrope.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-zinc-800 overflow-x-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

