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

// 👇 THIS IS THE FIXED METADATA BLOCK 👇
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
  },
  twitter: {
    card: "summary",
    title: "Melkamu Derso",
    description: "Full-Stack & Mobile Application Developer",
  },
};
// 👆 END OF FIXED METADATA 👆

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