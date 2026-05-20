import type { Metadata } from "next";
import { Archivo_Black, JetBrains_Mono, Sora } from "next/font/google";
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




export const metadata: Metadata = {
  title: "NEWGAP — New Generation Action Party · India",
  description: "NEWGAP is the only way to fill the gap. Sovereign. Socialist. Secular. Democratic. Republic.",
  icons: {
    icon: "/logo.png"
  }
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
