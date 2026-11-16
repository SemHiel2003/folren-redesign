import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/site/effects";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const description =
  "Folren is a desktop app for Windows and Mac. Type an idea and get a finished YouTube video with script, voice, scenes, music, captions and upload. It runs on your computer with your own Claude plan.";

export const metadata: Metadata = {
  metadataBase: new URL("https://kevin.hiel.digital"),
  title: {
    default: "Folren: turn one idea into a finished YouTube video",
    template: "%s · Folren",
  },
  description,
  // Demo-omgeving: niet laten indexeren.
  robots: { index: false, follow: false },
  icons: {
    icon: [
      { url: "/brand/icons/favicon.ico", sizes: "48x48" },
      { url: "/brand/icons/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/brand/icons/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Folren",
    title: "Folren: turn one idea into a finished YouTube video",
    description,
    images: [
      {
        url: "/social-card.png",
        width: 1200,
        height: 630,
        alt: "Folren. Your idea. A full YouTube video.",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#09080f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>
        <Providers>
          <div aria-hidden className="ambient">
            <i />
            <i />
            <i />
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
