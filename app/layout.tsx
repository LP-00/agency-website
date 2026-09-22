import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { asset } from "@/lib/assets";
import "./globals.css";
import "./polish.css";

const manrope = localFont({
  src: "../public/fonts/manrope-latin-variable.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "400 700",
});
export const metadata: Metadata = {
  title: "/A — Strategia, design e sviluppo web",
  description:
    "Siti web, e-commerce e strumenti digitali costruiti intorno al tuo business. Scopri i nostri lavori e raccontaci il tuo progetto. Prezzi chiari, nessun canone obbligatorio.",
  applicationName: "/A",
  icons: { icon: asset("/favicon.svg") },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "https://lp-00.github.io/agency-website/",
  ),
  alternates: { canonical: "./" },
  openGraph: {
    title: "/A — Siti web che lavorano per te.",
    description:
      "Strategia, design e sviluppo per attività e aziende che vogliono crescere online.",
    type: "website",
    locale: "it_IT",
  },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0B0B",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={manrope.variable}>
      <body>
        <a href="#contenuto" className="skip-link">
          Vai al contenuto
        </a>
        {children}
      </body>
    </html>
  );
}
