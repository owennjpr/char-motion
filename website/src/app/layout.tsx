import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import PageWrapper from "./PageWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Char Motion",
  description: "am npm package for ASCII character based text animation",
  keywords: [
    "npm",
    "react",
    "web dev",
    "ascii",
    "ascii art",
    "ascii animation",
    "text",
    "text animation",
    "text motion",
    "character animation",
  ],
  publisher: "Owen Prendergast",
  openGraph: {
    type: "website",
    determiner: "",
    url: "https://char-motion.vercel.app/",
    title: "Char Motion",
    siteName: "Char Motion",
    description: "am npm package for ASCII character based text animation",
    emails: "owenprendergast8@gmail.com",
    locale: "en_US",
    // images: { url: "" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sourceCodePro.variable} antialiased`}
      >
        <PageWrapper>{children}</PageWrapper>
      </body>
    </html>
  );
}
