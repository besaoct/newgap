import type { Metadata, Viewport } from "next";
import { Archivo_Black, Sora } from "next/font/google";
import "./globals.css";

const archivo = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin", "latin-ext"],
  weight: ["400"]
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"]
});

export const viewport: Viewport = {
  themeColor: "#22572c",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://newgap.org"),
  title: {
    default: "NEWGAP — New Generation Action Party · India",
    template: "%s | NEWGAP"
  },
  appleWebApp: {
    capable: true,
    title: "NEWGAP",
    statusBarStyle: "default",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
  description: "NEWGAP is a digital-first political movement in India standing for educated leadership, zero corruption, secular unity, economic justice, and constitutional adherence. The only way to fill the gap.",
  keywords: [
    "NEWGAP",
    "New Generation Action Party",
    "India",
    "Indian Politics",
    "Clean Politics",
    "Educated Candidates India",
    "Anti Corruption Party",
    "Secular India",
    "Socialist Justice",
    "Indian Constitution Preamble",
    "Digital Governance India",
    "Cockroach Janta Party Alliance"
  ],
  authors: [{ name: "NEWGAP", url: "https://newgap.org" }],
  creator: "NEWGAP",
  publisher: "NEWGAP",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" },
    ]
  },
  openGraph: {
    title: "NEWGAP — New Generation Action Party · India",
    description: "India's digital-first political movement standing for educated leadership, zero corruption, secular unity, and constitutional adherence. Fill the gap.",
    url: "https://newgap.org",
    siteName: "NEWGAP",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "NEWGAP Member Logo",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEWGAP — New Generation Action Party · India",
    description: "India's digital-first political movement standing for educated leadership, zero corruption, secular unity, and constitutional adherence. Fill the gap.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${sora.variable} `}>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
         <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      </head>
      <body className="antialiased selection:bg-(--color-brand-orange) selection:text-(--color-brand-light)"  cz-shortcut-listen="true">
          {children}
      </body>
    </html>
  );
}
