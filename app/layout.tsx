import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://melkamu-derso.vercel.app"),
  title: "Melkamu Derso",
  description: "Full-Stack & Mobile Application Developer",
  openGraph: {
    title: "Melkamu Derso",
    description: "Full-Stack & Mobile Application Developer",
    url: "https://melkamu-derso.vercel.app",
    siteName: "Melkamu Derso",
    type: "website",
    // 👇 This forces a nice, clean image to show up
    images: [
      {
        url: "https://melkamu-derso.vercel.app/melkamu.jpg", 
        width: 800,
        height: 600,
        alt: "Melkamu Derso Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Melkamu Derso",
    description: "Full-Stack & Mobile Application Developer",
    // 👇 This does the same for Twitter
    images: ["https://melkamu-derso.vercel.app/melkamu.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}