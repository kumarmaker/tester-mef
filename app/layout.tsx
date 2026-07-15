import type { Metadata } from "next";
import { Oswald, Inter, Noto_Sans, Plus_Jakarta_Sans, Public_Sans } from "next/font/google";
import { SITE_URL, IS_PREVIEW_DEPLOY } from "@/lib/site";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const publicSans = Public_Sans({
  variable: "--font-public",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Massive Earth Foundation",
    template: "%s | Massive Earth Foundation",
  },
  description: "Solving Climate Change With Investments, Innovation, & Technology",
  // "./" resolves per-route against metadataBase → every page gets a
  // self-referencing canonical without per-page boilerplate.
  alternates: { canonical: "./" },
  // Belt-and-braces with robots.ts: on preview/test deployments
  // (NOINDEX_SITE=true) every page also carries a noindex meta tag,
  // covering the case where an externally-linked URL surfaces despite
  // the robots.txt crawl block.
  robots: IS_PREVIEW_DEPLOY ? { index: false, follow: false } : undefined,
  openGraph: {
    siteName: "Massive Earth Foundation",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${inter.variable} ${notoSans.variable} ${plusJakarta.variable} ${publicSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
