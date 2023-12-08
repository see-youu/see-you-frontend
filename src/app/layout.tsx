import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SeeYou",
  description: "SeeYou",
  applicationName: "SeeYou",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SeeYou",
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: "#000000",
  twitter: {
    card: "summary",
    site: "",
    title: "SeeYou",
    description: "SeeYou",
    images: "",
  },
  openGraph: {
    type: "website",
    siteName: "SeeYou",
    title: "SeeYou",
    description: "SeeYou",
    url: "",
    images: "",
  },
  icons: {},
  keywords: ["SeeYou"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
