import type { Metadata, Viewport } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import { BRAND } from "@/lib/constants";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#030303",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://shreenathaadiart.com"),
  title: {
    default: `${BRAND.name} | Premium Wooden Art & Custom Frames`,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description,
  keywords: [
    "Shreenath Aadi Art",
    "wooden frames",
    "3D frames",
    "4D frames",
    "5D frames",
    "Shreenathji art",
    "Jain art",
    "custom photo frames",
    "gold emboss",
    "Sandeep Paliwal",
    "premium wooden art",
    "religious frames",
  ],
  authors: [{ name: BRAND.owner }],
  creator: BRAND.owner,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: BRAND.name,
    title: `${BRAND.name} | Premium Wooden Art`,
    description: BRAND.description,
    images: [{ url: "/logo.png", width: 800, height: 800, alt: BRAND.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} | Premium Wooden Art`,
    description: BRAND.description,
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://shreenathaadiart.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: BRAND.name,
              description: BRAND.description,
              telephone: BRAND.phone,
              email: BRAND.email,
              founder: { "@type": "Person", name: BRAND.owner },
              priceRange: "$$",
              image: "https://shreenathaadiart.com/logo.png",
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-black-deep">{children}</body>
    </html>
  );
}
