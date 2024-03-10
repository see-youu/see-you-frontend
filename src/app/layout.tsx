import type { Metadata } from "next";
import { Inter, Gaegu } from "next/font/google";
import "../styles/reset.css";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });
const gaegu = Gaegu({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-gaegu",
});

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${gaegu.variable}`}>{children}</body>
    </html>
  );
}
