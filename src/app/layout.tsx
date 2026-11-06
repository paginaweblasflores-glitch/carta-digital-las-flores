import type { Metadata, Viewport } from "next";
import { Alegreya, Marcellus } from "next/font/google";
import "./globals.css";

const display = Marcellus({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

const text = Alegreya({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-text",
  display: "swap",
});

/*
 * Dirección pública de la carta. WhatsApp y las redes necesitan la URL completa
 * de la imagen de vista previa, así que si cambia el dominio, cámbialo aquí.
 */
const SITE_URL = "https://carta.restaurantelasflores.com";

const TITLE = "Carta Digital · Las Flores";
const DESCRIPTION =
  "Carta del Restaurante Turístico Las Flores, Ayacucho. Cocina tradicional ayacuchana desde 1980, en 9 idiomas.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Restaurante Turístico Las Flores",
    locale: "es_PE",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/vista-previa.jpg",
        width: 1200,
        height: 630,
        alt: "Carta Digital · Restaurante Turístico Las Flores",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/vista-previa.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#34502c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${text.variable}`}>
      <body>
        <div
          hidden
          dangerouslySetInnerHTML={{
            __html: `<!--
THESIS: La carta impresa de Las Flores, hecha pantalla: un campo verde oliva bordado con flores ayacuchanas, no una web de restaurante con tarjetas.
OWN-WORLD: Campo verde de la carta impresa (#577b4a) a página completa, texto crema, bordados reales de la carta impresa como ornamento; capitulares Marcellus espaciadas, cuerpo Alegreya; filetes finos crema; sin tarjetas.
STORY: El turista escanea el QR, elige su idioma en la primera pantalla, recorre la carta y pide por el nombre en español.
FIRST VIEWPORT: Ramo bordado simétrico arriba, logo script blanco, lema, fila de idiomas en su propio nombre; botón de idioma fijo arriba a la derecha.
FORM: Mundo establecido (carta impresa) llevado a pantalla. Seed: brief-pinned.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
