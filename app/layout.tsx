import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LP Nexus - The Ultimate DeFi LP Powerhouse",
  description:
    "Track liquidity pool positions across 8+ chains. Monitor impermanent loss, unclaimed fees, and optimize your LP strategy with AI-powered insights.",
  keywords: [
    "DeFi",
    "Liquidity Pool",
    "LP Tracker",
    "Uniswap",
    "Raydium",
    "Orca",
    "Impermanent Loss",
    "Yield Farming",
  ],
  authors: [{ name: "LP Nexus" }],
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },
  openGraph: {
    type: "website",
    title: "LP Nexus - The Ultimate DeFi LP Powerhouse",
    description:
      "Track liquidity pool positions across 8+ chains. Monitor impermanent loss, unclaimed fees, and optimize your LP strategy.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LP Nexus - The Ultimate DeFi LP Powerhouse",
    description:
      "Track liquidity pool positions across 8+ chains. Monitor impermanent loss, unclaimed fees, and optimize your LP strategy.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
