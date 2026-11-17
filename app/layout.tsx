import type { Metadata, Viewport } from "next";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-mono/400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nodo Studio — Automazioni per studi professionali e PMI | Roma",
  description:
    "Automatizzo documenti, scadenze, fatture ed email per commercialisti, CAF, studi legali e PMI. Workflow su n8n e Make, anche con l'AI. Assessment gratuito.",
  openGraph: {
    title: "Nodo Studio — Automazioni per studi professionali e PMI",
    description: "Il lavoro ripetitivo lo fanno le automazioni. Assessment gratuito.",
    locale: "it_IT",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#0b0c0b" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
