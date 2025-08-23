import "./globals.css";
import "@/lib/patchCoinbaseTelemetry"; // ⛔ Must be before Wagmi is imported to avoid API 401 error
import { Providers } from "@/components/providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { RouteGuard } from "@/components/common/RouteGuard";
import TelemetrySuppressor from "@/components/common/TelemetrySuppressor";
import "@/app/telemetry-init";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "CryptoPlatform - Advanced Cryptocurrency Analytics & Portfolio Management",
  description:
    "The most comprehensive cryptocurrency platform with real-time market data, portfolio management, DeFi integration, and educational content. Track 10,000+ cryptocurrencies with advanced analytics.",
  keywords: [
    "cryptocurrency",
    "bitcoin",
    "ethereum",
    "portfolio",
    "trading",
    "defi",
    "nft",
    "blockchain",
    "crypto analytics",
    "market data",
  ],
  authors: [{ name: "CryptoPlatform Team" }],
  creator: "CryptoPlatform",
  publisher: "CryptoPlatform",
  icons: {
    icon: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/favicon.ico?v=2`,
  },
  
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CryptoPlatform - Advanced Cryptocurrency Analytics",
    description:
      "Track, analyze, and manage your cryptocurrency investments with real-time data and powerful tools.",
    url: "/",
    siteName: "CryptoPlatform",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CryptoPlatform - Cryptocurrency Analytics Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CryptoPlatform - Advanced Cryptocurrency Analytics",
    description:
      "Track, analyze, and manage your cryptocurrency investments with real-time data and powerful tools.",
    images: ["/og-image.png"],
    creator: "@cryptoplatform",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <TelemetrySuppressor /> {/* 🔒 Patch runs before Wagmi/ConnectKit */}
        <Providers>
          <RouteGuard>{children}</RouteGuard>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
